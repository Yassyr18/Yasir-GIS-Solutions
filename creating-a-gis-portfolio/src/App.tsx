import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  ChevronDown,
  Layers,
  BookOpen,
  Users,
} from "lucide-react";

/* ───────────────────────────── TYPES ───────────────────────────── */

type MapEntry = { id: string; filename: string; caption: string };

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  maps: MapEntry[];
  totalMapCount?: number;
  isSampled?: boolean;
  sampleNote?: string;
  elements?: string[];
};

type ProjectGroup = {
  id: string;
  label: string;
  icon: typeof Layers;
  description: string;
  projects: Project[];
  placeholderTint: string;
  contourColor: string;
};

type ExperienceEntry = {
  years: string;
  role: string;
  place: string;
  detail: string;
};

/* ───────────────────────────── DATA ───────────────────────────── */

const experience: ExperienceEntry[] = [
  {
    years: "2024–2025",
    role: "Consultant",
    place: "Krachi East Municipal Assembly / World Bank GSCSP",
    detail:
      "Led GIS data collection, geodatabase development, and map production for Dambai's first integrated Roads, Walkways & Drainage Master Plan under the World Bank Ghana Secondary Cities Support Programme (GSCSP).",
  },
  {
    years: "2023–2024",
    role: "GIS Analyst",
    place: "Birim Central Municipality",
    detail:
      "Produced various spatial outputs for a 15-year Structure Plan and Disaster Risk Management Plan for Akim Oda.",
  },
  {
    years: "2024",
    role: "GIS Contributor",
    place: "Kwabre East District Assembly, Ashanti Region",
    detail:
      "Mapped disaster-prone communities to support the district's Disaster Risk Management Plan (DRMP).",
  },
  {
    years: "2024",
    role: "Research Assistant",
    place: "KNUST / World Bank KUMAP",
    detail:
      "Contributed field surveys and map production to the World Bank-funded Kumasi Urban Mobility & Accessibility Project (KUMAP), focusing on Bus Rapid Transit (BRT) corridor planning.",
  },
  {
    years: "2023–2024",
    role: "Teaching Assistant",
    place: "KNUST, Department of Planning",
    detail:
      "Collaborated with professors to teach GIS undergraduate courses, providing instructional support to over 250 students. Tutored students on spatial analysis, data visualization, and other GIS concepts, including the use of relevant GIS software. Also supervised GIS lab operations.",
  },
];

