/**
 * FloraVault - Privacy-First Camera & Plant Scanner Controller
 * Only accesses Camera with explicit user action.
 * Snapshots are processed locally in an in-memory Canvas. ZERO telemetry.
 */

export class CameraController {
  constructor(videoElement, canvasElement, options = {}) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.stream = null;
    this.facingMode = 'environment'; // Default to rear camera on mobile phones
    this.isActive = false;
    this.onPhotoCaptured = options.onPhotoCaptured || null;
    this.onError = options.onError || null;
    this.onStatusChange = options.onStatusChange || null;
  }

  /**
   * Check if camera is supported by the browser
   */
  static isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  /**
   * Start live camera stream
   */
  async startCamera() {
    if (!CameraController.isSupported()) {
      const err = new Error("Camera API is not supported in this browser. You can still upload plant photos directly from your device storage.");
      if (this.onError) this.onError(err);
      throw err;
    }

    try {
      if (this.stream) {
        this.stopCamera();
      }

      this.notifyStatus('requesting', 'Requesting camera access...');

      const constraints = {
        video: {
          facingMode: { ideal: this.facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false // STRICT PRIVACY: Camera only, NO microphone access
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
      await this.videoElement.play();

      this.isActive = true;
      this.notifyStatus('active', 'Camera active (Protected Local Stream)');
      return true;
    } catch (err) {
      this.isActive = false;
      this.notifyStatus('error', err.name === 'NotAllowedError' 
        ? 'Camera permission denied. Click the lock/camera icon in your address bar to enable, or use the file upload option.' 
        : `Camera error: ${err.message}`);
      if (this.onError) this.onError(err);
      return false;
    }
  }

  /**
   * Stop active camera stream and free hardware resources
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
    this.isActive = false;
    this.notifyStatus('stopped', 'Camera turned off');
  }

  /**
   * Toggle between front and back camera (e.g. on mobile/tablets)
   */
  async flipCamera() {
    this.facingMode = this.facingMode === 'environment' ? 'user' : 'environment';
    if (this.isActive) {
      await this.startCamera();
    }
  }

  /**
   * Capture still frame from live video feed into local canvas
   * Returns base64 JPEG data URL
   */
  captureSnapshot() {
    if (!this.isActive || !this.videoElement) {
      throw new Error("Camera is not active");
    }

    const video = this.videoElement;
    const canvas = this.canvasElement || document.createElement('canvas');
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    // Mirror image if using front camera
    if (this.facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to standard JPEG data URL locally
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.88);

    if (this.onPhotoCaptured) {
      this.onPhotoCaptured(photoDataUrl);
    }

    return photoDataUrl;
  }

  notifyStatus(state, message) {
    if (this.onStatusChange) {
      this.onStatusChange({ state, message, facingMode: this.facingMode });
    }
  }
}

