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

const DRAG_THRESHOLD = 5;

/**
 * Continuous auto-scrolling image strip — duplicated track for seamless loop.
 * Also drag-scrollable for mouse and touch: auto-scroll pauses while
 * dragging and resumes from wherever the drag left off. Touch gestures are
 * direction-locked so a mostly-vertical swipe still scrolls the page
 * normally instead of being captured by the strip.
 */
export function ImageSnapStrip({ items, className }: ImageSnapStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let offset = 0;
    const speed = 0.35; // px per frame — smooth & slow

    let isPointerDown = false;
    let isDragging = false;
    let directionLocked: "horizontal" | "vertical" | null = null;
    let startX = 0;
    let startY = 0;
    let startOffset = 0;

    const isDragPointer = (type: string) => type === "mouse" || type === "touch";

    const applyOffset = () => {
      const half = track.scrollWidth / 2;
      // Wrap into [0, half) so the loop stays seamless whichever direction
      // offset is moved — forward by auto-scroll, either way by a drag.
      if (half > 0) {
        offset = ((offset % half) + half) % half;
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const tick = () => {
      if (!isDragging) {
        offset += speed;
        applyOffset();
      }
      frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!isDragPointer(e.pointerType)) return;
      isPointerDown = true;
      isDragging = false;
      directionLocked = null;
      startX = e.clientX;
      startY = e.clientY;
      startOffset = offset;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown || !isDragPointer(e.pointerType)) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (!directionLocked) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD && Math.abs(deltaY) < DRAG_THRESHOLD) return;
        // Whichever axis moved further decides the gesture: a mostly-
        // vertical touch keeps scrolling the page, a mostly-horizontal one
        // drives the strip.
        directionLocked = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
        if (directionLocked === "horizontal") {
          isDragging = true;
          wrap.style.cursor = "grabbing";
          document.body.style.userSelect = "none";
        }
      }

      if (directionLocked !== "horizontal") return;

      e.preventDefault();
      offset = startOffset - deltaX;
      applyOffset();
    };

    const reset = () => {
      if (isDragging) {
        wrap.style.cursor = "";
        document.body.style.userSelect = "";
      }
      isPointerDown = false;
      isDragging = false;
      directionLocked = null;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDragPointer(e.pointerType)) return;
      reset();
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    // No pointer capture in use, so a drag that exits the browser window
    // (fast flick past the edge, releasing outside it) wouldn't otherwise
    // get a pointerup at all — reset defensively on blur too.
    window.addEventListener("blur", reset);

    if (!reduced) {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", reset);
      wrap.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [items]);

  const loop = [...items, ...items];

  return (
    <section className={cn("overflow-hidden bg-stone py-[var(--section-y)]", className)}>
      <div className="mb-6 md:mb-8 px-[var(--section-x)]">
        <p className="eyebrow text-ink/45">Inside the club</p>
        <h2 className="mt-2 md:mt-3 font-display text-(length:--text-h2) text-ink">
          A day in motion
        </h2>
      </div>

      <div
        ref={wrapRef}
        className="relative cursor-grab touch-pan-y overflow-hidden"
      >
        {/* touch-pan-y: let vertical page scroll pass through natively;
            horizontal drag is captured in JS via the direction-locked
            pointer handlers above. */}
        <div
          ref={trackRef}
          className="flex w-max gap-2 will-change-transform sm:gap-3 md:gap-4"
        >
          {loop.map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href={item.href}
              draggable={false}
              className="group relative aspect-[3/4] w-[60vw] shrink-0 overflow-hidden bg-sand select-none no-native-drag xs:w-[50vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw]"
              tabIndex={i >= items.length ? -1 : undefined}
              aria-hidden={i >= items.length}
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, (min-width: 640px) 42vw, 60vw"
                className="no-native-drag object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 md:bottom-5 md:left-5 font-display text-base md:text-lg tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
                {item.caption}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
