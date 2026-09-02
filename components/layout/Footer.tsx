import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              NEXUS HUB
            </span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Premium hybrid platform for seamless e-commerce shopping & instant service bookings.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/category" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/category?type=digital" className="hover:text-white transition">Digital Items</Link></li>
              <li><Link href="/category?type=physical" className="hover:text-white transition">Physical Goods</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Bookings</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/booking" className="hover:text-white transition">Consultations</Link></li>
              <li><Link href="/booking" className="hover:text-white transition">Appointments</Link></li>
              <li><Link href="/booking" className="hover:text-white transition">Events & Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/checkout" className="hover:text-white transition">Order Status</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Help & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nexus Hub Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
