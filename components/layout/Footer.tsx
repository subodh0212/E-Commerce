import Link from "next/link";
import { MessageSquare, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                N
              </div>
              <span className="text-base font-black text-white tracking-wider">NEXUS</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Hybrid E-Commerce & Service Booking Platform. Shop physical products and schedule instant 1-on-1 strategy sessions in one checkout.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs">Explore Categories</h4>
            <ul className="space-y-1.5">
              <li><Link href="/category?category=electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link href="/category?category=services" className="hover:text-white transition">Consulting & Advisory</Link></li>
              <li><Link href="/category?category=accessories" className="hover:text-white transition">Accessories</Link></li>
              <li><Link href="/category?category=furniture" className="hover:text-white transition">Ergonomic Furniture</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs">Quick Navigation</h4>
            <ul className="space-y-1.5">
              <li><Link href="/booking" className="hover:text-indigo-400 transition">Book Service Slot</Link></li>
              <li><Link href="/cart" className="hover:text-indigo-400 transition">View Shopping Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-indigo-400 transition">Checkout</Link></li>
              <li><Link href="/admin" className="hover:text-indigo-400 transition">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs">Customer Support</h4>
            <ul className="space-y-1.5">
              <li><Link href="/contact" className="hover:text-amber-400 text-amber-300 font-bold transition flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Send Message / Contact Us</Link></li>
              <li><span className="text-gray-500">Email: support@nexusmart.com</span></li>
              <li><span className="text-gray-500">Phone: +1 (800) 555-0199</span></li>
              <li><span className="text-gray-500">24/7 Live Support Connected</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
          <span>© 2026 Nexus Platform Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
