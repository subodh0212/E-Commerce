"use client";

import { useState } from "react";
import { DollarSign, ShoppingBag, Calendar, Package, Plus, Save, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "inventory">("overview");

  // Sample analytics state
  const [products, setProducts] = useState([
    { id: "prod-1", name: "Ultra Wireless Headphones", category: "Electronics", price: 299.99, stock: 25 },
    { id: "prod-2", name: "Executive Strategy Session", category: "Services", price: 150.00, stock: 99 },
    { id: "prod-3", name: "Minimalist Mechanical Keyboard", category: "Accessories", price: 189.00, stock: 12 },
    { id: "prod-4", name: "Ergonomic Office Chair", category: "Furniture", price: 349.50, stock: 8 },
  ]);

  const [bookingSchedule] = useState([
    { id: "b-1", client: "Jane Doe", service: "Executive Strategy Session", date: "2026-09-15", slot: "10:30 AM", status: "CONFIRMED" },
    { id: "b-2", client: "Marcus Vance", service: "Executive Strategy Session", date: "2026-09-15", slot: "01:00 PM", status: "CONFIRMED" },
    { id: "b-3", client: "Elena Rostova", service: "Code Architecture Review", date: "2026-09-16", slot: "09:00 AM", status: "CONFIRMED" },
  ]);

  const handleStockChange = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: Math.max(0, newPrice) } : p))
    );
  };

  const totalRevenue = 14250.00;
  const totalOrders = 48;
  const activeBookingsCount = bookingSchedule.length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Admin Management Dashboard</h1>
          <p className="text-sm text-gray-400">Manage revenue, service bookings, and product stock levels</p>
        </div>
        <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "overview" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "schedule" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Booking Schedule
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "inventory" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Inventory Management
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">${totalRevenue.toLocaleString()}</div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
          </span>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalOrders}</div>
          <span className="text-xs text-gray-400">Completed & Processed</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Active Reservations</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{activeBookingsCount}</div>
          <span className="text-xs text-indigo-400 font-semibold">Upcoming sessions</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Registered Clients</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">128</div>
          <span className="text-xs text-gray-400">Active platform users</span>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Upcoming Service Bookings
            </h3>
            <div className="space-y-3">
              {bookingSchedule.map((b) => (
                <div key={b.id} className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{b.client}</h4>
                    <p className="text-xs text-gray-400">{b.service}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-400 block">{b.date}</span>
                    <span className="text-xs text-gray-500">{b.slot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-400" /> Low Stock Alerts
            </h3>
            <div className="space-y-3">
              {products.filter((p) => p.stock < 15).map((p) => (
                <div key={p.id} className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <p className="text-xs text-gray-400">Category: {p.category}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-bold">
                    {p.stock} left in stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Booking Schedule View */}
      {activeTab === "schedule" && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white">Reserved Time Slot Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-950 text-xs text-gray-400 uppercase font-bold border-b border-gray-800">
                <tr>
                  <th className="p-4">Client</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {bookingSchedule.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-950/50">
                    <td className="p-4 font-bold text-white">{b.client}</td>
                    <td className="p-4">{b.service}</td>
                    <td className="p-4">{b.date}</td>
                    <td className="p-4 font-mono text-indigo-400">{b.slot}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inventory Management */}
      {activeTab === "inventory" && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Product & Service Inventory Management</h3>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add New Item
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-950 text-xs text-gray-400 uppercase font-bold border-b border-gray-800">
                <tr>
                  <th className="p-4">Product / Service</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price ($)</th>
                  <th className="p-4">Stock Count</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-950/50">
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4 text-xs text-gray-400">{p.category}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        value={p.price}
                        onChange={(e) => handlePriceChange(p.id, parseFloat(e.target.value))}
                        className="w-24 bg-gray-950 border border-gray-800 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => handleStockChange(p.id, parseInt(e.target.value))}
                        className="w-20 bg-gray-950 border border-gray-800 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Save className="w-3.5 h-3.5" /> Save
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
