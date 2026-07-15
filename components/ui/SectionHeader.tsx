import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  inverted?: boolean;
};

/**
 * Consistent section heading block — portable to shared package.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
  inverted = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow",
            inverted ? "text-cream/55" : "text-ink/50",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-(length:--text-h2) leading-snug",
          eyebrow && "mt-3",
          inverted ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-lg text-[13px] leading-[1.8]",
            inverted ? "text-cream/70" : "text-ink/65",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
