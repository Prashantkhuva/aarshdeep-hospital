export const CONTACT = {
  name: "Aarshdeep Dental Clinic",
  shortName: "Aarshdeep",
  tagline: "Healthy smiles, trusted care.",
  address:
    "32 n 33 Ambika Shopping Center, Raiya Circle Corner, Raiya Chowk, Raiya Rd, Rajkot, Gujarat 360007",
  city: "Rajkot, Gujarat",
  phoneDisplay: "085111 11566",
  phoneHref: "tel:+918511111566",
  whatsappHref: "https://wa.me/918511111566",
  rating: 5.0,
  reviewCount: 2835,
  hours: "9:00 AM – 8:00 PM, Mon – Sat",
  hoursNote: "Sundays closed · call to confirm your slot",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Aarshdeep%20Dental%20Clinic%2C%20Raiya%20Rd%2C%20Rajkot%2C%20Gujarat&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Aarshdeep%20Dental%20Clinic%20Rajkot%20Gujarat",
  meteoricUrl: "https://withmeteoric.com",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export type IconName =
  | "stethoscope"
  | "heartPulse"
  | "medicalCross"
  | "ecg"
  | "balloon"
  | "bone"
  | "flask"
  | "siren"
  | "clock"
  | "crosshair"
  | "ambulance"
  | "pill"
  | "mapPin"
  | "phone"
  | "whatsapp"
  | "star"
  | "tooth"
  | "toothCrown"
  | "braces"
  | "smile"
  | "baby"
  | "gum"
  | "scalpel"
  | "shield";

export interface Department {
  name: string;
  description: string;
  icon: IconName;
  points: string[];
}

export const DEPARTMENTS: Department[] = [
  {
    name: "Dental Implants",
    description:
      "Permanent, natural-looking tooth replacement with titanium implants — planned on 3D imaging.",
    icon: "toothCrown",
    points: [
      "Single & multiple tooth implants",
      "3D CBCT-guided surgical planning",
      "Same-day temporary crowns",
      "Titanium & zirconia options",
    ],
  },
  {
    name: "Tooth Removal",
    description:
      "Safe, painless extractions including wisdom tooth removal performed by experienced implantologists.",
    icon: "scalpel",
    points: [
      "Painless tooth extractions",
      "Wisdom tooth removal",
      "Surgical extractions",
      "Quick recovery guidance",
    ],
  },
  {
    name: "Root Canal Treatment",
    description:
      "Painless, single-visit root canals using modern rotary endodontics.",
    icon: "tooth",
    points: [
      "Painless rotary RCT",
      "Single-visit treatment",
      "Cracked-tooth repair",
      "Failed RCT retreatment",
    ],
  },
  {
    name: "Orthodontics & Braces",
    description:
      "Metal, ceramic and clear aligners to gently straighten every smile.",
    icon: "braces",
    points: [
      "Metal & ceramic braces",
      "Clear aligner therapy",
      "Children's early correction",
      "Retainers & aftercare",
    ],
  },
  {
    name: "Cosmetic Dentistry",
    description:
      "Veneers, laser whitening and complete smile makeovers tailored to you.",
    icon: "smile",
    points: [
      "Porcelain veneers & smile design",
      "Laser & in-office whitening",
      "Digital smile preview",
      "Gum contouring",
    ],
  },
  {
    name: "Pediatric Dentistry",
    description: "Gentle, reassuring dental care that puts children at ease.",
    icon: "baby",
    points: [
      "Child-friendly first visits",
      "Fluoride & sealants",
      "Cavity treatment for kids",
      "Habit counselling",
    ],
  },
  {
    name: "Periodontics",
    description: "Expert care for gum disease, deep cleaning and gum surgery.",
    icon: "gum",
    points: [
      "Deep cleaning & scaling",
      "Gum disease treatment",
      "Flap & grafting surgery",
      "Implant maintenance",
    ],
  },
  {
    name: "Preventive Care",
    description:
      "Cleanings, fluoride and sealants that stop problems before they start.",
    icon: "shield",
    points: [
      "Cleanings & polishing",
      "Fluoride treatment",
      "Dental sealants",
      "Oral hygiene coaching",
    ],
  },
];

export interface DirectoryRow {
  floor: string;
  department: string;
  note: string;
  icon: IconName;
  tag: string;
}

export const DIRECTORY: DirectoryRow[] = [
  {
    floor: "01",
    department: "Implant Center",
    note: "Titanium implants & crowns",
    icon: "toothCrown",
    tag: "Flagship",
  },
  {
    floor: "01",
    department: "Tooth Extraction",
    note: "Painless removals",
    icon: "scalpel",
    tag: "Quick care",
  },
  {
    floor: "01",
    department: "Root Canal",
    note: "Rotary endodontics",
    icon: "tooth",
    tag: "Single visit",
  },
  {
    floor: "01",
    department: "Braces & Aligners",
    note: "Metal, ceramic & clear",
    icon: "braces",
    tag: "Smile design",
  },
  {
    floor: "01",
    department: "Cosmetic & Whitening",
    note: "Veneers & laser whitening",
    icon: "smile",
    tag: "In-clinic",
  },
  {
    floor: "01",
    department: "Pediatric Dentistry",
    note: "Gentle child care",
    icon: "baby",
    tag: "Kids friendly",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Ashish Makwana",
    role: "Chief Implantologist & Dental Surgeon",
    qualification: "BDS, MDS (Implantology)",
    experience: "10+ years",
    bio: "Founder of Aarshdeep Dental Clinic, Dr. Makwana is known for his precise implant planning and gentle, patient-first approach. He explains every step clearly and ensures each treatment is comfortable and stress-free.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Orthodontist & Cosmetic Dentist",
    qualification: "BDS, MDS (Orthodontics)",
    experience: "8+ years",
    bio: "Dr. Sharma designs straighter, brighter smiles — from clear aligners to full cosmetic makeovers. Patients love her honest advice and the digital smile preview before treatment even begins.",
  },
  {
    name: "Dr. Rahul Verma",
    role: "Endodontist (Root Canal Specialist)",
    qualification: "BDS, MDS (Conservative & Endodontics)",
    experience: "7+ years",
    bio: "Dr. Verma performs painless, single-visit root canals with modern rotary endodontics. His gentle touch and precise technique are why so many nervous patients recommend him to their families.",
  },
  {
    name: "Dr. Sneha Patel",
    role: "Pediatric Dentist",
    qualification: "BDS, MDS (Pedodontics)",
    experience: "5+ years",
    bio: "Dr. Patel turns dental fear into dental fun. She keeps first visits light and playful, and coaches parents on fluoride, sealants and healthy habits for growing smiles.",
  },
];

export interface Facility {
  label: string;
  note: string;
  icon: IconName;
}

export const FACILITIES: Facility[] = [
  {
    label: "Digital 3D CBCT Scan",
    note: "In-clinic imaging",
    icon: "crosshair",
  },
  {
    label: "Painless Anesthesia",
    note: "STA wand & laser",
    icon: "medicalCross",
  },
  {
    label: "Class B Sterilization",
    note: "Clinic-grade hygiene",
    icon: "shield",
  },
  { label: "In-house Dental Lab", note: "Same-day crowns", icon: "flask" },
  { label: "Rotary Endodontics", note: "Modern root canals", icon: "tooth" },
  { label: "Laser Dentistry", note: "Minimally invasive", icon: "smile" },
];

export const ABOUT_STORY: string[] = [
  "Aarshdeep Dental Clinic sits on the ground floor of Ambika Shopping Center on Rajkot's Raiya Road — a family-run practice built on one simple promise: dental care that doesn't hurt, and never rushes you.",
  "Dr. Ashish Makwana founded the clinic with a conviction that most dental fear comes from bad experiences, not bad teeth. Today his team of implantologists, orthodontists, endodontists and pediatric dentists cares for thousands of Rajkot families every year — with a 5.0 rating from more than 2,835 patients on Google.",
  "From painless root canals and natural-looking implants to tooth removals and gentle care for children, everything happens under one roof — consultation, treatment, digital imaging and follow-up.",
];

export interface Value {
  label: string;
  note: string;
  icon: IconName;
}

export const VALUES: Value[] = [
  {
    label: "Painless-first approach",
    note: "Gentle anesthesia and a calm, step-by-step explanation before every treatment.",
    icon: "shield",
  },
  {
    label: "Transparent pricing",
    note: "Clear costs discussed before we start — no surprises on the bill.",
    icon: "pill",
  },
  {
    label: "Digital precision",
    note: "3D CBCT imaging guides implants, root canals and complex cases.",
    icon: "crosshair",
  },
  {
    label: "Strict sterilization",
    note: "Hospital-grade Class B sterilization on every instrument, every time.",
    icon: "medicalCross",
  },
  {
    label: "Family-friendly care",
    note: "From toddlers to grandparents — one trusted clinic for the whole family.",
    icon: "baby",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Is root canal treatment painful?",
    answer:
      "No. We use modern rotary endodontics and computer-controlled anesthesia, so the vast majority of patients feel nothing beyond a mild pinch. Most root canals are completed in a single comfortable visit.",
  },
  {
    question: "How long do dental implants last?",
    answer:
      "With good care and regular check-ups, implants are designed to last decades — many last a lifetime. We plan every implant on 3D CBCT imaging and look after them at your follow-up visits.",
  },
  {
    question: "Do you treat children?",
    answer:
      "Yes. Our pediatric dentist is trained to make children feel safe and calm. We keep first visits fun and gentle, and guide parents on fluoride, sealants and healthy habits.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Call us at 085111 11566, message on WhatsApp, or use the appointment form on our Contact page — we'll confirm the best slot for you.",
  },
  {
    question: "Is the clinic safe and hygienic?",
    answer:
      "Absolutely. Every instrument is cleaned and sterilized in a hospital-grade Class B autoclave, and single-use items are used wherever possible.",
  },
  {
    question: "What are the clinic hours?",
    answer:
      "We're open 9:00 AM – 8:00 PM, Monday to Saturday. The clinic is closed on Sundays — call ahead to confirm your slot.",
  },
];

export interface Testimonial {
  quote: string;
  source: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I had an outstanding experience with my dental implant treatment at Aarshdeep Dental Clinic. The treatment given by the doctor is best, with a very friendly environment in the space.",
    source: "Google review",
  },
  {
    quote:
      "Very good first experience with Dr. Ashish Makwana at Aarshdeep Clinic. He explained my dental problem clearly and suggested the right treatment very professionally. Highly satisfied with his guidance and consultation.",
    source: "Google review",
  },
  {
    quote:
      "Best implant service at Aarshdeep Dental Clinic. I had a very good experience with Dr. Ashish and his entire team. The staff is friendly and the clinic is well-maintained.",
    source: "Google review",
  },
  {
    quote:
      "Nice experience and good work, team management is excellent. The clinic has a very professional yet welcoming atmosphere. Highly recommended for dental implants.",
    source: "Google review",
  },
  {
    quote:
      "Dr. Makwana explained everything clearly before starting — no surprises, no hidden costs. The implant planning on 3D scan made me feel confident.",
    source: "Implant patient",
  },
  {
    quote:
      "Got my tooth removed here. Completely painless and the recovery was smooth. The team is so patient and gentle — I'll definitely be back for my check-ups.",
    source: "Patient, Rajkot",
  },
];
