"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useCartStore } from "@/store/useCartStore";
import { Filter, Search, ShoppingCart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/api/products"),
          api.get("/api/products/categories"),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
        // Fallback mock data if API is not running
        setProducts([
          { id: 1, name: "Nebula Core X1", price: 125.0, description: "High-performance processing unit.", image_url: "", category_id: 1, category: { name: "Hardware" } },
          { id: 2, name: "Star Map Pro", price: 45.0, description: "Detailed charts of the outer rim.", image_url: "", category_id: 2, category: { name: "Software" } },
          { id: 3, name: "Ion Thruster V2", price: 899.0, description: "Quiet and efficient propulsion.", image_url: "", category_id: 1, category: { name: "Hardware" } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="glass p-6 rounded-2xl space-y-4 border-white/5">
            <h3 className="font-bold flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" /> FILTERS
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-sm p-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-primary/20 text-primary' : 'text-white/40 hover:text-white'}`}
              >
                All Sectors
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left text-sm p-2 rounded-lg transition-colors ${selectedCategory === cat.id ? 'bg-primary/20 text-primary' : 'text-white/40 hover:text-white'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <div className="flex items-center gap-4 glass p-4 rounded-2xl border-white/5">
            <Search className="w-5 h-5 text-white/20" />
            <input 
              type="text" 
              placeholder="Search local inventory..."
              className="bg-transparent border-none outline-none flex-1 text-sm font-mono"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass rounded-2xl overflow-hidden glass-hover border-white/5 flex flex-col"
                >
                  <div className="aspect-square bg-white/5 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute top-2 right-2 glass px-2 py-1 rounded text-[10px] font-bold text-primary border-primary/20 uppercase tracking-widest">
                      {p.category.name}
                    </div>
                    <span className="text-white/5 font-bold text-6xl select-none">#{p.id}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-bold text-lg">{p.name}</h4>
                      <p className="text-xs text-white/40 line-clamp-2 mt-1">{p.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-mono font-bold">${p.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Link href={`/products/${p.id}`} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <Info className="w-4 h-4 text-white/60" />
                        </Link>
                        <button 
                          onClick={() => addItem({ product_id: p.id, name: p.name, price: p.price, quantity: 1, id: p.id })}
                          className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-all"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
