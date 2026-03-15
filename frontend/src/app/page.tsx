import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#191919]">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 md:px-12 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111111] dark:text-white mb-6">
          Find the perfect caterer <br />
          for your next event.
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
          A simple directory to discover, filter, and connect with premium caterers in Mumbai. No noise, just quality service.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/caterers" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-semibold rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
          >
            Explore Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/caterers/new" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#191919] text-[#111111] dark:text-white font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all w-full sm:w-auto"
          >
            Add Caterers
          </Link>
        </div>

      </main>

      <footer className="px-6 py-10 text-center border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-400">
          © 2026 CaterHub. Simple catering discovery.
        </p>
      </footer>
    </div>
  );
}
