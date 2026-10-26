import { Product, PRODUCTS } from './products';

export interface BentoCardItem {
  id: string;
  category: 'Instruments & Sales' | 'Luthier Services' | 'The Workshop';
  title: string;
  subtitle: string;
  iconName: string;
  image: string;
  colSpan: string;
  rowSpan: string;
  description: string;
  action1: string;
  action2: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  signature: string;
  role: string;
  credential: string;
  tag: string;
  year: string;
}

export interface StoryContent {
  volumeTag: string;
  headline: string;
  subtitle: string;
  benchBadge: string;
  benchSubtext: string;
  benchImage: string;
  benchTitle: string;
  benchSubtitle: string;
  benchPill: string;
  paragraphs: string[];
  tenet1: {
    title: string;
    text: string;
  };
  tenet2: {
    title: string;
    text: string;
  };
  tenet3: {
    title: string;
    text: string;
    image: string;
    caption: string;
  };
  masterQuote: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface WorkshopDetails {
  shopName: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  address: string;
  cityState: string;
  hours: string;
  vagaroUrl: string;
  email: string;
}

export interface SiteContent {
  announcementBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  bentoItems: BentoCardItem[];
  testimonials: TestimonialItem[];
  story: StoryContent;
  workshop: WorkshopDetails;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  announcementBadge: "Fine Violins, Violas, Cellos, and Basses · Since 2016",
  heroTitle: "Lane & Edwards Violins",
  heroSubtitle: "Fine string instruments, expert setups, and restorations in our historic Jeffersontown home.",
  
  bentoItems: [
    {
      id: "purchase",
      category: "Instruments & Sales",
      title: "Fine Instruments",
      subtitle: "Violins, Violas, Cellos & Basses",
      iconName: "Music",
      image: "/atelier/violin_sch_flamed.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-2",
      description: "Discover fine violins, violas, cellos, and basses. Every instrument at our shop is personally inspected, acoustic-tested, and adjusted by hand by Matthew Lane for rich, effortless projection. We are always happy to answer your questions and help you compare options with candid, charitable guidance.",
      action1: "Acoustic Trials",
      action2: "Speak to Matt"
    },
    {
      id: "accessories",
      category: "Instruments & Sales",
      title: "Strings & Cases",
      subtitle: "Concert Protection & Care",
      iconName: "ShoppingBag",
      image: "/atelier/case_cc430_luxury_green.png",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Protect and optimize your voice. Hand-selected luxury suspension cases, Pirastro, Larsen, and Thomastik-Infeld strings, and bespoke carved tonewood fittings.",
      action1: "Browse Supplies",
      action2: "Care & Fittings"
    },
    {
      id: "rental",
      category: "Instruments & Sales",
      title: "Student Rentals",
      subtitle: "The 100% Equity Program",
      iconName: "GraduationCap",
      image: "/atelier/workshop_bench_tools.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Quality instruments foster student success. Area string students receive genuine, shop-adjusted tonewood instruments with setups done in-house. 100% of first-year rental equity applies toward owning an instrument.",
      action1: "Rental Details",
      action2: "School Sizing"
    },
    {
      id: "guarantee",
      category: "Instruments & Sales",
      title: "The Craftsman's Guarantee",
      subtitle: "100% Equity Trade-In",
      iconName: "ShieldCheck",
      image: "/atelier/antique_maker_signature.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "We believe in long-term relationships with musicians and families. 100% of your investment follows you when you step up to your next fine violin, viola, cello, or bass.",
      action1: "Our Guarantee",
      action2: "Trade-In Policy"
    },
    {
      id: "repair",
      category: "Luthier Services",
      title: "Restoration & Repair",
      subtitle: "Matthew Lane · Owner & Luthier",
      iconName: "Wrench",
      image: "/atelier/matt_luthier_bench.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Complete restoration, precision soundpost adjustment, bridge cutting, and acoustic bench setup executed directly by Matthew Lane at our Jeffersontown workbench.",
      action1: "Schedule Consult",
      action2: "Bench Services"
    },
    {
      id: "rehair",
      category: "Luthier Services",
      title: "Bow Care & Rehairs",
      subtitle: "Select Hair & Balance",
      iconName: "PenTool",
      image: "/atelier/shop_bows_display.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Precision bow rehairs using select unbleached Mongolian stallion hair. Hand-tied, individually combed, and balanced for immediate bite and acoustic clarity. (We do repairs and rehairs on bows in-store.)",
      action1: "Drop-off Info",
      action2: "Hair Selection"
    },
    {
      id: "instruction",
      category: "Luthier Services",
      title: "Private Instruction",
      subtitle: "Educators & Studios",
      iconName: "BookOpen",
      image: "/atelier/instruction_pedagogy.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Connect with Louisville's foremost pedagogues, concertmasters, and Suzuki specialists. Mentoring young artists from their first posture to youth orchestra auditions and conservatory stages.",
      action1: "Meet the Faculty",
      action2: "Rates & Schedules"
    },
    {
      id: "legacy",
      category: "The Workshop",
      title: "Our Story",
      subtitle: "Historic Jeffersontown Heritage",
      iconName: "History",
      image: "/atelier/matt_and_mark_legacy.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Founded under its current name in 2016, Lane & Edwards Violins carries forward a heritage of craftsmanship rooted in personalized service. Today, Matthew Lane welcomes musicians to our historic home at 3606 College Drive.",
      action1: "Read Our Story",
      action2: "Meet Matthew Lane"
    },
    {
      id: "contact",
      category: "The Workshop",
      title: "Visit Us",
      subtitle: "Historic Jeffersontown · 3606 College Dr",
      iconName: "MapPin",
      image: "/atelier/historic_jeffersontown_storefront.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Located at 3606 College Dr, Jeffersontown, KY 40299 in a historic home listed on the National Register of Historic Places. Step into an unhurried, warm setting to audition instruments or consult directly with Matthew Lane.",
      action1: "Book on Vagaro",
      action2: "Call Matt"
    }
  ],

