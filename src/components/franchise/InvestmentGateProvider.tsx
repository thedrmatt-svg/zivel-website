"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { submitFranchiseInvestmentGate } from "@/lib/actions/franchiseInvestmentGate";

const STORAGE_KEY = "zivel_franchise_investment_gate_v1";
const GATE_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

type InvestmentGateContextValue = {
  unlocked: boolean;
  revealed: boolean;
  requestReveal: () => void;
};

const InvestmentGateContext = createContext<InvestmentGateContextValue | null>(null);

export function useInvestmentGate(): InvestmentGateContextValue {
  const ctx = useContext(InvestmentGateContext);
  if (!ctx) {
    throw new Error("useInvestmentGate must be used within InvestmentGateProvider");
  }
  return ctx;
}

function isUnlocked(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { unlockedAt } = JSON.parse(raw) as { unlockedAt: number };
    return Date.now() - unlockedAt < GATE_DURATION_MS;
  } catch {
    return false;
  }
}

function setUnlockedStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlockedAt: Date.now() }));
  } catch {
    /* ignore */
  }
}

function scrollToInvestment() {
  requestAnimationFrame(() => {
    document.getElementById("investment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function InvestmentGateProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Focus management refs
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isUnlocked()) {
      setUnlocked(true);
    }
  }, []);

  // When the modal opens: move focus inside and trap Tab/Shift-Tab.
  // When it closes: return focus to the element that triggered it.
  // Escape key dismisses the modal.
  useEffect(() => {
    if (!showModal) return;

    const container = dialogRef.current;
    if (!container) return;

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Auto-focus first focusable child (close button or first input)
    const firstFocusable = container.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowModal(false);
        return;
      }
      if (e.key !== "Tab" || !container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to the element that opened the modal
      triggerRef.current?.focus();
    };
  }, [showModal]);

  function requestReveal() {
    if (unlocked) {
      setRevealed(true);
      scrollToInvestment();
    } else {
      setError("");
      // Capture trigger so focus can be restored when the modal closes
      triggerRef.current = document.activeElement as HTMLElement;
      setShowModal(true);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitFranchiseInvestmentGate(formData);
      if (result.status === "success") {
        setUnlockedStorage();
        setUnlocked(true);
        setRevealed(true);
        setShowModal(false);
        scrollToInvestment();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <InvestmentGateContext.Provider value={{ unlocked, revealed, requestReveal }}>
      {children}

      {showModal && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="investment-gate-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/80 p-8 md:p-10 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>

            <div className="mb-6 text-center">
              <p className="zv-tagline mb-2">Franchise Investment</p>
              <h2 id="investment-gate-title" className="font-serif text-2xl md:text-3xl font-light tracking-tight text-white">
                View Investment Details
              </h2>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">
                Share your info below and we&rsquo;ll open the full investment breakdown for Zivel
                franchise ownership.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="ig-firstName"
                    className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                  >
                    First Name <span className="text-[var(--zivel-gold)]">*</span>
                  </label>
                  <input
                    id="ig-firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8 focus-visible:ring-2 focus-visible:ring-[var(--zivel-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ig-lastName"
                    className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                  >
                    Last Name <span className="text-[var(--zivel-gold)]">*</span>
                  </label>
                  <input
                    id="ig-lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8 focus-visible:ring-2 focus-visible:ring-[var(--zivel-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                    placeholder="Last"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ig-email"
                  className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                >
                  Email <span className="text-[var(--zivel-gold)]">*</span>
                </label>
                <input
                  id="ig-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8 focus-visible:ring-2 focus-visible:ring-[var(--zivel-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="ig-phone"
                  className="mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wider"
                >
                  Phone <span className="text-[var(--zivel-gold)]">*</span>
                </label>
                <input
                  id="ig-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--zivel-gold)] focus:bg-white/8 focus-visible:ring-2 focus-visible:ring-[var(--zivel-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  id="ig-consent"
                  name="consent"
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-white/20 bg-white/5 accent-[var(--zivel-gold)]"
                />
                <label
                  htmlFor="ig-consent"
                  className="cursor-pointer text-xs text-white/45 leading-relaxed"
                >
                  By submitting this form, you are consenting to allow representatives of Zivel to
                  contact you directly.
                </label>
              </div>

              {error && (
                <p role="alert" aria-live="assertive" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full rounded-full bg-[var(--zivel-gold)] py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Unlocking…" : "View Investment Details"}
              </button>

              <p className="text-center text-xs text-white/30">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      )}
    </InvestmentGateContext.Provider>
  );
}
