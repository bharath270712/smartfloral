/**
 * FloraVault - Core Plant, Nursery, Blog & Q&A Database
 * Privacy Guarantee: 100% Local data, zero 3rd-party trackers.
 */

export const INITIAL_PLANTS = [
  {
    id: "plant-1",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "Indoor",
    nursery: {
      name: "Verdant Canopy Nursery",
      location: "Green Valley, Block 4",
      contact: "verdantcanopy@plants.local",
      price: "$28.00"
    },
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    description: "Known as the Swiss Cheese Plant, Monstera is famous for its dramatic fenestrated foliage. It thrives indoors with moderate indirect sunlight.",
    care: {
      sunlight: "Bright Indirect Light",
      watering: "Every 1-2 weeks; allow top 2 inches of soil to dry out",
      soil: "Well-draining, peat-based potting mix with perlite and orchid bark",
      temperature: "18°C - 30°C (65°F - 85°F)",
      humidity: "60% - 80% (Enjoys misting or pebble trays)",
      fertilizer: "Balanced liquid fertilizer once a month during spring and summer"
    },
    uses: [
      "Interior aesthetic focal point with tropical vibe",
      "Air improvement and natural indoor humidity balancer",
      "Feng Shui: attracts positive energy and growth in living spaces"
    ],
    toxicity: {
      isDangerous: true,
      severity: "Moderate",
      riskGroups: ["Cats", "Dogs", "Toddlers / Young Children"],
      compounds: "Insoluble Calcium Oxalate Crystals (Raphides)",
      symptoms: "Intense burning sensation in mouth, tongue and lips; excessive drooling; difficulty swallowing; vomiting.",
      precautions: "Keep placed on elevated plant stands or hanging pots away from playful pets and children. Wear gardening gloves when trimming sap."
    },
    tags: ["Tropical", "Foliage", "Air Purifier", "Toxic to Pets"],
    dateAdded: "2026-10-15"
  },
  {
    id: "plant-2",
    name: "Snake Plant (Sansevieria)",
    scientificName: "Dracaena trifasciata",
    category: "Indoor",
    nursery: {
      name: "Heritage Botanical Greens",
      location: "Westside Market, Shop 12",
      contact: "heritagegreens@botanical.local",
      price: "$18.50"
    },
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
    description: "Nearly indestructible, the Snake Plant features architectural sword-like leaves with yellow-green borders. Excellent for beginners and bedrooms.",
    care: {
      sunlight: "Low to Bright Indirect Light (Very tolerant)",
      watering: "Every 2-3 weeks; let soil dry completely between waterings",
      soil: "Free-draining succulent or cactus mix with coarse sand",
      temperature: "15°C - 29°C (60°F - 85°F)",
      humidity: "Tolerates low indoor humidity (30% - 50%)",
      fertilizer: "Mild houseplant fertilizer once in spring"
    },
    uses: [
      "NASA Clean Air certified: absorbs benzene, formaldehyde, and xylene",
      "Nighttime oxygen producer (CAM metabolism), ideal for bedrooms",
      "Drought-resistant architectural decor"
    ],
    toxicity: {
      isDangerous: true,
      severity: "Mild to Moderate",
      riskGroups: ["Cats", "Dogs"],
      compounds: "Saponins",
      symptoms: "Nausea, vomiting, diarrhea, lethargy, hypersalivation if chewed.",
      precautions: "Place out of reach of curious pets who like to chew long fibrous leaves."
    },
    tags: ["Air Purifier", "Drought Tolerant", "Low Light", "Toxic to Pets"],
    dateAdded: "2026-10-18"
  },
  {
    id: "plant-3",
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    category: "Indoor",
    nursery: {
      name: "Sunny Sprout Gardens",
      location: "Northside Eco Hub, Bay 2",
      contact: "sunnysprout@eco.local",
      price: "$14.00"
    },
    image: "https://images.unsplash.com/photo-1572688484437-31820e39ec14?auto=format&fit=crop&w=800&q=80",
    description: "A joyful, cascading houseplant producing arching green leaves with white stripes and delicate 'spiderettes' (offsets) that dangle like chandeliers.",
    care: {
      sunlight: "Medium to Bright Indirect Sunlight",
      watering: "Once a week; keep soil lightly moist but never soggy",
      soil: "Standard organic potting soil with perlite",
      temperature: "13°C - 27°C (55°F - 80°F)",
      humidity: "Moderate indoor humidity (40% - 60%)",
      fertilizer: "Organic compost tea or diluted liquid feed twice during spring"
    },
    uses: [
      "100% Non-Toxic and Pet Safe (ASPCA verified)",
      "Exceptional air purifier filtering carbon monoxide and formaldehyde",
      "Superb hanging basket plant; fast and easy plantlet propagation"
    ],
    toxicity: {
      isDangerous: false,
      severity: "Non-Toxic / Completely Safe",
      riskGroups: ["None (Safe for Cats, Dogs, and Children)"],
      compounds: "None. Contains mild opium-like compounds to cats (harmless mild curiosity effect similar to catnip).",
      symptoms: "None toxic. Ingestion of excessive plant fiber may rarely cause minor stomach upset.",
      precautions: "No special toxicity precautions required. Safe around households with puppies and toddlers."
    },
    tags: ["Pet Safe", "Air Purifier", "Beginner Friendly", "Hanging Basket"],
    dateAdded: "2026-10-22"
  },
  {
    id: "plant-4",
    name: "Oleander",
    scientificName: "Nerium oleander",
    category: "Outdoor",
    nursery: {
      name: "Mediterranean Flora Estate",
      location: "Highway 10, Farm 7",
      contact: "medflora@nursery.local",
      price: "$22.00"
    },
    image: "https://images.unsplash.com/photo-1596724898380-0a2a4b8df29d?auto=format&fit=crop&w=800&q=80",
    description: "An evergreen subtropical shrub with clusters of fragrant deep pink, red, or white blossoms. Extremely heat-hardy, but EXTREMELY toxic.",
    care: {
      sunlight: "Full Direct Sun (6+ hours daily)",
      watering: "Deep soak every 1-2 weeks; highly drought-resistant once established",
      soil: "Tolerates poor, sandy, alkaline, or clay soils with good drainage",
      temperature: "-5°C - 45°C (Hardy down to 20°F)",
      humidity: "Thrives in dry, arid to semi-humid coastal conditions",
      fertilizer: "Minimal; light general fertilizer in spring"
    },
    uses: [
      "Highway sound buffer and windbreak hedge in warm climates",
      "Drought-resistant landscape flowering shrub",
      "Erosion control on dry sunny slopes"
    ],
    toxicity: {
      isDangerous: true,
      severity: "CRITICAL / DEADLY",
      riskGroups: ["Humans", "Children", "Dogs", "Cats", "Horses", "Livestock"],
      compounds: "Cardiac Glycosides (Oleandrin and Neriine)",
      symptoms: "Severe irregular heartbeat (arrhythmia), hypothermia, slow pulse, abdominal pain, severe vomiting, seizures, coma, and potential fatality within hours if ingested. Burning oleander branches emits toxic smoke that irritates eyes and lungs.",
      precautions: "NEVER plant in yards frequented by small children or pets. Wear heavy duty protective gloves when pruning. NEVER use branches as skewers for food or burn clippings in fires."
    },
    tags: ["Outdoor", "Flowering", "Drought Tolerant", "EXTREMELY TOXIC", "Cardiac Hazard"],
    dateAdded: "2026-10-25"
  },
  {
    id: "plant-5",
    name: "Holy Basil (Tulsi)",
    scientificName: "Ocimum tenuiflorum",
    category: "Medicinal",
    nursery: {
      name: "AyurGreen Herbal Sanctuary",
      location: "East Herbal District, Row 3",
      contact: "ayurgreen@herbs.local",
      price: "$9.50"
    },
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&w=800&q=80",
    description: "Revered in Ayurvedic medicine as the 'Queen of Herbs', Tulsi is a sacred aromatic plant with purplish-green leaves rich in soothing essential oils.",
    care: {
      sunlight: "Full Sun to Bright Morning Sun (4-6 hours direct)",
      watering: "Daily in hot summers; keep soil moist but never waterlogged",
      soil: "Rich, well-aerated organic loamy soil rich in compost",
      temperature: "20°C - 35°C (68°F - 95°F); cannot tolerate frost",
      humidity: "Medium to High humidity (50% - 70%)",
      fertilizer: "Neem cake powder or vermicompost every 3 weeks"
    },
    uses: [
      "Herbal tea infusion to boost immunity and relieve respiratory congestion",
      "Adaptogen: reduces mental stress, cortisol levels, and anxiety",
      "Natural insect repellent: emits eugenol which repels mosquitoes",
      "Culinary seasoning and Ayurvedic remedies"
    ],
    toxicity: {
      isDangerous: false,
      severity: "Non-Toxic / Edible & Safe",
      riskGroups: ["None (Safe for humans and pets)"],
      compounds: "Beneficial phytochemicals (Eugenol, Ursolic acid, Rosmarinic acid).",
      symptoms: "None in normal dietary amounts. Excessive raw leaf chewing may mildly stain teeth due to iron content.",
      precautions: "Safe for regular herbal consumption. Pregnant individuals should consult a physician before consuming large therapeutic doses."
    },
    tags: ["Medicinal", "Ayurvedic", "Pet Safe", "Edible", "Aromatic"],
    dateAdded: "2026-10-28"
  },
  {
    id: "plant-6",
    name: "Dumb Cane (Dieffenbachia)",
    scientificName: "Dieffenbachia seguine",
    category: "Indoor",
    nursery: {
      name: "Verdant Canopy Nursery",
      location: "Green Valley, Block 4",
      contact: "verdantcanopy@plants.local",
      price: "$24.00"
    },
    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=800&q=80",
    description: "Stunning broad variegated leaves splashed with cream and lime green. A popular interior plant, but historically notorious for sap that numbs vocal cords.",
    care: {
      sunlight: "Filtered Bright Indirect Light (Avoid harsh direct sun)",
      watering: "Allow top inch to dry; reduce watering in winter",
      soil: "Aerated peat-perlite potting mix",
      temperature: "18°C - 27°C (65°F - 80°F)",
      humidity: "Prefers high humidity (60%+)",
      fertilizer: "Diluted liquid foliage feed every 4 weeks in warm months"
    },
    uses: [
      "Large architectural statement plant for offices and living rooms",
      "Filters particulate dust and volatile organic airborne compounds",
      "Fast growing lush tropical look"
    ],
    toxicity: {
      isDangerous: true,
      severity: "Severe Irritant",
      riskGroups: ["Children", "Pets (Dogs & Cats)", "Gardener Skin"],
      compounds: "Microscopic needle-like Calcium Oxalate crystals + proteolytic enzymes",
      symptoms: "Immediate intense burning of mouth and throat, severe swelling of lips and vocal cords leading to temporary loss of speech ('dumb' cane effect), airway restriction, corneal irritation if rubbed in eyes.",
      precautions: "Always wear gloves and safety glasses when propagating or wiping leaves. Keep elevated well above child and pet reach."
    },
    tags: ["Foliage", "Indoor", "Toxic to Pets", "Severe Irritant"],
    dateAdded: "2026-11-01"
  },
  {
    id: "plant-7",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    category: "Medicinal",
    nursery: {
      name: "Sunny Sprout Gardens",
      location: "Northside Eco Hub, Bay 2",
      contact: "sunnysprout@eco.local",
      price: "$12.00"
    },
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
    description: "Famous succulent with fleshy serrated leaves filled with cool, soothing gel. Known for millennia as the first-aid burn plant.",
    care: {
      sunlight: "Bright Direct to Indirect Light (South or West facing windows)",
      watering: "Deep water every 3 weeks; soil must dry completely",
      soil: "Cactus & succulent mix with pumice, perlite, and sand",
      temperature: "15°C - 30°C (Avoid freezing temperatures)",
      humidity: "Low humidity; dry air preferred",
      fertilizer: "Rarely needed; 1 light feeding in mid-spring"
    },
    uses: [
      "Topical soothing gel for minor kitchen burns, sunburns, and cuts",
      "Natural skin moisturizer and hair scalp hydration",
      "NASA air purifying qualities"
    ],
    toxicity: {
      isDangerous: true,
      severity: "Mild to Moderate (Dangerous to Pets)",
      riskGroups: ["Dogs", "Cats", "Internal Human Consumption without prep"],
      compounds: "Aloin (yellow sap latex beneath the rind) & Saponins",
      symptoms: "The clear gel is safe for human skin, BUT the yellow latex rind contains aloin: causes abdominal cramping, vomiting, red urine, and severe diarrhea in pets and humans if swallowed in quantity.",
      precautions: "Safe for human topical use. Strip out the yellow bitter latex layer completely if consuming gel. Keep pot out of reach of curious dogs and cats."
    },
    tags: ["Succulent", "Medicinal", "Burn Relief", "Caution with Pets"],
    dateAdded: "2026-11-02"
  },
  {
    id: "plant-8",
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    category: "Indoor",
    nursery: {
      name: "Heritage Botanical Greens",
      location: "Westside Market, Shop 12",
      contact: "heritagegreens@botanical.local",
      price: "$21.00"
    },
    image: "https://images.unsplash.com/photo-1596724816995-1f9518d6a894?auto=format&fit=crop&w=800&q=80",
    description: "Classic Victorian fern with lush arching fronds that spill gracefully. Highly effective natural humidifier and 100% pet-friendly.",
    care: {
      sunlight: "Gentle Morning Light or Dappled Shade (No harsh direct sun)",
      watering: "Keep soil consistently damp; mist fronds frequently",
      soil: "Rich, moisture-retentive peat soil with vermiculite",
      temperature: "16°C - 24°C (60°F - 75°F)",
      humidity: "High humidity required (70%+). Perfect for bathrooms!",
      fertilizer: "Half-strength liquid fern fertilizer every month in spring/summer"
    },
    uses: [
      "Completely pet safe (Non-toxic to cats and dogs)",
      "Outstanding natural humidifier restoring moisture to dry AC rooms",
      "Removes formaldehyde and indoor air toxins"
    ],
    toxicity: {
      isDangerous: false,
      severity: "Non-Toxic / Pet Friendly",
      riskGroups: ["None"],
      compounds: "Non-toxic organic plant matter",
      symptoms: "None. Completely safe if chewed by puppies or kittens.",
      precautions: "No toxicity precautions needed. Safe for family nurseries and pet-filled apartments."
    },
    tags: ["Pet Safe", "High Humidity", "Air Purifier", "Bathroom Plant"],
    dateAdded: "2026-11-03"
  }
];

