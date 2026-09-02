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
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
      <div>
        {/* Image Container with Wishlist Icon */}
        <div className="relative w-full h-48 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-6xl mb-4 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          <span>{image}</span>
          <button className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/80 backdrop-blur-md text-gray-400 hover:text-red-400 transition">
            <Heart className="w-4 h-4" />
          </button>
          {isBookable && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-500/40 text-[10px] font-bold text-indigo-300 backdrop-blur-md">
              Bookable Service
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[10px]">{category}</span>
          <div className="flex items-center text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
            {rating}
          </div>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {name}
        </h3>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
        <span className="text-xl font-extrabold text-white">${price}</span>
        <Link href={isBookable ? "/booking" : `/product/${id}`}>
          <Button size="sm" variant={isBookable ? "secondary" : "primary"} className="gap-1.5">
            {isBookable ? (
              <>
                <Calendar className="w-3.5 h-3.5" /> Book Slot
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> View Item
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
