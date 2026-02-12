type Job = {
  title: string;
  type?: string;
  locationNote?: string;
  description?: string;
  applyUrl?: string;
};

export default function JobsSection({ jobs }: { jobs?: Job[] }) {
  if (!jobs?.length) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        No open roles posted at this time. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {jobs.map((j) => (
        <div key={j.title} className="rounded-2xl border-subtle bg-card p-6">
          <div className="text-lg font-semibold text-white/90">{j.title}</div>
          <div className="mt-1 text-sm text-white/60">
            {[j.type, j.locationNote].filter(Boolean).join(" \u2022 ")}
          </div>

          {j.description ? <p className="mt-4 text-sm text-white/70">{j.description}</p> : null}

          {j.applyUrl ? (
            <a
              href={j.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black"
            >
              Apply Now
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
