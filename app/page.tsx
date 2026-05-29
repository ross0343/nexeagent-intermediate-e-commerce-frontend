import TerminalHero from "@/components/cosmic/TerminalHero";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    { icon: <Zap className="w-6 h-6 text-primary" />, title: "Quantum Speed", desc: "Instant checkout and galactic delivery." },
    { icon: <Shield className="w-6 h-6 text-accent" />, title: "Bio-Security", desc: "Military-grade encryption for your data." },
    { icon: <Star className="w-6 h-6 text-yellow-500" />, title: "Star Rating", desc: "Verified by top pilots across the sector." },
  ];

  return (
    <div className="flex flex-col items-center">
      <TerminalHero />
      
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass p-8 rounded-2xl glass-hover border-white/5 space-y-4">
              <div className="p-3 bg-white/5 rounded-xl w-fit">{f.icon}</div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="text-white/40 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-20 text-center space-y-12">
        <h2 className="text-4xl font-bold tracking-tight">FEATURED TECH</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden glass-hover group border-white/5">
              <div className="aspect-square bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-4xl">
                  TECH_{i}
                </div>
              </div>
              <div className="p-6 text-left space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">Nebula Core X{i}</h4>
                  <span className="text-primary font-mono text-sm">${(i * 125).toFixed(2)}</span>
                </div>
                <p className="text-xs text-white/40">High-performance processing unit for deep space travel.</p>
                <button className="w-full py-2 mt-4 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest">
                  Initialize Sync
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold tracking-widest text-sm uppercase group">
          Browse All Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <section className="w-full bg-primary/5 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">JOIN THE NEBULA NETWORK</h2>
          <p className="text-white/60">Subscribe to our comms for exclusive access to prototype tech and sector news.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter comms frequency (email)" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/80 transition-colors text-sm">
              SUBSCRIBE
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>
    </div>
  );
}
