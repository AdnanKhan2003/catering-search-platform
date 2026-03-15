"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Caterer } from "@/types";
import { getCatererById } from "@/lib/api";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  DollarSign, 
  Utensils, 
  CheckCircle2, 
  Clock, 
  Users,
  ShieldCheck,
  Loader2,
  Calendar
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
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-bold text-zinc-500">Loading caterer details...</p>
      </div>
    );
  }

  if (!caterer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-4">Caterer Not Found</h1>
        <p className="text-zinc-500 mb-8">The caterer you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/caterers" 
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-2xl"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <Link 
          href="/caterers" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 font-bold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
             <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-500/20">
                  Verified Partner
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 rounded-full text-white">
                   <Star className="w-4 h-4 fill-white" />
                   <span className="text-sm font-black">{caterer.rating}</span>
                </div>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter mb-6 leading-tight">
               {caterer.name}
             </h1>
             
             <div className="flex flex-wrap gap-6 text-zinc-500 dark:text-zinc-400 font-medium text-lg">
                <div className="flex items-center gap-2">
                   <MapPin className="w-5 h-5 text-blue-500" />
                   {caterer.location}
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-blue-500 font-bold">₹</span>
                   ₹{caterer.pricePerPlate} per plate
                </div>
             </div>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
             <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
               <Utensils className="w-6 h-6 text-blue-500" />
               Cuisines Offered
             </h2>
             <div className="flex flex-wrap gap-3">
                {caterer.cuisines.map((cuisine) => (
                  <span 
                    key={cuisine}
                    className="px-5 py-2.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-colors"
                  >
                    {cuisine}
                  </span>
                ))}
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-3xl border border-emerald-100 dark:border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-2">High Quality</h3>
                <p className="text-zinc-500 font-medium">Top-tier ingredients and professional service guaranteed.</p>
             </div>
             <div className="p-6 bg-blue-50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-500/20">
                <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Secure Booking</h3>
                <p className="text-zinc-500 font-medium">Safe and reliable booking process through CaterHub.</p>
             </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-zinc-900 dark:bg-zinc-950 text-white rounded-3xl p-8 shadow-2xl overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] group-hover:bg-blue-400 transition-colors" />
            
            <div className="relative z-10">
               <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black">₹{caterer.pricePerPlate}</span>
                  <span className="text-zinc-400 font-bold">/ guest</span>
               </div>
               
               <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span className="font-bold">Date</span>
                     </div>
                     <Clock className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="font-bold">Guests</span>
                     </div>
                     <span className="text-blue-400 font-black">20+</span>
                  </div>
               </div>
               
               <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                 Check Availability
               </button>
               
               <p className="mt-4 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
                 No commitment required
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
