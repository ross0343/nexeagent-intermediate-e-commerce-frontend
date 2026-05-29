"use client";

import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, addItem, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <ShoppingBag className="w-24 h-24 text-white/10" />
        </div>
        <h2 className="text-3xl font-bold">Your cargo bay is empty</h2>
        <p className="text-white/40">Initialize a search to find the gear you need.</p>
        <Link href="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/80 transition-all">
          BROWSE INVENTORY
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12 flex items-center gap-4">
        <ShoppingBag className="text-primary" /> CARGO MANIFEST
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div 
              key={item.product_id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 rounded-2xl border-white/5 flex items-center gap-6"
            >
              <div className="w-24 h-24 bg-white/5 rounded-xl flex items-center justify-center font-bold text-white/10">
                #{item.product_id}
              </div>
              
              <div className="flex-1 space-y-1">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-primary font-mono">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button 
                    onClick={() => addItem({ ...item, quantity: -1 })}
                    disabled={item.quantity <= 1}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeItem(item.product_id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="glass p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-4">SUMMARY</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span className="font-mono">${total().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Sector Tax (5%)</span>
                <span className="font-mono">${(total() * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Galactic Shipping</span>
                <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Free</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold">
                <span>TOTAL</span>
                <span className="text-primary font-mono">${(total() * 1.05).toFixed(2)}</span>
              </div>
            </div>
            <Link 
              href="/checkout"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2 group"
            >
              <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              PROCEED TO SECURE CHECKOUT
            </Link>
          </div>
          
          <div className="glass p-6 rounded-2xl border-white/5 flex gap-4 items-center">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-white/40">Secure transactions encrypted with Bio-Metric Quantum protocols.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { Shield } from "lucide-react";
