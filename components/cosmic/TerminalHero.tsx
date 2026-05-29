"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function TerminalHero() {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-lg border-primary/20 relative overflow-hidden group"
      >
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-white/40 ml-2 font-mono">nexus-terminal v1.0.0</span>
        </div>
        
        <div className="font-mono text-lg md:text-2xl leading-relaxed text-primary">
          <span className="text-green-500 mr-2">$</span>
          <TypeAnimation
            sequence={[
              "Initializing system core...",
              1000,
              "Loading cosmic assets...",
              1000,
              "Welcome to NEXUS STORE.",
              2000,
              "The future of cosmic commerce is here.",
              2000,
              "Explore the nebula of products.",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-pulse-slow">
            NEXUS STORE
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Premium sci-fi gear and high-tech essentials for the modern spacefarer.
          </p>
        </div>

        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="w-32 h-32 rounded-full border-4 border-primary animate-ping" />
        </div>
      </motion.div>
    </div>
  );
}
