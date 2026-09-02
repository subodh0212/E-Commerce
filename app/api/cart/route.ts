import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart items are required" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    return NextResponse.json({
      success: true,
      message: "Cart validated successfully",
      summary: {
        itemCount: items.length,
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat((subtotal * 0.08).toFixed(2)),
        total: parseFloat((subtotal * 1.08).toFixed(2)),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid cart request" },
      { status: 500 }
    );
  }
}
