<#
.SYNOPSIS
  FloraVault High-Performance, Non-Blocking Local Web Server
  - Multi-request non-blocking socket handling
  - Prevents Chrome speculative preconnect hanging via DataAvailable polling & ReceiveTimeout
  - Supports localhost secure context for HTML5 Camera API
  - Zero third-party trackers, strict privacy headers
#>

param(
    [int]$StartPort = 8080
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ScriptDir) {
    $ScriptDir = (Get-Location).Path
}

# Find an available port
$Port = $StartPort
$Listener = $null
for ($i = 0; $i -lt 10; $i++) {
    $testPort = $StartPort + $i
    try {
        $Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $testPort)
        $Listener.Start()
        $Port = $testPort
        break
    } catch {
        $Listener = $null
    }
}

if (-not $Listener) {
    Write-Error "Could not bind to any port between $StartPort and $($StartPort + 10)."
    exit 1
}

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host " 🌿 FloraVault Web Server is LIVE!" -ForegroundColor Green
Write-Host " URL: http://localhost:$Port" -ForegroundColor Cyan
Write-Host " Directory: $ScriptDir" -ForegroundColor Gray
Write-Host " Camera: Enabled in secure localhost context" -ForegroundColor White
Write-Host " Privacy: 100% Isolated - Zero Third-Party Trackers" -ForegroundColor Yellow
Write-Host " Press Ctrl+C in this terminal to stop" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

# Automatically open default browser
Start-Process "http://localhost:$Port"

try {
    while ($true) {
        $Client = $Listener.AcceptTcpClient()
        $Client.ReceiveTimeout = 1500
        $Client.SendTimeout = 2000
        $Stream = $Client.GetStream()

        # Non-blocking wait for data (handles Chrome pre-connect sockets that send no data)
        $waited = 0
        while (-not $Stream.DataAvailable -and $waited -lt 300) {
            Start-Sleep -Milliseconds 15
            $waited += 15
        }

        if (-not $Stream.DataAvailable) {
            # Chrome speculative preconnect socket: close cleanly and do NOT hang!
            $Client.Close()
            continue
        }

        $Reader = [System.IO.StreamReader]::new($Stream, [System.Text.Encoding]::UTF8)
        $RequestLine = $Reader.ReadLine()

        if (-not $RequestLine) {
            $Client.Close()
            continue
        }

        $Parts = $RequestLine.Split(' ')
        $Method = $Parts[0]
        $UrlPath = if ($Parts.Count -gt 1) { $Parts[1] } else { "/" }

        # Consume remaining request headers
        while ($true) {
            if (-not $Stream.DataAvailable) { break }
            $headerLine = $Reader.ReadLine()
            if ([string]::IsNullOrEmpty($headerLine)) { break }
        }

        # Resolve requested file path
        $CleanPath = $UrlPath.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($CleanPath) -or $CleanPath -eq "/") {
            $CleanPath = "index.html"
        }

        $FilePath = [System.IO.Path]::Combine($ScriptDir, $CleanPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if ([System.IO.File]::Exists($FilePath)) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = if ($MimeTypes.ContainsKey($Ext)) { $MimeTypes[$Ext] } else { "application/octet-stream" }
            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)

            $Header = "HTTP/1.1 200 OK`r`n" +
                      "Content-Type: $ContentType`r`n" +
                      "Content-Length: $($Bytes.Length)`r`n" +
                      "Connection: close`r`n" +
                      "X-Content-Type-Options: nosniff`r`n" +
                      "Referrer-Policy: no-referrer`r`n" +
                      "Cache-Control: no-cache`r`n`r`n"

            $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
            $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
            $Stream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $NotFound = "<html><body><h2>404 Not Found</h2><p>$CleanPath was not found on FloraVault.</p></body></html>"
            $NotFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($NotFound)
            $Header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html`r`nContent-Length: $($NotFoundBytes.Length)`r`nConnection: close`r`n`r`n"
            $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
            $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
            $Stream.Write($NotFoundBytes, 0, $NotFoundBytes.Length)
        }

        $Stream.Flush()
        $Client.Close()
    }
} finally {
    if ($Listener) {
        $Listener.Stop()
    }
    Write-Host "FloraVault server closed." -ForegroundColor Yellow
}
