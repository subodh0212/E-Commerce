"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Zap, Heart, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

interface ProductDetailViewProps {
  id: string;
}

export function ProductDetailView({ id }: ProductDetailViewProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("Space Gray");
  const [selectedSize, setSelectedSize] = useState<string>("Standard");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-8 max-w-5xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-900 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-900 rounded w-3/4" />
            <div className="h-6 bg-gray-900 rounded w-1/4" />
            <div className="h-24 bg-gray-900 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  const p = product || {
    id,
    name: "Ultra Wireless Noise-Cancelling Headphones",
    price: 299.99,
    description: "Premium studio-quality acoustics with active noise cancellation, 40-hour battery life, and high-fidelity Bluetooth 5.3 playback.",
    category: "electronics",
    brand: "SonicMaster",
    stock: 15,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
  };

  const images = p.images?.length > 0 ? p.images : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"];
  const colors = ["Space Gray", "Matte Black", "Midnight Blue"];
  const sizes = ["Standard", "Pro Cushions"];

  const handleAddToCart = () => {
    addItem(
      {
        id: p.id,
        name: `${p.name} (${selectedColor})`,
        price: p.price,
        image: images[0],
        type: "product",
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Multi-Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
            {typeof images[selectedImage] === "string" && images[selectedImage].startsWith("http") ? (
              <img
                src={images[selectedImage]}
                alt={p.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                {images[selectedImage] || "📦"}
              </div>
            )}
            <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-gray-300 hover:text-red-400 transition backdrop-blur-md border border-white/10">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl bg-gray-950 border overflow-hidden transition ${
                    selectedImage === idx
                      ? "border-indigo-500 ring-2 ring-indigo-500/30"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {typeof img === "string" && img.startsWith("http") ? (
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl flex items-center justify-center h-full">{img}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Selection */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold mb-2 uppercase tracking-wider">
              <span>{p.brand || "NEXUS"}</span> •{" "}
              <span className="text-emerald-400">IN STOCK ({p.stock || 10} ITEMS)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{p.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400 text-sm font-bold bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 mr-1" /> {p.rating || 4.9}
              </div>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">128 verified customer reviews</span>
            </div>
          </div>

          <div className="text-4xl font-black text-white">${p.price}</div>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">
              Color: <span className="text-white">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition ${
                    selectedColor === c
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      : "bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">
              Cushion Variant: <span className="text-white">{selectedSize}</span>
            </label>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition ${
                    selectedSize === s
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      : "bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Incrementor */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Quantity</label>
            <div className="flex items-center space-x-3 w-fit border border-gray-800 rounded-xl bg-gray-900 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-white px-3 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-gray-400 hover:text-white transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={handleAddToCart} className="flex-1 gap-2 font-bold text-base py-3.5">
              {added ? <Check className="w-5 h-5 text-emerald-400" /> : <ShoppingBag className="w-5 h-5" />}
              {added ? "ADDED TO CART!" : "ADD TO CART"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleBuyNow}
              className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base py-3.5"
            >
              <Zap className="w-5 h-5" /> BUY NOW
            </Button>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-indigo-400" /> Free Express Shipping</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-400" /> 2-Yr Full Warranty</div>
            <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-indigo-400" /> 30-Day Money Back</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-gray-800 space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 transition border-b-2 ${
              activeTab === "description"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-4 transition border-b-2 ${
              activeTab === "specs"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 transition border-b-2 ${
              activeTab === "reviews"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Reviews (2)
          </button>
        </div>

        {activeTab === "description" && (
          <p className="text-sm text-gray-300 leading-relaxed">{p.description}</p>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="bg-gray-950 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-500 text-xs block font-bold">Category:</span> {p.category}
            </div>
            <div className="bg-gray-950 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-500 text-xs block font-bold">Brand:</span> {p.brand}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
              <div className="flex justify-between text-xs text-gray-400 mb-1 font-bold">
                <span>Alex M.</span>
                <span className="text-emerald-400">Verified Buyer</span>
              </div>
              <p>Exceptional sound stage and build quality!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
