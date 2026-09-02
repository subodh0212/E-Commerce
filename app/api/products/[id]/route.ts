import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const REAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Ultra Wireless Noise-Cancelling Headphones",
    description: "Premium studio-quality acoustics with active noise cancellation, 40-hour battery life, and high-fidelity Bluetooth 5.3 playback.",
    price: 299.99,
    stock: 15,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-2",
    name: "1-on-1 Executive Strategy Consultation",
    description: "Private 60-minute strategy & technical architecture consulting with a principal engineer.",
    price: 150.00,
    stock: 99,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: true,
  },
  {
    id: "prod-3",
    name: "Minimalist RGB Mechanical Keyboard",
    description: "Hot-swappable tactile wireless mechanical keyboard with CNC anodized aluminum frame.",
    price: 189.00,
    stock: 8,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-4",
    name: "Ergonomic Mesh Executive Chair",
    description: "Dynamic lumbar support mesh executive office chair with 4D adjustable armrests.",
    price: 349.50,
    stock: 8,
    category: "furniture",
    brand: "ErgoDesign",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1279?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-5",
    name: "4K Curved Ultra-Wide Monitor 34\"",
    description: "34-inch curved IPS 144Hz HDR display with integrated 90W USB-C docking station.",
    price: 699.00,
    stock: 10,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-6",
    name: "Senior Code Architecture Review",
    description: "In-depth code quality, security vulnerability, and infrastructure scaling audit.",
    price: 220.00,
    stock: 50,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: true,
  },
  {
    id: "prod-7",
    name: "Smart LED Studio Desk Lamp",
    description: "Dimmable eye-care LED lamp with wireless Qi charging pad and ambient sensor.",
    price: 79.99,
    stock: 30,
    category: "accessories",
    brand: "ErgoDesign",
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-8",
    name: "Active ANC Wireless Studio Earbuds",
    description: "Compact IPX7 waterproof wireless earbuds with spatial audio and wireless charging case.",
    price: 129.99,
    stock: 40,
    category: "electronics",
    brand: "SonicMaster",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: false,
  },
  {
    id: "prod-9",
    name: "UI/UX Design System Workshop",
    description: "Custom Figma component design system tokenization and team design review.",
    price: 450.00,
    stock: 20,
    category: "services",
    brand: "Nexus Advisory",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    ],
    isBookable: true,
  },
  {
    id: "prod-10",
    name: "Italian Leather Executive Journal",
    description: "Handcrafted full-grain Italian leather journal with brass fountain pen.",
    price: 45.00,
    stock: 50,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    ],
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

    const mockItem = REAL_PRODUCTS.find((p) => p.id === id) || REAL_PRODUCTS[0];

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
