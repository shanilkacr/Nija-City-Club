import type { Metadata } from "next";
import {
  AmbianceHero,
  CTABanner,
  ImageBlock,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";
import { ServiceCard } from "@/components/club/ServiceCard";
import { EVENT_SERVICES } from "@/config/content";

export const metadata: Metadata = {
  title: "Event Space",
  description:
    "Meeting rooms, treatments, conferences, and private dining at Nija City Club.",
};

export default function EventSpacePage() {
  return (
    <>
      <AmbianceHero
        image="/images/event-space/hero.jpg"
        alt="Private event atmosphere"
        title="Gather with purpose"
        description="Boardrooms, receptions, in-house treatments, and private dining — hosted with the same restraint as the club floors."
        cta={{ label: "Explore spaces", href: "#meetings" }}
        height="tall"
        priority
      />

      <Section>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Host"
            title="Four settings"
            className="mb-14"
          />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_SERVICES.map((service, i) => (
            <Reveal key={service.id} delayMs={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="meetings" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/event-space/meeting.jpg"
            alt="Meeting space ambiance"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Meeting Spaces"
              title="Boardrooms and breakouts"
              description="Natural light, discreet AV, and service that stays in the background. Ideal for half-day workshops and executive sessions."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="treatment">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/event-space/treatment.jpg"
            alt="Treatment offering for hosted guests"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Treatment"
              title="Wellness woven into the agenda"
              description="Partner with Luxury Wellness to add express treatments for speakers, teams, or celebration guests — coordinated by a single concierge."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="events" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/event-space/events.jpg"
            alt="Events and conference setting"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Events & Conferences"
              title="Reception-ready rooms"
              description="Product launches, offsites, and evening receptions — with catering from the café kitchen and overflow into terrace areas when season allows."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="dining">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/event-space/dining.jpg"
            alt="Private dining"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Private Dining"
              title="Tables for celebration"
              description="Intimate seated dinners and tasting menus for milestones, investor evenings, and family gatherings."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <CTABanner
        title="Plan your gathering"
        description="Share dates and headcount — concierge will propose rooms and menus within one business day."
        cta={{ label: "Enquire", href: "/contact" }}
        secondaryCta={{ label: "Café", href: "/cafe" }}
      />
    </>
  );
}
