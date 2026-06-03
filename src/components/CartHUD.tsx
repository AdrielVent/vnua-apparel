'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Trash2, ShoppingCart } from 'lucide-react';

export function CartHUD() {
  const { items, isCartOpen, toggleCart, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isCartOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
        onClick={toggleCart}
      />
      
      {/* Sidebar HUD */}
      <div className="relative w-full max-w-md h-full bg-circuit-gold brutal-border-l shadow-2xl flex flex-col font-mono text-black p-6 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between brutal-border-b pb-4 mb-6">
          <div className="flex items-center space-x-3 text-black">
            <ShoppingCart size={24} className="animate-pulse" />
            <h2 className="text-xl tracking-widest font-black font-sans">[ VNUA INVENTORY ]</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="text-black hover:text-white hover:bg-black p-1 brutal-border transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {items.length === 0 ? (
            <div className="text-center text-black font-bold mt-20 text-sm brutal-border p-8 bg-white">
              [ WARNING: INVENTORY EMPTY ]
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center justify-between bg-white p-4 brutal-border hover:bg-neon-green transition-colors group">
                <div>
                  <h3 className="font-bold text-sm tracking-widest text-black font-sans uppercase">{item.name}</h3>
                  <div className="text-xs text-black font-bold mt-2 flex items-center space-x-2">
                    <span className="bg-black text-white px-2 py-0.5 rounded-sm">SIZE: {item.size || 'OS'}</span>
                    <span>|</span>
                    <span>QTY: {item.quantity}</span>
                  </div>
                  <div className="text-black text-sm mt-3 font-black">${item.price.toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-black hover:text-white hover:bg-kinetic-red brutal-border transition-colors p-2"
                  title="Remove from secure inventory"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        <div className="brutal-border-t pt-6 mt-6">
          <div className="flex justify-between items-center mb-6 text-sm font-bold">
            <span className="text-black tracking-widest">TOTAL EST. VALUE:</span>
            <span className="text-2xl text-black font-black font-sans">${total.toFixed(2)}</span>
          </div>
          
          <button 
            disabled={items.length === 0}
            className="w-full bg-black text-white font-black tracking-widest py-4 brutal-border hover:bg-kinetic-red hover:text-black transition-all disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            INITIALIZE CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
