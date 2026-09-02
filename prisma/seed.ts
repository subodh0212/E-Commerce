import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with 10 sample products and 5 mock booking slots...");

  // Seed sample user
  const user = await prisma.user.upsert({
    where: { email: "alex.qa@example.com" },
    update: {},
    create: {
      email: "alex.qa@example.com",
      password: "hashed_password_123",
      role: "USER",
    },
  });

  // Seed 10 products
  const products = [
    {
      id: "prod-1",
      name: "Ultra Wireless Headphones",
      description: "Active noise cancelling wireless studio headphones.",
      price: 299.99,
      stock: 25,
      category: "electronics",
      brand: "SonicMaster",
      rating: 4.9,
      images: JSON.stringify(["🎧"]),
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
      images: JSON.stringify(["📅"]),
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
      images: JSON.stringify(["⌨️"]),
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
      images: JSON.stringify(["🪑"]),
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
      images: JSON.stringify(["🖥️"]),
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
      images: JSON.stringify(["💻"]),
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
      images: JSON.stringify(["💡"]),
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
      images: JSON.stringify(["🎵"]),
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
      images: JSON.stringify(["🎨"]),
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
      images: JSON.stringify(["📓"]),
      isBookable: false,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  // Seed 5 mock booking slots
  const mockBookings = [
    { id: "b-1", userId: user.id, productId: "prod-2", date: "2026-09-15", timeSlot: "10:30 AM", status: "CONFIRMED" },
    { id: "b-2", userId: user.id, productId: "prod-2", date: "2026-09-15", timeSlot: "01:00 PM", status: "CONFIRMED" },
    { id: "b-3", userId: user.id, productId: "prod-6", date: "2026-09-16", timeSlot: "09:00 AM", status: "CONFIRMED" },
    { id: "b-4", userId: user.id, productId: "prod-6", date: "2026-09-16", timeSlot: "02:30 PM", status: "CONFIRMED" },
    { id: "b-5", userId: user.id, productId: "prod-9", date: "2026-09-17", timeSlot: "04:00 PM", status: "CONFIRMED" },
  ];

  for (const b of mockBookings) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: b,
      create: b,
    });
  }

  console.log("Database successfully seeded with 10 products and 5 mock booking slots!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
