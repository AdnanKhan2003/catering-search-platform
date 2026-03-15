"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCaterer } from "@/lib/api";
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  DollarSign, 
  Utensils, 
  Star,
  Loader2,
  CheckCircle2,
  X
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
        <div className="bg-emerald-100 dark:bg-emerald-500/10 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Success!</h1>
        <p className="text-zinc-500 font-medium">Caterer has been added to our platform. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <nav className="max-w-3xl mx-auto px-6 py-8">
        <Link 
          href="/caterers" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 font-bold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter mb-4">
            Add New Caterer
          </h1>
          <p className="text-zinc-500 font-medium italic">Enter the details below to list a new partner on CaterHub.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Caterer Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Royal Banquet Services"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full pl-12 pr-5 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Price Per Plate (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">₹</span>
                  <input 
                    required
                    type="number" 
                    value={formData.pricePerPlate}
                    onChange={(e) => setFormData({...formData, pricePerPlate: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-5 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Rating (1-5)</label>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    required
                    type="number" 
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full pl-12 pr-5 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
            <label className="block text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Cuisines</label>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Add a cuisine..."
                value={newCuisine}
                onChange={(e) => setNewCuisine(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCuisine(e as any)}
                className="flex-grow px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
              />
              <button 
                type="button"
                onClick={handleAddCuisine}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.cuisines.map((cuisine, index) => (
                <span key={index} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-100 dark:border-blue-500/20">
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
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-3xl transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
            Publish Caterer
          </button>
        </form>
      </main>
    </div>
  );
}
