"use client";

import { useEffect, useState } from "react";
import { Caterer } from "@/types";
import { getCaterers } from "@/lib/api";
import CatererCard from "@/components/CatererCard";
import FilterBar from "@/components/FilterBar";
import { Utensils, SearchX, Loader2 } from "lucide-react";

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
    <main className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      <div className="flex flex-col mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">Discover</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.1] mb-4">
          Exceptional Catering <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500">For Your Special Events</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg font-medium leading-relaxed">
          Search and filter through our curated selection of premium caterers. From intimate dinners to grand weddings, find the perfect culinary partner.
        </p>
      </div>

      <FilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="font-bold text-zinc-500 animate-pulse">Fetching the best caterers for you...</p>
        </div>
      ) : filteredCaterers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {filteredCaterers.map((caterer) => (
            <CatererCard key={caterer._id} caterer={caterer} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 duration-500">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-full mb-6">
             <SearchX className="w-16 h-16 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No caterers found</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search keywords.</p>
          <button 
            onClick={() => {setSearchQuery(""); setMaxPrice(500);}}
            className="mt-8 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-2xl hover:scale-105 transition-transform"
          >
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
}
