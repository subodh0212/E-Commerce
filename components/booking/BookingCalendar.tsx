"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Clock, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

interface BookingCalendarProps {
  serviceName?: string;
  price?: number;
}

export function BookingCalendar({
  serviceName = "1-on-1 Executive Strategy Session",
  price = 150,
}: BookingCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [reserving, setReserving] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const { addBookingSlot } = useCart();
  const router = useRouter();

  const yearMonth = "2026-09";
  const formattedDate = `${yearMonth}-${selectedDay.toString().padStart(2, "0")}`;

  // Fetch slots from API dynamically when date changes
  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/bookings/slots?date=${formattedDate}`);
        const data = await res.json();
        if (data.success) {
          setAvailableSlots(data.availableSlots || []);
          setBookedSlots(data.bookedSlots || []);
        }
      } catch (err) {
        console.error("Failed to fetch booking slots:", err);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [formattedDate]);

  const allTimeSlots = [
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
  ];

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleConfirmReservation = async () => {
    if (!selectedTime) return;
    setReserving(true);

    try {
      // POST reservation to backend API
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          timeSlot: selectedTime,
          productId: "prod-2",
        }),
      });
      const data = await res.json();

      if (data.success) {
        // Add to unified cart context
        addBookingSlot({
          id: "prod-2",
          name: serviceName,
          price,
          date: formattedDate,
          timeSlot: selectedTime,
        });
        setIsBooked(true);
      } else {
        alert(data.error || "Selected slot is unavailable");
      }
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setReserving(false);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-gray-900 border border-indigo-500/40 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-2xl space-y-4">
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-white">Slot Reserved & Added to Cart!</h3>
        <p className="text-sm text-gray-300">
          Your slot for <span className="text-indigo-400 font-semibold">{serviceName}</span> is reserved for{" "}
          <span className="text-white font-medium">{formattedDate}</span> at{" "}
          <span className="text-white font-medium">{selectedTime}</span>.
        </p>
        <div className="pt-4 border-t border-gray-800 flex justify-between text-sm">
          <span className="text-gray-400">Total Price:</span>
          <span className="font-extrabold text-indigo-400">${price}</span>
        </div>
        <div className="flex gap-4 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => setIsBooked(false)}>
            Book Another
          </Button>
          <Button className="flex-1" onClick={() => router.push("/checkout")}>
            Go to Checkout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <h3 className="text-xl font-extrabold text-white">{serviceName}</h3>
          <p className="text-xs text-gray-400">Dynamic slot check for {formattedDate}</p>
        </div>
        <span className="text-2xl font-black text-indigo-400">${price}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interactive Monthly Date Picker */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-400" /> September 2026
            </span>
            <div className="flex space-x-1 text-gray-400">
              <button className="p-1 hover:text-white rounded"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1 hover:text-white rounded"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedTime("");
                }}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  selectedDay === day
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-2 ring-indigo-400"
                    : "bg-gray-950 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Time Slot Picker */}
        <div className="space-y-4">
          <label className="flex items-center justify-between text-sm font-bold text-white">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Time Slots
            </span>
            {loadingSlots && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {allTimeSlots.map((slot) => {
              const isAvailable = availableSlots.includes(slot);
              const isBookedSlot = bookedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  disabled={!isAvailable}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-3 px-3 text-xs font-bold rounded-xl border transition flex flex-col items-center justify-center gap-1 ${
                    !isAvailable
                      ? "bg-gray-950/40 border-gray-800/40 text-gray-600 cursor-not-allowed line-through"
                      : selectedTime === slot
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-gray-950 border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <span>{slot}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {isBookedSlot ? "Booked" : isAvailable ? "Open" : "Unavailable"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Button
        onClick={handleConfirmReservation}
        disabled={!selectedTime || reserving}
        className="w-full mt-4 flex items-center justify-center gap-2"
        size="lg"
      >
        {reserving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Reserving Slot...
          </>
        ) : (
          `Reserve Slot for ${formattedDate} at ${selectedTime || "..."}`
        )}
      </Button>
    </div>
  );
}
