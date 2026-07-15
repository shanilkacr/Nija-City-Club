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
 * Scroll-driven facilities: pinned viewport with image (right) + accordion (left).
 * Scroll progress advances panels while the section stays fixed.
 */
export function ScrollFacilities({ panels, className }: ScrollFacilitiesProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin || panels.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (panels.length === 1) return;

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * (panels.length - 1)}`,
        pin: pin,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.15, max: 0.45 },
          delay: 0.05,
        },
        onUpdate: (self) => {
          const index = Math.min(
            panels.length - 1,
            Math.round(self.progress * (panels.length - 1)),
          );
          setActive((prev) => (prev === index ? prev : index));
        },
      });
    }, root);

    return () => ctx.revert();
  }, [panels.length]);

  return (
    <section
      ref={rootRef}
      className={cn("relative snap-start bg-cream", className)}
    >
      <div
        ref={pinRef}
        className="flex h-screen flex-col bg-cream"
      >
        <div className="mx-auto flex h-full w-full max-w-content flex-col px-[var(--section-x)] py-16 md:py-20 lg:py-24">
          <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(10rem,40%)] items-stretch gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16">
            {/* Left — title + facility accordion */}
            <div className="flex min-h-0 flex-col lg:self-stretch">
              <h2 className="shrink-0 font-display text-(length:--text-h2)">
                Inside the club
              </h2>

              <div className="mt-8">
                <ul>
                  {panels.map((panel, i) => {
                    const isActive = i === active;
                    return (
                      <li
                        key={panel.id}
                        className="border-t border-line last:border-b"
                      >
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          className={cn(
                            "flex w-full items-baseline justify-between gap-4 py-3.5 text-left transition-colors",
                            isActive
                              ? "text-ink"
                              : "text-ink/35 hover:text-ink/60",
                          )}
                        >
                          <span className="font-display text-(length:--text-h3)">
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
                            <div className="pb-5">
                              <p className="max-w-sm text-[13px] leading-relaxed text-ink/65">
                                {panel.blurb}
                              </p>
                              <Link
                                href={panel.href}
                                className="mt-3 inline-block text-[11px] tracking-[0.16em] text-accent uppercase underline underline-offset-4"
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
            </div>

            {/* Right — imagery */}
            <div className="relative hidden min-h-0 overflow-hidden bg-sand lg:block">
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
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile imagery */}
            <div className="relative min-h-0 overflow-hidden bg-sand lg:hidden">
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
          </div>
        </div>
      </div>
    </section>
  );
}
