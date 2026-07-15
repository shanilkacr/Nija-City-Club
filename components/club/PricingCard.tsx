import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PricingTier } from "@/config/content";
import { cn } from "@/lib/cn";

export type PricingCardProps = {
  tier: PricingTier;
  className?: string;
};

/**
 * Pricing / membership tier card — reused on Fitness (gym) and Membership.
 * Alias: MembershipTierCard.
 */
export function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        tier.highlighted && "border-accent bg-stone/40",
        className,
      )}
    >
      <p className="eyebrow text-ink/45">{tier.name}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <p className="font-display text-2xl md:text-[1.75rem]">{tier.price}</p>
        {tier.period ? (
          <span className="text-[12px] text-ink/50">{tier.period}</span>
        ) : null}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/65">
        {tier.description}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
        {tier.features.map((feature) => (
          <li key={feature} className="text-[13px] text-ink/75">
            <span className="mr-3 inline-block h-px w-3 bg-accent align-middle" />
            {feature}
          </li>
        ))}
      </ul>
      {tier.ctaHref ? (
        <div className="mt-8">
          <Button
            href={tier.ctaHref}
            variant={tier.highlighted ? "solid" : "outline"}
            className="w-full"
          >
            {tier.ctaLabel ?? "Enquire"}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

/** Semantic alias for membership pages. */
export const MembershipTierCard = PricingCard;
