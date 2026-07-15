"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { HOME_STORY_SNAPS } from "@/config/club";
import { cn } from "@/lib/cn";

type Snap = (typeof HOME_STORY_SNAPS)[number];

export type ImageSnapStripProps = {
  items: readonly Snap[];
  className?: string;
};

/**
 * Continuous auto-scrolling image strip — duplicated track for seamless loop.
 * No manual scroll cue; no gradient overlays.
 */
export function ImageSnapStrip({ items, className }: ImageSnapStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    let offset = 0;
    const speed = 0.35; // px per frame — smooth & slow

    const tick = () => {
      const half = track.scrollWidth / 2;
      offset += speed;
      if (offset >= half) offset = 0;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [items]);

  const loop = [...items, ...items];

  return (
    <section className={cn("overflow-hidden bg-ink py-[var(--section-y)]", className)}>
      <div className="mb-8 px-[var(--section-x)] md:mb-10">
        <p className="eyebrow text-cream/50">Inside the club</p>
        <h2 className="mt-3 font-display text-(length:--text-h2) text-cream">
          A day in motion
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-3 will-change-transform md:gap-4"
        >
          {loop.map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href={item.href}
              className="group relative aspect-[3/4] w-[68vw] shrink-0 overflow-hidden bg-sand sm:w-[42vw] md:w-[28vw] lg:w-[22vw]"
              tabIndex={i >= items.length ? -1 : undefined}
              aria-hidden={i >= items.length}
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 68vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-5 left-5 font-display text-lg tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
                {item.caption}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
