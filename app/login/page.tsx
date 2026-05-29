"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      
      const res = await api.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Authentication failed. Verify credentials.");
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
          <ShieldCheck className="w-24 h-24 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">SECURE ACCESS</h1>
          <p className="text-white/40 text-sm">Enter your credentials to access the nebula.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Identity (Email)</label>
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
            {loading ? "AUTHENTICATING..." : (
              <>
                <LogIn className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ESTABLISH CONNECTION
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 text-sm">
          <span className="text-white/40">New to the sector? </span>
          <Link href="/register" className="text-primary hover:underline font-bold">Register Identity</Link>
        </div>
      </motion.div>
    </div>
  );
}
