"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, CheckCircle, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/orders", {
        total_price: total() * 1.05,
        shipping_address: address,
      });
      setStep(3);
      clearCart();
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Order initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? "bg-primary text-white shadow-[0_0_15px_var(--accent-glow)]" : "bg-slate-900 text-white/40 border border-white/10"
            }`}
          >
            {step > s ? <CheckCircle className="w-5 h-5" /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 rounded-3xl border-white/5 space-y-8"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Truck className="text-primary" /> SHIPPING COORDINATES
            </h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Destination Address</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Sector 7, Alpha Centauri, Nebula Station 42..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all">
                CONTINUE TO PAYMENT
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 rounded-3xl border-white/5 space-y-8"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="text-primary" /> QUANTUM PAYMENT
            </h2>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Transfer Amount:</span>
                <span className="text-2xl font-mono font-bold text-primary">${(total() * 1.05).toFixed(2)}</span>
              </div>
              <p className="text-xs text-white/40 italic">Using secure Stripe simulation protocol. No actual credits will be deducted.</p>
            </div>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                  <div>
                    <p className="font-bold">•••• •••• •••• 4242</p>
                    <p className="text-xs text-white/40 uppercase">Simulation Card</p>
                  </div>
                </div>
                <div className="text-primary"><CheckCircle className="w-5 h-5" /></div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "AUTHORIZE TRANSFER"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-white/40 hover:text-white transition-colors">
                Back to coordinates
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-3xl border-white/5 text-center space-y-8"
          >
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                <Rocket className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">MISSION SUCCESS</h2>
              <p className="text-white/40">Your order has been logged and the transport is initializing.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-left font-mono text-xs space-y-2">
              <p className="text-primary">TRANS_ID: NX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p>STATUS: DISPATCH_PENDING</p>
              <p>ETA: 2-3 GALACTIC DAYS</p>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all"
            >
              RETURN TO NEXUS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
