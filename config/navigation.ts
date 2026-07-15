import { WELLNESS_SITE_URL } from "./site";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  /** When true, open in a new tab (external properties). */
  external?: boolean;
  children?: NavChild[];
};

/**
 * Config-driven mega menu. Structure is expandable for Wellness sub-nav later
 * without changing MegaMenu layout code.
 */
export const NAVIGATION: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Arrive at the club",
  },
  {
    label: "Wellness",
    href: "/wellness",
    description: "Bridge to Nija Luxury Wellness",
    children: [
      {
        label: "Visit Luxury Wellness",
        href: WELLNESS_SITE_URL,
        description: "Spa, Ayurveda, and treatments",
      },
      {
        label: "About the Bridge",
        href: "/wellness",
        description: "How the two houses connect",
      },
    ],
  },
  {
    label: "Fitness",
    href: "/fitness",
    description: "Train with intention",
    // Single-page anchors: content depth fits one scroll with in-page nav.
    children: [
      {
        label: "Gym",
        href: "/fitness#gym",
        description: "Monthly, weekly, and day access",
      },
      {
        label: "Personal Trainer",
        href: "/fitness#personal-trainer",
        description: "One-to-one coaching",
      },
      {
        label: "Yoga",
        href: "/fitness#yoga",
        description: "Studio practice",
      },
      {
        label: "Pilates",
        href: "/fitness#pilates",
        description: "Controlled strength",
      },
      {
        label: "Recovery",
        href: "/fitness#recovery",
        description: "Restore after training",
      },
    ],
  },
  {
    label: "Swimming",
    href: "/swimming",
    description: "Water and light",
    children: [
      {
        label: "Pool Access",
        href: "/swimming#pool",
        description: "Lane and leisure swimming",
      },
      {
        label: "Training",
        href: "/swimming#training",
        description: "Group and individual coaching",
      },
      {
        label: "Recovery",
        href: "/swimming#recovery",
        description: "Post-swim restoration",
      },
    ],
  },
  {
    label: "Café",
    href: "/cafe",
    description: "Quiet tables, considered plates",
  },
  {
    label: "Event Space",
    href: "/event-space",
    description: "Gather with purpose",
    children: [
      {
        label: "Meeting Spaces",
        href: "/event-space#meetings",
        description: "Boardrooms and breakouts",
      },
      {
        label: "Treatment",
        href: "/event-space#treatment",
        description: "In-house wellness for guests",
      },
      {
        label: "Events & Conferences",
        href: "/event-space#events",
        description: "Hosted gatherings",
      },
      {
        label: "Private Dining",
        href: "/event-space#dining",
        description: "Tables for celebration",
      },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    description: "Tiers and privileges",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Concierge and enquiries",
  },
];

export const FOOTER_LINKS = NAVIGATION.filter(
  (item) => item.href !== "/",
).map((item) => ({
  label: item.label,
  href: item.href,
}));
