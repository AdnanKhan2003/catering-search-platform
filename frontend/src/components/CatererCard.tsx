import { Caterer } from "@/types";
import Link from "next/link";
import { Star, MapPin, DollarSign } from "lucide-react";

interface CatererCardProps {
  caterer: Caterer;
}

export default function CatererCard({ caterer }: CatererCardProps) {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-950/50 transition-all duration-500 flex flex-col h-full">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
           <span className="text-6xl font-bold tracking-tighter select-none">
             {caterer.name.charAt(0)}
           </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 shadow-sm">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{caterer.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
            {caterer.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{caterer.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 h-12 overflow-hidden">
          {caterer.cuisines.map((cuisine: string) => (
            <span
              key={cuisine}
              className="px-2.5 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-700/50"
            >
              {cuisine}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">₹{caterer.pricePerPlate}</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium ml-0.5">/ plate</span>
          </div>
          
          <Link 
            href={`/caterers/${caterer._id}`}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
