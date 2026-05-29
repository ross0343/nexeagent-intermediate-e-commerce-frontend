"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { UserPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await api.post("/api/auth/register", {
        email,
        password,
        full_name: fullName
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-3xl border-white/5 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <UserPlus className="w-24 h-24 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">NEW IDENTITY</h1>
          <p className="text-white/40 text-sm">Join the network and start your cosmic journey.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="Commander Shepard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Communication Frequency (Email)</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
              placeholder="pilot@nexus.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Access Code (Password)</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "INITIALIZING..." : (
              <>
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                CREATE ACCOUNT
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 text-sm">
          <span className="text-white/40">Already registered? </span>
          <Link href="/login" className="text-primary hover:underline font-bold">Login Identity</Link>
        </div>
      </motion.div>
    </div>
  );
}