export const INITIAL_QUESTIONS = [
  {
    id: "q-1",
    author: "Elena Rostova",
    timeAgo: "2 hours ago",
    title: "My Monstera leaves are getting yellow patches with brown crispy tips. Is it overwatering?",
    content: "I bought this Monstera from a local nursery 3 weeks ago. I've been watering it every 4 days. The bottom two leaves are turning pale yellow and the edges are turning brown and crispy. What should I change?",
    plantName: "Monstera Deliciosa",
    tags: ["Monstera", "Yellow Leaves", "Overwatering"],
    answersCount: 3,
    votes: 8,
    isResolved: true,
    answers: [
      {
        id: "ans-1",
        author: "FloraAI Plant Doctor",
        isAi: true,
        verifiedNursery: false,
        timeAgo: "2 hours ago",
        content: "🚨 **Diagnosis:** Classic symptoms of **overwatering with root suffocation**, compounded by low ambient humidity. Watering every 4 days is too frequent for a Monstera indoors!\n\n**Action Steps:**\n1. **Stop watering immediately:** Let the top 2-3 inches of soil dry completely before the next soak.\n2. **Inspect Drainage:** Ensure your pot has drainage holes. Never let the pot sit in standing saucer water.\n3. **Trim damaged leaves:** Sterilize scissors and snip completely yellowed leaves at the base.\n4. **Humidity:** Mist gently or place on a pebble tray with water."
      },
      {
        id: "ans-2",
        author: "Verdant Canopy Nursery (Expert)",
        isAi: false,
        verifiedNursery: true,
        timeAgo: "1 hour ago",
        content: "We agree with FloraAI's assessment! In indoor conditions, Monsteras only need water every 10-14 days. Feel free to bring a leaf sample to our nursery if the new growth shows any black spots."
      }
    ]
  },
  {
    id: "q-2",
    author: "Marcus Vance",
    timeAgo: "5 hours ago",
    title: "⚠️ URGENT: My kitten chewed a Peace Lily leaf! What should I do right now?",
    content: "My 6-month-old kitten chewed on a small piece of our peace lily leaf about 15 minutes ago. She is drooling and pawing at her mouth. Is this fatal like true lilies?",
    plantName: "Peace Lily (Spathiphyllum)",
    tags: ["Emergency", "Toxicity", "Pets", "Cat Safety"],
    answersCount: 2,
    votes: 19,
    isResolved: true,
    answers: [
      {
        id: "ans-1",
        author: "FloraAI Plant Doctor",
        isAi: true,
        verifiedNursery: false,
        timeAgo: "5 hours ago",
        content: "⚠️ **Immediate First-Aid Guidance:**\n\n1. **Peace Lilies are NOT 'true' lilies:** True lilies (Lilium/Hemerocallis) cause acute fatal kidney failure in cats. Peace Lily (*Spathiphyllum*) contains **insoluble calcium oxalate crystals**.\n2. **Symptoms:** It causes intense needle-like mouth irritation, burning, and heavy drooling, which explains why she is pawing her mouth.\n3. **Immediate Action:**\n   - Gently wipe or rinse her mouth with cool water or offer a small lap of lactose-free milk/tuna juice to bind the crystals and ease oral burning.\n   - **Call your local emergency vet or Pet Poison Helpline** to report her weight and ensure no airway swelling occurs.\n   - Monitor for vomiting or respiratory distress."
      }
    ]
  },
  {
    id: "q-3",
    author: "Priya Sharma",
    timeAgo: "1 day ago",
    title: "What are the best medicinal and pet-safe plants to grow on an apartment balcony?",
    content: "I want to start a balcony herb and healing garden. I have two curious golden retrievers, so every plant MUST be 100% pet safe. Which medicinal plants do you recommend?",
    plantName: "Medicinal & Balcony Herbs",
    tags: ["Medicinal", "Pet Safe", "Balcony Garden"],
    answersCount: 1,
    votes: 12,
    isResolved: false,
    answers: [
      {
        id: "ans-1",
        author: "FloraAI Plant Doctor",
        isAi: true,
        verifiedNursery: false,
        timeAgo: "1 day ago",
        content: "Here are the top **100% Pet-Safe & Medicinal Plants** for a sunny balcony:\n\n1. 🌿 **Holy Basil / Tulsi (*Ocimum tenuiflorum*):** Safe for dogs, excellent adaptogen for stress and tea.\n2. 🌸 **Chamomile (*Matricaria recutita*):** Calming, aids digestion, safe in moderation for dogs.\n3. 🍃 **Peppermint / Spearmint (*Mentha spicata*):** Great for digestive teas; keep in pots as it spreads fast.\n4. 🪴 **Rosemary (*Salvia rosmarinus*):** Non-toxic to dogs, rich in antioxidants, excellent culinary and memory booster.\n5. 🌾 **Wheatgrass / Cat Grass:** Pets love to graze on it for gentle digestive fiber!"
      }
    ]
  }
];

