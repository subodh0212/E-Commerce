import { ContactForm } from "@/components/support/ContactForm";
import { Mail, Phone, MapPin, Clock, ShieldCheck, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/40 bg-indigo-950/80 text-xs font-bold text-indigo-300">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          24/7 Customer Support & Help Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Get in Touch with Nexus</h1>
        <p className="text-sm text-gray-400">
          Whether you need assistance with an order, a service booking slot, or custom enterprise solutions, our support team is here to help.
        </p>
      </div>

      {/* Grid Layout: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Support Channels</h3>
            
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Email Support</h4>
                  <p className="text-gray-400 mt-0.5">support@nexusmart.com</p>
                  <span className="text-[10px] text-indigo-400 font-semibold">Average response time: 30 minutes</span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Phone Line</h4>
                  <p className="text-gray-400 mt-0.5">+1 (800) 555-0199</p>
                  <span className="text-[10px] text-gray-500 font-semibold">Mon-Fri, 9 AM - 6 PM EST</span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Headquarters</h4>
                  <p className="text-gray-400 mt-0.5">500 Madison Avenue, 14th Floor, New York, NY 10022</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Operating Hours</h4>
                  <p className="text-gray-400 mt-0.5">Live Chat: 24/7 Available | Call Center: Mon-Sat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-900 border border-indigo-500/30 rounded-3xl p-6 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-gray-300">
              <strong className="text-white font-bold block">100% Guaranteed Privacy</strong>
              Your contact info and messages are protected by 256-bit SSL encryption.
            </p>
          </div>
        </div>

        {/* Contact Form Component */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
