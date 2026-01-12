import Link from "next/link";
import { scienceArticles } from "@/lib/data/science";

export const metadata = {
  title: "Science & Recovery Hub | Zivel",
  description: "Evidence-informed articles on recovery, performance, longevity, and modern wellness technology.",
};

export default function ScienceIndexPage() {
  const grouped = scienceArticles.reduce<Record<string, typeof scienceArticles>>((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});

  return (
    <div className="section space-y-10">
      <div className="space-y-3">
        <h1>Science & Recovery Hub</h1>
        <p className="text-white/70 max-w-3xl">
          Articles designed to be clear, practical, and aligned with how people actually use recovery services.
        </p>
      </div>

      {Object.entries(grouped).map(([cat, items]) => (
        <section key={cat} className="space-y-4">
          <h2 className="text-xl">{cat}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((a) => (
              <Link
                key={a.slug}
                href={`/science/${a.slug}`}
                className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-white">{a.title}</div>
                <div className="mt-2 text-sm text-white/70">{a.description}</div>
                <div className="mt-4 text-xs text-white/50">
                  {a.readingTimeMinutes ? `${a.readingTimeMinutes} min read` : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
