"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Caterer } from "@/types";
import { getCatererById } from "@/lib/api";
import { 
  ArrowLeft, 
  MapPin, 
  Utensils, 
  Loader2,
  Calendar,
  Users,
  ChevronRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CatererDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [caterer, setCaterer] = useState<Caterer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      const data = await getCatererById(id);
      setCaterer(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3">
        <Loader2 className="w-5 h-5 text-zinc-300 animate-spin" />
        <p className="text-sm font-medium text-zinc-400">Loading details...</p>
      </div>
    );
  }

  if (!caterer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-2">Caterer Not Found</h1>
        <p className="text-sm text-zinc-500 mb-8">The caterer you're looking for doesn't exist.</p>
        <Link 
          href="/caterers" 
          className="text-sm font-bold text-blue-600 hover:underline"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </Link>
        </div>
      </nav>

      <div className="bg-white dark:bg-[#191919] border-b border-zinc-50 dark:border-zinc-900/50">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <Link href="/caterers" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-blue-600 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Directory</span>
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
               <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded border border-blue-100 dark:border-blue-800">
                 Verified
               </span>
               <span className="text-xs font-bold text-zinc-400">• {caterer.rating} rating</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] dark:text-white mb-6 tracking-tight">
              {caterer.name}
            </h1>
            <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {caterer.location}
              </div>
            </div>
          </header>

          <div className="space-y-16">
            <section>
              <h2 className="text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                Menu & Cuisines
              </h2>
              <div className="flex flex-wrap gap-2">
                {caterer.cuisines.map((cuisine) => (
                  <span 
                    key={cuisine}
                    className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </section>

            <section>
               <h2 className="text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                 Platform Guarantee
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                        <Utensils className="w-4 h-4 text-blue-600" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-[#111111] dark:text-white mb-1">Quality Assured</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">Top-tier ingredients and professional service guaranteed.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-800">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-[#111111] dark:text-white mb-1">Reliable Booking</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">Safe and simple booking process through CaterHub.</p>
                     </div>
                  </div>
               </div>
            </section>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-12 p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/20 backdrop-blur-sm">
            <div className="mb-8">
              <span className="text-3xl font-bold text-[#111111] dark:text-white">₹{caterer.pricePerPlate}</span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter ml-1">/ plate</span>
            </div>

            <div className="space-y-4 mb-8">
               <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium hover:border-blue-600 transition-colors">
                  <span className="text-zinc-500">Select Date</span>
                  <Calendar className="w-4 h-4 text-zinc-400" />
               </button>
               <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium hover:border-blue-600 transition-colors">
                  <span className="text-zinc-500">Guests</span>
                  <Users className="w-4 h-4 text-zinc-400" />
               </button>
            </div>

            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm mb-4 text-sm">
              Check Availability
            </button>
            
            <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              No pressure listing
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
