import type { Metadata } from "next";
import {
  AmbianceHero,
  CTABanner,
  ImageBlock,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";
import { WELLNESS_SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "Cross the bridge from Nija City Club to Nija Luxury Wellness — spa, Ayurveda, and ritual.",
};

export default function WellnessBridgePage() {
  return (
    <>
      <AmbianceHero
        image="/images/wellness/hero.jpg"
        alt="Wellness ritual elements at Nija"
        title="Luxury Wellness"
        description="A quieter house next door — spa, Ayurvedic treatments, and nail atelier. Members of City Club enjoy partner privileges."
        cta={{
          label: "Visit Luxury Wellness",
          href: WELLNESS_SITE_URL,
          external: true,
        }}
        height="tall"
        priority
      />

      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              align="center"
              eyebrow="Two houses, one brand"
              title="City Club for the day. Wellness for the ritual."
              description="This page is a bridge — not a catalogue. Explore treatments, packages, and reservations on the Nija Luxury Wellness site."
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="stone" contained={false}>
        <div className="mx-auto max-w-content px-[var(--section-x)] py-[var(--section-y)]">
          <Reveal>
            <ImageBlock
              layout="split"
              image="/images/wellness/ambiance.jpg"
              alt="Relaxation lounge with tropical refreshment"
              imagePosition="right"
            >
              <SectionHeader
                eyebrow="Partner privileges"
                title="Your membership travels with you"
                description="Resident and Associate members receive preferred rates and priority booking at Luxury Wellness. Concierge can coordinate a same-day transfer between houses."
              />
            </ImageBlock>
          </Reveal>
        </div>
      </Section>

      <CTABanner
        eyebrow="Continue"
        title="Step into Luxury Wellness"
        description="Discover solo and couple treatments, facial rituals, Ayurveda, and the nail atelier."
        cta={{
          label: "Open Wellness Site",
          href: WELLNESS_SITE_URL,
          external: true,
        }}
        secondaryCta={{ label: "Back to City Club", href: "/" }}
        tone="ink"
      />
    </>
  );
}
