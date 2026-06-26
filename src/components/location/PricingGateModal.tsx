"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { submitPricingGate } from "@/lib/actions/pricingGate";

const GATE_VERSION = "v1";
const GATE_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

function getStorageKey(citySlug: string) {
  return `zivel_pricing_gate_${GATE_VERSION}_${citySlug}`;
}

function isUnlocked(citySlug: string): boolean {
  try {
    const raw = localStorage.getItem(getStorageKey(citySlug));
    if (!raw) return false;
    const { unlockedAt } = JSON.parse(raw) as { unlockedAt: number };
    return Date.now() - unlockedAt < GATE_DURATION_MS;
  } catch {
    return false;
  }
}

function setUnlocked(citySlug: string) {
  try {
    localStorage.setItem(
      getStorageKey(citySlug),
      JSON.stringify({ unlockedAt: Date.now() })
    );
  } catch {
    /* ignore */
  }
}

export default function PricingGateModal({
  citySlug,
  cityDisplay,
  children,
}: {
  citySlug: string;
  cityDisplay: string;
  children: React.ReactNode;
}) {
  const [unlocked, setUnlockedState] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
    if (isUnlocked(citySlug)) {
      setUnlockedState(true);
    }
  }, [citySlug]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("citySlug", citySlug);
    formData.set("cityDisplay", cityDisplay);

    startTransition(async () => {
      const result = await submitPricingGate(formData);
      if (result.status === "success") {
        setUnlocked(citySlug);
        setUnlockedState(true);
      } else {
        setError(result.message);
      }
    });
  }

  if (!mounted) {
    return (
      <div className="relative">
        <div className="pointer-events-none select-none blur-xl opacity-50">
          {children}
        </div>
      </div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none select-none blur-xl opacity-40"
        aria-hidden="true"
      >
        {children}
      </div>

      <div className="absolute inset-0 z-20 flex items-start justify-center pt-8 px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/95 shadow-2xl shadow-black/80 backdrop-blur-sm p-8 md:p-10">
          <div className="mb-6 text-center">
            <p className="zv-tagline mb-2">Exclusive Access</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-white">
              See Local Pricing
            </h2>
            <p className="mt-2 text-sm text-white/55 leading-relaxed">
              Enter your info below to unlock full pricing, memberships, and
              current offers for Zivel {cityDisplay}.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pg-firstName"
                  className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                >
                  First Name <span className="text-[var(--zivel-gold)]">*</span>
                </label>
                <input
                  id="pg-firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8"
                  placeholder="First"
                />
              </div>
              <div>
                <label
                  htmlFor="pg-lastName"
                  className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                >
                  Last Name <span className="text-[var(--zivel-gold)]">*</span>
                </label>
                <input
                  id="pg-lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8"
                  placeholder="Last"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pg-phone"
                className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
              >
                Phone <span className="text-[var(--zivel-gold)]">*</span>
              </label>
              <input
                id="pg-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8"
                placeholder="(555) 000-0000"
              />
            </div>

            <div>
              <label
                htmlFor="pg-email"
                className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
              >
                Email <span className="text-[var(--zivel-gold)]">*</span>
              </label>
              <input
                id="pg-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                id="pg-smsConsent"
                name="smsConsent"
                type="checkbox"
                defaultChecked
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-white/20 bg-white/5 accent-[var(--zivel-gold)]"
              />
              <label
                htmlFor="pg-smsConsent"
                className="cursor-pointer text-xs text-white/45 leading-relaxed"
              >
                I agree to receive text messages and emails from Zivel{" "}
                {cityDisplay} regarding appointments, promotions, and wellness
                tips. Message &amp; data rates may apply. Reply STOP to
                unsubscribe.
              </label>
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full rounded-full bg-[var(--zivel-gold)] py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Unlocking…" : "See Pricing & Memberships"}
            </button>

            <p className="text-center text-xs text-white/30">
              No spam. Unsubscribe anytime. Access lasts 14 days.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
