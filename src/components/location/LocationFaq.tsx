import type { LocationFaqItem } from "@/lib/location-faqs";
import { buildLocationFaqSchema } from "@/lib/location-faqs";

type LocationFaqProps = {
  cityName: string;
  items: readonly LocationFaqItem[];
  exclusive?: boolean;
};

export default function LocationFaq({ cityName, items, exclusive = true }: LocationFaqProps) {
  if (items.length === 0) return null;

  const schemaJson = JSON.stringify(buildLocationFaqSchema(items)).replace(/</g, "\\u003c");

  return (
    <>
      <div className="zv-bleed zv-divider-dark-to-light" />
      <section
        className="zv-bleed zv-immersive-section zv-section-gradient"
        data-location-faq
        aria-labelledby="location-faq-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="zv-tagline">Answers</p>
          <h2
            id="location-faq-heading"
            className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight"
          >
            Frequently Asked Questions About Zivel {cityName}
          </h2>
          <div className="space-y-4">
            {items.map((item) => (
              <details
                key={item.key}
                name={exclusive ? "location-faq" : undefined}
                className="zv-luxury-card rounded-2xl p-8 group"
              >
                <summary className="font-serif text-lg cursor-pointer text-white group-open:text-[var(--zivel-gold)] transition-colors">
                  <h3 className="m-0 inline font-serif text-lg font-normal">
                    {item.question}
                  </h3>
                </summary>
                <p className="mt-4 text-white/65 leading-relaxed">
                  {item.parts.map((part, index) =>
                    part.href ? (
                      <a
                        key={`${item.key}-part-${index}`}
                        href={part.href}
                        className="text-[var(--zivel-gold)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--zivel-gold)]"
                      >
                        {part.text}
                      </a>
                    ) : (
                      <span key={`${item.key}-part-${index}`}>{part.text}</span>
                    ),
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      </section>
    </>
  );
}
