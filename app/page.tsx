import Link from "next/link";
import { ArrowRight, ShoppingBag, Calendar, Sparkles, Shield, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/support/TestimonialsCarousel";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";

export default function HomePage() {
  const featuredProducts = [
    {
      id: "prod-1",
      name: "Ultra Wireless Noise-Cancelling Headphones",
      category: "Electronics",
      price: 299.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      type: "Product",
    },
    {
      id: "prod-2",
      name: "1-on-1 Executive Strategy Consultation",
      category: "Services",
      price: 150.00,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      type: "Bookable",
    },
    {
      id: "prod-3",
      name: "Minimalist RGB Mechanical Keyboard",
      category: "Accessories",
      price: 189.00,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      type: "Product",
    },
  ];

  return (
    <div className="space-y-20 pb-20 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-indigo-950/60 via-gray-950 to-gray-950 border-b border-gray-800 rounded-b-3xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-950/80 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-lg shadow-indigo-900/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Hybrid Commerce & Real-Time Service Booking
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover Products & Reserve Live Consultations <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              In One Unified Platform
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore premium physical goods, digital assets, and schedule instant 1-on-1 expert advisory sessions with ease.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/category">
              <Button size="lg" className="gap-2 w-full sm:w-auto font-bold text-base px-6 py-3.5">
                <ShoppingBag className="w-5 h-5" /> Shop Products
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto font-bold text-base px-6 py-3.5">
                <Calendar className="w-5 h-5 text-indigo-400" /> Book a Service <ArrowRight className="w-4 h-4" />
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
            <p className="text-sm text-gray-400">Handpicked premium products with real photography</p>
          </div>
          <Link href="/category" className="text-sm font-bold text-indigo-400 hover:text-indigo-300">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/50 transition shadow-xl group"
            >
              <div>
                <div className="relative w-full h-52 rounded-xl bg-gray-950 border border-gray-800 overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-500/40 text-[10px] font-bold text-indigo-300 backdrop-blur-md">
                    {item.type}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                  <span className="uppercase tracking-wider font-bold text-[10px] text-indigo-400">{item.category}</span>
                  <div className="flex items-center text-amber-400 font-bold bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded-full text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400 mr-1" />
                    {item.rating}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {item.name}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xl font-extrabold text-white">${item.price.toFixed(2)}</span>
                <Link href={item.type === "Bookable" ? "/booking" : `/product/${item.id}`}>
                  <Button size="sm" variant={item.type === "Bookable" ? "secondary" : "primary"} className="font-bold">
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
