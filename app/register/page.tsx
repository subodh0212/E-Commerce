"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/checkout");
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Create Your Account</h1>
        <p className="text-sm text-gray-400">Join Nexus to track orders, manage bookings, and get rewards</p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
            <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="jane@example.com"
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
          {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
