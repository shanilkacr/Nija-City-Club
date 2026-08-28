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

/** Mobile card menu: primary (bold) links vs. secondary (muted) utility links. */
const MOBILE_SECONDARY_LABELS = new Set(["Membership", "Contact"]);

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function NavLink({
  href,
  className,
  children,
  onClick,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
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
                <NavLink
                  href={item.href}
                  className={cn(
                    "px-2.5 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors",
                    filled
                      ? "text-ink/80 hover:text-ink"
                      : "text-white/80 hover:text-white",
                    hasChildren && isOpen && (filled ? "text-ink" : "text-white"),
                  )}
                  aria-expanded={hasChildren ? isOpen : undefined}
                  aria-controls={hasChildren ? menuId : undefined}
                >
                  {item.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border transition-colors lg:hidden",
              filled ? "border-ink/30" : "border-white/40",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={`${menuId}-mobile`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-5 transition-transform duration-300",
                  filled ? "bg-ink" : "bg-white",
                  mobileOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 transition-transform duration-300",
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

      {/* Mobile menu: scrim */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-ink/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu: floating card */}
      <div
        id={`${menuId}-mobile`}
        className={cn(
          "fixed inset-x-4 top-4 z-40 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl bg-cream shadow-[0_24px_64px_rgba(33,29,24,0.25)] transition-all duration-300 ease-out lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <Link
            href="/"
            onClick={closeAll}
            aria-label={SITE.name}
            className="shrink-0"
          >
            <Image
              src="/images/brand/logo.png"
              alt={SITE.name}
              width={498}
              height={501}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="-mt-1 -mr-2 flex h-10 w-10 items-center justify-center"
          >
            <span className="relative block h-4 w-4">
              <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 rotate-45 bg-ink/70" />
              <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 -rotate-45 bg-ink/70" />
            </span>
          </button>
        </div>

        <nav className="mt-8 flex flex-col px-6" aria-label="Mobile primary">
          {NAVIGATION.filter(
            (item) => !MOBILE_SECONDARY_LABELS.has(item.label),
          ).map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              onClick={closeAll}
              className="py-2 font-display text-xl leading-tight text-ink"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 flex flex-col px-6 pb-6">
          {NAVIGATION.filter((item) =>
            MOBILE_SECONDARY_LABELS.has(item.label),
          ).map((item) => {
            const isContact = item.label === "Contact";
            return (
              <NavLink
                key={item.label}
                href={item.href}
                onClick={closeAll}
                className={
                  isContact
                    ? "mt-4 inline-flex min-h-[44px] w-full items-center justify-center border border-ink bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-accent hover:bg-accent sm:min-h-auto"
                    : "py-2 font-display text-xl leading-tight text-ink"
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t border-line px-6 py-5 text-[13px] text-ink/50">
          <a
            href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
            className="block transition-colors hover:text-ink"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-1.5 block transition-colors hover:text-ink"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </header>
  );
}
