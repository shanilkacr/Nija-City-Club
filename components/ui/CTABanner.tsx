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
            "mt-3 font-display text-(length:--text-h2) leading-snug",
            inverted ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mx-auto mt-4 max-w-md text-[13px]",
              inverted ? "text-cream/70" : "text-ink/65",
            )}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={cta.href}
            external={cta.external}
            variant={inverted ? "outlineLight" : "solid"}
          >
            {cta.label}
          </Button>
          {secondaryCta ? (
            <Button
              href={secondaryCta.href}
              variant={inverted ? "outlineLight" : "outline"}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