export const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "The Double-Edged Leaf: Beautiful Houseplants That Hide Dangerous Health Cons",
    slug: "toxic-houseplants-guide",
    author: "Dr. Evelyn Ward, Botanical Toxicologist",
    date: "November 2, 2026",
    readTime: "6 min read",
    category: "Safety & Toxicity",
    coverImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80",
    summary: "From Dieffenbachia to Oleander, discover the chemical defense mechanisms of popular nursery plants, their health hazards for children and pets, and safe precautions.",
    content: `
### Beauty With A Bite: Why Plants Produce Toxins
Plants cannot run away from herbivores or predators. Over millions of years of evolution, they developed sophisticated chemical defense arsenals. When we invite these lush botanical wonders into our living rooms and nursery gardens, we must understand their biochemical nature.

### 1. Insoluble Calcium Oxalate: The Microscopic Needle
Plants like **Monstera Deliciosa**, **Dieffenbachia (Dumb Cane)**, and **Peace Lilies** contain microscopic needle-shaped crystals called *raphides*.
- **The Mechanism:** When bitten, the plant cell ejects these calcium oxalate spears into oral tissues, accompanied by histamine-releasing enzymes.
- **The Cons:** Immediate intense burning, swelling of the tongue and lips, copious drooling, and difficulty swallowing. In extreme cases with toddlers, it can cause airway constriction.
- **Best Practice:** Always elevate these plants on high plant stands or hanging macrame brackets well out of reach of puppies and toddlers.

### 2. Cardiac Glycosides: The Lethal Beauty of Oleander
**Oleander (*Nerium oleander*)** is a staple in outdoor nurseries for its breathtaking drought-tolerant flowers.
- **The Hazard:** Every part of the plant contains *oleandrin*, a compound that disrupts the sodium-potassium pump in heart cells.
- **The Cons:** Ingesting a single leaf can cause severe cardiac arrhythmia, heart block, hypothermia, and fatality in dogs, cats, or humans.
- **Crucial Warning:** Never roast marshmallows or BBQ using oleander sticks, and never burn dry branches, as the toxic smoke damages lungs.

### 3. Pet-Safe Alternatives That Don't Compromise on Style
If you have playful pets, you don't have to give up greenery! Opt for:
- **Spider Plant (*Chlorophytum comosum*)**
- **Boston Fern (*Nephrolepis exaltata*)**
- **Calathea & Prayer Plants (*Maranta*)**
- **Peperomia varieties**
    `
  },
  {
    id: "blog-2",
    title: "The Living Pharmacy: Top Balcony Medicinal Plants and Their Evidence-Based Uses",
    slug: "medicinal-plants-balcony",
    author: "AyurGreen Research Collective",
    date: "October 29, 2026",
    readTime: "5 min read",
    category: "Medicinal & Wellness",
    coverImage: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80",
    summary: "How to cultivate and prepare Holy Basil, Aloe Vera, and Mint on a standard apartment balcony, with verified health benefits and dosage warnings.",
    content: `
### Transforming Balconies Into Wellness Sanctuaries
You don't need acres of land to grow your own fresh medicinal herbs. Even a 5-foot balcony with 4 hours of sunlight can yield daily health benefits.

### 1. Holy Basil (Tulsi) - The Stress Reliever
- **Active Compounds:** Eugenol, Ursolic acid, Rosmarinic acid.
- **Primary Uses:** Brewing 4-5 fresh leaves in hot water acts as a potent adaptogen, stabilizing cortisol, fighting physical stress, and soothing throat infections.
- **Growing Tip:** Tulsi loves morning sun and warm temperatures. Pinch off flower buds to encourage thick, bushy leaf growth.

### 2. Aloe Vera - The Skin Healer
- **Primary Uses:** The clear inner gel is unmatched for cooling minor kitchen burns, relieving sunburn, reducing redness, and soothing dry skin.
- **Important Safety Con:** The yellow sap (latex) between the green rind and the clear gel contains *aloin*, which is a harsh laxative and toxic to pets. Always fillet the leaf carefully to use only the pure clear gel!

### 3. Peppermint - Digestive Soother
- **Primary Uses:** Infusing leaves in warm water eases IBS, nausea, and post-meal bloating.
- **Growing Tip:** Always grow mint in its own dedicated container; its underground runners will quickly choke out neighboring plants if shared in one planter!
    `
  },
  {
    id: "blog-3",
    title: "The Zero-Tracking Promise: How FloraVault Protects Your Camera and Browsing Privacy",
    slug: "zero-tracking-privacy-whitepaper",
    author: "FloraVault Core Engineering",
    date: "November 5, 2026",
    readTime: "4 min read",
    category: "Privacy & Technology",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    summary: "Why gardening and botany apps don't need tracking cookies, ad networks, or cloud image snooping. Inside our local-first, zero-telemetry architecture.",
    content: `
### Why Plant Apps Are Selling Your Data
Many commercial plant identification apps inject third-party ad SDKs, sell location data, and upload your backyard photos to remote training clouds. At FloraVault, we built a radically different architecture.

### Our 5 Pillars of Botanical Privacy:
1. **Zero Third-Party Trackers:** No Google Analytics, No Meta Pixels, No Fingerprinting, No Ad Brokers.
2. **Local-First Camera Streams:** Your camera feeds directly into an HTML5 `<video>` element on your local device. Snapshots are processed locally on a sandboxed `<canvas>` without passing through ad-tracking servers.
3. **Local Storage Ownership:** All nursery uploads, questions, and bookmarks remain encrypted in your browser's local memory. You can export or delete your data with a single click.
4. **Transparent AI:** When using our AI assistant, prompts are sent strictly to standard endpoints with zero intermediate telemetry or user profiling.
5. **No Invasive Permissions:** FloraVault requests ONLY Internet (for AI/Q&A) and Camera (for live plant inspection). No contacts, no GPS background tracking, no device storage snooping.
    `
  }
];

