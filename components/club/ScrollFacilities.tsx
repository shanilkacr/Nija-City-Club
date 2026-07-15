"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FacilityPanel } from "@/config/club";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type ScrollFacilitiesProps = {
  panels: FacilityPanel[];
  className?: string;
};

/**
 * Scroll-driven facilities: sticky image (right) + expanding point copy (left).
 * Each panel links through to its destination page.
 */
export function ScrollFacilities({ panels, className }: ScrollFacilitiesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-facility]"),
      );

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [panels.length]);

  return (
    <section
      ref={rootRef}
      className={cn("border-t border-line bg-cream", className)}
    >
      <div className="mx-auto grid max-w-content lg:grid-cols-2">
        {/* Left — scroll text accordion */}
        <div className="px-[var(--section-x)] py-16 lg:py-24">
          <p className="eyebrow text-ink/45">Facilities</p>
          <h2 className="mt-3 font-display text-(length:--text-h2)">
            Inside the club
          </h2>

          <ul className="mt-12">
            {panels.map((panel, i) => {
              const isActive = i === active;
              return (
                <li
                  key={panel.id}
                  data-facility
                  className="border-t border-line last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-4 py-5 text-left transition-colors",
                      isActive ? "text-ink" : "text-ink/35 hover:text-ink/60",
                    )}
                  >
                    <span className="font-display text-lg md:text-xl">
                      {panel.label}
                    </span>
                    <span className="text-[10px] tracking-[0.18em] text-ink/40 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8">
                        <p className="max-w-md text-[13px] leading-relaxed text-ink/65">
                          {panel.blurb}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {panel.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-3 text-[13px] leading-relaxed text-ink/75"
                            >
                              <span className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={panel.href}
                          className="mt-6 inline-block text-[11px] tracking-[0.16em] text-accent uppercase underline underline-offset-4"
                        >
                          Explore {panel.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — sticky imagery */}
        <div className="relative hidden min-h-[100vh] lg:block">
          <div className="sticky top-0 h-screen overflow-hidden bg-sand">
            {panels.map((panel, i) => (
              <div
                key={panel.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  i === active ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={i !== active}
              >
                <Image
                  src={panel.image}
                  alt={panel.label}
                  fill
                  priority={i === 0}
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile imagery — follows active panel */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:hidden">
        {panels.map((panel, i) => (
          <div
            key={panel.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={panel.image}
              alt={panel.label}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
