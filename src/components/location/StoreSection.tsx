import Image from "next/image";

type StoreItem = {
  name: string;
  description?: string;
  image?: string;
  price?: string;
  url?: string;
};

export default function StoreSection({ items }: { items?: StoreItem[] }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        Store coming soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="rounded-2xl border-subtle bg-card overflow-hidden">
          {item.image ? (
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-white/5" />
          )}

          <div className="p-6">
            <div className="font-semibold text-white/90">{item.name}</div>
            {item.price ? (
              <div className="mt-1 text-sm font-semibold text-brand">{item.price}</div>
            ) : null}
            {item.description ? (
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            ) : null}
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black"
              >
                Shop Now
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
