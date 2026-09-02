"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/category/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchSearchResults = async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/products?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data || []);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchSearchResults(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search by keywords, category, or service..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <Button type="submit" className="absolute right-2.5 top-2.5 gap-2" size="md">
          <SearchIcon className="w-4 h-4" /> Search
        </Button>
      </form>

      {/* Results Header / Loading */}
      {searched && (
        <div className="text-sm text-gray-400">
          Showing results for <span className="text-white font-bold">&ldquo;{query}&rdquo;</span> ({results.length} found)
        </div>
      )}

      {/* Zero Results Empty State */}
      {searched && !loading && results.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-gray-950 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
            <SearchX className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-white">No Results Found</h2>
          <p className="text-sm text-gray-400">
            We couldn't find any products or service slots matching &ldquo;{query}&rdquo;.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                setSearched(false);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
            >
              Clear Search & Try Again
            </button>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Search Products & Services</h1>
        <p className="text-sm text-gray-400">Find items, bookable sessions, or digital assets across the platform</p>
      </div>

      <Suspense fallback={<div className="text-gray-400 text-sm">Loading search page...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
