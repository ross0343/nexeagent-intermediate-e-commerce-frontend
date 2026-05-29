"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Package, Truck, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-20 font-mono">SCANNING QUANTUM RECORDS...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12 flex items-center gap-4">
        <Package className="text-primary" /> MISSION LOGS
      </h1>

      {orders.length === 0 ? (
        <div className="glass p-12 rounded-3xl border-white/5 text-center space-y-4">
          <p className="text-white/40">No missions logged in your history.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-3xl border-white/5 space-y-6"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Order ID</p>
                  <p className="font-mono text-primary font-bold">NX-ORD-{order.id.toString().padStart(5, '0')}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Status</p>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                    order.status === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><Calendar className="w-5 h-5 text-white/40" /></div>
                  <div>
                    <p className="text-xs text-white/40">Date</p>
                    <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><DollarSign className="w-5 h-5 text-white/40" /></div>
                  <div>
                    <p className="text-xs text-white/40">Amount</p>
                    <p className="text-sm font-mono">${order.total_price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><Truck className="w-5 h-5 text-white/40" /></div>
                  <div>
                    <p className="text-xs text-white/40">Destination</p>
                    <p className="text-sm truncate max-w-[150px]">{order.shipping_address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Items</p>
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-primary text-xs font-mono">x{item.quantity}</span>
                      <span className="text-sm font-bold">{item.product.name}</span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">${item.price_at_purchase.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
