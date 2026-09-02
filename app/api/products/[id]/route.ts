import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Ultra Wireless Headphones",
    description: "Premium studio-quality acoustics with active noise cancellation, 40-hour battery life, and high-fidelity Bluetooth 5.3 playback.",
    price: 299.99,
    stock: 15,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.9,
    images: ["🎧"],
    isBookable: false,
  },
  {
    id: "prod-2",
    name: "Executive Strategy Session",
    description: "1-on-1 60 minute strategy & technical consulting.",
    price: 150.00,
    stock: 99,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: ["📅"],
    isBookable: true,
  },
  {
    id: "prod-3",
    name: "Minimalist Mechanical Keyboard",
    description: "Hot-swappable RGB wireless mechanical keyboard.",
    price: 189.00,
    stock: 8,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.8,
    images: ["⌨️"],
    isBookable: false,
  },
];

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (product) {
        return NextResponse.json({ success: true, data: product });
      }
    } catch {
      // Fallback
    }

    const mockItem = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

    return NextResponse.json({
      success: true,
      data: { ...mockItem, id },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Product not found" },
      { status: 404 }
    );
  }
}
