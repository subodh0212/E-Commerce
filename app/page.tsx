import Link from "next/link";
import { ArrowRight, ShoppingBag, Calendar, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/support/TestimonialsCarousel";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";

export default function HomePage() {
  const featuredProducts = [
    {
      id: "prod-1",
      name: "Ultra Wireless Headphones",
      category: "Electronics",
      price: 299.99,
      image: "🎧",
      type: "Product",
    },
    {
      id: "prod-2",
      name: "Executive Strategy Session",
      category: "Services",
      price: 150.00,
      image: "📅",
      type: "Bookable",
    },
    {
      id: "prod-3",
      name: "Minimalist Mechanical Keyboard",
      category: "Accessories",
      price: 189.00,
      image: "⌨️",
      type: "Product",
    },
  ];

  return (
    <div className="space-y-20 pb-20 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-indigo-950/50 via-gray-950 to-gray-950 border-b border-gray-800 rounded-b-3xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-950/80 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-lg shadow-indigo-900/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Hybrid Commerce & Real-Time Service Booking
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover Products & Reserve Live Consultations <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              In One Seamless Checkout
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore physical goods, digital assets, and schedule instant 1-on-1 expert advisory sessions with ease.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/category">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <ShoppingBag className="w-4 h-4" /> Shop Products
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Calendar className="w-4 h-4" /> Book a Service <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Reservations</h3>
            <p className="mt-2 text-sm text-gray-400">
              Select date and time slots in real-time with automated calendar sync.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Seamless Shopping</h3>
            <p className="mt-2 text-sm text-gray-400">
              Unified cart supporting physical product delivery and digital service bookings.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Encrypted Payments</h3>
            <p className="mt-2 text-sm text-gray-400">
              Powered by NextAuth and Stripe integrations for end-to-end security.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Items & Services</h2>
            <p className="text-sm text-gray-400">Handpicked items matching 1440px desktop wireframe specs</p>
          </div>
          <Link href="/category" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition shadow-xl group"
            >
              <div>
                <div className="w-full h-40 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  {item.image}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>{item.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-semibold">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{item.name}</h3>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xl font-extrabold text-white">${item.price}</span>
                <Link href={item.type === "Bookable" ? "/booking" : `/product/${item.id}`}>
                  <Button size="sm" variant={item.type === "Bookable" ? "secondary" : "primary"}>
                    {item.type === "Bookable" ? "Book Slot" : "View Product"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white">What Our Clients & Customers Say</h2>
          <p className="text-sm text-gray-400 mt-1">Real feedback from verified buyers and service clients</p>
        </div>
        <TestimonialsCarousel />
      </section>

      {/* Floating Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
}
