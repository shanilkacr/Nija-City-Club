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
        eyebrow="Belong to Something More Considered"
        title="Private Club Membership in Colombo"
        description="NIJA City Club membership is designed for people who want more from their city — more privacy, more wellbeing, better connections, and a place that brings the important parts of life together."
        cta={{ label: "Request invitation", href: "/contact" }}
        height="tall"
        priority
      />

      <Section contained={false}>
        <div className="mx-auto w-full max-w-content px-[var(--section-x)] py-12 md:py-16">
          <Reveal>
            <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
              <p className="eyebrow text-center text-ink/50">
                Tiers
              </p>

              <h2 className="mt-6 w-full text-center font-display text-4xl leading-tight text-ink md:text-5xl">
                Membership Designed Around You
              </h2>

              <p className="mx-auto mt-6 w-full max-w-xl text-center text-base leading-8 text-ink/65">
                NIJA offers membership options for different lifestyles, from
                those who live in Colombo to people who move regularly between
                cities and businesses looking for a private city base.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier, i) => (
              <Reveal key={tier.id} delayMs={i * 90}>
                <MembershipTierCard tier={tier} />
              </Reveal>
            ))}
          </div>

          {/* Extra bottom spacing only */}
          <div className="h-32 md:h-40" />
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
