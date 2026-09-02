import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Seed fallback data when DB is unpopulated or disconnected locally
const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Ultra Wireless Headphones",
    description: "Premium active noise-cancelling headphones with 40h battery.",
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
  {
    id: "prod-4",
    name: "Ergonomic Office Chair",
    description: "Lumbar support mesh executive office chair.",
    price: 349.50,
    stock: 12,
    category: "furniture",
    brand: "ErgoDesign",
    rating: 4.7,
    images: ["🪑"],
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
      // Try querying Prisma Database first
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
        return NextResponse.json({ success: true, count: dbProducts.length, data: dbProducts });
      }
    } catch {
      // Database query fallback to in-memory mock data
    }

    // Filter Mock Products fallback
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
