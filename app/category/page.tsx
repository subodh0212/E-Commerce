"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SidebarFilters } from "@/components/category/SidebarFilters";
import { ProductCard } from "@/components/category/ProductCard";
import { Grid, List, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

function CategoryContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const brandFilter = searchParams.get("brand") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      try {
        let url = "/api/products";
        const params = new URLSearchParams();
        if (categoryFilter) params.append("category", categoryFilter);
        if (brandFilter) params.append("brand", brandFilter);
        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch category products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryProducts();
  }, [categoryFilter, brandFilter]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            {categoryFilter ? `${categoryFilter.toUpperCase()} Products` : "All Products & Services"}
          </h1>
          <p className="text-sm text-gray-400">
            Showing {products.length} genuine products with high-resolution photography
          </p>
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
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-indigo-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm font-bold">Loading genuine products...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => {
                let imgUrl = p.images;
                if (Array.isArray(p.images) && p.images.length > 0) {
                  imgUrl = p.images[0];
                }
                return <ProductCard key={p.id} {...p} image={imgUrl} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading category page...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
