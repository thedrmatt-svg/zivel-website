type BookingWidgetProps = {
  className?: string;
  title?: string;
} & (
  | { bookingUrl: string; locationId?: never }
  | { bookingUrl?: undefined; locationId?: number | null }
);

export default function BookingWidget({
  bookingUrl,
  locationId,
  className,
}: BookingWidgetProps) {
  // Location pages always supply their resolved action. Keep the original
  // ID-based API for global service pages, which are not location routes.
  const resolvedBookingUrl = bookingUrl ??
    `https://zivel.myperformanceiq.com/book-appointment?set_location=${locationId ?? 11417}`;
  return (
    <section className={className}>
      <div className="flex justify-center my-12">
        <a
          href={resolvedBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#FFD700] hover:bg-[#E6C200] text-black font-semibold text-xl px-12 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
