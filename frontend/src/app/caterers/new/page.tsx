"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCaterer } from "@/lib/api";
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Loader2,
  CheckCircle2,
  X,
  Utensils
} from "lucide-react";

export default function AddCatererPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerPlate: 500,
    rating: 4.5,
    cuisines: [] as string[]
  });
  
  const [newCuisine, setNewCuisine] = useState("");

  const handleAddCuisine = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCuisine && !formData.cuisines.includes(newCuisine)) {
      setFormData({ ...formData, cuisines: [...formData.cuisines, newCuisine] });
      setNewCuisine("");
    }
  };

  const removeCuisine = (index: number) => {
    setFormData({
      ...formData,
      cuisines: formData.cuisines.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await createCaterer(formData);
    
    setLoading(false);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/caterers");
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-full mb-4 border border-emerald-100 dark:border-emerald-800">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-2">Partner Added</h1>
        <p className="text-sm text-zinc-500 font-medium">Redirecting to directory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600" />
            <span className="font-bold tracking-tight text-[#111111] dark:text-white">CaterHub</span>
          </Link>
        </div>
      </nav>

      <div className="bg-white dark:bg-[#191919] border-b border-zinc-50 dark:border-zinc-900/50">
        <div className="max-w-3xl mx-auto px-6 py-3">
          <Link 
            href="/caterers" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors font-bold text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
          </Link>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-4 pb-20">
        <div className="mb-16">
          <h1 className="text-3xl font-bold text-[#111111] dark:text-white mb-4">Register Partner</h1>
          <p className="text-sm text-zinc-500 font-medium">Provide the business details to list on the platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Business Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Royal Banquet Services"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-0 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[#111111] dark:text-white placeholder:text-zinc-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Area / Location</label>
              <div className="relative">
                <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Bandra West, Mumbai"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-0 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[#111111] dark:text-white placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Price / Plate (₹)</label>
                <input 
                  required
                  type="number" 
                  value={formData.pricePerPlate}
                  onChange={(e) => setFormData({...formData, pricePerPlate: parseInt(e.target.value)})}
                  className="w-full px-0 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[#111111] dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Initial Rating</label>
                <input 
                  required
                  type="number" 
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                  className="w-full px-0 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[#111111] dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Cuisines Specialization</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Press Enter to add..."
                value={newCuisine}
                onChange={(e) => setNewCuisine(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCuisine(e as unknown as React.FormEvent);
                  }
                }}
                className="flex-grow px-0 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-600 transition-colors text-sm font-medium"
              />
              <button 
                type="button"
                onClick={handleAddCuisine}
                className="text-xs font-bold text-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.cuisines.map((cuisine, index) => (
                <span key={index} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold border border-zinc-200 dark:border-zinc-700 rounded-md">
                  {cuisine}
                  <button type="button" onClick={() => removeCuisine(index)}>
                    <X className="w-3 h-3 hover:text-red-500" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Publish Listing
          </button>
        </form>
      </main>
    </div>
  );
}
