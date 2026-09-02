"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, User, Calendar, MapPin, Sparkles, ChevronDown, Sun, Moon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AccountDrawer } from "@/components/layout/AccountDrawer";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [pincode] = useState("10001");

  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== "All") {
        url += `&category=${encodeURIComponent(selectedCategory.toLowerCase())}`;
      }
      router.push(url);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800 transition-colors">
      {/* Amazon / Flipkart Style Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 text-white text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>⚡ BIG SAVINGS SALE: Up to 50% OFF + Extra 10% Instant Bank Discount | Free Express Delivery</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo & Pincode */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white leading-none">NEXUS</span>
                <span className="text-[9px] font-bold text-amber-400 tracking-widest uppercase">MART & SERVICES</span>
              </div>
            </Link>

            {/* Zomato/Amazon Style Pincode Selector */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-300 bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5 cursor-pointer hover:border-indigo-500/50 transition">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <div className="flex flex-col text-[10px]">
                <span className="text-gray-500 leading-none">Deliver to</span>
                <span className="font-bold text-white leading-tight">New York {pincode}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
          </div>

          {/* Search Bar with Category Selector (Amazon Style) */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative flex items-center w-full bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition shadow-inner">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-950 text-xs font-bold text-gray-300 px-3 py-2.5 border-r border-gray-800 focus:outline-none cursor-pointer hover:text-white"
              >
                <option value="All">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="services">Services</option>
                <option value="accessories">Accessories</option>
                <option value="furniture">Furniture</option>
              </select>

              <input
                type="text"
                placeholder="Search products, brands, 1-on-1 services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* User, Theme Toggle & Cart Quick Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/booking"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-3.5 py-2 rounded-xl transition"
            >
              <Calendar className="w-4 h-4" /> Book Slot
            </Link>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white transition flex items-center justify-center"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Account Drawer Toggle */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-900 border border-gray-800 px-3 py-2 rounded-xl transition"
              title="Open Account Menu"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Account</span>
            </button>

            {/* Cart Drawer Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition transform hover:scale-105 cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Links Sub-header */}
        <div className="flex items-center gap-6 mt-2 pt-2 border-t border-gray-800/60 text-xs font-semibold text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/category" className="hover:text-amber-400 text-amber-300 font-bold flex items-center gap-1">
            🔥 Super Deals
          </Link>
          <Link href="/category?category=electronics" className="hover:text-white">Electronics</Link>
          <Link href="/category?category=services" className="hover:text-white">Consulting & Services</Link>
          <Link href="/category?category=accessories" className="hover:text-white">Accessories</Link>
          <Link href="/category?category=furniture" className="hover:text-white">Furniture</Link>
          <Link href="/admin" className="hover:text-indigo-400 text-indigo-300 font-bold ml-auto">
            📊 Seller Admin
          </Link>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AccountDrawer isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </header>
  );
}
