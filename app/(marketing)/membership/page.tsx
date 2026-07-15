import type { Metadata } from "next";
import {
  AmbianceHero,
  CTABanner,
  ImageBlock,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";
import { MembershipTierCard } from "@/components/club/PricingCard";
import { MEMBERSHIP_TIERS } from "@/config/content";
import { WELLNESS_SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Resident, Associate, and Corporate membership tiers at Nija City Club.",
};

export default function MembershipPage() {
  return (
    <>
      <AmbianceHero
        image="/images/membership/hero.jpg"
        alt="Membership welcome at the concierge desk"
        title="Belong to the club"
        description="Three tiers — shaped around how often you are in the city, and how you wish to use the house."
        cta={{ label: "Request invitation", href: "/contact" }}
        height="tall"
        priority
      />

      <Section>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Tiers"
            title="Choose how you arrive"
            description="All memberships are by enquiry. Pricing is confirmed privately with concierge."
            className="mb-14"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <Reveal key={tier.id} delayMs={i * 90}>
              <MembershipTierCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/membership/ambiance.jpg"
            alt="Member experience"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Privileges"
              title="City Club and beyond"
              description="Fitness, pool, café member rates, event priority, and a bridge to Nija Luxury Wellness — the same brand, a different pace."
            >
              <a
                href={WELLNESS_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm tracking-[0.12em] uppercase underline underline-offset-4"
              >
                Explore Luxury Wellness
              </a>
            </SectionHeader>
          </ImageBlock>
        </Reveal>
      </Section>

      <CTABanner
        title="Begin with a conversation"
        description="Tell us how you move through Colombo — we will recommend a tier and arrange a private tour."
        cta={{ label: "Contact Concierge", href: "/contact" }}
        secondaryCta={{ label: "Fitness access", href: "/fitness#gym" }}
      />
    </>
  );
}