  testimonials: [
    {
      quote: "The only luthier in the region I trust with my fine cello. Matthew's bridge calibration unlocked acoustic richness and projection that fills Whitney Hall effortlessly.",
      author: "Elena Rostova",
      signature: "Elena Rostova",
      role: "Principal Cellist, Louisville Orchestra",
      credential: "Verified Patron · Cello Calibration",
      tag: "Principal Soloist",
      year: "Patron Since 2018"
    },
    {
      quote: "They found a radiant voice in the tonewood I never knew existed. After Lane & Edwards dressed the fingerboard and cut a French bridge, tonal response increased tenfold.",
      author: "Marcus Chen",
      signature: "Marcus Chen",
      role: "Concertmaster & International Soloist",
      credential: "Verified Patron · Master Violin Setup",
      tag: "Concertmaster",
      year: "Patron Since 2016"
    },
    {
      quote: "Every serious cello and violin student in my studio acquires their instrument through Lane & Edwards. Their 100% equity trade-in policy gives families complete peace of mind.",
      author: "Prof. Edward Lin",
      signature: "Edward Lin",
      role: "String Department Chair, Conservatory",
      credential: "Verified Educator · Juilliard & Eastman Repertoire",
      tag: "Conservatory Chair",
      year: "Patron Since 2016"
    },
    {
      quote: "I shipped my French viola across the country specifically for Matthew to carve a custom soundpost. The balance across the C and A strings is now pure velvet.",
      author: "Sarah Jenkins",
      signature: "Sarah Jenkins",
      role: "Grammy-Nominated Chamber Musician",
      credential: "Verified Patron · Soundpost Optimization",
      tag: "Chamber Soloist",
      year: "Patron Since 2021"
    },
    {
      quote: "Simply unmatched craftsmanship, integrity, and warmth. Their historic Jeffersontown location has wonderful acoustic character and true old-world charm. A treasure for Kentucky.",
      author: "David Alessi",
      signature: "David Alessi",
      role: "Juilliard Alumnus & Principal Violist",
      credential: "Verified Patron · Pernambuco Bow Service",
      tag: "Recording Artist",
      year: "Patron Since 2016"
    }
  ],

  story: {
    volumeTag: "Our Heritage & Ethos",
    headline: "Devotion to Craft & Sound",
    subtitle: "In our historic Jeffersontown home, every instrument receives personal care, acoustic adjustment, and the time-honored attention that string musicians deserve.",
    benchBadge: "Jeffersontown Workshop",
    benchSubtext: "3606 College Dr · Since 2016",
    benchImage: "/atelier/matt_repair_work.jpg",
    benchTitle: "Matthew Lane at the Bench",
    benchSubtitle: "Hand-graduating plate thickness and cutting bespoke bridges",
    benchPill: "Owner & Luthier",
    paragraphs: [
      "Lane & Edwards Violins was established under its current name in 2016, carrying forward a rich heritage of fine instrument care and repair originally begun decades earlier by mentor Mark Edwards (1952–2026).",
      "Matthew Lane first stepped into Mark's workshop as a young student receiving his first rental violin in 1988. Over two decades of dedicated benchwork, Matt mastered the precise hand-carving, acoustic plate graduation, and meticulous setup disciplines of Cremonese and French traditions.",
      "Today, Lane & Edwards Violins welcomes musicians to our historic home at 3606 College Drive in Jeffersontown—a landmark residence listed on the National Register of Historic Places. Surrounded by 19th-century architectural charm and mature trees, Matthew provides warm, friendly service and candid, charitable advice to every musician who walks through the door."
    ],
    tenet1: {
      title: "Dedicated Hand Craftsmanship",
      text: "Every bridge is individually carved to match the exact arch of your instrument, every soundpost is positioned with acoustic precision, and top plates are calibrated by hand so the wood vibrates with fullness and warmth."
    },
    tenet2: {
      title: "The 100% Equity Promise",
      text: "We partner with families and musicians for the long term. 100% of your first-year rental equity and 100% of your instrument trade-in value transfers directly toward future fine instruments, protecting your investment as you advance."
    },
    tenet3: {
      title: "Friendly, Charitable Guidance",
      text: "We take pride in warm, approachable service. Customers are always welcome to ask questions about instruments and options they are considering. We candidly and charitably explain setup differences, materials, and acoustic qualities so you can choose with complete confidence.",
      image: "/atelier/historic_jeffersontown_storefront.jpg",
      caption: "3606 College Dr · National Register of Historic Places"
    },
    masterQuote: {
      quote: "A violin, viola, cello, or bass is more than wood and strings—it is a companion and a personal voice. Our mission is to listen to the musician and honor the instrument with honest, patient care.",
      author: "Matthew Lane",
      role: "Owner & Luthier · Lane & Edwards Violins"
    }
  },

  workshop: {
    shopName: "Lane & Edwards Violins",
    tagline: "Fine Violins, Violas, Cellos, and Basses - Since 2016",
    phone: "5026905908",
    phoneFormatted: "(502) 690-5908",
    address: "3606 College Dr, Jeffersontown, KY 40299",
    cityState: "Jeffersontown, KY",
    hours: "Tuesday – Saturday: 10:00 AM – 5:30 PM · Sunday – Monday: Closed",
    vagaroUrl: "https://www.vagaro.com/laneandedwardsviolins",
    email: "info@laneandedwardsviolins.com"
  }
};
