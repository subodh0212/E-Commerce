import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALL_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

    let bookedSlots: string[] = [];

    try {
      const existingBookings = await prisma.booking.findMany({
        where: {
          date: date,
          status: { in: ["PENDING", "CONFIRMED"] },
        },
        select: { timeSlot: true },
      });
      bookedSlots = existingBookings.map((b) => b.timeSlot);
    } catch {
      // If DB is empty, default mock booked slot for demonstration
      bookedSlots = ["10:30 AM"];
    }

    const availableSlots = ALL_SLOTS.filter((slot) => !bookedSlots.includes(slot));

    return NextResponse.json({
      success: true,
      date,
      totalSlots: ALL_SLOTS.length,
      bookedSlots,
      availableSlots,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch booking slots" },
      { status: 500 }
    );
  }
}
