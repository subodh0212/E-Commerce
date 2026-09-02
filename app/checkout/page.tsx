import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <p className="text-sm text-gray-400">Complete your order securely</p>
      </div>

      <CheckoutForm />
    </div>
  );
}
