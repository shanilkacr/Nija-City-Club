/**
 * Site-level constants. Wellness URL is env-driven so the domain can change
 * without touching components.
 */
export const SITE = {
  name: "Nija City Club",
  brand: "NIJA",
  tagline: "A private club for the modern city",
  location: "Colombo, Sri Lanka",
  description:
    "Nija City Club — a members-only private club for fitness, swimming, dining, events, and wellness in Colombo.",
  email: "concierge@nijacityclub.com",
  phone: "+94 11 000 0000",
  address: "Colombo, Sri Lanka",
} as const;

/** External Luxury Wellness site — override via env when domain is final. */
export const WELLNESS_SITE_URL =
  process.env.NEXT_PUBLIC_WELLNESS_SITE_URL ??
  "https://nialuxurywellness.example.com";

export const CLUB_HOURS = [
  { day: "Monday – Sunday", hours: "7:00am – 10:00pm" },
] as const;
