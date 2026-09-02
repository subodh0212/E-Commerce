import Link from "next/link";
import { ArrowRight, ShoppingBag, Calendar, Sparkles, ShieldCheck, Zap, Truck, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/support/TestimonialsCarousel";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";
import { ProductCard } from "@/components/category/ProductCard";

async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  const dealProducts = products.slice(0, 6);

  return (
    <div className="space-y-16 pb-20 max-w-[1440px] mx-auto">
      {/* Amazon / Flipkart Style Hero Carousel Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950/80 via-gray-950 to-gray-950 border-b border-gray-800 rounded-b-3xl">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/40 bg-amber-950/80 text-xs font-bold text-amber-300 shadow-lg shadow-amber-900/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            NEXUS BIG SAVINGS SALE • UP TO 50% OFF
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Shop Premium Products & Reserve Live Consultations <br />
            <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              With Lightning Fast Delivery
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Discover 100% original electronics, accessories, ergonomic furniture, and instant 1-on-1 expert advisory sessions in one unified checkout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/category">
              <Button size="lg" className="gap-2 font-black text-base px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black shadow-xl shadow-amber-500/20">
                <ShoppingBag className="w-5 h-5" /> EXPLORE ALL DEALS
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="gap-2 font-bold text-base px-6 py-4 border-indigo-500/50 text-indigo-300 hover:bg-indigo-950">
                <Calendar className="w-5 h-5 text-indigo-400" /> BOOK SERVICE SLOT <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Zomato / Flipkart Style Category Quick Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/category?category=electronics"
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/50 hover:scale-[1.02] transition shadow-lg group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-2xl group-hover:scale-110 transition">
              🎧
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Electronics</h4>
              <span className="text-xs text-gray-400">Headphones, Monitors</span>
            </div>
          </Link>

          <Link
            href="/category?category=services"
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/50 hover:scale-[1.02] transition shadow-lg group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl group-hover:scale-110 transition">
              📅
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Consulting Services</h4>
              <span className="text-xs text-gray-400">1-on-1 Live Sessions</span>
            </div>
          </Link>

          <Link
            href="/category?category=accessories"
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/50 hover:scale-[1.02] transition shadow-lg group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl group-hover:scale-110 transition">
              ⌨️
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Accessories</h4>
              <span className="text-xs text-gray-400">Keyboards, Lamps</span>
            </div>
          </Link>

          <Link
            href="/category?category=furniture"
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/50 hover:scale-[1.02] transition shadow-lg group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl group-hover:scale-110 transition">
              🪑
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Furniture</h4>
              <span className="text-xs text-gray-400">Ergonomic Chairs</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Amazon Style "Deal of the Day" Countdown Banner */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950 via-gray-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Deal of the Day • Limited Time Only
            </div>
            <h3 className="text-2xl font-black text-white">Save Up to 40% on Top Rated Tech & Advisory</h3>
            <p className="text-xs text-gray-400">Includes free express delivery + 2-year manufacturer warranty</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-center">
              <span className="text-xl font-black text-amber-400 block">04</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold">Hours</span>
            </div>
            <span className="text-amber-400 font-black text-xl">:</span>
            <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-center">
              <span className="text-xl font-black text-amber-400 block">28</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold">Mins</span>
            </div>
            <span className="text-amber-400 font-black text-xl">:</span>
            <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-center">
              <span className="text-xl font-black text-amber-400 block">12</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Super Savings Catalog</h2>
            <p className="text-xs text-gray-400">Genuine products backed by Nexus Guarantee</p>
          </div>
          <Link href="/category" className="text-xs font-bold text-amber-400 hover:text-amber-300">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealProducts.map((p: any) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* Amazon / Flipkart Style Trust Badges */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <div className="space-y-1.5">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">100% Genuine Products</h4>
            <p className="text-[11px] text-gray-500">Sourced directly from verified brands</p>
          </div>

          <div className="space-y-1.5">
            <Zap className="w-6 h-6 text-indigo-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">Express Delivery</h4>
            <p className="text-[11px] text-gray-500">Same-day or next-day shipping</p>
          </div>

          <div className="space-y-1.5">
            <Truck className="w-6 h-6 text-purple-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">30-Day Easy Returns</h4>
            <p className="text-[11px] text-gray-500">Hassle-free replacement policy</p>
          </div>

          <div className="space-y-1.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">256-Bit Encrypted Payments</h4>
            <p className="text-[11px] text-gray-500">Stripe & Bank level security</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">What Customers Say About Nexus</h2>
          <p className="text-xs text-gray-400">Verified buyer ratings and consulting reviews</p>
        </div>
        <TestimonialsCarousel />
      </section>

      {/* Floating Support */}
      <LiveChatWidget />
    </div>
  );
}
