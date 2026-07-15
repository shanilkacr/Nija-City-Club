import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Visual tone — cream (default), stone wash, or inverted ink. */
  tone?: "cream" | "stone" | "ink";
  /** Constrain inner content to max width with standard padding. */
  contained?: boolean;
  as?: "section" | "div" | "aside";
};

/**
 * Page section wrapper — portable design-system primitive.
 */
export function Section({
  children,
  className,
  id,
  tone = "cream",
  contained = true,
  as: Tag = "section",
}: SectionProps) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-cream"
      : tone === "stone"
        ? "bg-stone text-ink"
        : "bg-cream text-ink";

  return (
    <Tag id={id} className={cn(toneClass, className)}>
      {contained ? (
        <div className="mx-auto w-full max-w-content px-[var(--section-x)] py-[var(--section-y)]">
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
