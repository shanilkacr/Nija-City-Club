import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "outline" | "ghost" | "outlineLight";
export type ButtonSize = "md" | "sm";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "border border-ink bg-ink text-cream hover:bg-accent hover:border-accent",
  outline:
    "border border-ink/70 text-ink hover:bg-ink hover:text-cream",
  outlineLight:
    "border border-cream/70 text-cream hover:bg-cream hover:text-ink",
  ghost:
    "border border-transparent text-ink underline underline-offset-4 hover:text-ink/70",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-2.5 text-[11px] tracking-[0.14em]",
  sm: "px-4 py-2 text-[10px] tracking-[0.14em]",
};

/**
 * Button / CTA primitive — portable design-system component.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "outline",
    size = "md",
    className,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center uppercase transition-colors duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _h, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
