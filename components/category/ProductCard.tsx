"use client";

import Link from "next/link";
import { Star, ShoppingBag, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  isBookable?: boolean;
}

export function ProductCard({
  id,
  name,
  category,
  price,
  rating,
  image,
  isBookable = false,
}: ProductCardProps) {
  // If image is a URL, display <img>, otherwise fallback
  const isUrl = typeof image === "string" && (image.startsWith("http") || image.startsWith("/"));

  return (
    <div className="bg-gray-900/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group">
      <div>
        {/* Image Container with Hover Zoom */}
        <div className="relative w-full h-52 rounded-xl bg-gray-950 border border-gray-800/80 overflow-hidden mb-4 group-hover:shadow-lg transition">
          {isUrl ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {image || "📦"}
            </div>
          )}

          <button className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-gray-300 hover:text-red-400 border border-white/10 transition">
            <Heart className="w-4 h-4" />
          </button>

          {isBookable && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-500/50 text-[10px] font-bold text-indigo-300 backdrop-blur-md">
              Bookable Service
            </span>
          )}
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span className="uppercase tracking-wider font-bold text-[10px] text-indigo-400">{category}</span>
          <div className="flex items-center text-amber-400 font-bold bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded-full text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 mr-1" />
            {rating}
          </div>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {name}
        </h3>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-5 pt-4 border-t border-gray-800/80 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Price</span>
          <span className="text-xl font-black text-white">${price.toFixed(2)}</span>
        </div>
        <Link href={isBookable ? "/booking" : `/product/${id}`}>
          <Button size="sm" variant={isBookable ? "secondary" : "primary"} className="gap-1.5 font-bold">
            {isBookable ? (
              <>
                <Calendar className="w-3.5 h-3.5" /> Book Slot
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> View Product
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
