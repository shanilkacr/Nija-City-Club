export type PricingTier = {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

/** @deprecated Use PricingTier — kept for clarity in membership contexts */
export type MembershipTier = PricingTier;

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image?: string;
  eyebrow?: string;
};

export const FITNESS_GYM_TIERS: PricingTier[] = [
  {
    id: "gym-monthly",
    name: "Monthly",
    price: "Rs. 28,500",
    period: "per month",
    description: "Full gym floor access with locker privileges.",
    features: [
      "Unlimited gym floor access",
      "Locker & towel service",
      "Orientation session included",
    ],
    highlighted: true,
    ctaLabel: "Enquire",
    ctaHref: "/contact",
  },
  {
    id: "gym-weekly",
    name: "Weekly",
    price: "Rs. 9,800",
    period: "per week",
    description: "Flexible access for shorter stays in the city.",
    features: ["Seven consecutive days", "Locker access", "Guest pass available"],
    ctaLabel: "Enquire",
    ctaHref: "/contact",
  },
  {
    id: "gym-day",
    name: "Per Day",
    price: "Rs. 2,900",
    period: "per day",
    description: "A single day on the floor — members and invited guests.",
    features: ["Same-day access", "Day locker", "Towel service"],
    ctaLabel: "Enquire",
    ctaHref: "/contact",
  },
];

export const MEMBERSHIP_TIERS: PricingTier[] = [
  {
    id: "resident",
    name: "Resident",
    price: "By enquiry",
    period: "annual",
    description: "Full club privileges across fitness, pool, café, and events.",
    features: [
      "Unlimited fitness & pool",
      "Café member rates",
      "Priority event booking",
      "Four guest passes / month",
      "Wellness partner privileges",
    ],
    highlighted: true,
    ctaLabel: "Request invitation",
    ctaHref: "/contact",
  },
  {
    id: "associate",
    name: "Associate",
    price: "By enquiry",
    period: "annual",
    description: "For those who live between cities and visit often.",
    features: [
      "Fitness & pool access",
      "Café member rates",
      "Event space discounts",
      "Two guest passes / month",
    ],
    ctaLabel: "Request invitation",
    ctaHref: "/contact",
  },
  {
    id: "corporate",
    name: "Corporate",
    price: "By enquiry",
    period: "annual",
    description: "Shared seats for teams that need a private city base.",
    features: [
      "Named seat holders",
      "Meeting room credits",
      "Private dining discounts",
      "Wellness referral rates",
    ],
    ctaLabel: "Talk to concierge",
    ctaHref: "/contact",
  },
];

export const HOME_CROSSLINKS: ServiceItem[] = [
  {
    id: "fitness",
    title: "Fitness",
    eyebrow: "Move",
    description: "Gym, coaching, yoga, pilates, and recovery — under one roof.",
    href: "/fitness",
    image: "/images/home/crosslink-fitness.jpg",
  },
  {
    id: "swimming",
    title: "Swimming",
    eyebrow: "Water",
    description: "Lane swimming, training, and quiet recovery in the water.",
    href: "/swimming",
    image: "/images/home/crosslink-swimming.jpg",
  },
  {
    id: "cafe",
    title: "Café",
    eyebrow: "Gather",
    description: "A calm table between meetings — light plates and slow coffee.",
    href: "/cafe",
    image: "/images/home/crosslink-cafe.jpg",
  },
  {
    id: "events",
    title: "Event Space",
    eyebrow: "Host",
    description: "Meeting rooms, conferences, treatments, and private dining.",
    href: "/event-space",
    image: "/images/home/crosslink-events.jpg",
  },
  {
    id: "membership",
    title: "Membership",
    eyebrow: "Belong",
    description: "Resident, Associate, and Corporate — crafted around how you live.",
    href: "/membership",
    image: "/images/home/crosslink-membership.jpg",
  },
];

export const FITNESS_SERVICES: ServiceItem[] = [
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    description:
      "One-to-one coaching shaped around your goals — strength, mobility, or return-to-form.",
    href: "/fitness#personal-trainer",
    image: "/images/fitness/training.jpg",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "Studio sessions that favour breath, alignment, and a quieter pace of effort.",
    href: "/fitness#yoga",
    image: "/images/fitness/yoga.jpg",
  },
  {
    id: "pilates",
    title: "Pilates",
    description:
      "Controlled strength work on mat and apparatus, guided by experienced instructors.",
    href: "/fitness#pilates",
    image: "/images/fitness/pilates.jpg",
  },
  {
    id: "recovery",
    title: "Recovery",
    description:
      "Stretch, soft tissue, and quiet rooms to restore after training days.",
    href: "/fitness#recovery",
    image: "/images/fitness/recovery.jpg",
  },
];

export const SWIMMING_SERVICES: ServiceItem[] = [
  {
    id: "pool",
    title: "Pool Access",
    description: "Lane and leisure swimming in a privately held aquatic space.",
    href: "/swimming#pool",
    image: "/images/swimming/pool.jpg",
  },
  {
    id: "training",
    title: "Group & Individual Training",
    description: "Technique clinics and personal coaching in the water.",
    href: "/swimming#training",
    image: "/images/swimming/training.jpg",
  },
  {
    id: "recovery",
    title: "Recovery",
    description: "Warm-down rituals and rest spaces after time in the pool.",
    href: "/swimming#recovery",
    image: "/images/swimming/recovery.jpg",
  },
];

export const EVENT_SERVICES: ServiceItem[] = [
  {
    id: "meetings",
    title: "Meeting Spaces",
    description: "Boardrooms and breakouts with natural light and discreet service.",
    href: "/event-space#meetings",
    image: "/images/event-space/meeting.jpg",
  },
  {
    id: "treatment",
    title: "Treatment",
    description: "In-house wellness for hosting teams and private guests.",
    href: "/event-space#treatment",
    image: "/images/event-space/treatment.jpg",
  },
  {
    id: "events",
    title: "Events & Conferences",
    description: "Reception-ready rooms for launches, offsites, and evenings.",
    href: "/event-space#events",
    image: "/images/event-space/events.jpg",
  },
  {
    id: "dining",
    title: "Private Dining",
    description: "Intimate tables for celebration, sealed with considered cuisine.",
    href: "/event-space#dining",
    image: "/images/event-space/dining.jpg",
  },
];
