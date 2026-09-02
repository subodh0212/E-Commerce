"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: "product" | "booking";
  date?: string;
  timeSlot?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  addBookingSlot: (service: { id: string; name: string; price: number; date: string; timeSlot: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("nexus_cart");
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [
      {
        id: "prod-1",
        name: "Ultra Wireless Headphones",
        price: 299.99,
        quantity: 1,
        image: "🎧",
        type: "product",
      },
    ];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_cart", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.type === item.type);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const addBookingSlot = (service: { id: string; name: string; price: number; date: string; timeSlot: string }) => {
    const bookingId = `booking_${service.id}_${service.date}_${service.timeSlot.replace(/\s+/g, "")}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === bookingId);
      if (existing) return prev;
      return [
        ...prev,
        {
          id: bookingId,
          name: `${service.name} (${service.date} at ${service.timeSlot})`,
          price: service.price,
          quantity: 1,
          image: "📅",
          type: "booking",
          date: service.date,
          timeSlot: service.timeSlot,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addBookingSlot,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
