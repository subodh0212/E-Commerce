"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Star, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";

interface Context {
  params: Promise<{ category: string }>;
}

export default function AtelierCategoryPage({ params }: Context) {
  const resolvedParams = use(params);
  const rawCategory = resolvedParams.category;
  const categoryName = rawCategory.toLowerCase();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const { addItem, items } = useCart();
  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    async function fetchCategoryItems() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(categoryName)}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch category products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryItems();
  }, [categoryName]);

  const handleAddToCart = (product: any) => {
    let img = product.images;
    if (Array.isArray(product.images) && product.images.length > 0) {
      img = product.images[0];
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: img,
      type: "product",
    });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "men":
        return { title: "Men's Collection", desc: "Everyday tailoring, lightweight linen, and essential layers." };
      case "women":
        return { title: "Women's Edit", desc: "Effortless silhouettes, draped silks, and fine cashmere knitwear." };
      case "footwear":
        return { title: "Footwear Edit", desc: "Handcrafted Italian leather loafers and organic canvas sneakers." };
      case "bags":
        return { title: "Bags & Leatherware", desc: "Full-grain pebbled leather totes and minimalist crossbody bags." };
      case "accessories":
        return { title: "Accessories & Timepieces", desc: "Refined chronograph watches, Japanese acetate eyewear, and leather goods." };
      case "new-in":
        return { title: "New Arrivals / Summer 2026", desc: "The latest edit of modern minimalist summer essentials." };
      default:
        return { title: `${cat.toUpperCase()} Collection`, desc: "A curated edit of minimalist luxury essentials." };
    }
  };

  const info = getCategoryTitle(categoryName);

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans min-h-screen selection:bg-black selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E3]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <Link href="/atelier" className="text-xl font-black tracking-widest uppercase text-[#1A1A1A]">
            ATELIER<span className="text-[#888888] font-normal">/</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-wider text-[#666666]">
            <Link href="/atelier/new-in" className={categoryName === "new-in" ? "text-[#1A1A1A] underline underline-offset-8" : "hover:text-[#1A1A1A] transition"}>New in</Link>
            <Link href="/atelier/men" className={categoryName === "men" ? "text-[#1A1A1A] underline underline-offset-8" : "hover:text-[#1A1A1A] transition"}>Men</Link>
            <Link href="/atelier/women" className={categoryName === "women" ? "text-[#1A1A1A] underline underline-offset-8" : "hover:text-[#1A1A1A] transition"}>Women</Link>
            <Link href="/atelier/footwear" className={categoryName === "footwear" ? "text-[#1A1A1A] underline underline-offset-8" : "hover:text-[#1A1A1A] transition"}>Footwear</Link>
            <Link href="/atelier/accessories" className={categoryName === "accessories" ? "text-[#1A1A1A] underline underline-offset-8" : "hover:text-[#1A1A1A] transition"}>Accessories</Link>
          </nav>

          <div className="flex items-center space-x-6">
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

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12 space-y-10">
        {/* Back Link & Category Header */}
        <div className="space-y-4 border-b border-[#EAE8E3] pb-8">
          <Link href="/atelier" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#888888] hover:text-[#1A1A1A] font-semibold transition">
            <ArrowLeft className="w-4 h-4" /> Back to Storefront
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#888888] font-semibold block">
                Category Edit
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] mt-1">{info.title}</h1>
              <p className="text-xs sm:text-sm text-[#666666] font-light mt-2 max-w-xl">{info.desc}</p>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#888888] font-semibold">
              Showing {products.length} pieces
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#1A1A1A] gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1A1A1A]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#888888]">
              Loading {rawCategory} collection...
            </span>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 space-y-4">
            <h3 className="text-xl font-serif text-[#1A1A1A]">No pieces found in this edit</h3>
            <p className="text-xs text-[#666666]">Explore our full catalog to discover available minimalist luxury designs.</p>
            <Link href="/atelier" className="inline-block bg-[#1A1A1A] text-white text-xs uppercase tracking-widest px-6 py-3 font-semibold mt-2">
              Browse All Collections
            </Link>
          </div>
        ) : (
          /* Dynamic Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => {
              let imgUrl = item.images;
              if (Array.isArray(item.images) && item.images.length > 0) {
                imgUrl = item.images[0];
              } else if (typeof item.images === "string") {
                try {
                  const parsed = JSON.parse(item.images);
                  imgUrl = Array.isArray(parsed) ? parsed[0] : item.images;
                } catch {
                  imgUrl = item.images;
                }
              }

              return (
                <div key={item.id} className="group flex flex-col justify-between space-y-4">
                  <div className="relative aspect-[4/5] bg-[#F3F3F1] overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {item.discountPercent > 0 && (
                      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold bg-[#1A1A1A] text-white px-2.5 py-1">
                        -{item.discountPercent}%
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
                      <span className="font-semibold text-[#1A1A1A]">{item.rating || 4.9}</span>
                      <span>({item.reviewsCount || 120})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#EAE8E3] text-[#666666] text-xs py-12 px-6 sm:px-10 mt-20">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#888888]">
          <span>© 2026 Atelier Storefront. All rights reserved.</span>
          <div className="flex gap-6 uppercase tracking-wider font-semibold">
            <Link href="/atelier/men" className="hover:text-[#1A1A1A]">Men</Link>
            <Link href="/atelier/women" className="hover:text-[#1A1A1A]">Women</Link>
            <Link href="/atelier/footwear" className="hover:text-[#1A1A1A]">Footwear</Link>
            <Link href="/atelier/bags" className="hover:text-[#1A1A1A]">Bags</Link>
            <Link href="/atelier/accessories" className="hover:text-[#1A1A1A]">Accessories</Link>
          </div>
        </div>
      </footer>

      <LiveChatWidget />
    </div>
  );
}
