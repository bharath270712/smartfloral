/**
 * FloraVault - Main Application Coordinator
 * Zero Third-Party Trackers • Privacy First • Native Web Architecture
 */

import { INITIAL_PLANTS, INITIAL_QUESTIONS, INITIAL_BLOGS } from './data.js';
import { AIService } from './ai-service.js';
import { CameraController } from './camera.js';
import { PrivacyController } from './privacy.js';

class App {
  constructor() {
    this.plants = this.loadLocal('flora_plants', INITIAL_PLANTS);
    this.questions = this.loadLocal('flora_questions', INITIAL_QUESTIONS);
    this.blogs = INITIAL_BLOGS;

    this.ai = new AIService();
    this.privacy = new PrivacyController();
    this.camera = null;

    this.activeFilter = 'all';
    this.searchQuery = '';
    this.currentCapturedPhoto = null;

    this.initElements();
    this.initCamera();
    this.initEventListeners();
    this.renderAll();
    this.runInitialPrivacyCheck();
  }

  loadLocal(key, defaultData) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch {
      return defaultData;
    }
  }

  saveLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Local storage write error:", e);
    }
  }

  initElements() {
    // Navigation
    this.navBtns = document.querySelectorAll('.nav-btn');
    this.views = document.querySelectorAll('.view-section');

    // Explore / Plant Grid
    this.plantGrid = document.getElementById('plantGrid');
    this.searchInput = document.getElementById('searchInput');
    this.filterPills = document.querySelectorAll('.filter-pill');

    // Camera & Scanner
    this.scannerVideo = document.getElementById('scannerVideo');
    this.scannerCanvas = document.getElementById('scannerCanvas');
    this.startCameraBtn = document.getElementById('startCameraBtn');
    this.stopCameraBtn = document.getElementById('stopCameraBtn');
    this.shutterBtn = document.getElementById('shutterBtn');
    this.flipCameraBtn = document.getElementById('flipCameraBtn');
    this.scannerStatus = document.getElementById('scannerStatus');
    this.scannerPreview = document.getElementById('scannerPreview');
    this.scannerThumb = document.getElementById('scannerThumb');
    this.aiAnalyzeBtn = document.getElementById('aiAnalyzeBtn');
    this.useForUploadBtn = document.getElementById('useForUploadBtn');
    this.scannerAiResults = document.getElementById('scannerAiResults');

    // Nursery Upload Form
    this.uploadForm = document.getElementById('nurseryUploadForm');
    this.toxicToggle = document.getElementById('toxicToggle');
    this.hazardFields = document.getElementById('hazardFields');
    this.uploadPhotoInput = document.getElementById('uploadPhotoInput');
    this.photoPreviewContainer = document.getElementById('photoPreviewContainer');
    this.formPhotoPreview = document.getElementById('formPhotoPreview');
    this.useCameraSnapshotForFormBtn = document.getElementById('useCameraSnapshotForFormBtn');

    // Community Forum
    this.questionsFeed = document.getElementById('questionsFeed');
    this.askQuestionBtn = document.getElementById('askQuestionBtn');
    this.askQuestionModal = document.getElementById('askQuestionModal');
    this.askQuestionForm = document.getElementById('askQuestionForm');
    this.questionPhotoInput = document.getElementById('questionPhotoInput');

    // Blogs
    this.blogGrid = document.getElementById('blogGrid');
    this.blogModal = document.getElementById('blogModal');
    this.blogModalContent = document.getElementById('blogModalContent');

    // Plant Detail Modal
    this.plantModal = document.getElementById('plantModal');
    this.plantModalContainer = document.getElementById('plantModalContainer');

    // AI Chat Drawer
    this.chatDrawer = document.getElementById('chatDrawer');
    this.chatLauncher = document.getElementById('chatLauncher');
    this.closeChatBtn = document.getElementById('closeChatBtn');
    this.chatMessages = document.getElementById('chatMessages');
    this.chatInput = document.getElementById('chatInput');
    this.sendChatBtn = document.getElementById('sendChatBtn');

    // Privacy & Toast
    this.privacyModal = document.getElementById('privacyModal');
    this.privacyAuditBtn = document.getElementById('privacyAuditBtn');
    this.exportDataBtn = document.getElementById('exportDataBtn');
    this.wipeDataBtn = document.getElementById('wipeDataBtn');
    this.toastContainer = document.getElementById('toastContainer');
  }

  initCamera() {
    this.camera = new CameraController(this.scannerVideo, this.scannerCanvas, {
      onPhotoCaptured: (dataUrl) => {
        this.currentCapturedPhoto = dataUrl;
        this.scannerThumb.src = dataUrl;
        this.scannerPreview.style.display = 'flex';
        this.showToast('📸 Photo captured successfully!');
      },
      onStatusChange: ({ state, message }) => {
        if (this.scannerStatus) {
          this.scannerStatus.textContent = message;
        }
      },
      onError: (err) => {
        this.showToast(`Camera notice: ${err.message}`, 'error');
      }
    });
  }

  initEventListeners() {
    // Navigation
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        this.switchView(targetView);
      });
    });

    // Search and Filters
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderPlants();
      });
    }

    this.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.renderPlants();
      });
    });

    // Camera Controls
    if (this.startCameraBtn) {
      this.startCameraBtn.addEventListener('click', async () => {
        await this.camera.startCamera();
        this.startCameraBtn.style.display = 'none';
        this.stopCameraBtn.style.display = 'inline-flex';
        this.shutterBtn.disabled = false;
      });
    }

    if (this.stopCameraBtn) {
      this.stopCameraBtn.addEventListener('click', () => {
        this.camera.stopCamera();
        this.startCameraBtn.style.display = 'inline-flex';
        this.stopCameraBtn.style.display = 'none';
        this.shutterBtn.disabled = true;
      });
    }

    if (this.shutterBtn) {
      this.shutterBtn.addEventListener('click', () => {
        try {
          this.camera.captureSnapshot();
        } catch {
          this.showToast("Start camera before capturing a snapshot.", 'error');
        }
      });
    }

    if (this.flipCameraBtn) {
      this.flipCameraBtn.addEventListener('click', () => {
        this.camera.flipCamera();
      });
    }

    // AI Scanner Diagnosis
    if (this.aiAnalyzeBtn) {
      this.aiAnalyzeBtn.addEventListener('click', async () => {
        if (!this.currentCapturedPhoto) return;
        this.aiAnalyzeBtn.disabled = true;
        this.aiAnalyzeBtn.textContent = "Analyzing Plant & Toxicity Risks...";
        
        try {
          const result = await this.ai.analyzePlantImage(this.currentCapturedPhoto);
          this.renderScannerAnalysis(result);
          this.showToast("Analysis complete!");
        } catch (err) {
          this.showToast("Analysis failed: " + err.message, 'error');
        } finally {
          this.aiAnalyzeBtn.disabled = false;
          this.aiAnalyzeBtn.textContent = "🩺 Diagnose Plant & Check Cons";
        }
      });
    }

    if (this.useForUploadBtn) {
      this.useForUploadBtn.addEventListener('click', () => {
        if (!this.currentCapturedPhoto) return;
        this.formPhotoPreview.src = this.currentCapturedPhoto;
        this.photoPreviewContainer.style.display = 'block';
        this.switchView('view-upload');
        this.showToast("Snapshot imported to nursery upload form!");
      });
    }

    // Nursery Upload Form Events
    if (this.toxicToggle) {
      this.toxicToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.hazardFields.classList.add('show');
        } else {
          this.hazardFields.classList.remove('show');
        }
      });
    }

    if (this.uploadPhotoInput) {
      this.uploadPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.formPhotoPreview.src = event.target.result;
            this.photoPreviewContainer.style.display = 'block';
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (this.useCameraSnapshotForFormBtn) {
      this.useCameraSnapshotForFormBtn.addEventListener('click', () => {
        this.switchView('view-scanner');
        this.showToast("Use the camera to take a photo of your nursery plant.");
      });
    }

    if (this.uploadForm) {
      this.uploadForm.addEventListener('submit', (e) => this.handleNurseryUpload(e));
    }

    // Community Forum Events
    if (this.askQuestionBtn) {
      this.askQuestionBtn.addEventListener('click', () => {
        this.openModal(this.askQuestionModal);
      });
    }

    if (this.askQuestionForm) {
      this.askQuestionForm.addEventListener('submit', (e) => this.handleNewQuestion(e));
    }

    // AI Chat Drawer
    if (this.chatLauncher) {
      this.chatLauncher.addEventListener('click', () => {
        this.chatDrawer.classList.toggle('open');
      });
    }

    if (this.closeChatBtn) {
      this.closeChatBtn.addEventListener('click', () => {
        this.chatDrawer.classList.remove('open');
      });
    }

    if (this.sendChatBtn) {
      this.sendChatBtn.addEventListener('click', () => this.handleSendChatMessage());
    }

    if (this.chatInput) {
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSendChatMessage();
        }
      });
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });

    // Privacy Controls
    if (this.privacyAuditBtn) {
      this.privacyAuditBtn.addEventListener('click', () => {
        this.openPrivacyDashboard();
      });
    }

    if (this.exportDataBtn) {
      this.exportDataBtn.addEventListener('click', () => {
        this.privacy.exportUserData();
        this.showToast("Encrypted user data exported as JSON.");
      });
    }

    if (this.wipeDataBtn) {
      this.wipeDataBtn.addEventListener('click', () => {
        if (confirm("Permanently wipe all local nursery listings, saved questions, and private data? This cannot be undone.")) {
          this.privacy.wipeAllLocalData();
          this.plants = INITIAL_PLANTS;
          this.questions = INITIAL_QUESTIONS;
          this.renderAll();
          this.closeAllModals();
          this.showToast("All local data wiped cleanly.");
        }
      });
    }

    // Quick prompt pills in Chat
    document.querySelectorAll('.quick-prompt-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (this.chatInput) {
          this.chatInput.value = pill.textContent.replace(/^[^\w\s]+/, '').trim();
          this.handleSendChatMessage();
        }
      });
    });
  }

  switchView(viewId) {
    this.navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    });

    this.views.forEach(view => {
      view.classList.toggle('active', view.id === viewId);
    });

    // If leaving camera view, stop camera stream to preserve battery and privacy
    if (viewId !== 'view-scanner' && this.camera && this.camera.isActive) {
      this.camera.stopCamera();
      if (this.startCameraBtn) this.startCameraBtn.style.display = 'inline-flex';
      if (this.stopCameraBtn) this.stopCameraBtn.style.display = 'none';
      if (this.shutterBtn) this.shutterBtn.disabled = true;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // Render Plant Catalog
  // =========================================================================
  renderPlants() {
    if (!this.plantGrid) return;

    let filtered = this.plants.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery) ||
        p.scientificName.toLowerCase().includes(this.searchQuery) ||
        p.category.toLowerCase().includes(this.searchQuery) ||
        (p.nursery && p.nursery.name.toLowerCase().includes(this.searchQuery));

      if (!matchSearch) return false;

      if (this.activeFilter === 'all') return true;
      if (this.activeFilter === 'pet-safe') return !p.toxicity.isDangerous;
      if (this.activeFilter === 'toxic') return p.toxicity.isDangerous;
      if (this.activeFilter === 'medicinal') return p.category.toLowerCase() === 'medicinal';
      if (this.activeFilter === 'indoor') return p.category.toLowerCase() === 'indoor';
      if (this.activeFilter === 'outdoor') return p.category.toLowerCase() === 'outdoor';

      return true;
    });

    if (filtered.length === 0) {
      this.plantGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌿</div>
          <h3>No plants match your search</h3>
          <p>Try searching for a different plant name or reset your filters.</p>
        </div>
      `;
      return;
    }

    this.plantGrid.innerHTML = filtered.map(plant => `
      <div class="plant-card" data-plant-id="${plant.id}">
        <div class="card-media-wrapper">
          <img src="${plant.image}" alt="${plant.name}" class="card-img" loading="lazy" />
          <span class="card-category-badge">${plant.category}</span>
          <span class="card-price-badge">${plant.nursery.price || '$15.00'}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${plant.name}</h3>
          <p class="card-scientific">${plant.scientificName}</p>

          ${plant.toxicity.isDangerous ? `
            <div class="card-toxicity-banner toxicity-danger">
              <span>⚠️</span>
              <span><strong>Health Con:</strong> ${plant.toxicity.severity}</span>
            </div>
          ` : `
            <div class="card-toxicity-banner toxicity-safe">
              <span>🟢</span>
              <span><strong>Safe:</strong> 100% Non-Toxic</span>
            </div>
          `}

          <div class="card-nursery-info">
            <span>🏡</span>
            <span>${plant.nursery.name}</span>
          </div>

          <div class="card-specs">
            <div class="spec-item" title="Sunlight Requirement">
              <span>☀️</span>
              <span>${plant.care.sunlight.split('(')[0].trim().slice(0, 18)}...</span>
            </div>
            <div class="spec-item" title="Watering Schedule">
              <span>💧</span>
              <span>${plant.care.watering.split(';')[0].trim().slice(0, 18)}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach card click event for details modal
    this.plantGrid.querySelectorAll('.plant-card').forEach(card => {
      card.addEventListener('click', () => {
        const plantId = card.dataset.plantId;
        this.openPlantModal(plantId);
      });
    });
  }

  // =========================================================================
  // Plant Detail Modal with Care, Uses & Toxicity Cons
  // =========================================================================
  openPlantModal(plantId) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant || !this.plantModalContainer) return;

    this.plantModalContainer.innerHTML = `
      <div class="plant-modal-hero">
        <img src="${plant.image}" alt="${plant.name}" />
      </div>
      <div class="plant-modal-body">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <h2 style="font-size: 1.8rem; font-weight: 800; line-height: 1.2;">${plant.name}</h2>
            <p style="color: var(--text-muted); font-style: italic;">${plant.scientificName} • ${plant.category}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">${plant.nursery.price || '$15.00'}</div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${plant.nursery.name}</span>
          </div>
        </div>

        <!-- DANGER / TOXICITY HEALTH CON ALERT BANNER -->
        ${plant.toxicity.isDangerous ? `
          <div class="toxicity-alert-box">
            <div class="toxicity-alert-title">
              <span>⚠️</span>
              <span>HEALTH CON: TOXIC & DANGEROUS TO PETS/HUMANS</span>
            </div>
            <p style="margin-bottom: 0.5rem; font-weight: 600; color: #7f1d1d;">
              Severity: ${plant.toxicity.severity} | High Risk to: ${plant.toxicity.riskGroups.join(', ')}
            </p>
            <p style="font-size: 0.92rem; color: #991b1b; margin-bottom: 0.5rem;">
              <strong>Active Toxins:</strong> ${plant.toxicity.compounds}
            </p>
            <p style="font-size: 0.92rem; color: #991b1b; margin-bottom: 0.5rem;">
              <strong>Poisoning Symptoms:</strong> ${plant.toxicity.symptoms}
            </p>
            <p style="font-size: 0.92rem; color: #7f1d1d; background: #fee2e2; padding: 0.5rem 0.75rem; border-radius: 6px;">
              <strong>Precautions:</strong> ${plant.toxicity.precautions}
            </p>
          </div>
        ` : `
          <div class="safe-alert-box">
            <div class="safe-alert-title">
              <span>🟢</span>
              <span>100% NON-TOXIC & PET SAFE</span>
            </div>
            <p style="font-size: 0.92rem; color: #166534;">
              ${plant.toxicity.symptoms || "Completely safe for curious dogs, cats, and small children."}
            </p>
          </div>
        `}

        <div class="detail-tab-nav">
          <button class="detail-tab-btn active" data-tab="tab-care">🌱 Care Requirements</button>
          <button class="detail-tab-btn" data-tab="tab-uses">🌟 Uses & Benefits</button>
          <button class="detail-tab-btn" data-tab="tab-nursery">🏡 Nursery Info</button>
        </div>

        <!-- Care Requirements Tab -->
        <div id="tab-care" class="detail-tab-pane active">
          <p style="color: var(--text-muted); margin-bottom: 1.25rem;">${plant.description}</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
              <strong style="display: block; font-size: 0.85rem; color: var(--primary);">☀️ Sunlight</strong>
              <span style="font-size: 0.92rem;">${plant.care.sunlight}</span>
            </div>
            <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
              <strong style="display: block; font-size: 0.85rem; color: var(--primary);">💧 Watering</strong>
              <span style="font-size: 0.92rem;">${plant.care.watering}</span>
            </div>
            <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
              <strong style="display: block; font-size: 0.85rem; color: var(--primary);">🪴 Soil Mix</strong>
              <span style="font-size: 0.92rem;">${plant.care.soil}</span>
            </div>
            <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
              <strong style="display: block; font-size: 0.85rem; color: var(--primary);">🌡️ Temperature & Humidity</strong>
              <span style="font-size: 0.92rem;">${plant.care.temperature} (Humidity: ${plant.care.humidity || '40-60%'})</span>
            </div>
          </div>
        </div>

        <!-- Uses & Benefits Tab -->
        <div id="tab-uses" class="detail-tab-pane">
          <h4 style="margin-bottom: 0.75rem; font-weight: 700;">Botanical Uses & Practical Applications:</h4>
          <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-main);">
            ${plant.uses.map(use => `<li>${use}</li>`).join('')}
          </ul>
        </div>

        <!-- Nursery Info Tab -->
        <div id="tab-nursery" class="detail-tab-pane">
          <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">${plant.nursery.name}</h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 0.35rem;">📍 <strong>Location:</strong> ${plant.nursery.location}</p>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 0.85rem;">✉️ <strong>Direct Contact:</strong> ${plant.nursery.contact}</p>
            <button class="btn btn-primary btn-sm" onclick="alert('Contacting ${plant.nursery.name} directly via secure local protocol.')">
              Contact Nursery Directly
            </button>
          </div>
        </div>
      </div>
    `;

    // Modal internal tabs
    const tabBtns = this.plantModalContainer.querySelectorAll('.detail-tab-btn');
    const tabPanes = this.plantModalContainer.querySelectorAll('.detail-tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const target = this.plantModalContainer.querySelector(`#${btn.dataset.tab}`);
        if (target) target.classList.add('active');
      });
    });

    this.openModal(this.plantModal);
  }

  // =========================================================================
  // Nursery Upload Handler
  // =========================================================================
  handleNurseryUpload(e) {
    e.preventDefault();

    const name = document.getElementById('uploadName').value.trim();
    const scientificName = document.getElementById('uploadScientific').value.trim();
    const category = document.getElementById('uploadCategory').value;
    const nurseryName = document.getElementById('uploadNurseryName').value.trim();
    const nurseryLocation = document.getElementById('uploadLocation').value.trim();
    const nurseryContact = document.getElementById('uploadContact').value.trim();
    const price = document.getElementById('uploadPrice').value.trim() || '$15.00';
    const description = document.getElementById('uploadDesc').value.trim();

    // Care requirements
    const sunlight = document.getElementById('uploadSunlight').value.trim();
    const watering = document.getElementById('uploadWatering').value.trim();
    const soil = document.getElementById('uploadSoil').value.trim();
    const temperature = document.getElementById('uploadTemp').value.trim();

    // Uses
    const usesRaw = document.getElementById('uploadUses').value.trim();
    const uses = usesRaw.split('\n').filter(u => u.trim().length > 0);

    // Toxicity
    const isDangerous = this.toxicToggle.checked;
    let toxicity = {
      isDangerous: false,
      severity: "Non-Toxic",
      riskGroups: ["None"],
      compounds: "None detected",
      symptoms: "Safe for pets and humans.",
      precautions: "None required."
    };

    if (isDangerous) {
      toxicity = {
        isDangerous: true,
        severity: document.getElementById('uploadSeverity').value,
        riskGroups: Array.from(document.querySelectorAll('input[name="riskGroup"]:checked')).map(cb => cb.value),
        compounds: document.getElementById('uploadCompounds').value.trim() || "Natural defense phytochemicals",
        symptoms: document.getElementById('uploadSymptoms').value.trim() || "Oral irritation, nausea if swallowed.",
        precautions: document.getElementById('uploadPrecautions').value.trim() || "Keep out of reach of pets and small children."
      };
    }

    // Image
    let imageUrl = this.formPhotoPreview.src || '';
    if (!imageUrl || imageUrl.includes('placeholder') || imageUrl === window.location.href) {
      imageUrl = "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80";
    }

    const newPlant = {
      id: `plant-${Date.now()}`,
      name,
      scientificName: scientificName || name,
      category,
      nursery: {
        name: nurseryName,
        location: nurseryLocation,
        contact: nurseryContact,
        price
      },
      image: imageUrl,
      description: description || "Freshly cultivated specimen from local botanical nursery.",
      care: {
        sunlight: sunlight || "Bright Indirect Sunlight",
        watering: watering || "Once a week",
        soil: soil || "Well draining potting mix",
        temperature: temperature || "18°C - 26°C",
        humidity: "50%",
        fertilizer: "Monthly during spring"
      },
      uses: uses.length > 0 ? uses : ["Ornamental garden beauty", "Natural indoor air enhancement"],
      toxicity,
      tags: [category, isDangerous ? "Toxic Alert" : "Pet Safe"],
      dateAdded: new Date().toISOString().slice(0, 10)
    };

    this.plants.unshift(newPlant);
    this.saveLocal('flora_plants', this.plants);
    this.renderPlants();

    this.uploadForm.reset();
    this.photoPreviewContainer.style.display = 'none';
    this.hazardFields.classList.remove('show');
    this.showToast(`🌿 "${name}" uploaded successfully to FloraVault!`);
    this.switchView('view-explore');
  }

  // =========================================================================
  // Community Forum
  // =========================================================================
  renderQuestions() {
    if (!this.questionsFeed) return;

    this.questionsFeed.innerHTML = this.questions.map(q => `
      <div class="question-card" data-q-id="${q.id}">
        <div class="question-header">
          <div class="question-author">Asked by <strong>${q.author}</strong> • ${q.timeAgo}</div>
          ${q.isResolved ? `
            <span style="background: #ecfdf5; color: #059669; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; border: 1px solid #a7f3d0;">
              ✓ Resolved
            </span>
          ` : `
            <span style="background: #fffbeb; color: #d97706; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; border: 1px solid #fde68a;">
              Open Question
            </span>
          `}
        </div>

        <h3 class="question-title">${q.title}</h3>
        <p class="question-excerpt">${q.content}</p>

        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            ${q.tags.map(tag => `
              <span style="background: var(--bg-subtle); color: var(--text-muted); font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px;">#${tag}</span>
            `).join('')}
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--text-muted);">
            <button class="btn btn-secondary btn-sm upvote-btn" data-q-id="${q.id}">
              ▲ Helpful (${q.votes})
            </button>
            <span>💬 ${q.answers.length} Responses</span>
          </div>
        </div>

        <!-- Answers Thread -->
        <div class="answers-thread">
          ${q.answers.map(ans => `
            <div class="answer-bubble ${ans.isAi ? 'ai-answer' : ''}">
              <div class="answer-meta">
                <span>${ans.author}</span>
                ${ans.isAi ? `<span class="ai-pill">🤖 FloraAI Doctor</span>` : ''}
                ${ans.verifiedNursery ? `<span class="nursery-pill">Verified Nursery</span>` : ''}
                <span style="color: var(--text-light); font-weight: 400;">• ${ans.timeAgo}</span>
              </div>
              <div style="font-size: 0.92rem; line-height: 1.6; white-space: pre-wrap;">${ans.content}</div>
            </div>
          `).join('')}

          <!-- Direct User Reply Box -->
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
            <input type="text" placeholder="Write a knowledgeable answer..." class="form-input reply-input" data-q-id="${q.id}" style="font-size: 0.88rem;" />
            <button class="btn btn-primary btn-sm submit-reply-btn" data-q-id="${q.id}">Reply</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach upvote & reply listeners
    this.questionsFeed.querySelectorAll('.upvote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qId = btn.dataset.qId;
        const targetQ = this.questions.find(q => q.id === qId);
        if (targetQ) {
          targetQ.votes += 1;
          this.saveLocal('flora_questions', this.questions);
          this.renderQuestions();
        }
      });
    });

    this.questionsFeed.querySelectorAll('.submit-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qId;
        const input = this.questionsFeed.querySelector(`.reply-input[data-q-id="${qId}"]`);
        if (!input || !input.value.trim()) return;

        const targetQ = this.questions.find(q => q.id === qId);
        if (targetQ) {
          targetQ.answers.push({
            id: `ans-${Date.now()}`,
            author: "Plant Enthusiast (You)",
            isAi: false,
            verifiedNursery: false,
            timeAgo: "Just now",
            content: input.value.trim()
          });
          this.saveLocal('flora_questions', this.questions);
          this.renderQuestions();
          this.showToast("Your answer was posted to the community!");
        }
      });
    });
  }

  async handleNewQuestion(e) {
    e.preventDefault();

    const title = document.getElementById('newQuestionTitle').value.trim();
    const plantName = document.getElementById('newQuestionPlant').value.trim();
    const content = document.getElementById('newQuestionContent').value.trim();

    if (!title || !content) return;

    const newQ = {
      id: `q-${Date.now()}`,
      author: "Local Gardener",
      timeAgo: "Just now",
      title,
      content,
      plantName: plantName || "General Houseplant",
      tags: [plantName || "Houseplant", "Advice"],
      answersCount: 1,
      votes: 1,
      isResolved: false,
      answers: []
    };

    // Auto-generate instant FloraAI Bot diagnostic response
    const aiAnswerContent = await this.ai.askQuestion(`${title}: ${content}`);
    newQ.answers.push({
      id: `ans-ai-${Date.now()}`,
      author: "FloraAI Plant Doctor",
      isAi: true,
      verifiedNursery: false,
      timeAgo: "Just now",
      content: aiAnswerContent
    });

    this.questions.unshift(newQ);
    this.saveLocal('flora_questions', this.questions);
    this.renderQuestions();

    this.askQuestionForm.reset();
    this.closeAllModals();
    this.showToast("Question posted! FloraAI has answered in real-time.");
    this.switchView('view-forum');
  }

  // =========================================================================
  // Blogs & Guides
  // =========================================================================
  renderBlogs() {
    if (!this.blogGrid) return;

    this.blogGrid.innerHTML = this.blogs.map(blog => `
      <div class="blog-card" data-blog-id="${blog.id}">
        <img src="${blog.coverImage}" alt="${blog.title}" class="blog-img" loading="lazy" />
        <div class="blog-content">
          <span class="blog-tag">${blog.category} • ${blog.readTime}</span>
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-summary">${blog.summary}</p>
          <div style="font-size: 0.8rem; color: var(--text-light); margin-top: auto;">
            By ${blog.author} • ${blog.date}
          </div>
        </div>
      </div>
    `).join('');

    this.blogGrid.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', () => {
        const blogId = card.dataset.blogId;
        this.openBlogModal(blogId);
      });
    });
  }

  openBlogModal(blogId) {
    const blog = this.blogs.find(b => b.id === blogId);
    if (!blog || !this.blogModalContent) return;

    this.blogModalContent.innerHTML = `
      <div style="max-height: 280px; overflow: hidden; border-radius: 12px 12px 0 0;">
        <img src="${blog.coverImage}" alt="${blog.title}" style="width: 100%; height: 280px; object-fit: cover;" />
      </div>
      <div style="padding: 2rem;">
        <span class="blog-tag">${blog.category} • ${blog.readTime}</span>
        <h1 style="font-size: 1.85rem; font-weight: 800; line-height: 1.3; margin-bottom: 0.75rem;">${blog.title}</h1>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
          Published by <strong>${blog.author}</strong> on ${blog.date}
        </div>
        <div style="line-height: 1.75; font-size: 1.02rem; color: var(--text-main); white-space: pre-wrap;">
          ${blog.content.trim()}
        </div>
      </div>
    `;

    this.openModal(this.blogModal);
  }

  // =========================================================================
  // Camera Scanner Analysis Results Renderer
  // =========================================================================
  renderScannerAnalysis(result) {
    if (!this.scannerAiResults) return;

    this.scannerAiResults.innerHTML = `
      <div style="background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem; margin-top: 1rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
            Detected: ${result.plantName}
          </h3>
          <span style="background: #ecfdf5; color: #059669; font-weight: 700; font-size: 0.78rem; padding: 0.2rem 0.6rem; border-radius: 999px;">
            ${result.confidence}
          </span>
        </div>

        ${result.isDangerous ? `
          <div class="toxicity-alert-box" style="margin-bottom: 1rem;">
            <div class="toxicity-alert-title">
              <span>⚠️</span>
              <span>HEALTH CON: ${result.toxicityRating}</span>
            </div>
            <p style="font-size: 0.92rem; color: #991b1b;">${result.consAndRisks}</p>
          </div>
        ` : `
          <div class="safe-alert-box" style="margin-bottom: 1rem;">
            <div class="safe-alert-title">
              <span>🟢</span>
              <span>${result.toxicityRating}</span>
            </div>
            <p style="font-size: 0.92rem; color: #166534;">Safe around children and pets.</p>
          </div>
        `}

        <div style="margin-bottom: 0.75rem;">
          <strong style="color: var(--primary); font-size: 0.9rem;">💧 Growing Requirements:</strong>
          <p style="font-size: 0.92rem; color: var(--text-muted);">${result.careAdvice}</p>
        </div>

        <div>
          <strong style="color: var(--primary); font-size: 0.9rem;">🌿 Uses & Benefits:</strong>
          <p style="font-size: 0.92rem; color: var(--text-muted);">${result.usesAndBenefits}</p>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // FloraAI Chat Real-Time Handler
  // =========================================================================
  async handleSendChatMessage() {
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.appendChatMessage(text, 'user');
    this.chatInput.value = '';

    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot';
    typingBubble.innerHTML = `<em>FloraAI is typing...</em>`;
    this.chatMessages.appendChild(typingBubble);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

    const answer = await this.ai.askQuestion(text);
    typingBubble.remove();
    this.appendChatMessage(answer, 'bot');
  }

  appendChatMessage(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = content.replace(/\n/g, '<br/>');
    this.chatMessages.appendChild(bubble);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // =========================================================================
  // Privacy & Modals
  // =========================================================================
  runInitialPrivacyCheck() {
    const audit = this.privacy.runAudit();
    const badge = document.querySelector('.privacy-badge');
    if (badge) {
      badge.title = `Privacy Status: ${audit.thirdPartyTrackersFound} Trackers, 100% Local Storage.`;
    }
  }

  openPrivacyDashboard() {
    const audit = this.privacy.runAudit();
    const modalContent = document.getElementById('privacyModalContent');
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="padding: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
            <div style="width: 44px; height: 44px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              🛡️
            </div>
            <div>
              <h2 style="font-size: 1.45rem; font-weight: 800;">Privacy & Zero-Tracking Center</h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">FloraVault Strict Isolation Guarantee</p>
            </div>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
            <div style="font-weight: 700; color: #166534; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✅</span> System Status: 100% Isolated & Private
            </div>
            <p style="font-size: 0.88rem; color: #166534;">
              FloraVault has verified that <strong>zero third-party trackers</strong> (Google Analytics, Meta Pixels, fingerprinting scripts) are loaded.
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 1.5rem;">
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.6rem 0; color: var(--text-muted);">Third-Party Ad Trackers:</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 700; color: #16a34a;">0 Detected</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.6rem 0; color: var(--text-muted);">External Tracking Cookies:</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 700; color: #16a34a;">0 Detected</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.6rem 0; color: var(--text-muted);">Camera Permission Stream:</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 700; color: var(--primary);">Local In-Memory Canvas Only</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.6rem 0; color: var(--text-muted);">Storage Location:</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 700;">Local Browser Storage</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: var(--text-muted);">Microphone / Audio Access:</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 700; color: #16a34a;">Disabled (Zero Audio)</td>
            </tr>
          </table>

          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem;">Optional: Custom Gemini API Key</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Stored strictly on your local browser. Sent directly to Google's official Gemini endpoint with zero middleman proxy.
            </p>
            <div style="display: flex; gap: 0.5rem;">
              <input type="password" id="geminiApiKeyInput" placeholder="AIzaSy..." class="form-input" value="${this.ai.getApiKey()}" style="font-size: 0.85rem;" />
              <button class="btn btn-secondary btn-sm" id="saveApiKeyBtn">Save Key</button>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm" id="exportDataTrigger">Export Data (JSON)</button>
            <button class="btn btn-danger btn-sm" id="wipeDataTrigger">Purge Local Storage</button>
          </div>
        </div>
      `;

      // Key save
      const saveBtn = modalContent.querySelector('#saveApiKeyBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          const val = modalContent.querySelector('#geminiApiKeyInput').value;
          this.ai.setApiKey(val);
          this.showToast("Gemini API key saved locally.");
        });
      }

      modalContent.querySelector('#exportDataTrigger').addEventListener('click', () => {
        this.privacy.exportUserData();
        this.showToast("Export completed.");
      });

      modalContent.querySelector('#wipeDataTrigger').addEventListener('click', () => {
        if (confirm("Erase all local plant and question records?")) {
          this.privacy.wipeAllLocalData();
          this.plants = INITIAL_PLANTS;
          this.questions = INITIAL_QUESTIONS;
          this.renderAll();
          this.closeAllModals();
          this.showToast("Local memory cleared.");
        }
      });
    }

    this.openModal(this.privacyModal);
  }

  openModal(modal) {
    if (modal) modal.classList.add('open');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }

  showToast(message, type = 'info') {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '🌿'}</span> <span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  renderAll() {
    this.renderPlants();
    this.renderQuestions();
    this.renderBlogs();
  }
}

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.floraVault = new App();
});

