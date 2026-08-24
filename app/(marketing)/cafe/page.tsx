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
      {/* Hero */}
      <AmbianceHero
        image="/images/cafe/hero2.jpg"
        alt="Café atmosphere at Nija City Club"
        eyebrow="A Table Between Meetings"
        title="A Private Café & Dining Experience in Colombo"
        description="NIJA Café & Dining provides a calm setting for coffee, breakfast, lunch, informal meetings, private dining, and after-work gatherings."
        cta={{ label: "Enquire for booking", href: "/contact" }}
        height="tall"
        desktopStatic
        priority
      />

      {/* The Room */}
      <Section>
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Eyebrow */}
            <p className="eyebrow text-center text-ink/50">
              The room
            </p>

            {/* Heading */}
            <h2 className="mt-6 text-center font-display text-4xl leading-tight text-ink md:text-5xl">
              A Calm Place to Meet
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 w-full max-w-xl text-center text-base leading-8 text-ink/65">
              Designed for conversation rather than noise, the Club's dining
              environment provides a comfortable setting for members and their
              guests. Meet a client, catch up with friends, enjoy lunch, or simply
              take a break from the city.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* The Menu */}
      <Section tone="stone" contained={false}>
        <div className="mx-auto max-w-content px-[var(--section-x)] py-[var(--section-y)]">
          <Reveal>
            <ImageBlock
              layout="split"
              image="/images/cafe/cafe.jpg"
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

      {/* Café Details */}
      <Section>
        <Reveal>
          <ImageBlock
            layout="grid"
            image="/images/cafe/refreshment2.jpg"
            alt="Refreshment service"
            secondaryImage="/images/cafe/refreshment1.jpg"
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

      {/* CTA */}
      <CTABanner
        title="Reserve a table"
        description="Walk-ins welcome for members. Larger parties and private corners via concierge."
        cta={{ label: "Contact", href: "/contact" }}
        secondaryCta={{
          label: "Private Dining",
          href: "/event-space#dining",
        }}
        tone="stone"
        mobileInlineButtons
      />
    </>
  );
}