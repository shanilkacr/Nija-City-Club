import type { Metadata } from "next";
import {
  AmbianceHero,
  CTABanner,
  ImageBlock,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";
import { PricingCard } from "@/components/club/PricingCard";
import { ServiceCard } from "@/components/club/ServiceCard";
import { FITNESS_GYM_TIERS, FITNESS_SERVICES } from "@/config/content";

export const metadata: Metadata = {
  title: "Fitness",
  description:
    "Gym access, personal training, yoga, pilates, and recovery at Nija City Club.",
};

/**
 * Fitness remains a single page with anchor sections.
 * Decision: gym pricing + four supporting disciplines fit one scroll with
 * mega-menu anchors; splitting into subpages would thin content without
 * improving wayfinding. Revisit if each discipline gains long menus or booking.
 */
export default function FitnessPage() {
  return (
    <>
      <AmbianceHero
        image="/images/fitness/fitnesshero1.JPG"
        alt="Fitness studio atmosphere"
        eyebrow="Train With Intention"
        title="A Premium Fitness Club in Colombo"
        description="NIJA City Club brings together premium gym facilities, personal training, yoga, Pilates, mobility, and recovery in a private fitness environment designed for focused progress."
        cta={{ label: "View Gym Access", href: "#gym" }}
        height="tall"
        priority
      />

      <Section id="gym">
        <Reveal>
          <SectionHeader
            eyebrow="Gym"
            title="A Gym Designed Around Your Goals"
            description="Whether you are building strength, improving mobility, returning to training, or maintaining a consistent routine, NIJA provides a considered environment for purposeful exercise."
            className="mb-12"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {FITNESS_GYM_TIERS.map((tier, i) => (
            <Reveal key={tier.id} delayMs={i * 90}>
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="stone">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Studios & Coaching"
            title="Beyond the floor"
            className="mb-14"
          />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FITNESS_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <Section id="personal-trainer">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/fitness/training.jpg"
            alt="Personal training atmosphere"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Personal Training in Colombo"
              title="Coaching shaped around you"
              description="Work one-to-one with a personal trainer to create a training approach around your goals.

Sessions can focus on strength, mobility, conditioning, athletic performance, or returning to movement after time away."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="yoga" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/fitness/yoga1.jpg"
            alt="Yoga and stretch practice"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Yoga"
              title="Breath, alignment, unhurried effort"
              description="Mat classes and open studio hours favour presence over performance — suitable before work or as evening reset."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="pilates">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/fitness/pilates1.jpg"
            alt="Pilates studio setting"
            imagePosition="left"
          >
            <SectionHeader
              eyebrow="Pilates"
              title="Controlled strength"
              description="Apparatus and mat work guided by instructors who emphasise form, core integrity, and sustainable progress."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="recovery" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/fitness/recovery.jpg"
            alt="Recovery refreshment ritual"
            imagePosition="right"
          >
            <SectionHeader
              eyebrow="Recovery After Training"
              title="The other half of training"
              description="Training is only one part of performance.

NIJA's recovery experiences are designed to complement your workout with stretching, soft-tissue work, mobility, and dedicated spaces to slow down after exertion."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <CTABanner
        title="Add fitness to your membership"
        description="Resident privileges include unlimited gym access. Day and weekly rates are available for guests."
        cta={{ label: "Enquire", href: "/contact" }}
        secondaryCta={{ label: "Membership tiers", href: "/membership" }}
      />
    </>
  );
}
