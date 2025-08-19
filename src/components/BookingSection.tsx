import PublicBookingCalendar from "@/components/PublicBookingCalendar";

const BookingSection = () => {
  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PublicBookingCalendar />
      </div>
    </section>
  );
};

export default BookingSection;