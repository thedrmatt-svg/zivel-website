import GoogleTagManagerRiverton from "@/components/consent/GoogleTagManagerRiverton";

export default function SunsetChiroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Reuse the existing consent-gated loader; the locale layout owns consent. */}
      <GoogleTagManagerRiverton />
    </>
  );
}
