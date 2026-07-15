import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/config/content";
import { cn } from "@/lib/cn";

export type ServiceCardProps = {
  service: ServiceItem;
  className?: string;
  /** Prefer image-led layout when available. */
  variant?: "image" | "text";
};

/**
 * Service / amenity card — Fitness, Swimming, Event Space sub-items.
 */
export function ServiceCard({
  service,
  className,
  variant = "image",
}: ServiceCardProps) {
  const content = (
    <>
      {variant === "image" && service.image ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 768px) 25vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}
      {service.eyebrow ? (
        <p className="eyebrow mt-5 text-ink/45">{service.eyebrow}</p>
      ) : null}
      <p
        className={cn(
          "font-display text-lg md:text-xl",
          service.eyebrow ? "mt-1.5" : "mt-4",
          variant === "text" && "mt-0",
        )}
      >
        {service.title}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
        {service.description}
      </p>
      <span className="mt-3 inline-block text-[10px] tracking-[0.14em] text-accent uppercase">
        Discover
      </span>
    </>
  );

  return (
    <Link href={service.href} className={cn("group block", className)}>
      {content}
    </Link>
  );
}
