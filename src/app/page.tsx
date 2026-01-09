
import BookingWidget from "@/components/booking/BookingWidget";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="section">
        <div className="max-w-3xl">
          <h1 className="mb-6">
            Science-Backed Recovery, Performance & Longevity
          </h1>
          <p className="text-lg text-white/80">
            Cryotherapy, red light therapy, infrared sauna, compression, dry float,
            and advanced wellness protocols — all designed to help your body
            recover faster and perform better.
          </p>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <section className="section border-subtle rounded-2xl bg-card p-8">
        <div className="text-center">
          <h2 className="mb-4">Book Your First Session</h2>
          <p className="mb-8 text-white/70">
            Choose your location, service, and time — all in one place.
          </p>

          <BookingWidget className="mt-6" locationId={11417} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <h2 className="mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Cryotherapy",
            "Red Light Therapy",
            "Infrared Sauna",
            "Dry Float",
            "Compression",
            "Cryo Aesthetics",
          ].map((service) => (
            <div
              key={service}
              className="rounded-2xl border-subtle bg-card p-6"
            >
              <h3 className="mb-2">{service}</h3>
              <p className="text-sm text-white/70">
                Brief service description placeholder.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="section">
        <h2 className="mb-12">Zivel Pathways</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {["Performance", "Recovery", "Anti-Aging", "Longevity"].map(
            (pathway) => (
              <div
                key={pathway}
                className="rounded-2xl border-subtle bg-card p-6 text-center"
              >
                <h3 className="mb-2">{pathway}</h3>
                <p className="text-sm text-white/70">
                  Protocol-driven wellness experiences.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section">
        <h2 className="mb-6">Find a Zivel Near You</h2>
        <p className="mb-10 text-white/70 max-w-2xl">
          With locations across the country, expert-led recovery and wellness is
          never far away.
        </p>

        <div className="h-[320px] rounded-2xl border-subtle bg-black/40 flex items-center justify-center text-white/40">
          Locations Map / Grid Placeholder
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section">
        <h2 className="mb-12">Trusted by Athletes, Professionals, and Wellness Seekers</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {["Review 1", "Review 2", "Review 3"].map((review) => (
            <div
              key={review}
              className="rounded-2xl border-subtle bg-card p-6"
            >
              <p className="text-sm text-white/70">
                Customer testimonial placeholder.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
