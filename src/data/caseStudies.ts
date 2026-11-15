export type CaseMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  website?: string;
  industry: string;
  year: string;
  services: string;
  corePromise: string;
  accent: string;
  heroImage: string;
  heroAlt: string;
  headline: string;
  intro: string;
  tags: string[];
  summary: string;
  problemTitle: string;
  problemIntro: string;
  problems: Array<{ title: string; text: string }>;
  belief: string;
  beliefText: string;
  solutionHeading: string;
  solutions: Array<{ title: string; text: string; details: string[] }>;
  mediaHeading: string;
  mediaIntro: string;
  media: CaseMedia[];
  impactHeading: string;
  impacts: Array<{ label: string; title: string; text: string }>;
  closing: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tablepulse-ai",
    client: "TablePulse AI",
    industry: "Hospitality technology & restaurant automation",
    year: "2026",
    services: "Computer vision · Edge AI · Workflow automation",
    corePromise: "Real-Time Floor Intelligence",
    accent: "#24c8e2",
    heroImage: "/assets/case-studies/tablepulse-ai/phone-launch.webp",
    heroAlt: "TablePulse AI mobile experience in a busy restaurant",
    headline: "Turning restaurant CCTV into a real-time operations brain.",
    intro:
      "A privacy-first computer vision and automation system that sees table state, synchronizes reservations and alerts staff before service delays become guest complaints.",
    tags: ["AI", "Automation", "Hospitality"],
    summary:
      "A computer-vision operations engine turning existing restaurant cameras into live table intelligence, reservation updates and service alerts.",
    problemTitle: "Busy dining rooms were operating with costly blind spots.",
    problemIntro:
      "During peak service, static reservation assumptions, manual floor checks and invisible service delays caused empty-table gaps, slower turns and avoidable guest frustration.",
    problems: [
      {
        title: "Static availability",
        text: "Booking systems used fixed turn times rather than the actual live state of the restaurant floor.",
      },
      {
        title: "Delayed turnover",
        text: "Hosts relied on manual walk-throughs and radio updates to know when tables were ready.",
      },
      {
        title: "Silent service delays",
        text: "Managers had no automatic visibility when seated guests had waited too long without service.",
      },
    ],
    belief: "Turn passive existing infrastructure into active operational intelligence.",
    beliefText:
      "Rather than adding sensors or smart hardware to every table, we connected to existing RTSP camera feeds and transformed ordinary security footage into structured, privacy-safe floor telemetry.",
    solutionHeading: "A live operational loop from camera feed to staff action.",
    solutions: [
      {
        title: "Spatial computer vision",
        text: "Each camera is calibrated with polygonal table regions and a fine-tuned YOLOv8/TensorRT model classifies four operational states every two seconds.",
        details: ["Custom table ROIs", "Four-state classification", "Local edge inference"],
      },
      {
        title: "Reservation synchronization",
        text: "A temporal state machine filters false positives and releases confirmed clean tables directly into reservation and waitlist inventory.",
        details: ["Debounced state changes", "Two-way API sync", "Predictive turn buffers"],
      },
      {
        title: "Five-minute service watchdog",
        text: "An asynchronous SLA timer starts when guests are seated without service and routes targeted alerts to the assigned team member.",
        details: ["Redis TTL timers", "Automatic cancellation", "Watch and POS alerts"],
      },
    ],
    mediaHeading: "Intelligence where the floor team already works.",
    mediaIntro:
      "TablePulse connects live vision telemetry to phones, watches and floor dashboards without changing the physical dining room.",
    media: [
      {
        type: "image",
        src: "/assets/case-studies/tablepulse-ai/phone-launch.webp",
        alt: "TablePulse AI launch screen on a phone",
      },
      {
        type: "image",
        src: "/assets/case-studies/tablepulse-ai/watch-alert.webp",
        alt: "TablePulse AI service alert on a smartwatch",
      },
      {
        type: "image",
        src: "/assets/case-studies/tablepulse-ai/mobile-alert.webp",
        alt: "TablePulse AI staff alert on a restaurant phone",
      },
      {
        type: "image",
        src: "/assets/case-studies/tablepulse-ai/vision-map.webp",
        alt: "Computer vision table occupancy zones in a restaurant",
      },
    ],
    impactHeading: "Passive cameras became an active hospitality engine.",
    impacts: [
      {
        label: "18–22% faster",
        title: "Faster table turnover",
        text: "Instant cleared-table detection removed host-stand communication lag during peak service.",
      },
      {
        label: "Zero forgotten tables",
        title: "Service delays caught early",
        text: "Five-minute alerts surfaced neglected tables before frustration became a complaint.",
      },
      {
        label: "No extra hardware",
        title: "Existing infrastructure, new value",
        text: "Restaurants gained full floor telemetry without table sensors, batteries or renovations.",
      },
    ],
    closing: "Ready to turn existing operations into an intelligent, self-running system?",
  },
  {
    slug: "firesale-properties",
    client: "Fire-Sale Properties",
    industry: "PropTech & distressed real estate",
    year: "2024",
    services: "Brand identity · Marketplace UX · Full-stack architecture",
    corePromise: "From Fire Loss to Restored Value",
    accent: "#ef5b3f",
    heroImage: "/assets/case-studies/firesale-properties/brand.webp",
    heroAlt: "Fire-Sale Properties embroidered identity",
    headline: "An end-to-end marketplace for fire-damaged real estate.",
    intro:
      "A trustworthy brand, specialized property marketplace and custom operations engine connecting distressed homeowners, restoration teams and informed buyers.",
    tags: ["Brand", "Web", "PropTech"],
    summary:
      "A complete PropTech marketplace and backend operations engine for property intake, damage assessment, restoration and sale.",
    problemTitle: "A complex property niche was running on fragmented workflows.",
    problemIntro:
      "Fire-damaged real estate requires empathy for homeowners and structured data for investors, yet assessment, restoration and transaction work remained disconnected.",
    problems: [
      {
        title: "Transaction friction",
        text: "Damage estimates, repair scopes, listings and buyer connections depended on scattered manual workflows.",
      },
      {
        title: "Trust gap",
        text: "Homeowners feared predatory buyers while investors lacked structured restoration information.",
      },
      {
        title: "Generic infrastructure",
        text: "Off-the-shelf real estate tools could not model damage severity, repair milestones or multi-role workflows.",
      },
    ],
    belief: "Human empathy on the surface, operational precision underneath.",
    beliefText:
      "The brand needed to reassure people navigating loss, while the platform needed specialized architecture capable of managing every stage from intake to restored-property sale.",
    solutionHeading: "A trusted front door connected to a purpose-built engine.",
    solutions: [
      {
        title: "Identity built around renewal",
        text: "An architectural flame-and-home mark combines decisive action with transformation from fire loss to restored value.",
        details: ["Ember color system", "Authoritative typography", "Trust-first language"],
      },
      {
        title: "Three-sided marketplace UX",
        text: "Dedicated flows support distressed sellers, investors and internal restoration operations without forcing one generic journey.",
        details: ["Seller intake", "Searchable listings", "Damage and ARV data"],
      },
      {
        title: "Custom backend architecture",
        text: "Specialized schemas, a multi-role operations dashboard and automated routing manage the complete damaged-property lifecycle.",
        details: ["Property data models", "Repair milestones", "Automated notifications"],
      },
    ],
    mediaHeading: "The operating model, made visible.",
    mediaIntro:
      "A clear identity leads into a system connecting public journeys, consultants, buyers and a centralized administrative control layer.",
    media: [
      {
        type: "image",
        src: "/assets/case-studies/firesale-properties/brand.webp",
        alt: "Fire-Sale Properties brand mark",
      },
      {
        type: "image",
        src: "/assets/case-studies/firesale-properties/system-diagram.webp",
        alt: "Fire-Sale Properties platform and admin workflow diagram",
      },
    ],
    impactHeading: "A difficult niche became a scalable digital operation.",
    impacts: [
      {
        label: "End-to-end control",
        title: "One property lifecycle",
        text: "A unified backend replaced spreadsheets and manual follow-ups from intake through sale.",
      },
      {
        label: "Higher trust",
        title: "Clarity for both sides",
        text: "Homeowners receive reassurance while investors get structured data for faster decisions.",
      },
      {
        label: "Marketplace scale",
        title: "Infrastructure that can grow",
        text: "The platform supports increasing listings, multi-stage repairs and automated matching.",
      },
    ],
    closing: "Need a custom digital platform—not just a pretty website?",
  },
  {
    slug: "evoca-labs",
    client: "Evoca Labs",
    website: "https://www.evoca-labs.com/",
    industry: "AgeTech, voice-first AI & senior care",
    year: "2025",
    services: "Positioning · Digital experience · Conversion architecture",
    corePromise: "AI-Powered Memory Assistance",
    accent: "#b7d40b",
    heroImage: "/assets/case-studies/evoca-labs/home.webp",
    heroAlt: "Evoca Labs voice-first AI website",
    headline: "Voice-first AI designed around dignity and peace of mind.",
    intro:
      "A warm, high-trust digital experience for an AI companion that supports older adults while keeping their families informed and connected.",
    tags: ["AI", "UX", "Web"],
    summary:
      "Human-centered positioning and a conversion-ready digital flagship for a voice-powered senior-care companion.",
    problemTitle: "One human product needed to earn trust from two audiences.",
    problemIntro:
      "Older adults needed effortless independence while caregivers needed proof of safety, privacy and reliable setup—all without the experience feeling clinical or patronizing.",
    problems: [
      {
        title: "Two audiences",
        text: "The end user and the family decision-maker had very different needs and technical comfort levels.",
      },
      {
        title: "Clinical versus cold",
        text: "Conventional senior-care aesthetics either intimidate users or underestimate their independence.",
      },
      {
        title: "Privacy sensitivity",
        text: "Voice, medication and well-being data required immediate reassurance around consent and dignity.",
      },
    ],
    belief: "Technology for older adults should feel like a trusted companion.",
    beliefText:
      "We led with emotional reassurance, daily independence and family connection—not AI buzzwords—reducing cognitive friction while making safeguards easy to understand.",
    solutionHeading: "A human story, accessible experience and focused path to action.",
    solutions: [
      {
        title: "Empathetic positioning",
        text: "The narrative centers medication recall, appointments, recorded life stories and connected family support in warm, direct language.",
        details: ["Human-first framing", "Dignity-centered copy", "Family reassurance"],
      },
      {
        title: "Dual-audience experience",
        text: "Dedicated product and family pathways separate the core experience from caregiver controls, alerts and privacy concerns.",
        details: ["How It Works journey", "For Families path", "Accessible hierarchy"],
      },
      {
        title: "Early-access conversion",
        text: "Clear waitlist touchpoints and transparent authorization guidance turn interest into qualified invite-only signups.",
        details: ["Low-friction forms", "Privacy transparency", "High-intent conversion"],
      },
    ],
    mediaHeading: "A calm digital home for deeply human technology.",
    mediaIntro:
      "High contrast, generous space and a focused narrative make a sophisticated AI product feel accessible across generations.",
    media: [
      {
        type: "video",
        src: "/assets/case-studies/evoca-labs/stealth-page.mp4",
        poster: "/assets/case-studies/evoca-labs/home.webp",
        alt: "Evoca Labs website in motion",
      },
      {
        type: "image",
        src: "/assets/case-studies/evoca-labs/home.webp",
        alt: "Evoca Labs website homepage",
      },
      {
        type: "image",
        src: "/assets/case-studies/evoca-labs/logo.webp",
        alt: "Evoca Labs logo",
      },
    ],
    impactHeading: "A stronger foundation for adoption and family trust.",
    impacts: [
      {
        label: "Caregiver confidence",
        title: "Complex capability made reassuring",
        text: "Distress analysis, medication recall and SMS alerts became an intuitive value proposition.",
      },
      {
        label: "Qualified growth",
        title: "A focused waitlist journey",
        text: "The experience clearly communicates value and drives high-intent early-access signups.",
      },
      {
        label: "Category position",
        title: "Companion, not medical alarm",
        text: "Evoca is positioned around independence, family legacy and compassionate assistance.",
      },
    ],
    closing: "Building AI that needs to feel useful, safe and unmistakably human?",
  },
  {
    slug: "brick-river-cider",
    client: "Brick River Cider Co.",
    website: "https://www.brickrivercider.com/home",
    industry: "Craft beverage & taproom hospitality",
    year: "2026",
    services: "Packaging design · Product design · Retail presentation",
    corePromise: "Fresh-Pressed St. Louis Craft",
    accent: "#d9a13b",
    heroImage: "/assets/case-studies/brick-river/cider-context.jpg",
    heroAlt: "Contextual craft cider bottles photographed by Deeliver on Unsplash",
    headline: "Shelf-stopping packaging for Missouri craft cider.",
    intro:
      "A scalable packaging and product system designed to translate fresh-pressed authenticity from the St. Louis taproom to crowded retail coolers.",
    tags: ["Brand", "Packaging", "Product"],
    summary:
      "A cohesive packaging and product system balancing St. Louis craft heritage with modern retail shelf impact.",
    problemTitle: "Taproom loyalty had to translate into retail recognition.",
    problemIntro:
      "Brick River already had a regional following, but grocery aisles placed the cider against visually loud beer, seltzer and national-label competition.",
    problems: [
      {
        title: "Shelf competition",
        text: "The package needed to stop shoppers within seconds in dense, highly visual coolers.",
      },
      {
        title: "Craft authenticity",
        text: "Fresh-pressed ingredients, gluten-free purity and St. Louis roots needed immediate visibility.",
      },
      {
        title: "Flavor differentiation",
        text: "Every SKU required personality without losing recognition as part of one family.",
      },
    ],
    belief: "Your packaging is your hardest-working salesperson.",
    beliefText:
      "Before a customer takes a sip, they taste with their eyes. We balanced heritage craft with modern shelf appeal across every physical touchpoint.",
    solutionHeading: "A flexible system built for flavor, production and retail.",
    solutions: [
      {
        title: "Packaging architecture",
        text: "Bold flavor-led treatments distinguish dry, sweet and fruit-forward varieties while preserving instant family recognition.",
        details: ["Distinct SKU system", "Ingredient storytelling", "Unified brand block"],
      },
      {
        title: "Retail cohesion",
        text: "The design extends from individual cans into carriers and cases for a confident, connected cooler presence.",
        details: ["Can hierarchy", "Multipack continuity", "Retail-ready layouts"],
      },
      {
        title: "Production precision",
        text: "Dielines, color profiles and print finishes were designed for condensation, canning and high-volume distribution.",
        details: ["Production dielines", "Reliable color", "Real-world durability"],
      },
    ],
    mediaHeading: "Craft beverage in its real retail context.",
    mediaIntro: "",
    media: [
      {
        type: "image",
        src: "/assets/case-studies/brick-river/cider-context.jpg",
        alt: "Contextual craft cider bottles by Deeliver on Unsplash",
      },
      {
        type: "image",
        src: "/assets/case-studies/brick-river/Bluep.jpg",
        alt: "packaging draft",
      },
      {
        type: "image",
        src: "/assets/case-studies/brick-river/Brick River Packaging 2.jpg",
        alt: "Contextual craft cider bottles by Deeliver on Unsplash",
      },
      {
        type: "image",
        src: "/assets/case-studies/brick-river/Brick River Packaging.jpg",
        alt: "Contextual craft cider bottles by Deeliver on Unsplash",
      },
    ],
    impactHeading: "A packaging foundation ready for wider distribution.",
    impacts: [
      {
        label: "Shelf presence",
        title: "Stronger first-look impact",
        text: "A clearer visual block supports trial and repeat recognition in competitive coolers.",
      },
      {
        label: "SKU scale",
        title: "Faster product expansion",
        text: "The system accommodates seasonal and core releases without diluting brand equity.",
      },
      {
        label: "Brand affinity",
        title: "Taproom character at retail",
        text: "Physical products carry St. Louis craft authenticity into at-home occasions.",
      },
    ],
    closing: "Launching a physical product or refreshing your retail packaging?",
  },
  {
    slug: "qubit-shield",
    client: "Qubit Shield",
    website: "https://QubitShield.io",
    industry: "Cryptographic & post-quantum security",
    year: "2023",
    services: "Brand strategy · Investor deck · Web design",
    corePromise: "QuantumProof By Design",
    accent: "#35d6e5",
    heroImage: "/assets/case-studies/qubit-shield/brand-hero.webp",
    heroAlt: "Qubit Shield identity on a cryptographic network",
    headline: "Translating quantum-resistant security into enterprise trust.",
    intro:
      "Brand strategy, visual identity, investor storytelling and a digital flagship for a post-quantum security company.",
    tags: ["Brand", "UX", "Web"],
    summary:
      "Turning advanced post-quantum cryptography into an enterprise-ready brand, investor story and digital flagship.",
    problemTitle: "Deep technical capability. Too much commercial friction.",
    problemIntro:
      "Qubit Shield had advanced cryptographic solutions, but its market presence had not caught up with its engineering.",
    problems: [
      {
        title: "Abstract value",
        text: "Quantum-resistant encryption created friction with non-technical buyers and investors.",
      },
      {
        title: "Fragmented presence",
        text: "The brand lacked the institutional authority expected from an enterprise security provider.",
      },
      {
        title: "Pitch friction",
        text: "Dense technical language obscured urgency, defensibility and business value.",
      },
    ],
    belief: "Complexity is an engineering triumph, but clarity is a commercial necessity.",
    beliefText:
      "Cybersecurity buyers purchase certainty, resilience and peace of mind. We visualized the invisible without diluting the rigor.",
    solutionHeading: "One system. Three connected expressions.",
    solutions: [
      {
        title: "Logo & visual identity",
        text: "A geometric network sphere combines nodes, structural vectors and cryptographic pathways.",
        details: ["QuantumProof By Design", "Cyan-to-azure system", "Enterprise toolkit"],
      },
      {
        title: "Investor narrative",
        text: "A technical whitepaper became a high-conviction story about urgency, defensibility and opportunity.",
        details: ["Clear narrative arc", "Visual data", "Go-to-market milestones"],
      },
      {
        title: "Digital flagship",
        text: "A dark-mode website serves technical evaluators and executive decision-makers.",
        details: ["Dual-track journey", "Trust signals", "Demo conversion"],
      },
    ],
    mediaHeading: "From strategic idea to a living identity.",
    mediaIntro:
      "The network language scales into motion, investor storytelling and the digital experience.",
    media: [
      {
        type: "video",
        src: "/assets/case-studies/qubit-shield/process.mp4",
        poster: "/assets/case-studies/qubit-shield/brand-contact.webp",
        alt: "Qubit Shield identity process",
      },
      {
        type: "image",
        src: "/assets/case-studies/qubit-shield/brand-hero.webp",
        alt: "Qubit Shield digital flagship identity",
      },
      {
        type: "image",
        src: "/assets/case-studies/qubit-shield/brand-contact.webp",
        alt: "Qubit Shield contact and social layout",
      },
    ],
    impactHeading: "From technical experiment to security authority.",
    impacts: [
      {
        label: "Investor ready",
        title: "Sharper fundraising conversations",
        text: "Institutional-grade materials elevated credibility with investors and strategic partners.",
      },
      {
        label: "Clearer adoption",
        title: "Less explaining, more deployment",
        text: "Sales conversations shifted toward integration and enterprise adoption.",
      },
      {
        label: "One architecture",
        title: "A brand designed to scale",
        text: "One coherent system connects digital, pitch and product touchpoints.",
      },
    ],
    closing: "Have a complex innovation that needs a clearer market story?",
  },
];

const portfolioOrder = [
  "tablepulse-ai",
  "brick-river-cider",
  "evoca-labs",
  "firesale-properties",
  "qubit-shield",
];

export const portfolioProjects = portfolioOrder.map((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) {
    throw new Error(`Missing case study for portfolio order: ${slug}`);
  }

  return {
    slug: study.slug,
    href: `/portfolio/${study.slug}`,
    title: study.client,
    sector: study.industry,
    year: study.year,
    image: study.heroImage,
    tone: study.accent,
    tags: study.tags,
    summary: study.summary,
  };
});

export const allCaseMedia = caseStudies.flatMap((study) =>
  study.media.map((media) => ({ ...media, client: study.client })),
);
