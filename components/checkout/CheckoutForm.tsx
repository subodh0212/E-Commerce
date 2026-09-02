"use client";

import { useState } from "react";
import { CreditCard, Truck, CheckCircle, Lock, ShieldCheck, ArrowRight, ArrowLeft, Tag, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

export function CheckoutForm() {
  const { items, subtotal, tax, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  const discount = promoApplied ? 20.00 : 0.00;
  const finalTotal = Math.max(0, total - discount);

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }

    // Step 3: Final submission -> POST /api/checkout
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalAmount: finalTotal,
          email: "jane.doe@example.com",
        }),
      });
      const data = await res.json();

      if (data.success) {
        setOrderSummary({
          orderId: data.orderId || `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
          totalAmount: finalTotal,
          itemCount: items.length,
          checkoutUrl: data.checkoutUrl,
        });
        clearCart();
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Empty Cart State
  if (items.length === 0 && !orderSummary) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 bg-gray-950 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
          <ShoppingBag className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-sm text-gray-400">Add products or book service slots before proceeding to checkout.</p>
        <Link href="/category" className="inline-block pt-2">
          <Button size="md" className="gap-2">
            Explore Products & Services <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  // Order Confirmation Success Screen
  if (orderSummary) {
    return (
      <div className="bg-gray-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-6">
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
        <div>
          <h2 className="text-2xl font-extrabold text-white">Order Confirmed!</h2>
          <p className="text-sm text-gray-300 mt-1">
            Order ID: <span className="font-mono font-bold text-indigo-400">{orderSummary.orderId}</span>
          </p>
        </div>

        <div className="p-4 bg-gray-950 rounded-2xl border border-gray-800 text-left space-y-3 text-xs text-gray-300">
          <div className="flex justify-between"><span>Items Purchased:</span><span className="text-white font-bold">{orderSummary.itemCount} items/slots</span></div>
          <div className="flex justify-between"><span>Payment Method:</span><span className="text-white font-semibold">Visa ending in 8892</span></div>
          <div className="flex justify-between pt-2 border-t border-gray-800 text-sm font-bold">
            <span>Total Paid:</span>
            <span className="text-emerald-400">${orderSummary.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">Return Home</Button>
          </Link>
          <Link href="/booking" className="flex-1">
            <Button className="w-full">Book More Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Wizard Form Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Step Indicator Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-indigo-400" : "text-gray-500"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-800"}`}>1</span>
            <span>Shipping</span>
          </div>
          <div className="h-0.5 w-8 bg-gray-800" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-indigo-400" : "text-gray-500"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-800"}`}>2</span>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-8 bg-gray-800" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-indigo-400" : "text-gray-500"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-800"}`}>3</span>
            <span>Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmitCheckout} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-400" /> Shipping Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">First Name</label>
                  <input type="text" required defaultValue="Jane" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Last Name</label>
                  <input type="text" required defaultValue="Doe" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Street Address</label>
                <input type="text" required defaultValue="742 Evergreen Terrace" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" /> Payment Method
              </h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Card Number</label>
                <input type="text" required defaultValue="4532 •••• •••• 8892" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Expiry Date</label>
                  <input type="text" required defaultValue="09/28" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">CVC</label>
                  <input type="text" required defaultValue="882" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Final Order Review
              </h3>
              <p className="text-xs text-gray-400">Review your order items before completing purchase.</p>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2 text-xs text-gray-300">
                <div className="flex justify-between"><span>Ship To:</span><span className="text-white font-medium">Jane Doe, 742 Evergreen Terrace</span></div>
                <div className="flex justify-between"><span>Payment Method:</span><span className="text-white font-medium">Visa ending in 8892</span></div>
              </div>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-800">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep((s) => (s - 1) as any)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : <div />}

            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
                </>
              ) : step === 3 ? (
                <>
                  <Lock className="w-4 h-4" /> Complete Purchase (${finalTotal.toFixed(2)})
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit space-y-6">
        <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3">Order Summary</h3>

        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex justify-between text-xs text-gray-300">
              <span className="truncate max-w-[180px]">{it.name} (x{it.quantity})</span>
              <span className="font-semibold text-white">${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Promo Code Input */}
        <div className="pt-4 border-t border-gray-800 space-y-2">
          <label className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-indigo-400" /> Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="NEXUS20"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white uppercase"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPromoApplied(true)}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Itemized Totals & Tax */}
        <div className="pt-4 border-t border-gray-800 space-y-2 text-xs text-gray-400">
          <div className="flex justify-between"><span>Subtotal:</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
          {promoApplied && <div className="flex justify-between text-emerald-400"><span>Discount:</span><span>-$20.00</span></div>}
          <div className="flex justify-between"><span>Estimated Tax (8%):</span><span className="text-white">${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
            <span>Total Due:</span>
            <span className="text-indigo-400 text-base">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