const portfolioGroups: ProjectGroup[] = [
  /* ── GROUP 1: MUNICIPAL & PLANNING ── */
  {
    id: "municipal",
    label: "Municipal & Planning",
    icon: Layers,
    description:
      "Official spatial work delivered for municipal assemblies and district planning departments — structure plans, disaster risk maps, and infrastructure master plans.",
    placeholderTint: "from-[#d6ddd2] to-[#c8d1c2]",
    contourColor: "#3d6b4f",
    projects: [
      {
        id: "akim-oda",
        title: "Akim Oda Structure Plan & Disaster Risk Management Plan",
        subtitle: "Birim Central Municipal Assembly | 2023–2024",
        description:
          "Produced various spatial outputs for a 15-year Structure Plan (2024–2039) and Disaster Risk Management Plan for Akim Oda, a fast-growing municipal capital. Maps provided spatial policy direction on land use, transportation, infrastructure, natural hazards, and environmental protection.",
        maps: [
          { id: "a1", filename: "Akim Oda Contextual.jpg", caption: "Akim Oda in its municipal, regional, and national context" },
          { id: "a2", filename: "Base Map of Akim Oda (2024) conv 1.png", caption: "Comprehensive snapshot of existing land use, road networks, public facilities, and natural features" },
          { id: "a3", filename: "Problem man.jpg", caption: "Problem map identifying key spatial planning challenges" },
          { id: "a4", filename: "Residential Density.png", caption: "Residential housing density distribution across Akim Oda" },
          { id: "a5", filename: "Scenario One.jpg", caption: "Development Scenario One — growth option modelling" },
          { id: "a6", filename: "Scenario Two.jpg", caption: "Development Scenario Two — alternative growth pattern" },
          { id: "a7", filename: "Scenario Three.jpg", caption: "Development Scenario Three — alternative growth pattern" },
          { id: "a8", filename: "Structure Plan (2024 - 2039).jpg", caption: "Final adopted Structure Plan consolidating the strongest elements of all three scenarios" },
          { id: "a9", filename: "Flood Prone Areas in Akim Oda Image.jpg", caption: "Flood-prone areas across Akim Oda" },
          { id: "a10", filename: "Flood Prone Areas in Gyadem, Akim oda Image.jpg", caption: "Flood-prone areas in Gyadem, Akim Oda" },
        ],
      },
      {
        id: "kwabre-east",
        title: "Kwabre East District Disaster Risk Management Plan",
        subtitle: "Kwabre East District Assembly, Ashanti Region | 2024",
        description:
          "Appointed as the sole GIS expert on this project. Produced all relevant maps for the comprehensive Disaster Risk Management Plan, indicating disaster-prone areas in various communities with on-site photographs.",
        maps: [
          { id: "k1", filename: "Adwumam Kenkaase conv 1.png", caption: "Disaster-prone areas in Adwumam and Kenkaase" },
          { id: "k2", filename: "AhwaaTruban conv 1.png", caption: "Disaster-prone areas in Ahwaa Truban" },
          { id: "k3", filename: "Mmedoma conv 1.png", caption: "Disaster-prone areas in Mmedoma" },
        ],
      },
      {
        id: "dambai",
        title: "Dambai Roads, Walkways & Drainage Master Plan",
        subtitle: "Krachi East Municipal Assembly, Oti Region | World Bank GSCSP | 2024–2025",
        description:
          "Led the GIS component for Dambai's first integrated Roads, Walkways & Drainage Master Plan under the World Bank's Ghana Secondary Cities Support Programme. Designed and executed primary data collection, built the municipal geodatabase from scratch, and produced maps that informed the final Master Plan.",
        maps: [
          { id: "d1", filename: "Dambai Contextual Map.jpg", caption: "Dambai in its municipal, regional, and national context" },
          { id: "d2", filename: "Existing Roads.jpg", caption: "Existing road network in Dambai" },
          { id: "d3", filename: "Road Condition.jpg", caption: "Condition assessment of existing roads" },
          { id: "d4", filename: "High traffic zone Traffic.jpg", caption: "Traffic congestion hotspots at key junctions" },
          { id: "d5", filename: "Existing Drains.jpg", caption: "Existing drainage network" },
          { id: "d6", filename: "Proposed Roads.jpg", caption: "Proposed road network improvements" },
          { id: "d7", filename: "Proposed Walkways.jpg", caption: "Proposed walkway network" },
          { id: "d8", filename: "Proposed Drains.jpg", caption: "Proposed drainage network" },
          { id: "d9", filename: "Masterplan.jpg", caption: "Final Master Plan showing all approved proposals" },
        ],
      },
    ],
  },

  /* ── GROUP 2: ACADEMIC & RESEARCH ── */
  {
    id: "academic",
    label: "Academic & Research",
    icon: BookOpen,
    description:
      "University-linked and funded research mapping — baseline studies, transit planning support, and evidence-based spatial analysis for major development programmes.",
    placeholderTint: "from-[#d2d8dd] to-[#c2cad2]",
    contourColor: "#3a5a7c",
    projects: [
      {
        id: "kumasi-brt",
        title: "Kumasi BRT Baseline Study",
        subtitle: "KNUST | World Bank KUMAP | 2024",
        description:
          "Contributed to a baseline study establishing the evidence base for introducing Kumasi's first Bus Rapid Transit (BRT) system. Covering two priority corridors (Ejisu – 18 km and Abuakwa – 10 km) across five metropolitan/municipal assemblies. Contributions spanned field surveys, map production, and identification of high-impact Transit-Oriented Development (TOD) sites.",
        maps: [
          { id: "b1", filename: "Nodes of high public transport usage KMA.jpg", caption: "Activity nodes of high public transport usage — Kumasi Metropolitan Assembly" },
          { id: "b2", filename: "Nodes of high public transport usage Oforikrom.jpg", caption: "Activity nodes of high public transport usage — Oforikrom Municipal Assembly" },
          { id: "b3", filename: "Nodes of high public transport usage Kwaadaso.jpg", caption: "Activity nodes of high public transport usage — Kwadaso Municipal Assembly" },
          { id: "b4", filename: "Nodes of high public transport usage Ejisu.jpg", caption: "Activity nodes of high public transport usage — Ejisu Municipal Assembly" },
          { id: "b5", filename: "Nodes of high public transport usage Atwima.jpg", caption: "Activity nodes of high public transport usage — Atwima Nwabiagya South Municipal Assembly" },
          { id: "b6", filename: "High Activity Zones_Pt-1.jpg", caption: "High activity zones based on land use patterns (Part 1)" },
          { id: "b7", filename: "High Activity Zones_Pt-2.jpg", caption: "High activity zones based on land use patterns (Part 2)" },
        ],
      },
    ],
  },

  /* ── GROUP 3: PRIVATE & INDIVIDUAL ── */
  {
    id: "private",
    label: "Private & Individual",
    icon: Users,
    description:
      "Custom maps for students, researchers, professors and private clients — from heavy metal distribution studies to project location maps and tailored thematic outputs.",
    placeholderTint: "from-[#ddd5d0] to-[#d2c8c0]",
    contourColor: "#7a5c3a",
    projects: [
      {
        id: "heavy-metals",
        title: "Heavy Metal & Geochemical Distribution Maps",
        subtitle: "12 representative maps from 6 studies",
        description:
          "Spatial distribution maps showing soil and water concentrations of various heavy metals and geochemical elements — produced for professors and researchers across multiple studies.",
        totalMapCount: 66,
        isSampled: true,
        sampleNote: "Showing 12 representative samples from 66 maps across 6 studies — one per element. Contact for the full portfolio.",
        elements: [
          "Arsenic", "Chromium", "Lead", "Copper", "Zinc", "Cadmium",
          "Iron", "Manganese", "Nickel", "Mercury", "Vanadium", "Titanium",
        ],
        maps: [
          { id: "hm1", filename: "Arsenic Distribution.jpg", caption: "Arsenic (As) concentration in soil — spatial distribution" },
          { id: "hm2", filename: "Chromium Distribution.jpg", caption: "Chromium (Cr) spatial distribution in study area" },
          { id: "hm3", filename: "Lead Distribution.jpg", caption: "Lead (Pb) concentration mapping across sample sites" },
          { id: "hm4", filename: "Copper Distribution.jpg", caption: "Copper (Cu) spatial distribution in soil" },
          { id: "hm5", filename: "Zinc Distribution.jpg", caption: "Zinc (Zn) concentration in study area" },
          { id: "hm6", filename: "Cadmium Distribution.jpg", caption: "Cadmium (Cd) spatial distribution across sampling points" },
          { id: "hm7", filename: "Iron Distribution.jpg", caption: "Iron (Fe) concentration mapping in soil" },
          { id: "hm8", filename: "Manganese Distribution.jpg", caption: "Manganese (Mn) spatial distribution in study area" },
          { id: "hm9", filename: "Nickel Distribution.jpg", caption: "Nickel (Ni) concentration across sample locations" },
          { id: "hm10", filename: "Mercury Distribution.jpg", caption: "Mercury (Hg) spatial distribution in soil and water" },
          { id: "hm11", filename: "Vanadium Distribution.jpg", caption: "Vanadium (V) concentration mapping across study area" },
          { id: "hm12", filename: "Titanium Distribution.jpg", caption: "Titanium (Ti) spatial distribution in soil" },
        ],
      },
      {
        id: "other-custom",
        title: "Other Custom Maps",
        subtitle: "Project location, contextual and thematic maps for individual clients",
        description:
          "Project location maps, contextual maps, and thematic maps tailored to individual client needs — from flood-affected areas to university layouts and water distribution networks.",
        maps: [
          { id: "o1", filename: "Affected areas.jpg", caption: "Flood-affected areas" },
          { id: "o2", filename: "Amansie.jpg", caption: "Contextual map with sample point locations" },
          { id: "o3", filename: "Assin Fosu.jpg", caption: "Water distribution and transmission network — treatment facilities, storage tanks, and pump houses" },
          { id: "o4", filename: "Contextual Map (2).jpg", caption: "Contextual map for client project" },
          { id: "o5", filename: "Contextual Map.jpg", caption: "Contextual map for client project" },
          { id: "o6", filename: "Crops and soil_1.jpg", caption: "Crop farming distribution across three districts" },
          { id: "o7", filename: "GKMA.jpg", caption: "Greater Kumasi Metropolitan Area in regional and national context" },
          { id: "o8", filename: "Layout.jpg", caption: "Public universities in southern Ghana" },
          { id: "o9", filename: "Operation Areas.jpg", caption: "Dominant operational areas of waste collector dump sites" },
          { id: "o10", filename: "Project Location.jpg", caption: "Project location map for student thesis" },
          { id: "o11", filename: "Study Area Map.jpg", caption: "Study area map for student research" },
          { id: "o12", filename: "Talensi.jpg", caption: "Contextual map — Talensi District" },
          { id: "o13", filename: "Thesis- Contextual Map.jpg", caption: "Contextual map for student thesis" },
        ],
      },
    ],
  },
];

