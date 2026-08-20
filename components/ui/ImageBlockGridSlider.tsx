"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const GAP_PX = 16; // matches gap-4

export type ImageBlockGridSliderProps = {
  image: string;
  alt: string;
  secondaryImage: string;
  secondaryAlt?: string;
  aspectClassName: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Mobile: auto-advancing, swipeable snap slider (one image per view).
 * md+: reverts to the original side-by-side grid — no sliding, no timers.
 */
export function ImageBlockGridSlider({
  image,
  alt,
  secondaryImage,
  secondaryAlt,
  aspectClassName,
  className,
  children,
}: ImageBlockGridSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resumeTimeout: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    const slideStep = () => track.clientWidth + GAP_PX;

    const advance = () => {
      const maxIndex = track.children.length - 1;
      index = index >= maxIndex ? 0 : index + 1;
      track.scrollTo({ left: index * slideStep(), behavior: "smooth" });
    };

    const stop = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = undefined;
    };

    const start = () => {
      stop();
      intervalId = setInterval(advance, 3500);
    };

    // Pause on genuine touch/pointer interaction only — not on the scroll
    // events our own `advance()` generates — then resume once momentum
    // scrolling has settled, picking up from wherever the user left it.
    const onPointerDown = () => {
      stop();
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };

    const onPointerUp = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        index = Math.round(track.scrollLeft / slideStep());
        start();
      }, 500);
    };

    const setup = (isMobile: boolean) => {
      stop();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      if (!isMobile) return;
      index = 0;
      start();
    };

    setup(mobileQuery.matches);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointerup", onPointerUp);

    const onChange = (e: MediaQueryListEvent) => setup(e.matches);
    mobileQuery.addEventListener("change", onChange);

    return () => {
      stop();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointerup", onPointerUp);
      mobileQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className={cn(
        "flex snap-x-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 md:overflow-visible",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 snap-start overflow-hidden bg-sand md:w-auto",
          aspectClassName,
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          "relative w-full shrink-0 snap-start overflow-hidden bg-sand md:w-auto",
          aspectClassName,
        )}
      >
        <Image
          src={secondaryImage}
          alt={secondaryAlt ?? ""}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {children}
    </div>
  );
}
