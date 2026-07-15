/**
 * Club profile content — structure informed by Pacific City Club / IAC
 * (https://www.iacworldwide.com/clubs/pacific-city-club/), adapted for
 * Nija City Club, Colombo. Visual treatment is Aman-inspired, not IAC.
 */

export type FacilityPanel = {
  id: string;
  label: string;
  href: string;
  image: string;
  blurb: string;
  points: string[];
};

export type ClubRule = {
  id: string;
  title: string;
  detail: string;
};

export type EditorialSplit = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href: string;
  ctaLabel: string;
  imagePosition?: "left" | "right";
};

export const CLUB_INTRO = {
  locationLine:
    "In the heart of Colombo — a members-only house for fitness, swimming, café, and events, with a private bridge to Nija Luxury Wellness.",
  prestige:
    "With quiet style and considered service, Nija City Club is a member-only establishment shaped for business, leisure, and wellbeing. Warm materials and generous light frame superb vistas of the city.",
  oasis:
    "Whether for work, recovery, or celebration, the Club is an oasis of calm within the bustling city.",
} as const;

/** Scroll-synced facility panels — two-column, image + point summaries. */
export const FACILITY_PANELS: FacilityPanel[] = [
  {
    id: "city-club",
    label: "City Club",
    href: "/membership",
    image: "/images/home/hero.jpg",
    blurb: "The heart of the house — membership, concierge, and private privilege.",
    points: [
      "Resident, Associate, and Corporate membership",
      "Dedicated concierge and guest arrangements",
      "Privileges across fitness, pool, café, and events",
      "Preferred access to Nija Luxury Wellness",
    ],
  },
  {
    id: "conference",
    label: "Conference & Meetings",
    href: "/event-space",
    image: "/images/home/crosslink-events.jpg",
    blurb: "Boardrooms and receptions hosted with discretion.",
    points: [
      "Private boardrooms and breakout rooms",
      "Events, conferences, and evening receptions",
      "In-house treatment options for guests",
      "Private dining for celebration tables",
    ],
  },
  {
    id: "athletic",
    label: "Athletic",
    href: "/fitness",
    image: "/images/home/crosslink-fitness.jpg",
    blurb: "Training floors shaped for intention, not spectacle.",
    points: [
      "Full gym access — monthly, weekly, or day rates",
      "Personal training by appointment",
      "Yoga and Pilates studio sessions",
      "Recovery spaces after training",
    ],
  },
  {
    id: "pool",
    label: "Swimming",
    href: "/swimming",
    image: "/images/home/crosslink-swimming.jpg",
    blurb: "Lane swimming and quiet immersion, privately held.",
    points: [
      "Pool access for members and invited guests",
      "Group and individual swim coaching",
      "Post-swim recovery rooms",
      "Towel service and changing facilities",
    ],
  },
  {
    id: "cafe",
    label: "Café & Dining",
    href: "/cafe",
    image: "/images/home/crosslink-cafe.jpg",
    blurb: "Quiet tables for the unhurried mid-day.",
    points: [
      "Light plates and considered coffee",
      "Member rates throughout the day",
      "Seating for informal meetings",
      "Private dining via Event Space",
    ],
  },
  {
    id: "wellness",
    label: "Wellness",
    href: "/wellness",
    image: "/images/wellness/hero.jpg",
    blurb: "A private bridge to spa, Ayurveda, and ritual.",
    points: [
      "Direct link to Nija Luxury Wellness",
      "Member preferential booking",
      "Spa, facial, and Ayurvedic treatments",
      "Coordinated same-day transfers",
    ],
  },
];

export const CLUB_AMENITIES = {
  eyebrow: "Amenities",
  title: "A house of many rooms",
  body:
    "Nija City Club was founded as a gathering place for Colombo’s business and creative community. Dining, fitness, swimming, and event spaces sit under one membership — with personal, attentive service and unequalled calm above the city.",
  image: "/images/home/ambiance.jpg",
} as const;

export const CLUB_RULES: ClubRule[] = [
  {
    id: "dress",
    title: "Dress Code",
    detail: "Business attire or smart casual. No jeans, flip-flops, or short pants.",
  },
  {
    id: "age",
    title: "Age Restriction",
    detail: "Children under the age of 12 years old are not permitted.",
  },
  {
    id: "dogs",
    title: "Dogs",
    detail: "Dogs are not allowed on club premises.",
  },
  {
    id: "smoking",
    title: "Smoking",
    detail: "Smoking is permitted only in designated lounge areas.",
  },
];

export const OPENING_HOURS = {
  club: [
    { day: "Monday", hours: "7:00am – 10:00pm" },
    { day: "Tuesday", hours: "7:00am – 10:00pm" },
    { day: "Wednesday", hours: "7:00am – 10:00pm" },
    { day: "Thursday", hours: "7:00am – 10:00pm" },
    { day: "Friday", hours: "7:00am – 10:00pm" },
    { day: "Saturday", hours: "7:00am – 10:00pm" },
    { day: "Sunday", hours: "7:00am – 10:00pm" },
  ],
  spaFitness: [
    { day: "Monday – Saturday", hours: "07:00 – 21:00" },
    { day: "Sunday & Public Holidays", hours: "08:00 – 20:00" },
  ],
} as const;

export const MORE_INFO = {
  parking: "Valet parking service available for members and guests.",
  charges: "Service charge and applicable taxes may apply. Day fitness access charged separately.",
} as const;

/** Image-led auto-scrolling story on home — short captions only. */
export const HOME_STORY_SNAPS = [
  {
    id: "welcome",
    image: "/images/home/hero.jpg",
    caption: "Arrive",
    href: "/membership",
  },
  {
    id: "move",
    image: "/images/home/crosslink-fitness.jpg",
    caption: "Move",
    href: "/fitness",
  },
  {
    id: "water",
    image: "/images/home/lifestyle.jpg",
    caption: "Water",
    href: "/swimming",
  },
  {
    id: "gather",
    image: "/images/home/crosslink-cafe.jpg",
    caption: "Gather",
    href: "/cafe",
  },
  {
    id: "host",
    image: "/images/home/crosslink-events.jpg",
    caption: "Host",
    href: "/event-space",
  },
  {
    id: "restore",
    image: "/images/wellness/ambiance.jpg",
    caption: "Restore",
    href: "/wellness",
  },
] as const;

/** Interleaved editorial image splits between lower sections. */
export const HOME_EDITORIALS: EditorialSplit[] = [
  {
    id: "membership-interlude",
    eyebrow: "Belong",
    title: "Membership, considered",
    body:
      "Invitation-only tiers open the floors that match how you live — with service that anticipates, never interrupts.",
    image: "/images/membership/ambiance.jpg",
    href: "/membership",
    ctaLabel: "View Membership",
    imagePosition: "right",
  },
  {
    id: "wellness-interlude",
    eyebrow: "Restore",
    title: "Beyond the club floors",
    body:
      "When the day asks for stillness, the Luxury Wellness house waits — spa, Ayurveda, and ritual under the same brand.",
    image: "/images/wellness/ambiance.jpg",
    href: "/wellness",
    ctaLabel: "Explore Wellness",
    imagePosition: "left",
  },
  {
    id: "pool-interlude",
    eyebrow: "Water",
    title: "Immersion, privately held",
    body:
      "Lane mornings and unhurried afternoons — a pool reserved for members who prefer quiet water to crowds.",
    image: "/images/swimming/pool.jpg",
    href: "/swimming",
    ctaLabel: "Discover Swimming",
    imagePosition: "right",
  },
];
