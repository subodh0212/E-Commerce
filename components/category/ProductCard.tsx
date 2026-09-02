"use client";

import Link from "next/link";
import { Star, ShoppingBag, Calendar, Heart, Zap, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount?: number;
  image: string | string[];
  isBookable?: boolean;
  isExpress?: boolean;
  deliveryEstimate?: string;
}

export function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  discountPercent = 0,
  rating,
  reviewsCount = 120,
  image,
  isBookable = false,
  isExpress = true,
  deliveryEstimate = "Tomorrow, by 11 AM",
}: ProductCardProps) {
  let imgUrl = "";
  if (Array.isArray(image) && image.length > 0) {
    imgUrl = image[0];
  } else if (typeof image === "string") {
    try {
      const parsed = JSON.parse(image);
      imgUrl = Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      imgUrl = image;
    }
  }

  const isUrl = typeof imgUrl === "string" && (imgUrl.startsWith("http") || imgUrl.startsWith("/"));

  return (
    <div className="bg-gray-900/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group relative">
      {/* Discount Pill Badge (Flipkart Style) */}
      {discountPercent > 0 && (
        <div className="absolute top-6 left-6 z-10 bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-lg tracking-wider uppercase">
          {discountPercent}% OFF
        </div>
      )}

      <div>
        {/* Image Container with Zoom */}
        <div className="relative w-full h-52 rounded-xl bg-gray-950 border border-gray-800/80 overflow-hidden mb-4 group-hover:shadow-lg transition">
          {isUrl ? (
            <img
              src={imgUrl}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {imgUrl || "📦"}
            </div>
          )}

          <button className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-gray-300 hover:text-red-400 border border-white/10 transition z-10">
            <Heart className="w-4 h-4" />
          </button>

          {isBookable && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-500/50 text-[10px] font-bold text-indigo-300 backdrop-blur-md flex items-center gap-1">
              <Calendar className="w-3 h-3 text-indigo-400" /> Bookable Service
            </span>
          )}
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span className="uppercase tracking-wider font-bold text-[10px] text-indigo-400">{category}</span>
          <div className="flex items-center text-amber-400 font-bold bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded-full text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 mr-1" />
            {rating} <span className="text-gray-500 text-[10px] font-medium ml-1">({reviewsCount})</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Amazon Express Delivery Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-2">
          {isExpress ? <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> : <Truck className="w-3.5 h-3.5 text-gray-400" />}
          <span className="line-clamp-1">{deliveryEstimate}</span>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <Link href={isBookable ? "/booking" : `/product/${id}`}>
          <Button size="sm" variant={isBookable ? "secondary" : "primary"} className="gap-1.5 font-bold">
            {isBookable ? (
              <>
                <Calendar className="w-3.5 h-3.5" /> Book Slot
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Buy Now
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
