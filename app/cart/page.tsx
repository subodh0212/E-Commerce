"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-indigo-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-gray-400 mt-2">
            You haven't added any physical products or booked service slots yet.
          </p>
        </div>
        <Link href="/category" className="inline-block pt-2">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Start Shopping Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-white flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-indigo-400" /> Shopping Cart ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-700 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-950 border border-gray-800 rounded-lg flex items-center justify-center text-3xl">
                  {item.image || "📦"}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400">
                    {item.type}
                  </span>
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-xs font-bold text-indigo-300 mt-1">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {item.type === "product" && (
                  <div className="flex items-center space-x-1 border border-gray-800 rounded-lg bg-gray-950 p-1 text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-indigo-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold px-2 text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-indigo-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">Order Summary</h2>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Estimated Tax (8%)</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-800 pt-4 flex justify-between font-bold text-white text-lg">
            <span>Total</span>
            <span className="text-indigo-400">${total.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="block pt-2">
            <Button size="lg" className="w-full gap-2">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
