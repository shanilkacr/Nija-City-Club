import type { Metadata } from "next";
import {
  AmbianceHero,
  CTABanner,
  ImageBlock,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Café",
  description:
    "The Nija City Club café — quiet tables, light plates, and considered coffee.",
};

export default function CafePage() {
  return (
    <>
      <AmbianceHero
        image="/images/cafe/hero.jpg"
        alt="Café atmosphere at Nija City Club"
        title="A table between meetings"
        description="Light plates, slow coffee, and a room that stays unhurried — for members who need a calm pause mid-day."
        cta={{ label: "Enquire for booking", href: "/contact" }}
        height="tall"
        priority
      />

      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              align="center"
              eyebrow="The room"
              title="Warm, social, never loud"
              description="Daylight tables for breakfast and lunch; softer evenings for after-work gatherings. Member rates apply; guests welcome with a member."
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="stone" contained={false}>
        <div className="mx-auto max-w-content px-[var(--section-x)] py-[var(--section-y)]">
          <Reveal>
            <ImageBlock
              layout="split"
              image="/images/cafe/ambiance.jpg"
              alt="Café detail and setting"
              imagePosition="left"
            >
              <SectionHeader
                eyebrow="The menu"
                title="Plates that respect the day ahead"
                description="Seasonal salads, bowls, pastry, and tea — refined rather than heavy. Private dining for larger tables is available through Event Space."
              />
            </ImageBlock>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <ImageBlock
            layout="grid"
            image="/images/cafe/refreshment.jpg"
            alt="Refreshment service"
            secondaryImage="/images/cafe/detail.jpg"
            secondaryAlt="Café finish detail"
            aspect="portrait"
          />
        </Reveal>
        <Reveal>
          <div className="mx-auto mt-16 max-w-xl text-center">
            <p className="eyebrow text-ink/50">Hours</p>
            <p className="mt-4 font-display text-2xl">
              Daily · 7:30am – 8:00pm
            </p>
            <p className="mt-3 text-sm text-ink/65">
              Last kitchen seating one hour before close.
            </p>
          </div>
        </Reveal>
      </Section>

      <CTABanner
        title="Reserve a table"
        description="Walk-ins welcome for members. Larger parties and private corners via concierge."
        cta={{ label: "Contact", href: "/contact" }}
        secondaryCta={{ label: "Private Dining", href: "/event-space#dining" }}
        tone="stone"
      />
    </>
  );
}
