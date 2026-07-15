import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ImageBlockLayout = "bleed" | "split" | "grid";

export type ImageBlockProps = {
  layout?: ImageBlockLayout;
  image: string;
  alt: string;
  secondaryImage?: string;
  secondaryAlt?: string;
  /** When layout is split: image on left or right. */
  imagePosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
  aspect?: "video" | "portrait" | "square" | "wide";
  priority?: boolean;
};

const aspectClass = {
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
} as const;

/**
 * Flexible imagery block — full-bleed, split editorial, or two-up grid.
 * Portable design-system primitive.
 */
export function ImageBlock({
  layout = "split",
  image,
  alt,
  secondaryImage,
  secondaryAlt,
  imagePosition = "left",
  children,
  className,
  aspect = "portrait",
  priority = false,
}: ImageBlockProps) {
  if (layout === "bleed") {
    return (
      <div className={cn("relative w-full overflow-hidden", aspectClass.wide, className)}>
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (layout === "grid" && secondaryImage) {
    return (
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 md:gap-6",
          className,
        )}
      >
        <div className={cn("relative overflow-hidden bg-sand", aspectClass[aspect])}>
          <Image src={image} alt={alt} fill sizes="50vw" className="object-cover" />
        </div>
        <div className={cn("relative overflow-hidden bg-sand", aspectClass[aspect])}>
          <Image
            src={secondaryImage}
            alt={secondaryAlt ?? ""}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        {children}
      </div>
    );
  }

  /* split */
  return (
    <div
      className={cn(
        "grid items-center gap-12 md:grid-cols-2 md:gap-20",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sand",
          aspectClass[aspect],
          imagePosition === "right" && "md:order-2",
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className={imagePosition === "right" ? "md:order-1" : undefined}>
        {children}
      </div>
    </div>
  );
}
