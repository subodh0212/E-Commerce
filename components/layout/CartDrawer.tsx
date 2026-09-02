"use client";

import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, tax, total, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gray-950 border-l border-gray-800 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-indigo-400" />
              <h2 className="text-lg font-bold">Your Cart ({itemCount})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
                  <ShoppingBag className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-base font-bold text-white">Your Cart is Empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Looks like you haven't added any products or reserved service slots yet.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Browsing
                </button>
              </div>
            ) : (
              items.map((item) => {
                const isUrl = typeof item.image === "string" && (item.image.startsWith("http") || item.image.startsWith("/"));
                return (
                  <div
                    key={item.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-700 transition"
                  >
                    <div className="w-14 h-14 bg-gray-950 border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center text-2xl flex-shrink-0">
                      {isUrl ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        item.image || "📦"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        {item.type}
                      </span>
                      <h4 className="text-sm font-semibold truncate text-white">{item.name}</h4>
                      <p className="text-sm font-bold text-gray-300 mt-1">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {item.type === "product" && (
                        <div className="flex items-center space-x-1 border border-gray-800 rounded-lg bg-gray-950 p-0.5 text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-indigo-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-indigo-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-800 bg-gray-900/50 space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Estimated Tax (8%)</span>
                <span className="text-white font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white border-t border-gray-800 pt-3">
                <span>Total</span>
                <span className="text-indigo-400">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" onClick={onClose} className="block pt-2">
                <Button size="lg" className="w-full gap-2">
                  Checkout Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
