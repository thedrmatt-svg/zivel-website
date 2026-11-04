import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Zivel Blog Editor",
  robots: { index: false, follow: false },
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <ClerkProvider
          publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
          proxyUrl={process.env.CLERK_PROXY_URL}
          signInUrl="/admin/sign-in"
          signUpUrl="/admin/sign-up"
          signInFallbackRedirectUrl="/admin/blog"
          signUpFallbackRedirectUrl="/admin/blog"
          afterSignOutUrl="/admin/blog"
          appearance={{
            elements: {
              socialButtonsBlockButton: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
              socialButtonsBlockButtonText: "text-white",
              formButtonPrimary: "text-black",
            },
            variables: {
              colorPrimary: "#d4af37", colorText: "#ffffff", colorTextSecondary: "#c9c9c9",
              colorBackground: "#111111", colorInputBackground: "#1c1c1c", colorInputText: "#ffffff",
              colorDanger: "#ff9c9c", borderRadius: "12px", fontFamily: "Arial, sans-serif",
            },
            layout: { logoImageUrl: "/images/brand/zivel-logo.png", logoLinkUrl: "/" },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