const stats = [
  { value: "108+", label: "Maps produced" },
  { value: "5", label: "Major engagements" },
  { value: "3", label: "World Bank projects" },
  { value: "250+", label: "Students taught" },
];
/* ─────────────────────── UTILITY COMPONENTS ─────────────────────── */

function BrandMark({ light = false }: { light?: boolean }) {
  const baseColor = light ? "#ffffff" : "#173e35";
  const accentColor = "#cbf277";

  return (
    <span className="relative block h-10 w-10 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        {/* Hexagon outer shell */}
        <polygon
          points="50,2 93,27 93,73 50,98 7,73 7,27"
          fill={light ? "rgba(255,255,255,0.08)" : "rgba(23,62,53,0.08)"}
          stroke={baseColor}
          strokeWidth="2.5"
          opacity="0.9"
        />
        {/* Inner hexagon */}
        <polygon
          points="50,15 80,33 80,67 50,85 20,67 20,33"
          fill="none"
          stroke={baseColor}
          strokeWidth="1.2"
          opacity="0.3"
        />
        {/* Accent hexagon ring */}
        <polygon
          points="50,22 74,37 74,63 50,78 26,63 26,37"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* GIS contour-style decorative lines */}
        <path
          d="M25 45 Q38 35 50 42 Q62 49 75 40"
          stroke={accentColor}
          strokeWidth="1.2"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M25 55 Q38 48 50 55 Q62 62 75 53"
          stroke={accentColor}
          strokeWidth="1"
          opacity="0.3"
          fill="none"
        />
        {/* Map pin dot */}
        <circle cx="50" cy="38" r="2.5" fill={accentColor} opacity="0.7" />
        <line x1="50" y1="40.5" x2="50" y2="46" stroke={accentColor} strokeWidth="1" opacity="0.5" />
        {/* YGC text */}
        <text
          x="50"
          y="67"
          textAnchor="middle"
          fontFamily="'DM Mono', monospace"
          fontSize="16"
          fontWeight="700"
          letterSpacing="2"
          fill={baseColor}
        >
          YGC
        </text>
      </svg>
    </span>
  );
}

