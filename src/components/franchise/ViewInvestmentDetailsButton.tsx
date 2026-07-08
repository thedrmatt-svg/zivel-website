"use client";

import { useInvestmentGate } from "@/components/franchise/InvestmentGateProvider";

export default function ViewInvestmentDetailsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { requestReveal } = useInvestmentGate();

  return (
    <button type="button" onClick={requestReveal} className={className}>
      {children}
    </button>
  );
}
