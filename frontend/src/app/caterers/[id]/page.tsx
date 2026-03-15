"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Caterer } from "@/types";
import { getCatererById } from "@/lib/api";
import { 
  ArrowLeft, 
  MapPin, 
  Utensils, 
  Loader2
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
        <p className="text-sm text-zinc-500 mb-8">The caterer you&apos;re looking for doesn&apos;t exist.</p>
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
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </Link>
        </div>
      </nav>

      <div className="bg-white dark:bg-[#191919] border-b border-zinc-50 dark:border-zinc-900/50">
        <div className="max-w-3xl mx-auto px-6 py-3">
          <Link href="/caterers" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-blue-600 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Directory</span>
          </Link>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-4 pb-20">
        <header className="mb-16">
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
            <div className="text-zinc-300 dark:text-zinc-700">•</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#111111] dark:text-white font-bold">₹{caterer.pricePerPlate}</span>
              <span className="text-[10px] uppercase tracking-tighter text-zinc-400 font-bold">/ Plate</span>
            </div>
          </div>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-8 pb-2 border-b border-zinc-100 dark:border-zinc-800">
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

          <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800">
             <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Availability & Booking</h2>
             <p className="text-sm text-zinc-500 leading-relaxed font-medium">
               To inquire about availability or to customize a menu for your event, please contact the caterer directly through the information above.
             </p>
          </section>
        </div>
      </main>
    </div>
  );
}
