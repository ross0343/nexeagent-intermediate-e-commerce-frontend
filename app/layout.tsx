import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import ThemeSwitcher from "@/components/cosmic/ThemeSwitcher";
import { ShoppingCart, User, Search } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS STORE | Cosmic E-Commerce",
  description: "Experience the future of commerce with Nexus Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-glow text-primary tracking-tighter">
                NEXUS
              </Link>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                <Link href="/products" className="hover:text-primary transition-colors">STORE</Link>
                <Link href="/about" className="hover:text-primary transition-colors">NEBULA</Link>
                <Link href="/support" className="hover:text-primary transition-colors">COMMS</Link>
              </div>

              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <button className="p-2 text-white/70 hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <Link href="/cart" className="p-2 text-white/70 hover:text-primary transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">0</span>
                </Link>
                <Link href="/login" className="p-2 text-white/70 hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </nav>
          <main className="pt-24 min-h-screen">
            {children}
          </main>
          <footer className="glass border-t border-white/5 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">NEXUS STORE</h3>
                <p className="text-sm text-white/40">Equipping the next generation of interstellar explorers.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Navigation</h4>
                <ul className="text-sm text-white/40 space-y-2">
                  <li><Link href="/products">Store</Link></li>
                  <li><Link href="/cart">Cart</Link></li>
                  <li><Link href="/orders">Orders</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Comms</h4>
                <ul className="text-sm text-white/40 space-y-2">
                  <li>Email: nexeagent@gmail.com</li>
                  <li>Phone: 03222100121</li>
                  <li>LinkedIn: Nexe-Agent</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="text-sm text-white/40 space-y-2">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
