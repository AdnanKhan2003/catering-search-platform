import Link from "next/link";
import { ArrowRight, Utensils, Star, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2">
          <Utensils className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">CATER<span className="text-blue-600">HUB</span></span>
        </div>
        <Link 
          href="/caterers" 
          className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-zinc-200 dark:shadow-zinc-900"
        >
          Explore
        </Link>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center relative px-6 text-center z-10">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
           <span className="px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-500/20">
             The Future of Event Planning
           </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
          WE ELEVATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500">YOUR EVENTS.</span>
        </h1>
        
        <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium mb-12 animate-in fade-in duration-1000 delay-300">
          Discover hand-picked caterers that deliver excellence to your doorstep. From boutique gatherings to corporate galas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link 
            href="/caterers" 
            className="group flex items-center gap-2 px-8 py-5 bg-blue-600 text-white font-black text-lg rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
          >
            Browse Caterers
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/caterers/new" 
            className="px-8 py-5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-lg rounded-3xl border border-emerald-100 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            Add Caterers
          </Link>
        </div>

        <div className="absolute top-[20%] right-[10%] hidden xl:block p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-bounce duration-[3000ms]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-yellow-400 rounded-lg text-white">
                <Star className="w-5 h-5 fill-white" />
             </div>
             <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Avg. Rating</p>
                <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">4.9/5</p>
             </div>
          </div>
        </div>

        <div className="absolute bottom-[20%] left-[10%] hidden xl:block p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-pulse duration-[4000ms]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-600 rounded-lg text-white">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Verified</p>
                <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">Partners Only</p>
             </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900/50 relative z-10">
        <p className="text-sm font-medium tracking-tight flex items-center justify-center gap-1.5">
          Made with <Sparkles className="w-4 h-4 text-blue-500" /> for Unforgettable Moments.
        </p>
      </footer>
    </div>
  );
}
