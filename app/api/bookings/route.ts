import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlot, productId, userId, notes } = body;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: "Date and timeSlot are required" },
        { status: 400 }
      );
    }

    try {
      // Find valid user ID or fallback to first user in database
      let targetUserId = userId;
      if (!targetUserId) {
        const firstUser = await prisma.user.findFirst();
        targetUserId = firstUser?.id;
      }

      if (!targetUserId) {
        const newUser = await prisma.user.create({
          data: { email: `guest_${Date.now()}@example.com` },
        });
        targetUserId = newUser.id;
      }

      // Check for slot collisions
      const existing = await prisma.booking.findFirst({
        where: {
          date,
          timeSlot,
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "Selected slot is no longer available" },
          { status: 409 }
        );
      }

      const booking = await prisma.booking.create({
        data: {
          userId: targetUserId,
          productId,
          date,
          timeSlot,
          status: "CONFIRMED",
          notes,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Booking slot reserved successfully",
        booking,
      });
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, error: dbError.message || "Database booking error" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create slot reservation" },
      { status: 500 }
    );
  }
}
