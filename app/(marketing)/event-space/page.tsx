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
        eyebrow="Gather with purpose"
        title="A Private Event & Meeting Venue in Colombo"
        description="NIJA City Club provides sophisticated spaces for business meetings, conferences, corporate events, private celebrations, product launches, and intimate dinners."
        cta={{ label: "Explore spaces", href: "#meetings" }}
        height="tall"
        desktopStatic
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
              eyebrow="Executive Meeting Spaces"
              title="Boardrooms and breakouts"
              description="Create the right environment for important conversations.

Our meeting spaces are suited to executive meetings, workshops, presentations, strategy sessions, and smaller corporate gatherings."
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
              eyebrow="Wellness for Your Event"
              title="Wellness woven into the agenda"
              description="For selected events, wellness experiences can be incorporated through NIJA Luxury Wellness.

Treatments can be coordinated for teams, speakers, guests, or private celebrations."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="events" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/event-space/events.jpg"
            alt="Corporate Events & Conferences"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Events & Conferences"
              title="Reception-ready rooms"
              description="Host conferences, launches, team gatherings, offsites, and receptions in a private club environment.

Catering, hospitality, and event coordination can be arranged through the Club."
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
              eyebrow="Private Dining Events"
              title="Tables for celebration"
              description="Create an intimate dining experience for business dinners, investor evenings, family occasions, celebrations, and special gatherings."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <CTABanner
        title="Plan your gathering"
        description="Share dates and headcount — concierge will propose rooms and menus within one business day."
        cta={{ label: "Enquire", href: "/contact" }}
        secondaryCta={{ label: "Café", href: "/cafe" }}
        mobileInlineButtons
      />
    </>
  );
}
