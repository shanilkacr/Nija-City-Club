import type { Metadata } from "next";
import Image from "next/image";
import {
  AmbianceHero,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui";
import { ContactForm } from "@/components/club/ContactForm";
import { CLUB_HOURS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nija City Club concierge — location, hours, and enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <AmbianceHero
        image="/images/contact/hero.jpg"
        alt="Concierge at Nija City Club"
        title="Concierge"
        description="Membership tours, day access, events, and general enquiries."
        height="medium"
        priority
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionHeader
              eyebrow="Visit"
              title="We are here"
              description="Share a few details and concierge will respond within one business day."
            />
            <dl className="mt-12 space-y-8 border-t border-line pt-10">
              <div>
                <dt className="eyebrow text-ink/45">Address</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/80">
                  {SITE.address}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/45">Telephone</dt>
                <dd className="mt-3 text-sm text-ink/80">
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/45">Email</dt>
                <dd className="mt-3 text-sm text-ink/80">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/45">Hours</dt>
                <dd className="mt-3 space-y-2 text-sm text-ink/80">
                  {CLUB_HOURS.map((row) => (
                    <p key={row.day}>
                      <span className="block text-ink">{row.day}</span>
                      {row.hours}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7" delayMs={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section tone="stone" contained={false}>
        <div className="relative mx-auto aspect-[21/9] max-w-content overflow-hidden bg-sand md:aspect-[2.4/1]">
          <Image
            src="/images/contact/ambiance.jpg"
            alt="Club ambiance"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Section>
    </>
  );
}
