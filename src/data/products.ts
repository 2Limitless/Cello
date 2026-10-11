export interface ToneProfile {
  warmth: number; // 0 - 100
  projection: number; // 0 - 100
  brilliance: number; // 0 - 100
  responsiveness: number; // 0 - 100
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'instruments' | 'bows' | 'strings' | 'cases' | 'accessories';
  instrumentType?: 'violin' | 'viola' | 'cello' | 'bass' | 'all';
  price: number;
  image: string;
  badge?: string;
  origin: string;
  maker?: string;
  year?: string;
  tonewood?: string;
  varnish?: string;
  setup?: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  toneProfile?: ToneProfile;
  inStock: boolean;
  trialEligible: boolean;
}

export const PRODUCTS: Product[] = [
  // --- INSTRUMENTS ---
  {
    id: "guarneri-1742-replica",
    name: "Guarneri del Gesù 'Il Cannone' Tribute",
    subtitle: "Master Luthier Workshop Soloist Violin",
    category: "instruments",
    instrumentType: "violin",
    price: 4850,
    image: "/shop_violin.jpg",
    badge: "Soloist Grade",
    origin: "Cremona & Louisville",
    maker: "Lane & Edwards Atelier",
    year: "2025",
    tonewood: "15-Year Aged Bosnian Maple & Val di Fiemme Spruce",
    varnish: "Hand-applied Italian Antiqued Amber Spirit Varnish",
    setup: "Bespoke Aubert Mirecourt Bridge, Pirastro Evah Pirazzi Gold",
    shortDesc: "Monumental projection and dark, velvety core resonance inspired by Paganini's legendary instrument.",
    fullDesc: "Crafted after Guarneri del Gesù's formidable 1742 masterwork, this violin exhibits thick arching, asymmetric soundholes, and deeply flamed Bosnian maple. Acoustically balanced and thicknessed by hand in our Louisville workshop, it offers demanding soloists a thunderous low G and a shimmering, focused upper register that easily carries over full orchestral accompaniment.",
    features: [
      "100% Lifetime Trade-In Credit guaranteed",
      "Hand-graduated top and back plates for optimal resonant nodal lines",
      "Boxwood pegs with Parisian eye and matching Guarneri chinrest",
      "Complete acoustic setup certificate signed by Matthew Lane",
      "Complimentary professional velvet case and humidity sleeve included"
    ],
    toneProfile: {
      warmth: 92,
      projection: 96,
      brilliance: 88,
      responsiveness: 94
    },
    inStock: true,
    trialEligible: true
  },
  {
    id: "lane-edwards-maestro-cello",
    name: "Lane & Edwards 'Maestro' Cello",
    subtitle: "Hand-Graduated Full Size Master Cello",
    category: "instruments",
    instrumentType: "cello",
    price: 6200,
    image: "/shop_cello.jpg",
    badge: "Orchestral Principal",
    origin: "Louisville Workshop",
    maker: "Matthew Lane & Atelier Associates",
    year: "2026",
    tonewood: "Seasoned Alpine Spruce Top, One-Piece Flamed European Maple Back",
    varnish: "Rich Reddish-Amber Oil Varnish with Subdued Patina",
    setup: "Belgian Style Carved Maple Bridge, Larsen Magnacore / Spirocore Tungsten",
    shortDesc: "Enormous acoustic power, sonorous C-string depth, and immediate left-hand tactile response.",
    fullDesc: "Engineered specifically for advancing conservatory students and chamber musicians who require uncompromised tonal authority. The hand-graduated spruce belly yields an earthy, muscular bottom register while maintaining singing clarity into thumb position.",
    features: [
      "Belgian maple bridge carved and voiced to match resonant cellar frequency",
      "Carbon fiber endpin with brass collet for minimal energy loss",
      "Wittner Ultra tailpiece with integrated micro-tuners",
      "Pre-stretched and stabilized Larsen Magnacore strings",
      "7-Day in-home trial available anywhere in North America"
    ],
    toneProfile: {
      warmth: 95,
      projection: 91,
      brilliance: 84,
      responsiveness: 93
    },
    inStock: true,
    trialEligible: true
  },
  {
    id: "goffriller-model-viola",
    name: "Matteo Goffriller Model 16\" Viola",
    subtitle: "Broad Pattern Chamber Viola",
    category: "instruments",
    instrumentType: "viola",
    price: 3400,
    image: "/violin_scroll.jpg",
    badge: "Chamber Master",
    origin: "Venetian Pattern, Finished in Louisville",
    maker: "Lane & Edwards Atelier",
    year: "2025",
    tonewood: "Selected European Mountain Maple & Fine Grain Spruce",
    varnish: "Venetian Golden Brown with Shaded Highlights",
    setup: "Despiau Superieur Bridge, Obligato / Spirocore C String",
    shortDesc: "Rich, dark, chocolate viola timbre with expansive lower bouts for uninhibited air resonance.",
    fullDesc: "Modeled after the wide Venetian templates of Matteo Goffriller. At 16 inches, it offers the acoustic volume of a larger instrument while maintaining comfortable ergonomic playability and neck geometry.",
    features: [
      "Ergonomically thinned neck root for seamless upper-register shifts",
      "Dark, resonant tonal depth without nasal C-string huskiness",
      "Solid ebony fingerboard with custom compound radius",
      "Includes 100% full trade-in policy toward future instruments"
    ],
    toneProfile: {
      warmth: 96,
      projection: 87,
      brilliance: 80,
      responsiveness: 89
    },
    inStock: true,
    trialEligible: true
  },
  {
    id: "louisville-workshop-stepup",
    name: "The Louisville Workshop Violin",
    subtitle: "Advancing Student Step-Up Instrument",
    category: "instruments",
    instrumentType: "violin",
    price: 1450,
    image: "/shop_violin.jpg",
    badge: "Educator Favorite",
    origin: "Louisville Workshop",
    maker: "Lane & Edwards Apprenticeship Guild",
    year: "2026",
    tonewood: "Naturally Dried Carpathian Maple and Spruce",
    varnish: "Golden-chestnut spirit varnish",
    setup: "In-house French Bridge, Thomastik Dominant Pro",
    shortDesc: "Forgiving playability with professional nuance, tone-tested by professional educators.",
    fullDesc: "Designed to remove the mechanical obstacles common in entry instruments. Properly cut nut grooves, perfectly tapered ebony pegs, and an acoustically balanced soundpost allow students to focus purely on expressive technique.",
    features: [
      "Tested and verified by Kentucky and Indiana youth orchestra concertmasters",
      "Ebony fingerboard planed to true luthier tolerances",
      "Wittner synthetic tailpiece with four integrated fine tuners",
      "Backed by our complete guaranteed buy-back equity pledge"
    ],
    toneProfile: {
      warmth: 85,
      projection: 86,
      brilliance: 88,
      responsiveness: 91
    },
    inStock: true,
    trialEligible: true
  },

  // --- BOWS ---
  {
    id: "sartory-tribute-bow",
    name: "Eugene Sartory Tribute Pernambuco Bow",
    subtitle: "Silver-Mounted Soloist Violin Bow",
    category: "bows",
    instrumentType: "violin",
    price: 1850,
    image: "/shop_bow.jpg",
    badge: "Master Selection",
    origin: "Mirecourt Pattern, France",
    maker: "Atelier Bowmakers",
    year: "2025",
    tonewood: "25-Year Cured Pernambuco (Caesalpinia echinata)",
    varnish: "Hand-rubbed French polish",
    setup: "Unbleached Select Mongolian Stallion Hair",
    shortDesc: "Lightning spiccato balance, exceptional camber strength, and rich tactile string grip.",
    fullDesc: "Honoring the celebrated archetype of Eugène Sartory. The octagonal pernambuco stick possesses dense specific gravity and precise elasticity, yielding effortless sautillé and rich, overtone-dense chordal articulation.",
    features: [
      "Solid 925 sterling silver winding and Parisian-eye ebony frog",
      "Authentic mammoth ivory tip substitute with silver faceplate",
      "Weight: 60.5 grams; balance point precisely at 18.9 cm",
      "Hand-tied with premier unbleached Mongolian stallion hair"
    ],
    inStock: true,
    trialEligible: true
  },
  {
    id: "codabow-diamond-gx-cello",
    name: "CodaBow Diamond GX Cello Bow",
    subtitle: "Acoustic-Core Carbon Fiber Performance Bow",
    category: "bows",
    instrumentType: "cello",
    price: 955,
    image: "/shop_bow.jpg",
    badge: "Touring Standard",
    origin: "Winona, Minnesota, USA",
    maker: "CodaBow International",
    year: "2026",
    tonewood: "Acoustic-Core Kevlar & Graphite Fiber Matrix",
    varnish: "Graphite Diamond Weave Finish",
    setup: "Custom Polished Ebony Frog with Gold Coda Emblem",
    shortDesc: "Indestructible road stability with natural organic feel and warm acoustic resonance.",
    fullDesc: "The pinnacle of carbon technology for cellists. Unlike wood, the Diamond GX is immune to humidity swings and travel climate changes while maintaining the dynamic sensitivity and nuance of fine pernambuco.",
    features: [
      "Engineered Kevlar acoustic core matches resonant velocity of pernambuco",
      "Sterling silver fittings and Moroccan goat leather grip",
      "Weight: 80.2 grams with robust tip reinforcement",
      "Lifetime structural warranty from manufacturer"
    ],
    inStock: true,
    trialEligible: true
  },

  // --- STRINGS ---
  {
    id: "dominant-pro-violin",
    name: "Thomastik-Infeld Dominant Pro Set (DP100)",
    subtitle: "The New Benchmark for Concert Violins",
    category: "strings",
    instrumentType: "violin",
    price: 98,
    image: "/shop_accessories.jpg",
    badge: "Best Seller",
    origin: "Vienna, Austria",
    maker: "Thomastik-Infeld",
    shortDesc: "Immediate tonal brilliance, enormous dynamic range, and lightning bow grip under pressure.",
    fullDesc: "A major modern leap forward from legendary standard Dominants. Dominant Pro strings generate a focused, soloist projection with warmer overtones, enhanced resistance to heavy bow pressure, and reduced wolf-tone tendencies.",
    features: [
      "Ball-end removable carbon-steel E string with platinum plating",
      "Synthetic core with chrome and silver wound D and G",
      "Fast break-in period (stabilizes pitch within 3 hours)",
      "Exceptional longevity and resistance to finger perspiration"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "evah-pirazzi-gold-violin",
    name: "Pirastro Evah Pirazzi Gold Violin Set",
    subtitle: "Full Set with Genuine Gold-Coated G String",
    category: "strings",
    instrumentType: "violin",
    price: 142,
    image: "/shop_accessories.jpg",
    badge: "Concert Artist",
    origin: "Offenbach, Germany",
    maker: "Pirastro GmbH",
    shortDesc: "Vibrant soloist power with a warm, golden, round acoustic core and effortless projection.",
    fullDesc: "Beloved by leading recording artists worldwide. The gold-wound G string delivers an intoxicating, velvety warmth that adds deep character to dark Italian and contemporary European instruments.",
    features: [
      "Includes gold-plated high-tension E string with ball/loop end",
      "Gold-wound G creates a remarkably round, creamy tone",
      "Unsurpassed dynamic headroom that never cracks under strong bowing",
      "Impervious to ambient humidity and temperature changes"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "larsen-il-cannone-cello",
    name: "Larsen Il Cannone Cello String Set",
    subtitle: "Direct & Focused Soloist Tension",
    category: "strings",
    instrumentType: "cello",
    price: 310,
    image: "/shop_accessories.jpg",
    badge: "Virtuoso",
    origin: "Als, Denmark",
    maker: "Larsen Strings",
    shortDesc: "Massive acoustic punch, lightning response, and singing vocal quality on the A string.",
    fullDesc: "Inspired by the powerful resonance of Paganini's legendary violin, Larsen engineered Il Cannone for cellos to unlock untapped volume and singing upper frequencies without choking lower string response.",
    features: [
      "Alloy steel A and D strings provide effortless left-hand dexterity",
      "Tungsten wound G and C deliver deep, defined fundamental bass",
      "Virtually zero break-in time; immediate pitch lock",
      "Voiced to resolve sluggish cello response across all registers"
    ],
    inStock: true,
    trialEligible: false
  },

  // --- CASES ---
  {
    id: "bam-hightech-contoured-violin",
    name: "BAM France Hightech 2.0 Contoured Case",
    subtitle: "Ultra-Lightweight Thermal Violin Case",
    category: "cases",
    instrumentType: "violin",
    price: 920,
    image: "/shop_case.jpg",
    badge: "Flight Certified",
    origin: "Normandy, France",
    maker: "BAM France",
    shortDesc: "Weighs only 1.6 kg. Patented 3-ply shock-absorbing shell with hermetic airtight seal.",
    fullDesc: "The undisputed choice of touring soloists. Built with a triple-ply structure (ABS, Airex foam, PETG) that guards fragile tonewoods against severe physical impact and rapid temperature shocks in airplane cabins.",
    features: [
      "Total suspension system on injected high-density foam cushions",
      "Two comfortable neoprene anti-slip backpack straps",
      "Airtight male/female seal prevents humidity swings",
      "Two bow spinners and removable velvet accessory pouch"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "musafia-cremona-luxury-case",
    name: "Musafia Cremona Luxury Master Case",
    subtitle: "Hand-Crafted Italian Hardwood & Velvet Case",
    category: "cases",
    instrumentType: "violin",
    price: 1450,
    image: "/shop_case.jpg",
    badge: "Heirloom Grade",
    origin: "Cremona, Italy",
    maker: "Dimitri Musafia Atelier",
    shortDesc: "Continuous wood laminate monocoque shell lined with emerald crushed Italian velvet.",
    fullDesc: "Handcrafted in Cremona just streets away from Stradivari's historic workshop. Each Musafia case is built like fine acoustic furniture, featuring calibrated hygrometers, vapor bottles, and silk instrument blankets.",
    features: [
      "Continuously laminated poplar wood shell resists over 300 lbs of load",
      "Precision brass hygrometer and distilled water vapor tube",
      "Four rotating bow spinners with silk-ribbon tip protectors",
      "Bespoke embroidered Lane & Edwards atelier serial plaque"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "gewa-air-cello-case",
    name: "GEWA Air 3.9 Carbon Look Cello Case",
    subtitle: "Professional Lightweight Suspension Cello Case",
    category: "cases",
    instrumentType: "cello",
    price: 1180,
    image: "/shop_case.jpg",
    badge: "Touring Grade",
    origin: "Adorf, Germany",
    maker: "GEWA Music",
    shortDesc: "Weighs only 3.9 kg. Specially developed break-resistant thermoplast shell.",
    fullDesc: "Engineered in Germany to deliver extreme shell rigidity without backbreaking weight. The interior features a floating suspension system that protects the bridge and scroll from dangerous inertial shock.",
    features: [
      "Innovative thermoplast shell with ultra-low thermal conduction",
      "Ergonomic leather side and subway handles for easy transit",
      "Combination locks plus safety latch system",
      "Padded backpack harness for effortless subway and airport travel"
    ],
    inStock: true,
    trialEligible: false
  },

  // --- ACCESSORIES & CARE ---
  {
    id: "korfkerrest-model-2-rest",
    name: "Pirastro KorfkerRest Model 2",
    subtitle: "Bendable Featherweight Carbon Fiber Shoulder Rest",
    category: "accessories",
    instrumentType: "violin",
    price: 320,
    image: "/shop_accessories.jpg",
    badge: "Ergonomic Master",
    origin: "Germany",
    maker: "Pirastro / Korfker",
    shortDesc: "Weighs only 32 grams. Can be custom-bent to match your anatomical collarbone curvature.",
    fullDesc: "The first shoulder rest engineered not to dampen instrument resonance. Its ultra-light carbon fiber bar is moldable with bare hands, allowing custom ergonomic fitting while liberating the instrument back to vibrate fully.",
    features: [
      "Malleable carbon fiber technology conforms to individual anatomy",
      "Minimal contact feet preserve back-plate resonance and harmonic overtones",
      "Dissolves collarbone and neck tension during 4+ hour practice sessions",
      "Includes Torx adjustment tool and alternative ergonomic foot pads"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "cecilia-signature-rosin",
    name: "Cecilia 'Signature Formula' Soloist Rosin",
    subtitle: "Handcrafted Liquid-Glass Violin Rosin",
    category: "accessories",
    instrumentType: "violin",
    price: 46,
    image: "/shop_accessories.jpg",
    badge: "Soloist Grade",
    origin: "Seoul & New York",
    maker: "Cremona in America",
    shortDesc: "Crystal articulation, zero powdered dust clouds, and silky smooth string contact.",
    fullDesc: "The choice of international competition winners. Cecilia's signature formulation combines extraordinary initial bow bite with velvety, effortless sustain across all four strings.",
    features: [
      "Zero powdered dust build-up on fine varnish",
      "Works impeccably in both humid summer and dry winter halls",
      "Mounted in an ergonomic silicone dock for clean application",
      "Tested and approved by Lane & Edwards luthiers"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "boveda-humidity-starter-kit",
    name: "Boveda 49% Two-Way Humidity Control Kit",
    subtitle: "Preserves Fragile Tonewoods from Cracking",
    category: "accessories",
    instrumentType: "all",
    price: 28,
    image: "/shop_accessories.jpg",
    badge: "Essential Care",
    origin: "USA",
    maker: "Boveda Inc.",
    shortDesc: "Automatically adds or removes moisture to maintain perfect 49% relative humidity in case.",
    fullDesc: "Dry winter heating splits spruce tops and loosens soundposts. Boveda's patented reverse osmosis membrane automatically releases moisture when dry and absorbs moisture when humid, protecting your investment year-round.",
    features: [
      "Maintains the exact 45-50% RH range recommended by master violin makers",
      "Eliminates messy wet sponges and leaky water tubes",
      "Includes 2 saddle pouches and four 70g 49% Boveda seasoning packs",
      "Lasts 3 to 6 months per pack depending on climate"
    ],
    inStock: true,
    trialEligible: false
  },
  {
    id: "lane-edwards-royal-varnish-polish",
    name: "Lane & Edwards Royal Luthier Varnish Care",
    subtitle: "Traditional Workshop Polish & Microfiber Cloth",
    category: "accessories",
    instrumentType: "all",
    price: 24,
    image: "/shop_accessories.jpg",
    badge: "In-House Formula",
    origin: "Louisville Workshop",
    maker: "Lane & Edwards Heritage",
    shortDesc: "Gentle rosin-dissolving cleaner that feeds oil and spirit varnishes without leaving residue.",
    fullDesc: "Formulated originally by Mark Edwards in 1976. Unlike harsh commercial silicone polishes that permanently contaminate antique spruce, this natural blend gently lifts rosin dust while nourishing historical varnish.",
    features: [
      "100% Silicone-free and petroleum-free; completely safe for fine varnish",
      "Restores depth and luster to aged European tonewoods",
      "Includes ultra-dense plush lint-free microfiber cleaning cloth",
      "Bottled and blended by hand in our Louisville shop"
    ],
    inStock: true,
    trialEligible: false
  }
];
