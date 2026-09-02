import { BookingCalendar } from "@/components/booking/BookingCalendar";

export default function BookingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-bold text-white">Book a Service Consultation</h1>
        <p className="text-sm text-gray-400">
          Reserve 1-on-1 strategy sessions, tech advisory, or equipment rentals instantly with our real-time booking calendar.
        </p>
      </div>

      <BookingCalendar serviceName="1-on-1 Tech & Product Strategy Session" price={150} />
    </div>
  );
}
