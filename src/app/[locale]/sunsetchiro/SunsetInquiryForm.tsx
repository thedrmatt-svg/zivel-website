"use client";

import { useId, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitSunsetInquiry, type SunsetInquiryState } from "./actions";
import { pathways } from "./pathways";

const inputClass = "w-full rounded-sm border border-white/30 bg-[#28211c] px-4 py-3 text-sm text-white placeholder:text-white/55 focus:border-[#eacba4] focus:outline-none focus:ring-2 focus:ring-[#eacba4]";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/85";

export default function SunsetInquiryForm() {
  const uid = useId();
  const router = useRouter();
  const [state, setState] = useState<SunsetInquiryState | null>(null);
  const [isPending, startTransition] = useTransition();
  const errors = state?.fieldErrors ?? {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState(null);
    startTransition(async () => {
      try {
        const result = await submitSunsetInquiry(data);
        if (result.status === "success") {
          router.push("/sunsetchiro/thank-you");
        } else {
          setState(result);
        }
      } catch {
        setState({ status: "error", message: "We couldn't send your request. Please try again or call Zivel Coral Gables." });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>Full name <span className="text-[#eacba4]">*</span></label>
        <input id={`${uid}-name`} name="name" type="text" required maxLength={120} autoComplete="name" placeholder="Your full name" className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${uid}-name-error` : undefined} />
        {errors.name && <p id={`${uid}-name-error`} className="mt-1 text-sm text-[#ffb8ac]">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className={labelClass}>Phone <span className="text-[#eacba4]">*</span></label>
        <input id={`${uid}-phone`} name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="(786) 555-0123" className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${uid}-phone-error` : undefined} />
        {errors.phone && <p id={`${uid}-phone-error`} className="mt-1 text-sm text-[#ffb8ac]">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>Email <span className="font-normal normal-case tracking-normal text-white/70">(optional)</span></label>
        <input id={`${uid}-email`} name="email" type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${uid}-email-error` : undefined} />
        {errors.email && <p id={`${uid}-email-error`} className="mt-1 text-sm text-[#ffb8ac]">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-pathway`} className={labelClass}>Which pathway interests you? <span className="text-[#eacba4]">*</span></label>
        <select id={`${uid}-pathway`} name="pathway" required defaultValue="" className={inputClass} aria-invalid={Boolean(errors.pathway)} aria-describedby={errors.pathway ? `${uid}-pathway-error` : undefined}>
          <option value="" disabled>Select a pathway</option>
          {pathways.map((pathway) => <option key={pathway.name} value={pathway.name}>{pathway.name}</option>)}
        </select>
        {errors.pathway && <p id={`${uid}-pathway-error`} className="mt-1 text-sm text-[#ffb8ac]">{errors.pathway}</p>}
      </div>
      {state?.status === "error" && <p role="alert" className="text-sm text-[#ffb8ac]">{state.message}</p>}
      <button type="submit" disabled={isPending} className="min-h-12 w-full bg-[#dfb779] px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#2c1b12] transition-colors hover:bg-[#f3d7ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60">
        {isPending ? "Sending…" : "Send my request ↗"}
      </button>
      <p className="text-xs leading-5 text-white/75">Please don’t include medical details. The Zivel Coral Gables team will contact you about your selected pathway.</p>
    </form>
  );
}