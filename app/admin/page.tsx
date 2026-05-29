"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Settings, Plus, Edit, Trash2, Database, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirm decommissioning of this asset?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Asset decommissioning failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-4">
          <LayoutDashboard className="text-primary" /> COMMAND CENTER
        </h1>
        <button 
          onClick={() => { setCurrentProduct(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
        >
          <Plus className="w-5 h-5" /> PROVISION ASSET
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl border-white/5 space-y-2">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Active Assets</p>
          <p className="text-4xl font-mono font-bold text-primary">{products.length}</p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 space-y-2">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Inventory Value</p>
          <p className="text-4xl font-mono font-bold text-accent">
            ${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}
          </p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 space-y-2">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">System Status</p>
          <p className="text-4xl font-mono font-bold text-green-500 uppercase">Online</p>
        </div>
      </div>

      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Asset</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Category</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Price</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Stock</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold text-white/20">#{p.id}</div>
                    <span className="font-bold">{p.name}</span>
                  </div>
                </td>
                <td className="p-6"><span className="text-sm text-white/40">{p.category.name}</span></td>
                <td className="p-6 font-mono text-primary">${p.price.toFixed(2)}</td>
                <td className="p-6">
                  <span className={`font-mono ${p.stock < 10 ? 'text-red-500' : 'text-white/60'}`}>{p.stock}</span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/60 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
