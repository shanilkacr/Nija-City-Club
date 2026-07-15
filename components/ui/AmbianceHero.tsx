import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export type AmbianceHeroProps = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string; external?: boolean };
  /** Full-bleed height. Default ~92vh Aman-style. */
  height?: "screen" | "tall" | "medium";
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
 * Full-bleed ambiance hero — H1, supporting line, single CTA only.
 * No gradient overlays (flat scrim for legibility when needed).
 */
export function AmbianceHero({
  image,
  alt,
  title,
  description,
  cta,
  height = "screen",
  align = "bottom",
  priority = false,
  className,
  children,
}: AmbianceHeroProps) {
  return (
    <section
      className={cn(
        "relative flex w-full overflow-hidden",
        heightClass[height],
        align === "center" ? "items-center" : "items-end",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {/* Flat scrim — no gradients */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative mx-auto w-full max-w-content px-[var(--section-x)] pb-16 md:pb-24">
        <h1 className="max-w-xl font-display text-(length:--text-hero) leading-[1.08] text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/80">
            {description}
          </p>
        ) : null}
        {cta ? (
          <div className="mt-8">
            <Button href={cta.href} external={cta.external} variant="outlineLight">
              {cta.label}
            </Button>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
