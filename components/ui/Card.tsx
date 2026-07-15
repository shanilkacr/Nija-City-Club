import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardProps = {
  children: ReactNode;
  className?: string;
  /** Prefer flat luxury panels over heavy card chrome. */
  bordered?: boolean;
  padded?: boolean;
};

/**
 * Base card / panel. Cards are reserved for interactive containers;
 * borders are optional so non-interactive uses stay flat.
 */
export function Card({
  children,
  className,
  bordered = true,
  padded = true,
}: CardProps) {
  return (
    <div
      className={cn(
        bordered && "border border-line",
        padded && "p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
