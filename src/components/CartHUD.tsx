'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export function CartHUD() {
  const { items, isCartOpen, toggleCart, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] cursor-pointer"
            onClick={toggleCart}
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: shouldReduce ? 0 : '100%', opacity: shouldReduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: shouldReduce ? 0 : '100%', opacity: shouldReduce ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            className="relative w-full max-w-[400px] h-full bg-white shadow-2xl flex flex-col font-mono"
            style={{ borderLeft: '1px solid rgba(0,0,0,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gray-700" />
                <h2 className="font-sans font-black text-sm tracking-widest uppercase text-gray-900">
                  Cart
                </h2>
                {totalQty > 0 && (
                  <span className="w-6 h-6 bg-gray-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {totalQty}
                  </span>
                )}
              </div>
              <button
                onClick={toggleCart}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <ShoppingBag size={28} className="text-gray-300" />
                    </div>
                    <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                      Your grid is empty.<br />Scroll to add pieces.
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      {/* Cube color dot */}
                      <div
                        className="w-10 h-10 rounded-xl flex-shrink-0 bg-gray-200"
                        title={item.name}
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-sans font-black text-xs text-gray-900 truncate">{item.name}</h3>
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-2 font-mono">
                          <span className="bg-gray-200 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                            {item.size || 'OS'}
                          </span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="font-sans font-black text-sm text-gray-900 mt-2">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 bg-gray-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Total</span>
                <span className="font-sans font-black text-2xl text-gray-900">${total.toFixed(2)}</span>
              </div>

              <button
                disabled={items.length === 0}
                className="w-full bg-gray-900 text-white font-mono font-bold text-xs tracking-widest uppercase py-4 rounded-2xl hover:bg-gray-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Checkout — Stripe Coming Soon
              </button>

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[10px] font-mono text-gray-400 hover:text-gray-700 transition-colors tracking-widest uppercase text-center"
                >
                  Clear cart
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
