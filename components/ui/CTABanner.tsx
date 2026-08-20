import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Section } from "./Section";

export type CTABannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
  tone?: "cream" | "stone" | "ink";
  className?: string;
  /** Keep the two buttons side by side on mobile instead of stacking. Only
   * safe for short labels — defaults to the stacked, full-width behavior. */
  mobileInlineButtons?: boolean;
};

/**
 * Full-width closing / mid-page CTA band.
 */
export function CTABanner({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
  tone = "ink",
  className,
  mobileInlineButtons = false,
}: CTABannerProps) {
  const inverted = tone === "ink";

  return (
    <Section tone={tone} className={className}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {eyebrow ? (
          <p className={cn("eyebrow", inverted ? "text-cream/55" : "text-ink/50")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "mt-2 sm:mt-3 font-display text-(length:--text-h2) leading-snug",
            inverted ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mx-auto mt-3 sm:mt-4 max-w-md text-[13px]",
              inverted ? "text-cream/70" : "text-ink/65",
            )}
          >
            {description}
          </p>
        ) : null}
        <div
          className={cn(
            "mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3",
            mobileInlineButtons ? "flex-row" : "flex-col sm:flex-row",
          )}
        >
          <Button
            href={cta.href}
            external={cta.external}
            variant={inverted ? "outlineLight" : "solid"}
            className={mobileInlineButtons ? undefined : "w-full sm:w-auto"}
          >
            {cta.label}
          </Button>
          {secondaryCta ? (
            <Button
              href={secondaryCta.href}
              variant={inverted ? "outlineLight" : "outline"}
              className={mobileInlineButtons ? undefined : "w-full sm:w-auto"}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
