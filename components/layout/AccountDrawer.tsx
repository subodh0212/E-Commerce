"use client";

import { X, User, Package, Calendar, Settings, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountDrawer({ isOpen, onClose }: AccountDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-gray-950 border-l border-gray-800 text-white shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold">
                JD
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Jane Doe</h3>
                <p className="text-xs text-gray-400">jane.doe@example.com</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition">
              <Package className="w-5 h-5 text-indigo-400" />
              <span>My Orders & Purchases</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Booked Service Slots</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition">
              <Settings className="w-5 h-5 text-indigo-400" />
              <span>Account Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>Security & Passwords</span>
            </button>
          </div>

          <div className="p-6 border-t border-gray-800 bg-gray-900/50">
            <Button variant="outline" className="w-full gap-2 text-red-400 hover:text-red-300 border-red-900/50">
              <LogOut className="w-4 h-4" /> Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
