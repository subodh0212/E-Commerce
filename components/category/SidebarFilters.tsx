"use client";

import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SidebarFilters() {
  const [price, setPrice] = useState<number>(500);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["SonicMaster"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["M"]);

  const brands = ["SonicMaster", "Nexus Advisory", "KeyWorks", "ErgoDesign", "TechElite"];
  const sizes = ["S", "M", "L", "XL"];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6 text-white">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h3 className="text-base font-bold flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" /> Filters
        </h3>
        <button
          onClick={() => {
            setPrice(500);
            setSelectedBrands([]);
            setSelectedSizes([]);
          }}
          className="text-xs text-gray-400 hover:text-indigo-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-gray-400">Max Price:</span>
          <span className="text-indigo-400">${price}</span>
        </div>
        <input
          type="range"
          min="50"
          max="1000"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-indigo-500 bg-gray-950 cursor-pointer"
        />
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-3 pt-4 border-t border-gray-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Brands</h4>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center space-x-3 text-xs text-gray-300 cursor-pointer hover:text-white transition">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Toggles */}
      <div className="space-y-3 pt-4 border-t border-gray-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Size / Variant</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`w-9 h-9 text-xs font-bold rounded-lg border transition ${
                selectedSizes.includes(s)
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full mt-4" size="sm">
        Apply Filters
      </Button>
    </aside>
  );
}
