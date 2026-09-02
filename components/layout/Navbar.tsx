"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Calendar, Search, User, Sparkles } from "lucide-react";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AccountDrawer } from "@/components/layout/AccountDrawer";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount } = useCart();
  const router = useRouter();

  const categories = [
    { name: "Electronics", href: "/category?category=electronics" },
    { name: "Consulting", href: "/category?category=services" },
    { name: "Software", href: "/category?category=digital" },
    { name: "Accessories", href: "/category?category=accessories" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md text-white">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-indigo-900/60 text-center py-1.5 px-4 text-xs font-semibold text-indigo-200 border-b border-indigo-500/20">
          <span className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Hybrid Commerce Platform: Shop Products & Reserve Live Consultations in One Checkout
          </span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              NEXUS HUB
            </span>
          </Link>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products, services, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-full pl-10 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-2.5" />
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link href="/booking" className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors" title="Bookings">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Book Slot</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              title="Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-md shadow-indigo-600/50">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Account Drawer"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Links Sub-bar */}
        <div className="border-t border-gray-900 bg-gray-950/60 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center space-x-6 text-xs text-gray-400">
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Categories:</span>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AccountDrawer isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </>
  );
}
