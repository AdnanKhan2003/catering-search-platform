"use client";

import { useEffect, useState } from "react";
import { Caterer } from "@/types";
import { getCaterers } from "@/lib/api";
import CatererCard from "@/components/CatererCard";
import FilterBar from "@/components/FilterBar";
import { SearchX, Loader2, Utensils } from "lucide-react";
import Link from "next/link";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [filteredCaterers, setFilteredCaterers] = useState<Caterer[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getCaterers();
      setCaterers(data);
      setFilteredCaterers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = caterers.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = c.pricePerPlate <= maxPrice;
      return matchesSearch && matchesPrice;
    });
    setFilteredCaterers(filtered);
  }, [searchQuery, maxPrice, caterers]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </Link>
          <Link 
            href="/caterers/new" 
            className="text-xs font-bold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md hover:bg-zinc-200 transition-colors"
          >
            List your business
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-[#111111] dark:text-white mb-2 italic">Caterers in Mumbai</h1>
          <p className="text-zinc-500 text-sm">Find and book the best culinary partners for your event.</p>
        </header>

        <FilterBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-5 h-5 text-zinc-300 animate-spin" />
            <span className="text-sm font-medium text-zinc-400">Loading catalog...</span>
          </div>
        ) : filteredCaterers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaterers.map((caterer) => (
              <CatererCard key={caterer._id} caterer={caterer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="inline-flex p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-full mb-4">
               <SearchX className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-lg font-bold text-[#111111] dark:text-white mb-1">No results</h2>
            <p className="text-sm text-zinc-500 mb-6">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {setSearchQuery(""); setMaxPrice(5000);}}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
