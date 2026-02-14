import Image from "next/image";

type Partner = {
  name: string;
  type?: string;
  description?: string;
  website?: string;
  logo?: string;
};

export default function PartnersSection({ partners }: { partners?: Partner[] }) {
  if (!partners?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {partners.map((p) => (
        <div key={p.name} className="rounded-2xl border-subtle bg-card p-6">
          <div className="flex items-start gap-4">
            {p.logo ? (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                <Image src={p.logo} alt={`${p.name} logo`} fill loading="lazy" sizes="56px" quality={75} className="object-contain p-2" />
              </div>
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-xl border border-white/10 bg-white/5" />
            )}

            <div className="min-w-0">
              <div className="font-semibold text-white/90">{p.name}</div>
              {p.type ? <div className="text-sm text-white/60">{p.type}</div> : null}
            </div>
          </div>

          {p.description ? (
            <p className="mt-4 text-sm text-white/70">{p.description}</p>
          ) : null}

          {p.website ? (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-brand underline"
            >
              Visit website
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
