import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const atelierProducts = [
  // Men's Collection
  {
    id: "atelier-m1",
    name: "Linen Relaxed Overshirt",
    description: "Tailored from pure European flax linen with a relaxed silhouette and natural horn buttons.",
    price: 79.00,
    originalPrice: 110.00,
    discountPercent: 28,
    stock: 20,
    category: "men",
    brand: "Atelier Studio",
    rating: 4.9,
    reviewsCount: 126,
    isExpress: true,
    deliveryEstimate: "2-Day Express Shipping",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-m2",
    name: "Single-Breasted Wool Blazer",
    description: "Structured Italian wool blazer featuring unlined construction for lightweight summer layering.",
    price: 245.00,
    originalPrice: 320.00,
    discountPercent: 23,
    stock: 15,
    category: "men",
    brand: "Atelier Studio",
    rating: 5.0,
    reviewsCount: 88,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 11 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-m3",
    name: "Pleated Tapered Trousers",
    description: "Classic double-pleated trousers crafted from breathable organic cotton twill.",
    price: 110.00,
    originalPrice: 150.00,
    discountPercent: 26,
    stock: 18,
    category: "men",
    brand: "Atelier Studio",
    rating: 4.8,
    reviewsCount: 64,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 2 PM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },

  // Women's Collection
  {
    id: "atelier-w1",
    name: "Draped Silk Midi Dress",
    description: "Crafted from 100% mulberry silk with an asymmetric draped neckline and subtle side slit.",
    price: 189.00,
    originalPrice: 260.00,
    discountPercent: 27,
    stock: 14,
    category: "women",
    brand: "Atelier Studio",
    rating: 5.0,
    reviewsCount: 84,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 10 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-w2",
    name: "Minimalist Cashmere Knit Sweater",
    description: "Ultra-soft grade-A Mongolian cashmere with ribbed cuffs and crew collar.",
    price: 210.00,
    originalPrice: 280.00,
    discountPercent: 25,
    stock: 22,
    category: "women",
    brand: "Atelier Studio",
    rating: 4.9,
    reviewsCount: 142,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 11 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-w3",
    name: "High-Waisted Tailored Linen Short",
    description: "High-rise tailored shorts woven from crisp off-white linen with horn buttons.",
    price: 85.00,
    originalPrice: 120.00,
    discountPercent: 29,
    stock: 30,
    category: "women",
    brand: "Atelier Studio",
    rating: 4.7,
    reviewsCount: 56,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 1 PM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },

  // Footwear Collection
  {
    id: "atelier-f1",
    name: "Minimalist Leather Loafers",
    description: "Hand-stitched Italian calfskin leather loafers with cushioned leather insoles.",
    price: 145.00,
    originalPrice: 195.00,
    discountPercent: 25,
    stock: 16,
    category: "footwear",
    brand: "Atelier Footwear",
    rating: 4.8,
    reviewsCount: 210,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 12 PM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-f2",
    name: "Off-White Canvas Court Sneakers",
    description: "Organic cotton canvas low-top sneakers with vulcanized rubber soles.",
    price: 95.00,
    originalPrice: 130.00,
    discountPercent: 27,
    stock: 25,
    category: "footwear",
    brand: "Atelier Footwear",
    rating: 4.9,
    reviewsCount: 178,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 11 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },

  // Bags Collection
  {
    id: "atelier-b1",
    name: "Structured Leather Tote Bag",
    description: "Full-grain pebbled leather tote bag with internal zip pocket and magnetic closure.",
    price: 120.00,
    originalPrice: 175.00,
    discountPercent: 31,
    stock: 12,
    category: "bags",
    brand: "Atelier Leather",
    rating: 4.9,
    reviewsCount: 95,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 11 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-b2",
    name: "Minimalist Crossbody Shoulder Bag",
    description: "Sleek box-calf leather crossbody bag with adjustable shoulder strap.",
    price: 135.00,
    originalPrice: 190.00,
    discountPercent: 29,
    stock: 19,
    category: "bags",
    brand: "Atelier Leather",
    rating: 4.8,
    reviewsCount: 112,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 2 PM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },

  // Accessories Collection
  {
    id: "atelier-a1",
    name: "Refined Chronograph Stainless Watch",
    description: "38mm brushed stainless steel timepiece with sapphire crystal glass and Swiss quartz movement.",
    price: 195.00,
    originalPrice: 275.00,
    discountPercent: 29,
    stock: 15,
    category: "accessories",
    brand: "Atelier Timepieces",
    rating: 5.0,
    reviewsCount: 165,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 10 AM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
  {
    id: "atelier-a2",
    name: "Acetate Square Sunglasses",
    description: "Handcrafted Japanese acetate sunglasses with 100% UV polarized lenses.",
    price: 89.00,
    originalPrice: 125.00,
    discountPercent: 28,
    stock: 35,
    category: "accessories",
    brand: "Atelier Optics",
    rating: 4.7,
    reviewsCount: 92,
    isExpress: true,
    deliveryEstimate: "Tomorrow, by 1 PM",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    ]),
    isBookable: false,
  },
];

async function main() {
  console.log("Seeding Atelier luxury fashion dataset into database...");

  await prisma.booking.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "demo@atelier.com",
      password: "password123",
      role: "USER",
    },
  });

  for (const productData of atelierProducts) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log("Atelier database seeded successfully with 12 items across 5 categories!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
