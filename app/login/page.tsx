"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/checkout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(callbackUrl);
    }, 800);
  };

  const handleGuestContinue = () => {
    router.push(callbackUrl);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Sign In to Nexus</h1>
        <p className="text-sm text-gray-400">Access your orders, service bookings, and account details</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
            <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
            <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-2 gap-2" size="lg">
          {loading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="relative pt-4 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800" /></div>
          <span className="relative bg-gray-900 px-3 text-xs text-gray-500 uppercase font-semibold">Or</span>
        </div>

        {/* Guest Checkout Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGuestContinue}
          className="w-full gap-2 text-indigo-400 hover:text-indigo-300 border-indigo-900/50"
        >
          <UserCheck className="w-4 h-4" /> Continue as Guest Checkout
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-indigo-400 font-bold hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
