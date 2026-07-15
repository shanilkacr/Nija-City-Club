"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "fade" | "scale";
  delayMs?: number;
};

/**
 * Intersection-based scroll reveal. Portable UI primitive — no design tokens
 * beyond animation classes defined in globals.css.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass =
    variant === "fade"
      ? "reveal reveal-fade"
      : variant === "scale"
        ? "reveal reveal-scale"
        : "reveal";

  return (
    <div
      ref={ref}
      className={cn(variantClass, className)}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
