# FloraVault 🌿
### Privacy-First Botanical Portal, Nursery Registry & Real-Time AI Care Assistant

FloraVault is a clean, modern, zero-telemetry web application built for nurseries, plant lovers, and garden enthusiasts. It enables nurseries to upload and showcase plants, allows the community to ask questions and receive instant AI answers, and provides transparent health cons and toxicity alerts for pets, children, and humans.

---

## 🌟 Key Features

### 1. 🏪 Nursery Plant Upload Portal
- Nurseries can publish plants directly to the catalog.
- Fields include: Plant Name, Botanical/Scientific Name, Category (Indoor, Outdoor, Medicinal, Flowering, Succulents), Price, Nursery Location, and Contact.
- **Growing Requirements:** Sunlight (Bright Indirect, Low Light, Full Sun), Watering Schedule, Soil Type, Temperature Range, and Humidity.
- **Botanical Uses:** Air purification (NASA clean air ratings), medicinal remedies, culinary seasoning, and aesthetics.
- **Direct Camera Integration:** Nurseries can snap plant photos using the device camera right from the nursery floor or upload from device storage.

### 2. 🚨 Health Cons & Toxicity Warning System
- Prominent visual alerts for dangerous or toxic plants.
- Detailed con assessments:
  - Severity level: Mild Oral Irritant, Moderate, Severe, or Lethal.
  - High-risk groups: Cats, Dogs, Toddlers/Children, Skin contact.
  - Active phytochemical toxins (e.g., Insoluble Calcium Oxalate crystals, Oleandrin cardiac glycosides, Aloin, Saponins).
  - Symptoms of poisoning (oral swelling, drooling, vomiting, arrhythmia).
  - Immediate precautions and first-aid recommendations.

### 3. 💬 Community Q&A & Advice Forum
- Users can post questions about troubled plants or identification queries.
- **Real-Time FloraAI Answers:** Every question immediately receives an automated botanical diagnosis from FloraAI.
- Community members and verified nursery experts can reply, offer advice, and upvote helpful answers.

### 4. 📸 Live Camera Scanner & AI Diagnosis
- Accesses your device camera with HTML5 `getUserMedia` (front or rear camera supported).
- Live viewfinder with alignment reticle and instant shutter snapshot.
- One-click diagnosis: FloraAI scans the snapshot for health vitality, species identification, and toxicity cons.
- Direct forwarding: Use camera snapshots directly for nursery uploads or community questions.

### 5. 🤖 FloraAI Real-Time Botanical Advisor
- Floating and docked real-time chat assistant.
- Instant guidance on yellowing leaves, overwatering, pest management, and sunlight needs.
- **Toxicity Radar:** Instant answers to questions like *"Is Monstera safe for my cat?"* or *"Can children touch Dieffenbachia?"*.
- Works 100% offline using a comprehensive local botanical reasoning engine, with an optional field for direct Google Gemini API keys (zero middleman proxy).

### 6. 📖 Plant Knowledge Blog & Guides
- In-depth articles covering:
  - Dangerous health cons of popular houseplants.
  - Balcony medicinal plants and their verified uses.
  - The FloraVault Zero-Tracking architecture.

### 7. 🛡️ Top-Notch Privacy Guarantee ("No Third-Party Trackings")
- **0 Third-Party Trackers:** No Google Analytics, no Facebook Pixels, no Hotjar, no Mixpanel, no external fingerprinting scripts.
- **Zero External Font/Icon CDNs:** All icons are inline SVGs and system-native typography is used to prevent font CDN network tracking.
- **Camera Stream Isolation:** Camera frames are strictly processed on an in-memory HTML5 Canvas and never uploaded to remote telemetry servers.
- **Local-First Storage:** Nursery listings, questions, and bookmarks live in your browser's local memory (`localStorage`).
- **Data Sovereignty:** 1-click JSON backup export and 1-click complete data wipe.

---

## 🚀 How to Run

### Method 1: Instant 1-Click Launch (Recommended on Windows)
Simply double-click the **`start.bat`** file in this folder:
```
c:\Users\togar\OneDrive\Desktop\bt\start.bat
```
This automatically starts the zero-dependency local web server and opens the app in your browser at `http://localhost:8080`.

### Method 2: PowerShell Server
Open PowerShell in this directory and run:
```powershell
.\server.ps1
```

### Method 3: Direct Browser Open
You can also open `index.html` directly in Google Chrome, Microsoft Edge, or Firefox.
*(Note: To use the live device camera, browsers require a localhost origin like `http://localhost:8080` or `https` for security reasons).*

---

## 📁 Project Structure

```
├── index.html          # Main web application & responsive single-page interface
├── css/
│   └── styles.css      # Ultra-clean Apple/Tailwind-inspired styling & danger alerts
├── js/
│   ├── app.js          # Core application coordinator & view router
│   ├── data.js         # Comprehensive nursery inventory, blogs, & Q&A
│   ├── camera.js       # Privacy-first HTML5 camera controller & snapshot canvas
│   ├── ai-service.js   # Real-time FloraAI assistant & toxicity diagnostic engine
│   └── privacy.js      # Privacy auditor, tracker detector & data exporter
├── server.ps1          # Zero-dependency PowerShell local web server with security headers
├── start.bat           # 1-click launcher for Windows
└── README.md           # Documentation
```

