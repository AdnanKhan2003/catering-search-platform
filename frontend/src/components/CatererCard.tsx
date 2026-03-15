import { Caterer } from "@/types";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

interface CatererCardProps {
  caterer: Caterer;
}

export default function CatererCard({ caterer }: CatererCardProps) {
  return (
    <Link 
      href={`/caterers/${caterer._id}`}
      className="group flex flex-col h-full bg-white dark:bg-[#191919] border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:border-blue-600/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200"
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-bold text-[#111111] dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {caterer.name}
          </h3>
          <div className="flex items-center gap-1 text-zinc-400">
            <Star className="w-3 h-3 fill-zinc-300 text-zinc-300" />
            <span className="text-xs font-bold">{caterer.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-6 text-zinc-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{caterer.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {caterer.cuisines.slice(0, 3).map((cuisine: string) => (
            <span
              key={cuisine}
              className="px-2 py-0.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 rounded uppercase tracking-wider"
            >
              {cuisine}
            </span>
          ))}
          {caterer.cuisines.length > 3 && (
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">+{caterer.cuisines.length - 3} more</span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-[#111111] dark:text-white">₹{caterer.pricePerPlate}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">/ plate</span>
          </div>
          <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
