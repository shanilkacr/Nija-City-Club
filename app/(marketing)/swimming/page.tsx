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
import { SWIMMING_SERVICES } from "@/config/content";

export const metadata: Metadata = {
  title: "Swimming",
  description:
    "Pool access, swim training, and recovery at Nija City Club.",
};

export default function SwimmingPage() {
  return (
    <>
      <AmbianceHero
        image="/images/swimming/swimming.jpg"
        alt="Member relaxing at the club pool"
        eyebrow="Swim in Your Own Rhythm"
        title="Private Swimming in Colombo"
        description="NIJA City Club offers a private swimming environment for members who want purposeful training, relaxed immersion, and a quieter alternative to crowded public pools."
        cta={{ label: "Pool Access", href: "#pool" }}
        height="tall"
        desktopStatic
        priority
      />

      <Section>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="In the water"
            title="Three ways to arrive"
            className="mb-14"
          />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {SWIMMING_SERVICES.map((service, i) => (
            <Reveal key={service.id} delayMs={i * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="pool" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/swimming/swimming2.jpg"
            alt="Club swimming pool"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Pool Access"
              title="Lane and leisure, undisturbed"
              description="Morning lanes for disciplined swims, quieter mid-afternoon hours for immersion. Towel service and changing rooms included with member access."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="training">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/swimming/group1.jpg"
            alt="Swim training atmosphere"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Group & Individual Training"
              title="Technique, tempo, confidence"
              description="Improve technique, conditioning, confidence, and efficiency through individual or small-group coaching.

Whether you are returning to swimming or refining your stroke, sessions can be adapted to your experience and goals."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="recovery" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/swimming/recovery.JPG"
            alt="Post-swim recovery space"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Post-Swim Recovery"
              title="Warm down, then stillness"
              description="Complete your swimming session with time to warm down, hydrate, recover, and reset."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <CTABanner
        title="Reserve pool time"
        description="Pool privileges are included with Resident membership. Guest day access by arrangement."
        cta={{ label: "Contact Concierge", href: "/contact" }}
        secondaryCta={{ label: "Membership", href: "/membership" }}
        mobileInlineButtons
      />
    </>
  );
}
