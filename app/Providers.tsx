"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import CosmicBackground from "@/components/cosmic/CosmicBackground";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="cosmic">
      <CosmicBackground />
      {children}
    </ThemeProvider>
  );
}
