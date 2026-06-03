'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { PRODUCTS } from '@/data/mockData';

export default function Arsenal() {
  const { addItem, toggleCart } = useCartStore();

  const handleAdd = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'L',
    });
    if (!useCartStore.getState().isCartOpen) {
      toggleCart();
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="mb-12 border-b border-[#333333] pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
          VNUA <span className="text-[#00F3FF]">APPAREL</span>
        </h1>
        <p className="font-mono text-gray-400 max-w-xl text-sm border-l-2 border-[#00F3FF] pl-4">
          Engineered prototypes and technical apparel. Built by Adriel Ventura. Designed for maximum utility and urban resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="border border-[#222222] bg-[#0A0A0A] p-6 hover:border-[#00F3FF]/50 transition-colors group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-[#00F3FF]/50">
              ID: {product.id.toUpperCase()}
            </div>
            
            <div className="h-48 w-full border border-dashed border-[#333333] mb-6 flex items-center justify-center bg-[#111111] group-hover:bg-[#1a1a1a] transition-colors relative">
              <span className="font-mono text-xs text-gray-600">[ SCHEMATIC PENDING ]</span>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#222222] text-[#00F3FF] text-[10px] font-mono tracking-widest border border-[#333333]">
                STATUS: {product.status}
              </div>
            </div>

            <h3 className="text-xl font-bold tracking-widest text-white mb-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">{product.desc}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-xs text-gray-500">
              <div className="flex flex-col">
                <span className="text-[#00F3FF]">GSM_WEIGHT</span>
                <span>{product.specs.GSM}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#00F3FF]">MAT_COMP</span>
                <span>{product.specs.MAT}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="font-mono font-bold text-lg text-white">${product.price.toFixed(2)}</span>
              <button 
                onClick={() => handleAdd(product)}
                className="bg-[#333333] hover:bg-[#00F3FF] hover:text-black text-white font-mono text-xs px-4 py-2 transition-colors"
              >
                ACQUIRE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
