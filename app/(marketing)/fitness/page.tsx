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
        image="/images/fitness/hero.jpg"
        alt="Fitness studio atmosphere"
        title="Train with intention"
        description="A full gym floor, private coaching, studio practice, and recovery — paced for members who live between effort and rest."
        cta={{ label: "View Gym Access", href: "#gym" }}
        height="tall"
        priority
      />

      <Section id="gym">
        <Reveal>
          <SectionHeader
            eyebrow="Gym"
            title="Access that flexes with your calendar"
            description="Monthly, weekly, or day rates — for members and invited guests."
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
              eyebrow="Personal Trainer"
              title="Coaching shaped around you"
              description="Strength, mobility, athletic return, or quiet consistency. Sessions are booked through concierge and held on the gym floor or in private studios."
            />
          </ImageBlock>
        </Reveal>
      </Section>

      <Section id="yoga" tone="stone">
        <Reveal>
          <ImageBlock
            layout="split"
            image="/images/fitness/yoga.jpg"
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
            image="/images/fitness/pilates.jpg"
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
              eyebrow="Recovery"
              title="The other half of training"
              description="Soft tissue, stretch, and quiet rooms close the loop — so effort does not accumulate into fatigue."
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
