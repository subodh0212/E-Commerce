import { SidebarFilters } from "@/components/category/SidebarFilters";
import { ProductCard } from "@/components/category/ProductCard";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CategoryPage() {
  const products = [
    {
      id: "prod-1",
      name: "Ultra Wireless Headphones",
      category: "Electronics",
      price: 299.99,
      rating: 4.9,
      image: "🎧",
      isBookable: false,
    },
    {
      id: "prod-2",
      name: "Executive Strategy Session",
      category: "Services",
      price: 150.00,
      rating: 5.0,
      image: "📅",
      isBookable: true,
    },
    {
      id: "prod-3",
      name: "Minimalist Mechanical Keyboard",
      category: "Accessories",
      price: 189.00,
      rating: 4.8,
      image: "⌨️",
      isBookable: false,
    },
    {
      id: "prod-4",
      name: "Ergonomic Office Chair",
      category: "Furniture",
      price: 349.50,
      rating: 4.7,
      image: "🪑",
      isBookable: false,
    },
    {
      id: "prod-5",
      name: "4K Ultra-Wide Monitor",
      category: "Electronics",
      price: 699.00,
      rating: 4.9,
      image: "🖥️",
      isBookable: false,
    },
    {
      id: "prod-6",
      name: "1-on-1 Code Architecture Review",
      category: "Services",
      price: 220.00,
      rating: 5.0,
      image: "💻",
      isBookable: true,
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">All Products & Services</h1>
          <p className="text-sm text-gray-400">Showing {products.length} items from top categories</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 md:hidden">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
          <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1 text-gray-400">
            <button className="p-1.5 hover:text-white rounded bg-gray-800 text-white"><Grid className="w-4 h-4" /></button>
            <button className="p-1.5 hover:text-white rounded"><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Grid Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <SidebarFilters />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
