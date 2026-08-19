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

    // The pinned scroll-scrubbed accordion is a desktop (two-column) effect.
    // Below `lg` it scroll-jacks the page and pins for many screen-heights,
    // so on smaller screens the panels behave as a plain, tap-to-open
    // accordion in normal document flow instead.
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let ctx: gsap.Context | undefined;

    const setup = (isDesktop: boolean) => {
      ctx?.revert();
      ctx = undefined;
      if (!isDesktop || panels.length === 1) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * (panels.length - 1) * 0.5}`,
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
    };

    setup(desktopQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setup(e.matches);
    desktopQuery.addEventListener("change", onChange);

    return () => {
      desktopQuery.removeEventListener("change", onChange);
      ctx?.revert();
    };
  }, [panels.length]);

  return (
    <section
      ref={rootRef}
      className={cn("relative snap-start bg-cream", className)}
    >
      <div
        ref={pinRef}
        className="flex flex-col bg-cream lg:h-screen lg:min-h-screen"
      >
        <div className="mx-auto flex h-full w-full max-w-content flex-col px-[var(--section-x)] py-12 md:py-16 lg:py-24">
          <div className="grid min-h-0 flex-1 items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16">
            {/* Left — title + facility accordion */}
            <div className="flex min-h-0 flex-col lg:self-stretch">
              <h2 className="shrink-0 font-display text-(length:--text-h2)">
                Inside the club
              </h2>

              <div className="mt-6 md:mt-8 overflow-y-auto">
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
                            "flex w-full items-baseline justify-between gap-4 py-3 md:py-3.5 text-left transition-colors",
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
                            <div className="pb-4 md:pb-5">
                              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-sand sm:aspect-[16/9] lg:hidden">
                                <Image
                                  src={panel.image}
                                  alt={panel.label}
                                  fill
                                  sizes="100vw"
                                  className="object-cover"
                                />
                              </div>
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

            {/* Right — imagery (desktop only; mobile shows the image inline per-panel) */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
