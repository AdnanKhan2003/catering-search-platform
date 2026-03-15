"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  maxPrice,
  setMaxPrice,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-10 w-full animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="relative w-full md:flex-grow flex items-center group">
        <Search className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search by caterer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        )}
      </div>

      <div className="w-full md:w-auto min-w-[300px] flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-3 shadow-sm group">
        <div className="flex items-center gap-2">
           <SlidersHorizontal className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
           <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">Max Price</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="5000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="min-w-[4.5rem] text-right">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">₹{maxPrice}</span>
        </div>
      </div>
    </div>
  );
}