function MapPlaceholder({
  index,
  caption,
  filename,
  tint,
  contour,
}: {
  index: number;
  caption: string;
  filename: string;
  tint: string;
  contour: string;
}) {
  const s = index * 17 + 3;
  return (
    <div className="group">
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/[.07] bg-gradient-to-br ${tint}`}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 200" fill="none" aria-hidden="true">
          <path
            d={`M0 ${35 + s % 40} Q${70 + s % 50} ${15 + s % 35} ${155 + s % 45} ${45 + s % 35} T320 ${25 + s % 45}`}
            stroke={contour}
            strokeWidth="1"
            opacity=".35"
          />
          <path
            d={`M0 ${75 + s % 40} Q${90 + s % 50} ${55 + s % 35} ${185 + s % 45} ${85 + s % 35} T320 ${65 + s % 45}`}
            stroke={contour}
            strokeWidth="1"
            opacity=".28"
          />
          <path
            d={`M0 ${115 + s % 40} Q${50 + s % 50} ${95 + s % 35} ${165 + s % 45} ${125 + s % 35} T320 ${105 + s % 45}`}
            stroke={contour}
            strokeWidth="1"
            opacity=".22"
          />
          <line x1="107" y1="0" x2="107" y2="200" stroke="#b0aa98" strokeWidth=".5" opacity=".45" />
          <line x1="213" y1="0" x2="213" y2="200" stroke="#b0aa98" strokeWidth=".5" opacity=".45" />
          <line x1="0" y1="67" x2="320" y2="67" stroke="#b0aa98" strokeWidth=".5" opacity=".45" />
          <line x1="0" y1="133" x2="320" y2="133" stroke="#b0aa98" strokeWidth=".5" opacity=".45" />
        </svg>
        <span className="absolute right-2.5 top-2.5 font-mono text-[9px] text-ink/20">N ↑</span>
        <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-ink/25">#{index + 1}</span>
        <span className="absolute bottom-2 right-2.5 max-w-[65%] truncate text-right font-mono text-[8px] text-ink/18">
          {filename}
        </span>
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-all duration-300 group-hover:bg-ink/25">
          <span className="scale-90 rounded-lg bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink opacity-0 shadow-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            Replace with map image
          </span>
        </div>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[11px] leading-[1.55] text-ink/55">{caption}</p>
    </div>
  );
}

/* ─────────────────── SECTION: HERO ─────────────────── */

function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-end overflow-hidden bg-ink text-white sm:min-h-[800px] lg:min-h-screen"
    >
      <motion.img
        src="/images/gis-urban-hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,25,23,.94)_0%,rgba(7,25,23,.7)_40%,rgba(7,25,23,.12)_82%),linear-gradient(0deg,rgba(7,25,23,.75)_0%,transparent_42%)]" />

      {/* Animated GIS overlay line */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1600 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <motion.path
          d="M-30 711C210 665 311 510 503 550C690 589 785 683 989 503C1161 351 1281 310 1631 269"
          stroke="#cbf277"
          strokeWidth="2"
          strokeDasharray="6 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="987"
          cy="504"
          r="7"
          fill="#cbf277"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, type: "spring" }}
        />
      </svg>

      <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-10 pt-36 sm:px-8 sm:pb-14 lg:px-12 lg:pb-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="max-w-5xl"
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 font-display text-[clamp(3.5rem,9vw,9.5rem)] leading-[.78] tracking-[-0.06em]"
          >
            Yasir <span className="block text-lime">GIS Solutions</span>
          </motion.h1>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex max-w-3xl flex-col gap-6 border-t border-white/25 pt-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="font-display text-xl tracking-[-0.02em] sm:text-2xl lg:text-3xl">
                Quality maps and fast service delivery at reasonable prices.
              </p>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/65 sm:text-base">
                Custom maps for research, assignments, and beyond. Bring your data to&nbsp;life&nbsp;— contact&nbsp;us&nbsp;today.
              </p>
            </div>
            <a
              href="#portfolio"
              className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              View My Work
              <span className="grid h-11 w-11 place-items-center border border-white/40 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                <ArrowDown size={16} />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION: ABOUT ─────────────────── */

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-10 bg-forest px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-lime">About Me</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[.96] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              I turn complex spatial data into clear, compelling&nbsp;maps.
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-7 text-white/65">
              <p>
                I am <strong className="font-semibold text-white/90">Yasir Arafat Muhammed</strong>, a GIS specialist
                with hands-on experience delivering spatial solutions for municipal assemblies, World&nbsp;Bank-funded
                programmes, researchers, professors, businesses, students, and individuals across Ghana. Through Yasir
                GIS Solutions, I transform complex spatial data into clear, visually compelling maps for research,
                planning, assignments, and professional projects.
              </p>
              <p className="text-white/48 italic">
                Beyond institutional projects, I produce specialized maps for individuals — including heavy metal and
                geochemical distribution maps, project location maps, and custom thematic maps for students, researchers,
                and professionals.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-3 border-b border-lime pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-lime"
            >
              Get in touch <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Experience timeline */}
          <div className="lg:pt-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Professional experience</p>
              <span className="text-[10px] text-lime">Kumasi, Ghana</span>
            </div>
            <div className="max-h-[640px] overflow-y-auto pr-1">
              {experience.map((item) => (
                <div key={item.years + item.role} className="grid gap-2 border-b border-white/12 py-6 sm:grid-cols-[100px_1fr] sm:gap-4">
                  <p className="font-mono text-[10px] tracking-[0.08em] text-lime">{item.years}</p>
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.02em] sm:text-2xl">{item.role}</h3>
                    <p className="mt-1 text-xs text-white/42">{item.place}</p>
                    <p className="mt-2 text-[13px] leading-[1.6] text-white/55">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/20 pt-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-lime lg:text-4xl">{s.value}</p>
                  <p className="mt-1 text-[10px] leading-4 text-white/45">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION: PORTFOLIO ─────────────────── */

function PortfolioSection() {
  const [activeGroupId, setActiveGroupId] = useState(portfolioGroups[0].id);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const activeGroup = portfolioGroups.find((g) => g.id === activeGroupId)!;

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  };

  return (
    <section id="portfolio" className="scroll-mt-10 bg-paper px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1480px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="border-b border-ink/15 pb-8"
        >
          <p className="section-kicker">My Work</p>
          <h2 className="section-title mt-3">Maps built for real&nbsp;decisions.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/55">
            From municipal master plans to focused academic studies and individual commissions — every output is
            designed to make spatial evidence easier to understand and act&nbsp;on.
          </p>
        </motion.div>

        {/* Group tabs */}
        <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Portfolio categories">
          {portfolioGroups.map((group) => {
            const Icon = group.icon;
            const isActive = group.id === activeGroupId;
            return (
              <button
                key={group.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveGroupId(group.id);
                  setExpandedProjects(new Set());
                }}
                className={`inline-flex items-center gap-2.5 rounded-lg border px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
                  isActive
                    ? "border-forest bg-forest text-white shadow-md"
                    : "border-ink/12 bg-white text-ink/55 hover:border-ink/25 hover:text-ink"
                }`}
              >
                <Icon size={15} />
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Active group content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroupId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10"
          >
            <p className="max-w-3xl text-sm leading-6 text-ink/50">{activeGroup.description}</p>

            {/* Projects */}
            <div className="mt-10 space-y-10">
              {activeGroup.projects.map((project) => {
                const isExpanded = expandedProjects.has(project.id);
                const hasManyMaps = project.maps.length > 6;
                const visibleMaps = isExpanded || !hasManyMaps ? project.maps : project.maps.slice(0, 6);
                const globalIndexOffset = activeGroup.projects
                  .filter((p) => activeGroup.projects.indexOf(p) < activeGroup.projects.indexOf(project))
                  .reduce((sum, p) => sum + p.maps.length, 0);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-ink/8 bg-white p-5 sm:p-8 lg:p-10"
                  >
                    {/* Project header */}
                    <button
                      type="button"
                      onClick={() => toggleProject(project.id)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                      aria-expanded={isExpanded || !hasManyMaps}
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-2xl tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                          {project.title}
                        </h3>
                        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/45">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {project.subtitle}
                          </span>
                          {project.totalMapCount && (
                            <span className="rounded-full bg-lime/30 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-forest">
                              {project.totalMapCount} maps
                            </span>
                          )}
                          {!project.totalMapCount && (
                            <span className="font-mono text-[10px]">
                              {project.maps.length} map{project.maps.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/55">{project.description}</p>

                        {/* Element tags for heavy metal category */}
                        {project.elements && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.elements.map((el) => (
                              <span
                                key={el}
                                className="rounded-md border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[10px] text-ink/55"
                              >
                                {el}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {hasManyMaps && (
                        <span
                          className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink/12 transition-colors ${
                            isExpanded ? "bg-forest text-white" : "text-ink/40 hover:bg-ink/5"
                          }`}
                        >
                          <ChevronDown size={18} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </span>
                      )}
                    </button>

                    {/* Sample note */}
                    {project.isSampled && (
                      <div className="mt-5 rounded-lg border border-lime/30 bg-lime/10 px-4 py-3">
                        <p className="text-xs leading-5 text-forest/80">{project.sampleNote}</p>
                      </div>
                    )}

                    {/* Map grid */}
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {visibleMaps.map((map, idx) => (
                        <MapPlaceholder
                          key={map.id}
                          index={globalIndexOffset + idx}
                          caption={map.caption}
                          filename={map.filename}
                          tint={activeGroup.placeholderTint}
                          contour={activeGroup.contourColor}
                        />
                      ))}
                    </div>

                    {/* Show more / less */}
                    {hasManyMaps && !isExpanded && (
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className="mt-6 inline-flex items-center gap-2 border-b border-forest/40 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-forest transition-colors hover:border-forest"
                      >
                        Show all {project.maps.length} maps <ChevronDown size={14} className="rotate-[-90deg]" />
                      </button>
                    )}
                    {hasManyMaps && isExpanded && (
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className="mt-6 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink/45 transition-colors hover:border-ink/40 hover:text-ink"
                      >
                        Show less <ChevronUp size={14} />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ChevronUp({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

/* ─────────────────── SECTION: SERVICES (brief) ─────────────────── */

function ServicesStrip() {
  const services = [
    { icon: "🗺️", title: "Research mapping", text: "Study-area, project location and thematic maps for theses, assignments and funded studies." },
    { icon: "🏗️", title: "Planning & infrastructure", text: "Structure plans, road, walkway and drainage mapping for assemblies and consultants." },
    { icon: "⚠️", title: "Risk & environmental", text: "Flood, fire and community risk maps plus geochemical concentration visualisations." },
    { icon: "💾", title: "Spatial data support", text: "Data cleaning, digitisation, geodatabase development and analysis." },
  ];
  return (
    <section className="bg-mist px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <p className="section-kicker">Services</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="bg-paper p-7 sm:p-8">
              <span className="text-2xl">{s.icon}</span>
              <h3 className="mt-4 font-display text-xl tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-ink/50">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION: HOW IT WORKS ─────────────────── */

function ProcessSection() {
  const steps = [
    ["01", "Share your brief", "Send your data, study area, preferred output and deadline."],
    ["02", "Confirm the scope", "We agree on deliverables, timing, file formats and a reasonable quote."],
    ["03", "Review your map", "Receive a clear draft, share feedback and approve the final output."],
  ];
  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <p className="section-kicker">A simple process</p>
        <div className="mt-8 grid border-t border-ink/15 md:grid-cols-3">
          {steps.map(([number, title, text], index) => (
            <div
              key={number}
              className={`py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-ink/15 md:border-l md:border-t-0" : "md:pl-0"}`}
            >
              <p className="font-mono text-[10px] text-forest">{number}</p>
              <h3 className="mt-7 font-display text-2xl tracking-[-0.025em] sm:text-3xl">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-ink/50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION: CONTACT ─────────────────── */

function ContactSection() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "");
    const service = String(d.get("service") || "GIS mapping enquiry");
    const message = String(d.get("message") || "");
    const subject = encodeURIComponent(`${service} enquiry from ${name}`);
    const body = encodeURIComponent(`Hello Yasir,\n\n${message}\n\nFrom: ${name}`);
    window.location.href = `mailto:muhammedarafat0000@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-10 bg-lime px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-forest">Get in Touch</p>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.88] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            Bring your data to&nbsp;life.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink/60">
            Ready to bring your data to life? Reach out today to discuss your mapping needs.
          </p>
          <div className="mt-10 grid gap-5 text-sm">
            <a className="group flex w-fit items-center gap-3" href="tel:+233538772013">
              <Phone size={16} className="shrink-0 text-forest" /> 053&nbsp;877&nbsp;2013&nbsp;/&nbsp;055&nbsp;794&nbsp;7712{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
            </a>
            <a className="group flex w-fit items-center gap-3 break-all" href="mailto:muhammedarafat0000@gmail.com">
              <Mail size={16} className="shrink-0 text-forest" /> muhammedarafat0000@gmail.com{" "}
              <ArrowRight className="hidden transition-transform group-hover:translate-x-1 sm:block" size={14} />
            </a>
            <a
              className="group flex w-fit items-center gap-3"
              href="https://wa.me/233557947712"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} className="shrink-0 text-forest" /> WhatsApp&nbsp;→&nbsp;Chat now
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-ink/30" aria-label="Project enquiry form">
          <label className="block border-b border-ink/20 py-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">Your name</span>
            <input
              name="name"
              required
              className="mt-2 block w-full bg-transparent font-display text-2xl outline-none placeholder:text-ink/22"
              placeholder="Name or organisation"
            />
          </label>
          <label className="block border-b border-ink/20 py-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">What do you need?</span>
            <select
              name="service"
              className="mt-2 block w-full appearance-none bg-transparent font-display text-2xl outline-none"
            >
              <option>Research mapping</option>
              <option>Planning &amp; infrastructure mapping</option>
              <option>Risk &amp; environmental analysis</option>
              <option>Spatial data support</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="block border-b border-ink/20 py-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">Project details</span>
            <textarea
              name="message"
              required
              rows={3}
              className="mt-2 block w-full resize-none bg-transparent font-display text-2xl leading-snug outline-none placeholder:text-ink/22"
              placeholder="Brief, deadline and required output"
            />
          </label>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-[11px] leading-5 text-ink/40">
              Submitting opens your email app with the project details ready to&nbsp;send.
            </p>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-forest"
            >
              Send enquiry <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────── MAIN APP ─────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* ─── NAV ─── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label="Yasir GIS Solutions home">
            <BrandMark light />
            <span className="font-display text-[17px] tracking-[-0.02em]">Yasir GIS Solutions</span>
          </a>
          <nav
            className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex"
            aria-label="Main navigation"
          >
            <a className="transition-colors hover:text-lime" href="#about">About</a>
            <a className="transition-colors hover:text-lime" href="#portfolio">Work</a>
            <a className="transition-colors hover:text-lime" href="#contact">Contact</a>
          </nav>
          <a
            href="https://wa.me/233557947712"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 border border-white/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-lime hover:bg-lime hover:text-ink sm:flex"
          >
            WhatsApp <ExternalLink size={13} />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-white/30 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="border-t border-white/10 bg-ink px-5 py-5 text-sm font-semibold uppercase tracking-[0.12em] md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              aria-label="Mobile navigation"
            >
              {[
                ["About", "#about"],
                ["Work", "#portfolio"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-white/8 py-3.5"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesStrip />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-ink px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark light />
            <div>
              <p className="font-display text-lg">Yasir GIS Solutions</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/40">
                Quality maps and fast service delivery at reasonable prices
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-white/40">
            <a href="https://wa.me/233557947712" target="_blank" rel="noreferrer" className="hover:text-lime">
              WhatsApp
            </a>
            <a href="mailto:muhammedarafat0000@gmail.com" className="hover:text-lime">
              Email
            </a>
            <a href="#top" className="hover:text-lime">
              Back to top
            </a>
            <span>© 2025 Yasir GIS Solutions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
