type BookingWidgetProps = {
  locationId?: number | null;
  className?: string;
  title?: string;
};

export default function BookingWidget({
  className,
}: BookingWidgetProps) {
  return (
    <section className={className}>
      <div className="flex justify-center my-12">
        <a
          href="https://zivel.myperformanceiq.com/"
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
