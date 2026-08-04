---
name: Form field error pattern
description: How field-specific validation errors are wired across all Zivel forms — server actions, state types, and component rendering.
---

# Form field error pattern

## The rule
Every form state type includes `fieldErrors?: Partial<Record<fieldNames, string>>`. Server actions populate it when validation fails. Components render `aria-invalid`, `aria-describedby`, and an inline `<p id="{id}-error">` per field.

**Why:** Generic "please fill in all required fields" errors don't tell screen reader users which field failed. Field-specific errors eliminate re-scanning.

**How to apply:**
1. In the server action: build a `fieldErrors` object, populate it per field, return `{ status: "error", message: "Please fix the errors below.", fieldErrors }` if any keys exist.
2. In the component: `aria-invalid={!!state.fieldErrors?.fieldName}`, `aria-describedby={state.fieldErrors?.fieldName ? "{id}-error" : undefined}`, and `{state.fieldErrors?.fieldName && <p id="{id}-error" className="mt-1 text-xs text-red-400">{state.fieldErrors.fieldName}</p>}`.
3. For direct-call forms (PricingGateModal, InvestmentGateProvider): add `const [fieldErrors, setFieldErrors] = useState<StateType["fieldErrors"]>({})`, clear on submit start, populate from result.

## Covered forms
- ContactForm / contactForm.ts — fields: firstName, lastName, email, phone, message, acceptTerms
- PricingGateModal / pricingGate.ts — fields: firstName, lastName, phone, email
- FranchiseLeadForm / franchiseForm.ts — fields: firstName, lastName, email, phone, territory (radio fields use generic guard)
- InvestmentGateProvider / franchiseInvestmentGate.ts — fields: firstName, lastName, phone, email
