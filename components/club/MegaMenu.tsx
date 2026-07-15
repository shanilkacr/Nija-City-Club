"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { NAVIGATION, type NavItem } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  HEADER_FILL_THRESHOLD,
  subscribeHeroScroll,
} from "@/lib/hero-scroll";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function MegaPanel({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  if (!item.children?.length) return null;

  return (
    <div className="absolute left-0 right-0 top-full border-b border-line bg-cream shadow-[0_24px_48px_rgba(33,29,24,0.08)]">
      <div className="mx-auto grid max-w-content gap-8 px-[var(--section-x)] py-8 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow text-ink/45">{item.label}</p>
          <p className="mt-3 max-w-sm font-display text-lg leading-snug md:text-xl">
            {item.description}
          </p>
          <NavLink
            href={item.href}
            onClick={onNavigate}
            className="mt-5 inline-block text-[11px] tracking-[0.14em] uppercase underline underline-offset-4"
          >
            Explore {item.label}
          </NavLink>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {item.children.map((child) => (
            <li key={`${child.href}-${child.label}`}>
              <NavLink
                href={child.href}
                onClick={onNavigate}
                className="group block border-t border-line pt-3"
              >
                <span className="font-display text-base transition-colors group-hover:text-accent md:text-lg">
                  {child.label}
                </span>
                {child.description ? (
                  <span className="mt-1.5 block text-[12px] text-ink/55">
                    {child.description}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Fixed header: transparent over the hero; cream bar slides down from top
 * in sync with AmbianceHero contraction (see lib/hero-scroll).
 */
export function MegaMenu() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const scrolledRef = useRef(false);
  const menuId = useId();

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const applyChrome = (progress: number, forceSolid: boolean) => {
      const p = forceSolid ? 1 : progress;
      // Slide cream bar down from above (0 = fully hidden, 1 = fully in place)
      fill.style.translate = "none";
      fill.style.transform = `translate3d(0, ${(1 - p) * -100}%, 0)`;
    };

    const forceSolid = Boolean(openId) || mobileOpen;
    applyChrome(progressRef.current, forceSolid);

    return subscribeHeroScroll((progress) => {
      progressRef.current = progress;
      const force = Boolean(openId) || mobileOpen;
      applyChrome(progress, force);

      const next = progress >= HEADER_FILL_THRESHOLD || force;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    });
  }, [openId, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenId(null);
    setMobileOpen(false);
  };

  const filled = scrolled || Boolean(openId) || mobileOpen;

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 overflow-hidden"
      onMouseLeave={() => setOpenId(null)}
    >
      <div
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cream will-change-transform"
        style={{ transform: "translate3d(0, -100%, 0)" }}
      />
      <div className="relative mx-auto flex max-w-content items-center justify-between gap-6 px-[var(--section-x)] py-3 md:py-4">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          onClick={closeAll}
          aria-label={SITE.name}
        >
          <Image
            src="/images/brand/logo.png"
            alt={SITE.name}
            width={498}
            height={501}
            priority
            className={cn(
              "h-11 w-auto object-contain transition-[filter] duration-300 md:h-14",
              /* Transparent header: force gold/bronze mark to white */
              !filled && "brightness-0 invert",
            )}
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {NAVIGATION.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openId === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  setOpenId(hasChildren ? item.label : null)
                }
              >
                {hasChildren ? (
                  <button
                    type="button"
                    className={cn(
                      "px-2.5 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors",
                      filled
                        ? "text-ink/80 hover:text-ink"
                        : "text-white/80 hover:text-white",
                      isOpen && (filled ? "text-ink" : "text-white"),
                    )}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() =>
                      setOpenId(isOpen ? null : item.label)
                    }
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    href={item.href}
                    className={cn(
                      "px-2.5 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors",
                      filled
                        ? "text-ink/80 hover:text-ink"
                        : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/membership"
            size="sm"
            variant={filled ? "outline" : "outlineLight"}
            className="hidden sm:inline-flex"
          >
            Membership
          </Button>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border transition-colors lg:hidden",
              filled ? "border-ink/30" : "border-white/40",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-5 transition-transform",
                  filled ? "bg-ink" : "bg-white",
                  mobileOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 transition-opacity",
                  filled ? "bg-ink" : "bg-white",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 transition-transform",
                  filled ? "bg-ink" : "bg-white",
                  mobileOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div id={menuId} className="relative hidden lg:block">
        {NAVIGATION.map((item) =>
          openId === item.label && item.children?.length ? (
            <MegaPanel key={item.label} item={item} onNavigate={closeAll} />
          ) : null,
        )}
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line bg-cream lg:hidden">
          <div className="space-y-1 px-[var(--section-x)] py-6">
            {NAVIGATION.map((item) => (
              <div key={item.label} className="border-b border-line py-4">
                <NavLink
                  href={item.href}
                  onClick={closeAll}
                  className="font-display text-xl"
                >
                  {item.label}
                </NavLink>
                {item.children?.length ? (
                  <ul className="mt-3 space-y-2 pl-1">
                    {item.children.map((child) => (
                      <li key={`${child.href}-${child.label}`}>
                        <NavLink
                          href={child.href}
                          onClick={closeAll}
                          className="text-[12px] text-ink/65"
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="pt-6">
              <Button href="/contact" variant="solid" className="w-full">
                Contact Concierge
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
