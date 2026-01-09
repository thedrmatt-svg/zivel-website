type BookingWidgetProps = {
  locationId: number;
  className?: string;
  title?: string;
};

export default function BookingWidget({
  locationId,
  className,
  title = "Book an appointment at Zivel",
}: BookingWidgetProps) {
  const url = `https://zivel.myperformanceiq.com/book-appointment?set_location=${locationId}`;

  return (
    <section className={className}>
      <div className="rounded-2xl border border-white/10 bg-white/5 shadow-xl">
        <iframe
          className="block h-[700px] w-full rounded-2xl border-0 bg-black"
          src={url}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <p className="mt-3 text-center text-sm text-white/60">
        If the form does not load,{" "}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-[var(--zivel-gold)]"
        >
          open the booking page
        </a>
        .
      </p>
    </section>
  );
}
