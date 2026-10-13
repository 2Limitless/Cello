export interface GalleryImage {
  src: string;
  name: string;
  category: 'instruments' | 'bows-cases' | 'workshop-bench' | 'legacy-store';
  description: string;
}

export const ATELIER_GALLERY: GalleryImage[] = [
  // --- INSTRUMENTS ---
  {
    src: "/atelier/violin_moretti_front.jpg",
    name: "Guarneri Tribute Violin (Front)",
    category: "instruments",
    description: "Deeply flamed Bosnian maple & antiqued Italian amber varnish"
  },
  {
    src: "/atelier/violin_moretti_back.jpg",
    name: "Guarneri Tribute Violin (Back)",
    category: "instruments",
    description: "Spectacular one-piece flamed maple back plate"
  },
  {
    src: "/atelier/violin_sch_flamed.jpg",
    name: "Master Workshop Soloist Violin",
    category: "instruments",
    description: "Graduated alpine spruce plate with luminous golden varnish"
  },
  {
    src: "/atelier/violin_deluca.png",
    name: "Pietro DeLuca Master Pattern",
    category: "instruments",
    description: "Hand-applied Cremonese oil varnish with warm acoustic depth"
  },
  {
    src: "/atelier/violin_sheng_front.jpg",
    name: "Concertmaster Master Violin",
    category: "instruments",
    description: "Acoustically tuned soundholes with carved boxwood fittings"
  },
  {
    src: "/atelier/violin_kreisler_cs2000.jpg",
    name: "Kreisler Model Bench Violin",
    category: "instruments",
    description: "Broad resonant bouts and French cut Aubert bridge"
  },
  {
    src: "/atelier/violin_vuillaume_back.png",
    name: "Vuillaume Parisian Model (Back)",
    category: "instruments",
    description: "Intricately tiger-striped maple back with golden-amber varnish"
  },
  {
    src: "/atelier/violin_vuillaume_scroll.png",
    name: "Vuillaume Carved Scroll",
    category: "instruments",
    description: "Hand-carved pegbox scroll with crisp blackened bevels"
  },
  {
    src: "/atelier/cello_hof_8.png",
    name: "Lane & Edwards Maestro Cello",
    category: "instruments",
    description: "Full size master cello with Belgian carved maple bridge"
  },
  {
    src: "/atelier/cello_montagnana_cs4900.png",
    name: "Domenico Montagnana Soloist Cello",
    category: "instruments",
    description: "Broad lower bouts delivering thunderous C-string projection"
  },
  {
    src: "/atelier/cello_strad_cs10000.png",
    name: "Stradivari Forma B Master Cello",
    category: "instruments",
    description: "Slim neck geometry for effortless left-hand thumb position"
  },
  {
    src: "/atelier/viola_aubert_lutherie.png",
    name: "Matteo Goffriller Model 16\" Viola",
    category: "instruments",
    description: "Broad Venetian template yielding rich, chocolate viola resonance"
  },
  {
    src: "/atelier/viola_ming.jpg",
    name: "Atelier Chamber Viola",
    category: "instruments",
    description: "Graduated mountain maple with pure velvet string response"
  },
  {
    src: "/atelier/bass_cs7400b.png",
    name: "Concert Orchestral Double Bass",
    category: "instruments",
    description: "Hand-carved gamba corners and ebony fingerboard"
  },

  // --- BOWS & CASES ---
  {
    src: "/atelier/bow_brazilwood_130.png",
    name: "Student Select Brazilwood Bow",
    category: "bows-cases",
    description: "Fully lined ebony frog with Parisian eye and nickel winding"
  },
  {
    src: "/atelier/bow_cello_masterartisan.jpg",
    name: "Master Cello Pernambuco Bow",
    category: "bows-cases",
    description: "Select 30-year seasoned pernambuco balanced for orchestral bite"
  },
  {
    src: "/atelier/bow_violin_masterartisan.jpg",
    name: "Master Soloist Violin Bow",
    category: "bows-cases",
    description: "Silver-mounted pernambuco frog with Siberian stallion hair"
  },
  {
    src: "/atelier/bow_manoel_francisco.jpg",
    name: "Manoel Francisco Master Bow",
    category: "bows-cases",
    description: "Hand-signed artisan pernambuco with gold-wrapped grip"
  },
  {
    src: "/atelier/bow_juliano_oliveira.jpg",
    name: "Juliano Oliveira Pernambuco Bow",
    category: "bows-cases",
    description: "Responsive camber calibrated for lightning spiccato"
  },
  {
    src: "/atelier/bow_camilo_herculano.jpg",
    name: "Camilo Herculano Fine Bow",
    category: "bows-cases",
    description: "Artisan-carved ivory/mammoth tip and French balance point"
  },
  {
    src: "/atelier/case_cc430_luxury_green.png",
    name: "Heritage Emerald Velvet Case",
    category: "bows-cases",
    description: "Bespoke full-suspension oblong violin case with hygrometer"
  },
  {
    src: "/atelier/case_cc540_blue.png",
    name: "Sapphire Silk Velvet Travel Case",
    category: "bows-cases",
    description: "Aero-shell composite with plush deep blue interior"
  },
  {
    src: "/atelier/case_cc398_black.png",
    name: "Obsidian Professional Dart Case",
    category: "bows-cases",
    description: "Streamlined lightweight carbon weave case"
  },
  {
    src: "/atelier/case_cc815_deluxe.png",
    name: "Master Luthier Double Violin Case",
    category: "bows-cases",
    description: "Concert double violin case with brass locks"
  },
  {
    src: "/atelier/case_cello_cc4100.png",
    name: "Carbon Flight Cello Case",
    category: "bows-cases",
    description: "Ultralight carbon composite shell with wheel suspension"
  },

  // --- WORKSHOP & BENCH ---
  {
    src: "/atelier/matt_luthier_bench.jpg",
    name: "Matthew Lane at Luthier Bench",
    category: "workshop-bench",
    description: "Hand-fitting a soundpost and bridge under natural skylight"
  },
  {
    src: "/atelier/matt_repair_work.jpg",
    name: "Plate Graduation & Tuning",
    category: "workshop-bench",
    description: "Micro finger planes carving spruce belly to 0.1mm tolerance"
  },
  {
    src: "/atelier/workshop_bench_tools.jpg",
    name: "Traditional Luthier Hand Tools",
    category: "workshop-bench",
    description: "French chisels, brass finger planes, and hand-carved bridges"
  },
  {
    src: "/atelier/instrument_repair_clamps.jpg",
    name: "Restoration Clamping Rig",
    category: "workshop-bench",
    description: "Solid brass violin rib and plate restoration clamps"
  },
  {
    src: "/atelier/shop_bench_detail.jpg",
    name: "Workbench Tonewood Detail",
    category: "workshop-bench",
    description: "Seasoned tonewood shavings and purfling knives"
  },
  {
    src: "/atelier/shop_bows_display.jpg",
    name: "Bow Rehair & Testing Gallery",
    category: "workshop-bench",
    description: "Select Mongolian stallion hair and camber inspection"
  },
  {
    src: "/atelier/workshop_interior.jpg",
    name: "Historic Atelier Workshop Interior",
    category: "workshop-bench",
    description: "The fragrance of alpine spruce, oil varnish, and amber resin"
  },

  // --- LEGACY & STOREFRONT ---
  {
    src: "/atelier/matt_and_mark_legacy.jpg",
    name: "Mark Edwards & Matthew Lane (Workshop)",
    category: "legacy-store",
    description: "Two generations of devotion to acoustic truth at the bench"
  },
  {
    src: "/atelier/matt_and_mark_portrait.jpg",
    name: "Mark Edwards (1952-2026) & Matthew Lane",
    category: "legacy-store",
    description: "Mentorship forged over twenty years of shoulder-to-shoulder craftsmanship"
  },
  {
    src: "/atelier/storefront_wallace.png",
    name: "315 Wallace Ave Atelier Storefront",
    category: "legacy-store",
    description: "Historic St. Matthews workshop home in Louisville, Kentucky"
  },
  {
    src: "/atelier/antique_maker_signature.jpg",
    name: "Hand-Inscribed Atelier Signature Label",
    category: "legacy-store",
    description: "Authenticity label inscribed and numbered by the master luthier"
  },
  {
    src: "/atelier/instruction_pedagogy.jpg",
    name: "Pedagogy Studio & Masterclasses",
    category: "legacy-store",
    description: "Suzuki and conservatory audition coaching"
  }
];
