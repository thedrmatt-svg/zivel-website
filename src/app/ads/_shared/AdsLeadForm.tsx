"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { submitAdsLead, type AdsLeadState } from "./actions";

// Must match ALLOWED_SERVICES in actions.ts
const SERVICES = [
  "Red Light Therapy - $5/service",
  "Cryotherapy - $5/service",
  "Infrared Sauna - $5/service",
  "Compression Therapy - $5/service",
  "Float Therapy - $5/service",
  "Oxygen Therapy - $5/service",
  "CryoLift Facial (30% Off Retail)",
  "Cryo Body Contouring (30% Off Retail)",
  "Cryo Toning (30% Off Retail)",
  "Not sure — help me choose",
];

interface Props {
  redirectUrl: string;
  source: string;
}

export default function AdsLeadForm({ redirectUrl, source }: Props) {
  const uid = useId();
  const [state, setState] = useState<AdsLeadState>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.status === "success") {
      window.location.href = redirectUrl;
    }
  }, [state, redirectUrl]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitAdsLead(formData);
      setState(result);
    });
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-[var(--zivel-gold)] focus-visible:ring-2 focus-visible:ring-[var(--zivel-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-black transition-colors text-sm";
  const labelClass =
    "block text-xs font-semibold tracking-wider uppercase text-white/60 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Known source — validated server-side against allowlist */}
      <input type="hidden" name="source" value={source} />

      {/* Honeypot — hidden from real users; bots fill it in and get silently rejected */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Name <span style={{ color: "var(--zivel-gold)" }}>*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            maxLength={120}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            Phone <span style={{ color: "var(--zivel-gold)" }}>*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(385) 555-0123"
            maxLength={30}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email{" "}
          <span className="text-white/40 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-service`} className={labelClass}>
          Service Interested In
        </label>
        <div className="relative">
          <select
            id={`${uid}-service`}
            name="service"
            className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s} style={{ backgroundColor: "#111", color: "#fff" }}>
                {s}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
            ▾
          </span>
        </div>
      </div>

      {state?.status === "error" && (
        <p role="alert" aria-live="assertive" className="text-red-400 text-sm">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 text-sm font-black tracking-widest uppercase rounded transition-opacity disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor: "var(--zivel-gold)", color: "#000" }}
      >
        {isPending ? "Sending…" : "GET STARTED"}
      </button>

      <p className="text-xs text-white/40 text-center pt-1">
        New clients only · No spam, ever.
      </p>
    </form>
  );
}
