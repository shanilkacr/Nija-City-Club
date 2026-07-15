import Link from "next/link";
import { FOOTER_LINKS } from "@/config/navigation";
import { SITE, WELLNESS_SITE_URL } from "@/config/site";
import { OPENING_HOURS } from "@/config/club";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  const spaPreview = OPENING_HOURS.spaFitness;

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-content gap-12 px-[var(--section-x)] py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="font-display text-xl tracking-[0.1em]">{SITE.brand}</p>
          <p className="mt-1 text-[10px] tracking-[0.28em] text-ink/50 uppercase">
            City Club
          </p>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink/60">
            {SITE.tagline}. {SITE.location}.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-ink/45">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-ink/45">Spa & Fitness</p>
          <ul className="mt-4 space-y-3">
            {spaPreview.map((row) => (
              <li key={row.day} className="text-[13px] text-ink/70">
                <span className="block text-ink">{row.day}</span>
                {row.hours}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-3 md:col-span-2">
          <p className="eyebrow text-ink/45">Visit</p>
          <Button href="/contact" variant="outline" size="sm">
            Contact
          </Button>
          <a
            href={WELLNESS_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-ink/55 underline underline-offset-4 hover:text-ink"
          >
            Luxury Wellness
          </a>
        </div>
      </div>

      <div className="border-t border-line px-[var(--section-x)] py-5 text-center text-[11px] text-ink/40">
        &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
