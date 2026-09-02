import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

interface TestResult {
  name: string;
  category: "Unit API" | "E2E Integration";
  passed: boolean;
  durationMs: number;
  error?: string;
}

const testResults: TestResult[] = [];

async function runTest(
  name: string,
  category: "Unit API" | "E2E Integration",
  testFn: () => Promise<void>
) {
  const start = Date.now();
  try {
    await testFn();
    const durationMs = Date.now() - start;
    testResults.push({ name, category, passed: true, durationMs });
    console.log(` ✅ PASSED [${category}]: ${name} (${durationMs}ms)`);
  } catch (err: any) {
    const durationMs = Date.now() - start;
    testResults.push({ name, category, passed: false, durationMs, error: err.message });
    console.error(` ❌ FAILED [${category}]: ${name} (${durationMs}ms) - ${err.message}`);
  }
}

async function runFullTestSuite() {
  console.log("\n=======================================================");
  console.log(" 🧪 QA LEAD FULL TEST SUITE RUNNER");
  console.log("=======================================================\n");

  // --- UNIT API TESTS ---
  await runTest("GET /api/products returns all 10 seeded products from DB", "Unit API", async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    const json = await res.json();
    if (!json.success) throw new Error("API returned success=false");
    if (json.count < 10) throw new Error(`Expected at least 10 products, got ${json.count}`);
  });

  await runTest("GET /api/products?category=services filters products correctly", "Unit API", async () => {
    const res = await fetch(`${BASE_URL}/api/products?category=services`);
    const json = await res.json();
    if (!json.success) throw new Error("API returned success=false");
    const nonServices = json.data.filter((p: any) => p.category.toLowerCase() !== "services");
    if (nonServices.length > 0) throw new Error("Found non-service products in filtered category");
  });

  await runTest("GET /api/products/[id] returns detailed product schema", "Unit API", async () => {
    const res = await fetch(`${BASE_URL}/api/products/prod-1`);
    const json = await res.json();
    if (!json.success || !json.data) throw new Error("Failed to fetch prod-1");
    if (json.data.name !== "Ultra Wireless Headphones") {
      throw new Error(`Unexpected product name: ${json.data.name}`);
    }
  });

  await runTest("POST /api/cart calculates totals & 8% tax accurately", "Unit API", async () => {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "prod-1", price: 100.0, quantity: 2 }],
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error("Cart API failed");
    if (json.summary.subtotal !== 200.0) throw new Error(`Subtotal mismatch: ${json.summary.subtotal}`);
    if (json.summary.tax !== 16.0) throw new Error(`Tax mismatch: ${json.summary.tax}`);
  });

  await runTest("GET /api/bookings/slots identifies open vs booked slots for date", "Unit API", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/slots?date=2026-09-15`);
    const json = await res.json();
    if (!json.success) throw new Error("Bookings slot API failed");
    if (!json.bookedSlots.includes("10:30 AM")) {
      throw new Error("Expected 10:30 AM to be marked as booked from seed data");
    }
  });

  await runTest("POST /api/bookings reserves time slot & prevents collision", "Unit API", async () => {
    const testSlot = "04:00 PM";
    const date = "2026-09-20";

    // First reservation
    const res1 = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, timeSlot: testSlot, productId: "prod-2" }),
    });
    const json1 = await res1.json();
    if (!json1.success) throw new Error("First reservation failed");

    // Second reservation on same slot -> collision
    const res2 = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, timeSlot: testSlot, productId: "prod-2" }),
    });
    if (res2.status !== 409) {
      throw new Error(`Expected HTTP 409 Collision error, got status ${res2.status}`);
    }
  });

  // --- E2E INTEGRATION TESTS ---
  await runTest("E2E User Flow A: Browse -> Add Cart -> Complete Checkout", "E2E Integration", async () => {
    // 1. Browse items
    const prodRes = await fetch(`${BASE_URL}/api/products/prod-1`);
    const prodJson = await prodRes.json();
    const product = prodJson.data;

    // 2. Add to cart & checkout
    const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: product.id, name: product.name, price: product.price, quantity: 1 }],
        email: "e2e.user@example.com",
      }),
    });
    const checkoutJson = await checkoutRes.json();
    if (!checkoutJson.success || !checkoutJson.orderId) {
      throw new Error("Checkout E2E flow failed to produce orderId");
    }
  });

  await runTest("E2E User Flow B: Select Calendar Date -> Reserve Slot -> Confirm Order", "E2E Integration", async () => {
    const targetDate = "2026-09-25";

    // 1. Check open slots
    const slotsRes = await fetch(`${BASE_URL}/api/bookings/slots?date=${targetDate}`);
    const slotsJson = await slotsRes.json();
    const availableSlot = slotsJson.availableSlots[0];

    // 2. Reserve slot
    const bookRes = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: targetDate,
        timeSlot: availableSlot,
        productId: "prod-2",
      }),
    });
    const bookJson = await bookRes.json();
    if (!bookJson.success) throw new Error("Slot reservation failed in E2E flow");

    // 3. Submit checkout for booking
    const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: bookJson.booking.id, name: `Consultation (${targetDate})`, price: 150.0, quantity: 1 }],
        email: "e2e.booking@example.com",
      }),
    });
    const checkoutJson = await checkoutRes.json();
    if (!checkoutJson.success) throw new Error("Checkout confirmation failed for booking slot");
  });

  // SUMMARY REPORT
  console.log("\n=======================================================");
  console.log(" 📊 SUMMARY TEST REPORT");
  console.log("=======================================================");
  const passedCount = testResults.filter((r) => r.passed).length;
  const totalCount = testResults.length;
  console.log(` Total Executed: ${totalCount}`);
  console.log(` Passed:         ${passedCount}`);
  console.log(` Failed:         ${totalCount - passedCount}`);
  console.log("=======================================================\n");

  await prisma.$disconnect();

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

runFullTestSuite();
