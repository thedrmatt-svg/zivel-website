"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contactForm";

const initialState: ContactFormState = { status: "idle", message: "" };

type Props = {
  locationSlug: string;
  locationName: string;
  locationPhone: string;
};

export default function ContactForm({ locationSlug, locationName, locationPhone }: Props) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
    }
  }, [state.status]);

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 transition focus:border-[var(--zivel-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--zivel-gold)]";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5";
  const checkboxLabelClass = "flex items-start gap-3 text-sm text-white/60 leading-relaxed cursor-pointer";

  return (
    <form ref={formRef} action={formAction} noValidate>
      <input type="hidden" name="locationSlug" value={locationSlug} />
      <input type="hidden" name="locationName" value={locationName} />
      <input type="hidden" name="locationPhone" value={locationPhone} />

      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="cf-firstName" className={labelClass}>
            First Name <span className="text-[var(--zivel-gold)]">*</span>
          </label>
          <input
            id="cf-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-lastName" className={labelClass}>
            Last Name <span className="text-[var(--zivel-gold)]">*</span>
          </label>
          <input
            id="cf-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="text-[var(--zivel-gold)]">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="text-[var(--zivel-gold)]">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(615) 555-0100"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="cf-message" className={labelClass}>
          Message <span className="text-[var(--zivel-gold)]">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Tell us how we can help…"
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* SMS Transactional consent */}
      <div className="mb-4 zv-luxury-card rounded-xl p-4">
        <label className={checkboxLabelClass}>
          <input
            name="smsTransactional"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--zivel-gold)] rounded"
          />
          <span>
            By checking, you are allowing to receive transactional/informational SMS communications regarding
            account notifications, customer care, etc. from{" "}
            <span className="text-white/80 font-medium">Zivel {locationName.replace("Zivel ", "")}</span>. Messages
            frequency may vary. Data rates may apply. Reply STOP to opt-out.
          </span>
        </label>
      </div>

      {/* SMS Marketing consent */}
      <div className="mb-4 zv-luxury-card rounded-xl p-4">
        <label className={checkboxLabelClass}>
          <input
            name="smsMarketing"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--zivel-gold)] rounded"
          />
          <span>
            By checking, you are allowing to receive promotional/marketing SMS communications from{" "}
            <span className="text-white/80 font-medium">Zivel {locationName.replace("Zivel ", "")}</span>. Frequency
            may vary. Data rates may apply. Reply HELP for help or STOP to opt-out.
          </span>
        </label>
      </div>

      {/* Terms acceptance */}
      <div className="mb-8 zv-luxury-card rounded-xl p-4">
        <label className={checkboxLabelClass}>
          <input
            name="acceptTerms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--zivel-gold)] rounded"
          />
          <span>
            By checking, I accept{" "}
            <Link href="/terms" className="text-[var(--zivel-gold)] underline hover:text-[var(--zivel-gold-light)]">
              Terms of Service
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy" className="text-[var(--zivel-gold)] underline hover:text-[var(--zivel-gold-light)]">
              Privacy Policy
            </Link>
            . <span className="text-[var(--zivel-gold)]">*</span>
          </span>
        </label>
      </div>

      {/* Status messages */}
      {state.status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--zivel-gold)]/40 bg-[var(--zivel-gold)]/10 px-5 py-4 text-sm text-white"
        >
          <span className="mt-0.5 text-[var(--zivel-gold)] shrink-0">✓</span>
          <span>{state.message}</span>
        </div>
      )}
      {state.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm text-white"
        >
          <span className="mt-0.5 text-red-400 shrink-0">✕</span>
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="zv-btn-luxury zv-btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
