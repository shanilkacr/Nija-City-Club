"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-accent";

export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end only for launch — wire to API / CRM later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={cn("border border-line bg-stone/50 p-10", className)}>
        <p className="eyebrow text-ink/45">Thank you</p>
        <p className="mt-4 font-display text-2xl">
          Your message has been received.
        </p>
        <p className="mt-3 text-sm text-ink/65">
          Concierge will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-8", className)}>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-ink/45">First name</span>
          <input
            required
            name="firstName"
            className={cn(fieldClass, "mt-2")}
            autoComplete="given-name"
          />
        </label>
        <label className="block">
          <span className="eyebrow text-ink/45">Last name</span>
          <input
            required
            name="lastName"
            className={cn(fieldClass, "mt-2")}
            autoComplete="family-name"
          />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow text-ink/45">Email</span>
        <input
          required
          type="email"
          name="email"
          className={cn(fieldClass, "mt-2")}
          autoComplete="email"
        />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">Interest</span>
        <select
          name="interest"
          className={cn(fieldClass, "mt-2 appearance-none")}
          defaultValue="membership"
        >
          <option value="membership">Membership</option>
          <option value="fitness">Fitness</option>
          <option value="swimming">Swimming</option>
          <option value="events">Event Space</option>
          <option value="cafe">Café</option>
          <option value="other">General enquiry</option>
        </select>
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className={cn(fieldClass, "mt-2 resize-y")}
        />
      </label>
      <Button type="submit" variant="solid">
        Send Enquiry
      </Button>
    </form>
  );
}
