"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  HERO_SCROLL_DISTANCE,
  heroParallaxYFromProgress,
  heroScaleFromProgress,
  subscribeHeroScroll,
} from "@/lib/hero-scroll";
import { Button } from "./Button";

export type AmbianceHeroProps = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string; external?: boolean };

  /** Full-bleed height. Default ~92vh Aman-style. */
  height?: "screen" | "tall" | "medium";

  /** Hero content alignment */
  align?: "bottom" | "center";

  priority?: boolean;
  className?: string;
  children?: ReactNode;
};

const heightClass = {
  screen: "h-[92vh] min-h-[560px]",
  tall: "h-[78vh] min-h-[480px]",
  medium: "h-[56vh] min-h-[360px]",
} as const;

/**
 * Full-bleed ambiance hero.
 *
 * Bottom alignment:
 * - Existing/default behavior
 * - Content sits toward the bottom of the image
 *
 * Center alignment:
 * - Content is centered horizontally and vertically
 * - Eyebrow, title, description and CTA are centered
 */
export function AmbianceHero({
  image,
  alt,
  eyebrow,
  title,
  description,
  cta,
  height = "screen",
  align = "bottom",
  priority = false,
  className,
  children,
}: AmbianceHeroProps) {
  const spacerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;

    if (!spacer || !stage || !frame) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const syncSpacer = () => {
      const stageH = window.innerHeight;

      spacer.style.height = `${stageH + HERO_SCROLL_DISTANCE}px`;
      stage.style.height = `${stageH}px`;
    };

    const pin = () => {
      stage.style.position = "fixed";
      stage.style.top = "0";
      stage.style.right = "0";
      stage.style.bottom = "auto";
      stage.style.left = "0";
    };

    const release = () => {
      stage.style.position = "absolute";
      stage.style.top = "auto";
      stage.style.right = "0";
      stage.style.bottom = "0";
      stage.style.left = "0";
    };

    const apply = (progress: number) => {
      syncSpacer();

      if (progress < 1) {
        pin();
      } else {
        release();
      }

      if (reduceMotion) {
        frame.style.transform = "";
        return;
      }

      const p = Math.min(progress, 1);

      const scale = heroScaleFromProgress(p);

      const y = heroParallaxYFromProgress(
        p,
        window.innerHeight,
        frame.offsetHeight,
      );

      frame.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    };

    syncSpacer();
    apply(0);

    return subscribeHeroScroll(apply);
  }, []);

  const isCentered = align === "center";

  return (
    <section
      ref={spacerRef}
      className={cn(
        "relative w-full bg-cream",
        className,
      )}
      style={{
        height: `calc(100svh + ${HERO_SCROLL_DISTANCE}px)`,
      }}
    >
      <div
        ref={stageRef}
        className="fixed inset-x-0 top-0 z-10 flex h-svh w-full items-start justify-center overflow-hidden bg-cream"
      >
        <div
          ref={frameRef}
          className={cn(
            "relative flex w-full origin-center overflow-hidden will-change-transform",
            heightClass[height],

            // Vertical alignment
            isCentered ? "items-center" : "items-end",
          )}
        >
          {/* Hero image */}
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark scrim */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content */}
          <div
            className={cn(
              "relative mx-auto w-full max-w-content px-[var(--section-x)]",

              // Bottom aligned hero
              !isCentered && "pb-16 md:pb-24",

              // Centered hero
              isCentered &&
              "flex h-full items-center justify-center text-center",
            )}
          >
            <div
              className={cn(
                "w-full",

                // Bottom aligned content width
                !isCentered && "max-w-2xl",

                // Centered content width
                isCentered && "mx-auto max-w-3xl",
              )}
            >
              {/* Eyebrow */}
              {eyebrow ? (
                <p
                  className={cn(
                    "eyebrow text-white/55",
                    isCentered && "text-center",
                  )}
                >
                  {eyebrow}
                </p>
              ) : null}

              {/* Title */}
              <h1
                className={cn(
                  "font-display text-(length:--text-hero) leading-[1.08] text-white",

                  eyebrow && "mt-3",

                  // Bottom hero
                  !isCentered && "max-w-xl",

                  // Centered hero
                  isCentered && "mx-auto max-w-4xl text-center",
                )}
              >
                {title}
              </h1>

              {/* Description */}
              {description ? (
                <p
                  className={cn(
                    "mt-5 text-[13px] leading-relaxed text-white/80",

                    // Bottom hero
                    !isCentered && "max-w-md",

                    // Centered hero
                    isCentered &&
                    "mx-auto max-w-2xl text-center",
                  )}
                >
                  {description}
                </p>
              ) : null}

              {/* CTA */}
              {cta ? (
                <div
                  className={cn(
                    "mt-8",
                    isCentered && "flex justify-center",
                  )}
                >
                  <Button
                    href={cta.href}
                    external={cta.external}
                    variant="outlineLight"
                  >
                    {cta.label}
                  </Button>
                </div>
              ) : null}

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
