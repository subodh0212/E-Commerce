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
    description: "Hot-swappable RGB wireless mechanical keyboard with aluminum frame.",
    price: 189.00,
    stock: 8,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.8,
    images: ["⌨️"],
    isBookable: false,
  },
  {
    id: "prod-4",
    name: "Ergonomic Office Chair",
    description: "Lumbar support mesh executive office chair with 4D adjustable armrests.",
    price: 349.50,
    stock: 8,
    category: "furniture",
    brand: "ErgoDesign",
    rating: 4.7,
    images: ["🪑"],
    isBookable: false,
  },
  {
    id: "prod-5",
    name: "4K Ultra-Wide Monitor",
    description: "34-inch curved IPS 144Hz display with HDR400 and USB-C hub.",
    price: 699.00,
    stock: 10,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.9,
    images: ["🖥️"],
    isBookable: false,
  },
  {
    id: "prod-6",
    name: "1-on-1 Code Architecture Review",
    description: "Deep dive code review and system scaling advisory session.",
    price: 220.00,
    stock: 50,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: ["💻"],
    isBookable: true,
  },
  {
    id: "prod-7",
    name: "Smart Studio Desk Lamp",
    description: "Dimmable LED lamp with wireless phone charger and auto-brightness sensor.",
    price: 79.99,
    stock: 30,
    category: "accessories",
    brand: "ErgoDesign",
    rating: 4.6,
    images: ["💡"],
    isBookable: false,
  },
  {
    id: "prod-8",
    name: "Wireless Noise-Isolating Earbuds",
    description: "Compact waterproof Bluetooth 5.3 earbuds with active ANC.",
    price: 129.99,
    stock: 40,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.8,
    images: ["🎵"],
    isBookable: false,
  },
  {
    id: "prod-9",
    name: "Custom UI Design System Consulting",
    description: "Full Design System review, component audit, and token strategy.",
    price: 450.00,
    stock: 20,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: ["🎨"],
    isBookable: true,
  },
  {
    id: "prod-10",
    name: "Leather Executive Notebook & Pen",
    description: "Handcrafted Italian leather journal with refillable fountain pen.",
    price: 45.00,
    stock: 50,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.9,
    images: ["📓"],
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
        let parsedImages: any = product.images;
        if (typeof product.images === "string") {
          try {
            parsedImages = JSON.parse(product.images);
          } catch {
            parsedImages = [product.images];
          }
        }
        return NextResponse.json({
          success: true,
          data: {
            ...product,
            images: parsedImages,
          } as any,
        });
      }
    } catch {
      // Database fallback
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
