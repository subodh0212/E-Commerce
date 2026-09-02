"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Search, User, Truck, RefreshCw, ShieldCheck, Headphones, Star, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";

interface AtelierProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: string;
}

export default function AtelierPage() {
  const { addItem, items } = useCart();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    {
      title: "Men",
      subtitle: "Everyday tailoring",
      image: "https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?auto=format&fit=crop&w=800&q=80",
      link: "/atelier/men",
    },
    {
      title: "Women",
      subtitle: "Effortless layers",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      link: "/atelier/women",
    },
    {
      title: "Footwear",
      subtitle: "Grounded in comfort",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      link: "/atelier/footwear",
    },
    {
      title: "Bags",
      subtitle: "Carry it beautifully",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      link: "/atelier/bags",
    },
    {
      title: "Watches",
      subtitle: "Time, refined",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      link: "/atelier/accessories",
    },
  ];

  const bestSellers: AtelierProduct[] = [
    {
      id: "atelier-m1",
      name: "Linen Relaxed Overshirt",
      category: "Men",
      price: 79.00,
      rating: 4.9,
      reviewsCount: 126,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      tag: "NEW",
    },
    {
      id: "atelier-w1",
      name: "Draped Silk Midi Dress",
      category: "Women",
      price: 189.00,
      rating: 5.0,
      reviewsCount: 84,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      tag: "BESTSELLER",
    },
    {
      id: "atelier-f1",
      name: "Minimalist Leather Loafers",
      category: "Footwear",
      price: 145.00,
      rating: 4.8,
      reviewsCount: 210,
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "atelier-b1",
      name: "Structured Leather Tote Bag",
      category: "Bags",
      price: 120.00,
      rating: 4.9,
      reviewsCount: 95,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleAddToCart = (product: AtelierProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "product",
    });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans min-h-screen selection:bg-black selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E3]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/atelier" className="text-xl font-black tracking-widest uppercase text-[#1A1A1A]">
            ATELIER<span className="text-[#888888] font-normal">/</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-wider text-[#666666]">
            <Link href="/atelier/new-in" className="hover:text-[#1A1A1A] transition-colors">New in</Link>
            <Link href="/atelier/men" className="hover:text-[#1A1A1A] transition-colors">Men</Link>
            <Link href="/atelier/women" className="hover:text-[#1A1A1A] transition-colors">Women</Link>
            <Link href="/atelier/footwear" className="hover:text-[#1A1A1A] transition-colors">Footwear</Link>
            <Link href="/atelier/accessories" className="hover:text-[#1A1A1A] transition-colors">Accessories</Link>
          </nav>

          {/* Iconography */}
          <div className="flex items-center space-x-6">
            <Link href="/search" className="text-[#1A1A1A] hover:text-[#666666] transition">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </Link>
            <Link href="/login" className="text-[#1A1A1A] hover:text-[#666666] transition">
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>
            <Link href="/cart" className="relative text-[#1A1A1A] hover:text-[#666666] transition">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#1A1A1A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full h-[82vh] overflow-hidden bg-[#1A1A1A]">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=80"
          alt="Atelier Summer Collection"
          className="w-full h-full object-cover object-center opacity-70 scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-16 left-6 sm:left-16 max-w-xl text-white space-y-5">
          <span className="text-xs uppercase tracking-widest text-[#E2DFD8] font-medium block">
            Summer collection / 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] font-serif">
            New arrivals, made for slow summer days.
          </h1>
          <p className="text-sm sm:text-base text-[#D4D0C7] font-light leading-relaxed max-w-md">
            A refined edit of lightweight layers, easy tailoring, and pieces that feel right from morning through late evening.
          </p>
          <div className="pt-2">
            <Link href="/atelier/new-in">
              <button className="bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 border border-white/20 hover:border-white transition-all duration-300 inline-flex items-center gap-3">
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition Bar */}
      <section className="border-b border-[#EAE8E3] bg-[#FAF9F6] py-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1.5 flex flex-col items-center">
            <Truck className="w-5 h-5 text-[#1A1A1A] stroke-[1.25]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Free shipping</h4>
            <p className="text-[11px] text-[#666666]">On orders over $75</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <RefreshCw className="w-5 h-5 text-[#1A1A1A] stroke-[1.25]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Easy returns</h4>
            <p className="text-[11px] text-[#666666]">30-day returns</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-[#1A1A1A] stroke-[1.25]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Secure payment</h4>
            <p className="text-[11px] text-[#666666]">Safe & encrypted</p>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <Headphones className="w-5 h-5 text-[#1A1A1A] stroke-[1.25]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Here for you</h4>
            <p className="text-[11px] text-[#666666]">Support, 24/7</p>
          </div>
        </div>
      </section>

      {/* 4. Category Grid ("Top Categories") */}
      <section className="py-20 px-6 sm:px-10 max-w-[1440px] mx-auto space-y-10">
        <div className="flex items-end justify-between border-b border-[#EAE8E3] pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#888888] font-medium block">
              Explore the edit
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-1">Top categories</h2>
          </div>
          <Link href="/atelier/new-in" className="text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#666666] font-semibold flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.link} className="group relative h-96 rounded-none overflow-hidden block">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h3 className="text-xl font-serif font-light">{cat.title}</h3>
                <p className="text-xs text-[#D4D0C7] font-light">{cat.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Product Grid ("Best Selling") */}
      <section className="py-20 px-6 sm:px-10 max-w-[1440px] mx-auto space-y-10 border-t border-[#EAE8E3]">
        <div className="flex items-end justify-between border-b border-[#EAE8E3] pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#888888] font-medium block">
              Chosen often
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-1">Best selling</h2>
          </div>
          <Link href="/atelier/new-in" className="text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#666666] font-semibold flex items-center gap-1">
            Explore catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((item) => (
            <div key={item.id} className="group flex flex-col justify-between space-y-4">
              <div className="relative aspect-[4/5] bg-[#F3F3F1] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {item.tag && (
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold bg-[#1A1A1A] text-white px-2.5 py-1">
                    {item.tag}
                  </span>
                )}

                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  {addedItems[item.id] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> ADDED TO BAG
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[#888888] uppercase tracking-wider text-[10px] font-semibold">{item.category}</span>
                <div className="flex justify-between text-sm font-medium text-[#1A1A1A]">
                  <h4 className="font-serif">{item.name}</h4>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#666666] pt-1">
                  <Star className="w-3 h-3 fill-[#1A1A1A] text-[#1A1A1A]" />
                  <span className="font-semibold text-[#1A1A1A]">{item.rating}</span>
                  <span>({item.reviewsCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Newsletter / Editorial Note Section */}
      <section className="py-24 px-6 bg-[#F3F3F1] border-y border-[#EAE8E3] text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#888888] font-semibold block">
            The Atelier note
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight">
            Get first access to new arrivals and private offers.
          </h2>

          {subscribed ? (
            <div className="bg-[#1A1A1A] text-white p-4 text-xs font-semibold tracking-wider uppercase inline-block">
              Thank you for subscribing to The Atelier note.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#CCCCCC] px-4 py-3 text-xs text-[#1A1A1A] placeholder-[#888888] focus:outline-none focus:border-[#1A1A1A] transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold px-8 py-3.5 transition"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Clean Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#EAE8E3] text-[#666666] text-xs py-16 px-6 sm:px-10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-3">
              <Link href="/atelier" className="text-lg font-black tracking-widest uppercase text-[#1A1A1A] block">
                ATELIER<span className="text-[#888888] font-normal">/</span>
              </Link>
              <p className="text-[#666666] leading-relaxed max-w-sm">
                A modern lifestyle brand defined by quiet elegance, thoughtful craftsmanship, and intentional design.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Customer Care</h4>
              <ul className="space-y-2 text-[#666666]">
                <li><Link href="/contact" className="hover:text-[#1A1A1A] transition">About Atelier</Link></li>
                <li><Link href="/contact" className="hover:text-[#1A1A1A] transition">Contact & Help Desk</Link></li>
                <li><Link href="/cart" className="hover:text-[#1A1A1A] transition">Shipping & Returns</Link></li>
                <li><Link href="/contact" className="hover:text-[#1A1A1A] transition">Terms & Conditions</Link></li>
                <li><Link href="/contact" className="hover:text-[#1A1A1A] transition">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Categories</h4>
              <ul className="space-y-2 text-[#666666]">
                <li><Link href="/atelier/men" className="hover:text-[#1A1A1A] transition">Men's Tailoring</Link></li>
                <li><Link href="/atelier/women" className="hover:text-[#1A1A1A] transition">Women's Knitwear</Link></li>
                <li><Link href="/atelier/footwear" className="hover:text-[#1A1A1A] transition">Italian Footwear</Link></li>
                <li><Link href="/atelier/bags" className="hover:text-[#1A1A1A] transition">Leather Bags</Link></li>
                <li><Link href="/atelier/accessories" className="hover:text-[#1A1A1A] transition">Timepieces & Accessories</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#EAE8E3] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#888888]">
            <span>© 2026 Atelier Storefront Design System. All rights reserved.</span>
            <span>Crafted for modern minimalist lifestyle</span>
          </div>
        </div>
      </footer>

      <LiveChatWidget />
    </div>
  );
}
