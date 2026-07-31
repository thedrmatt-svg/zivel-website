"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitFranchiseForm, type FranchiseFormState } from "@/lib/actions/franchiseForm";

const CALENDLY_URL = "https://calendly.com/matto-zivel/zivel-franchise-intro-zoom";

const initialState: FranchiseFormState = { status: "idle", message: "" };

const inputClass =
  "w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/35 text-sm focus:outline-none focus:border-[var(--zivel-gold)] focus:bg-white/8 transition-all duration-200";

const labelClass = "block text-xs font-semibold tracking-widest uppercase text-white/50 mb-2";

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string }[];
};

function RadioGroup({ name, options }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            required
            className="sr-only peer"
          />
          <span className="h-4 w-4 rounded-full border border-white/25 flex items-center justify-center peer-checked:border-[var(--zivel-gold)] transition-colors duration-200 flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-[var(--zivel-gold)] opacity-0 peer-checked:opacity-100 transition-opacity duration-200 group-has-[input:checked]:opacity-100" />
          </span>
          <span className="text-sm text-white/70 peer-checked:text-white transition-colors duration-200">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function FranchiseLeadForm() {
  const [state, formAction, isPending] = useActionState(submitFranchiseForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[var(--zivel-gold)] mb-6">
          <svg className="w-7 h-7 text-[var(--zivel-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="zv-tagline mb-3">Step 1 Complete</p>
        <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
          You&rsquo;re in the pipeline.
        </h3>
        <p className="text-white/60 text-base max-w-md mx-auto mb-10 leading-relaxed">
          We received your info and you&rsquo;ll hear from us shortly. Ready to move faster?
          Schedule your 1-on-1 Zoom intro call with our CEO right now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="zv-btn-gold px-8 py-4 text-sm font-semibold tracking-widest uppercase"
          >
            Schedule My Intro Call →
          </a>
          <button
            onClick={() => window.location.reload()}
            className="zv-btn-outline px-8 py-4 text-sm font-semibold tracking-widest uppercase"
          >
            Submit Another Inquiry
          </button>
        </div>
        <p className="mt-6 text-white/35 text-xs">
          Or email us directly:{" "}
          <a href="mailto:matto@zivel.com" className="text-[var(--zivel-gold)] hover:underline">
            matto@zivel.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Jane"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Smith"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="territory" className={labelClass}>City / State / Territory of Interest</label>
        <input
          id="territory"
          name="territory"
          type="text"
          placeholder="e.g. Austin, TX or Pacific Northwest"
          required
          className={inputClass}
        />
      </div>

      <div className="mb-5">
        {/* id links the visible heading to the radio group via aria-labelledby */}
        <span id="funding-group-label" className={labelClass}>Have you set up funding options yet?</span>
        <div role="group" aria-labelledby="funding-group-label" className="flex flex-wrap gap-4 mt-2">
          {[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
            { value: "Don't know yet", label: "Don't know yet" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="funding"
                value={opt.value}
                required
                className="appearance-none h-4 w-4 rounded-full border border-white/25 checked:border-[var(--zivel-gold)] checked:bg-[var(--zivel-gold)] transition-all duration-200 flex-shrink-0 cursor-pointer"
              />
              <span className="text-sm text-white/70">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        {/* id links the visible heading to the radio group via aria-labelledby */}
        <span id="location-interest-group-label" className={labelClass}>I&rsquo;m looking for:</span>
        <div role="group" aria-labelledby="location-interest-group-label" className="flex flex-wrap gap-4 mt-2">
          {[
            { value: "Single Location", label: "Single Location" },
            { value: "Multiple Locations", label: "Multiple Locations" },
            { value: "Master Franchise", label: "Master Franchise" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="locationInterest"
                value={opt.value}
                required
                className="appearance-none h-4 w-4 rounded-full border border-white/25 checked:border-[var(--zivel-gold)] checked:bg-[var(--zivel-gold)] transition-all duration-200 flex-shrink-0 cursor-pointer"
              />
              <span className="text-sm text-white/70">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {state.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-sm"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full zv-btn-gold py-4 text-sm font-semibold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting…" : "Request Franchise Info →"}
      </button>

      <p className="mt-4 text-center text-white/30 text-xs leading-relaxed">
        By submitting, you agree that Zivel may contact you about franchise opportunities.
        Your information is never sold or shared.
      </p>
    </form>
  );
}
