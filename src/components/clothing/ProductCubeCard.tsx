'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClothingProduct } from '@/data/clothingProducts';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ProductCubeCardProps {
  product: ClothingProduct;
  index?: number;
}

export function ProductCubeCard({ product, index = 0 }: ProductCubeCardProps) {
  const { addItem, toggleCart } = useCartStore();
  const shouldReduce = useReducedMotion();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, size: product.sizes[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    if (!useCartStore.getState().isCartOpen) toggleCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="panel group flex flex-col overflow-hidden bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_#1A1A1A]"
    >
      {/* Color cube image area */}
      <div
        className="relative w-full aspect-square flex items-center justify-center overflow-hidden border-b-2 border-[#1A1A1A]"
        style={{ background: `${product.cubeColor}12` }}
      >
        {/* Cubie visual */}
        <div
          className="w-24 h-24 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_#1A1A1A]"
        >
          <div
            className="w-full h-full rounded-[2px]"
            style={{
              background: product.cubeColor,
            }}
          />
        </div>

        {/* Status badge */}
        {product.status === 'coming-soon' && (
          <div className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold tracking-widest px-2 py-1 border border-white rounded-[2px] uppercase">
            Soon
          </div>
        )}

        {/* Category chip */}
        <div
          className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded-[2px] border border-[#1A1A1A] uppercase"
          style={{ background: product.cubeColor, color: '#1A1A1A', opacity: 0.9 }}
        >
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-sans font-black text-base text-gray-900 leading-tight">{product.name}</h3>
          <p className="text-xs font-mono text-gray-500 mt-1 line-clamp-2">{product.tagline}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="font-sans font-black text-xl text-gray-900">${product.price}</div>
          <button
            onClick={handleAdd}
            disabled={product.status !== 'active'}
            className={`px-4 py-2 border-2 border-[#1A1A1A] rounded-[4px] text-xs font-mono font-bold tracking-widest uppercase transition-all duration-100 ${
              added
                ? 'bg-green-500 text-white shadow-[0px_0px_0px_#1A1A1A] translate-y-[2px] translate-x-[2px]'
                : product.status === 'active'
                  ? 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white shadow-[2px_2px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_#1A1A1A]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
            }`}
          >
            {added ? '✓' : product.status === 'active' ? 'Add' : 'Soon'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
