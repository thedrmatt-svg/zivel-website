"use client";

import { useState, useTransition } from "react";
import { submitLead, type LeadFormState } from "./actions";

export default function LeadForm() {
  const [state, setState] = useState<LeadFormState>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitLead(formData);
      setState(result);
    });
  }

  if (state?.status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"
          style={{ backgroundColor: "var(--zivel-gold)", color: "#000" }}
        >
          ✓
        </div>
        <p
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--zivel-gold)" }}
        >
          Message received!
        </p>
        <p className="text-white/70 max-w-sm mx-auto">{state.message}</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-[var(--zivel-gold)] transition-colors text-sm";
  const labelClass = "block text-xs font-semibold tracking-wider uppercase text-white/60 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ads-name" className={labelClass}>
            Name <span style={{ color: "var(--zivel-gold)" }}>*</span>
          </label>
          <input
            id="ads-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ads-phone" className={labelClass}>
            Phone <span style={{ color: "var(--zivel-gold)" }}>*</span>
          </label>
          <input
            id="ads-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(385) 555-0123"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="ads-service" className={labelClass}>
          {"I'm interested in"}
        </label>
        <div className="relative">
          <select
            id="ads-service"
            name="serviceInterest"
            className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <option
              value="Membership pricing"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Membership pricing
            </option>
            <option
              value="Cryotherapy"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Cryotherapy
            </option>
            <option
              value="Red Light Therapy"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Red Light Therapy
            </option>
            <option
              value="Infrared Sauna"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Infrared Sauna
            </option>
            <option
              value="Dry Float"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Dry Float
            </option>
            <option
              value="CryoLift Facial"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              CryoLift Facial
            </option>
            <option
              value="Compression Therapy"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Compression Therapy
            </option>
            <option
              value="Cryo Slimming / Toning"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              Cryo Slimming / Toning
            </option>
            <option
              value="General information"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              General information
            </option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
            ▾
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="ads-email" className={labelClass}>
          Email{" "}
          <span className="text-white/40 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <input
          id="ads-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {state?.status === "error" && (
        <p role="alert" aria-live="assertive" className="text-red-400 text-sm">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 text-sm font-bold tracking-widest uppercase rounded transition-opacity disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor: "var(--zivel-gold)", color: "#000" }}
      >
        {isPending ? "Sending…" : "Ask About Membership Pricing →"}
      </button>

      <p className="text-xs text-white/40 text-center pt-1">
        {"We'll reach out by phone — no spam, no pressure, ever."}
      </p>
    </form>
  );
}
