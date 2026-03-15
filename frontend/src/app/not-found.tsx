import Link from "next/link";
import { SearchX, ArrowLeft, Utensils } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#191919]">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 md:px-12 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-full border border-zinc-100 dark:border-zinc-800">
          <SearchX className="w-10 h-10 text-zinc-300" />
        </div>
        
        <h1 className="text-4xl font-bold text-[#111111] dark:text-white mb-4 italic tracking-tight">
          Page not found
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-12 max-w-sm leading-relaxed">
          The link might be broken, or the page may have been moved.
        </p>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-sm font-bold rounded-lg hover:opacity-90 transition-all border border-zinc-200 dark:border-zinc-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </main>
    </div>
  );
}
