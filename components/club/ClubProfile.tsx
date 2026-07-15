"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CLUB_AMENITIES,
  CLUB_INTRO,
  CLUB_RULES,
  MORE_INFO,
  OPENING_HOURS,
  type EditorialSplit,
} from "@/config/club";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const editorialImageColumnClass =
  "flex items-center justify-center py-10 lg:py-14";
const editorialImageFrameClass =
  "relative aspect-square w-full max-w-[300px] overflow-hidden bg-sand sm:max-w-[360px] lg:max-w-[400px]";

/** Centered club introduction — no address column. */
export function ClubIntro() {
  return (
    <section className="mx-auto max-w-content px-[var(--section-x)] py-[var(--section-y)]">
      <Reveal>
        <div className="mx-auto max-w-2xl space-y-5 text-center text-[13px] leading-[1.85] text-ink/70">
          <p>{CLUB_INTRO.locationLine}</p>
          <p>{CLUB_INTRO.prestige}</p>
          <p className="font-display text-lg leading-snug text-ink md:text-xl">
            {CLUB_INTRO.oasis}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/** Amenities — capped at 90vh. */
export function ClubAmenities() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector("[data-amenities-image]"),
        { scale: 1.04 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-white">
      <div className="mx-auto grid w-full max-w-content items-center gap-8 px-[var(--section-x)] lg:grid-cols-2 lg:gap-14">
        <div className={cn(editorialImageColumnClass, "lg:order-2")}>
          <div data-amenities-image className={editorialImageFrameClass}>
            <Image
              src={CLUB_AMENITIES.image}
              alt="Club amenities atmosphere"
              fill
              sizes="(min-width: 1024px) 400px, 360px"
              className="object-cover"
            />
          </div>
        </div>
        <Reveal className="lg:order-1">
          <p className="eyebrow text-ink/45">{CLUB_AMENITIES.eyebrow}</p>
          <h2 className="mt-3 font-display text-(length:--text-h2) leading-snug">
            {CLUB_AMENITIES.title}
          </h2>
          <p className="mt-5 max-w-md text-[13px] leading-[1.85] text-ink/65">
            {CLUB_AMENITIES.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ClubRules() {
  return (
    <section className="mx-auto max-w-content px-[var(--section-x)] py-[var(--section-y)]">
      <Reveal>
        <p className="eyebrow text-ink/45">Club Rules</p>
        <h2 className="mt-3 font-display text-(length:--text-h2)">
          How we keep the house quiet
        </h2>
      </Reveal>
      <ul className="mt-10 grid gap-0 border-t border-line md:grid-cols-2">
        {CLUB_RULES.map((rule, i) => (
          <Reveal key={rule.id} delayMs={i * 60}>
            <li
              className={cn(
                "border-b border-line py-6 md:px-6 md:py-8",
                i % 2 === 0 && "md:border-r",
              )}
            >
              <p className="text-[12px] tracking-[0.14em] text-ink uppercase">
                {rule.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                {rule.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function ClubHours() {
  return (
    <section className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-content gap-12 px-[var(--section-x)] py-[var(--section-y)] lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-ink/45">Opening Hours</p>
          <h2 className="mt-3 font-display text-(length:--text-h2)">
            When the doors are open
          </h2>
          <p className="mt-4 max-w-sm text-[13px] text-ink/60">
            {MORE_INFO.parking}
          </p>
          <p className="mt-3 max-w-sm text-[13px] text-ink/50">
            {MORE_INFO.charges}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-4" delayMs={60}>
          <p className="mb-4 text-[11px] tracking-[0.16em] text-ink/45 uppercase">
            Club
          </p>
          <ul className="space-y-2.5">
            {OPENING_HOURS.club.map((row) => (
              <li
                key={row.day}
                className="flex items-baseline justify-between gap-4 border-b border-line/80 pb-2.5 text-[13px]"
              >
                <span className="text-ink/70">{row.day}</span>
                <span className="shrink-0 text-ink">{row.hours}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-3" delayMs={100}>
          <p className="mb-4 text-[11px] tracking-[0.16em] text-ink/45 uppercase">
            Spa & Fitness
          </p>
          <ul className="space-y-4">
            {OPENING_HOURS.spaFitness.map((row) => (
              <li key={row.day} className="text-[13px]">
                <span className="block text-ink/70">{row.day}</span>
                <span className="mt-1 block text-ink">{row.hours}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Two-column editorial image + text — same height language as Amenities. */
export function EditorialImageSplit({ item }: { item: EditorialSplit }) {
  const imageRight = item.imagePosition !== "left";

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid w-full max-w-content items-center gap-8 px-[var(--section-x)] lg:grid-cols-2 lg:gap-14">
        <div
          className={cn(
            editorialImageColumnClass,
            imageRight ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div className={editorialImageFrameClass}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 400px, 360px"
              className="object-cover"
            />
          </div>
        </div>
        <Reveal className={imageRight ? "lg:order-1" : "lg:order-2"}>
          <p className="eyebrow text-ink/45">{item.eyebrow}</p>
          <h2 className="mt-3 font-display text-(length:--text-h2) leading-snug">
            {item.title}
          </h2>
          <p className="mt-5 max-w-md text-[13px] leading-[1.85] text-ink/65">
            {item.body}
          </p>
          <Link
            href={item.href}
            className="mt-7 inline-block text-[11px] tracking-[0.16em] uppercase underline underline-offset-4"
          >
            {item.ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
