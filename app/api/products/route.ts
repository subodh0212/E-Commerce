import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Ultra Wireless Headphones",
    description: "Active noise cancelling wireless studio headphones.",
    price: 299.99,
    stock: 25,
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
    stock: 12,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.8,
    images: ["⌨️"],
    isBookable: false,
  },
  {
    id: "prod-4",
    name: "Ergonomic Office Chair",
    description: "Lumbar support mesh executive office chair.",
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
    description: "34-inch curved IPS 144Hz display.",
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
    description: "Deep dive code review with a Senior Architect.",
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
    description: "Dimmable LED lamp with wireless phone charger.",
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
    description: "Compact waterproof Bluetooth 5.3 earbuds.",
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
    description: "Full Design System review and token audit.",
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
    description: "Handcrafted Italian leather journal.",
    price: 45.00,
    stock: 50,
    category: "accessories",
    brand: "KeyWorks",
    rating: 4.9,
    images: ["📓"],
    isBookable: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const query = searchParams.get("query") || searchParams.get("search");

    try {
      const whereClause: any = {};

      if (category) {
        whereClause.category = { equals: category, mode: "insensitive" };
      }
      if (brand) {
        whereClause.brand = { equals: brand, mode: "insensitive" };
      }
      if (query) {
        whereClause.OR = [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ];
      }

      const dbProducts = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });

      if (dbProducts.length > 0) {
        const formatted = dbProducts.map((p) => {
          let imgs: any = p.images;
          if (typeof p.images === "string") {
            try { imgs = JSON.parse(p.images); } catch { imgs = [p.images]; }
          }
          return { ...p, images: imgs } as any;
        });
        return NextResponse.json({ success: true, count: formatted.length, data: formatted });
      }
    } catch {
      // Database fallback
    }

    let filtered = [...MOCK_PRODUCTS];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
