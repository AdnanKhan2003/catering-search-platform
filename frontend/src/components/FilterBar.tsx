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
    <div className="flex flex-col md:flex-row gap-6 items-center mb-12 w-full pb-8 border-b border-zinc-100 dark:border-zinc-800">
      <div className="relative w-full md:flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm text-[#111111] dark:text-white placeholder:text-zinc-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        )}
      </div>

      <div className="w-full md:w-auto flex items-center gap-4">
        <div className="flex items-center gap-2 text-zinc-400">
           <SlidersHorizontal className="w-3.5 h-3.5" />
           <span className="text-xs font-bold uppercase tracking-wider">Price</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="5000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="w-40 md:w-32 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        
        <div className="min-w-[4rem] text-right">
          <span className="text-xs font-bold text-[#111111] dark:text-white">₹{maxPrice}</span>
        </div>
      </div>
    </div>
  );
}
