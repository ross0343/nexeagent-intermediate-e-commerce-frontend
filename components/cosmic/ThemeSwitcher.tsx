"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Zap, Flame, Leaf, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const themes = [
    { name: "cosmic", icon: <Zap className="w-4 h-4" />, label: "Cosmic", color: "bg-blue-500" },
    { name: "cyberpunk", icon: <Laptop className="w-4 h-4" />, label: "Cyber", color: "bg-fuchsia-500" },
    { name: "volcanic", icon: <Flame className="w-4 h-4" />, label: "Volcanic", color: "bg-red-500" },
    { name: "emerald", icon: <Leaf className="w-4 h-4" />, label: "Emerald", color: "bg-emerald-500" },
  ];

  return (
    <div className="flex gap-2 glass p-2 rounded-full border-primary/20">
      {themes.map((t) => (
        <motion.button
          key={t.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(t.name)}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === t.name 
              ? `${t.color} text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]` 
              : "text-white/40 hover:text-white"
          }`}
          title={t.label}
        >
          {t.icon}
        </motion.button>
      ))}
    </div>
  );
}
