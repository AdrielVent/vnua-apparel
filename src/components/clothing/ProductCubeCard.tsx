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
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      whileHover={shouldReduce ? {} : { y: -4 }}
      className="panel group flex flex-col overflow-hidden"
    >
      {/* Color cube image area */}
      <div
        className="relative w-full aspect-square flex items-center justify-center overflow-hidden"
        style={{ background: `${product.cubeColor}12` }}
      >
        {/* Cubie visual */}
        <motion.div
          className="w-24 h-24 rounded-2xl shadow-xl"
          style={{ background: '#1A1A1A' }}
          animate={shouldReduce ? {} : { rotate: [0, 1, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        >
          <div
            className="m-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-xl"
            style={{
              background: product.cubeColor,
              boxShadow: `inset 0 3px 8px rgba(0,0,0,0.2)`,
            }}
          />
        </motion.div>

        {/* Status badge */}
        {product.status === 'coming-soon' && (
          <div className="absolute top-3 right-3 bg-gray-900 text-white text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded-full uppercase">
            Soon
          </div>
        )}

        {/* Category chip */}
        <div
          className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded-md uppercase"
          style={{ background: product.cubeColor, color: '#fff', opacity: 0.9 }}
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
          <motion.button
            onClick={handleAdd}
            disabled={product.status !== 'active'}
            whileTap={shouldReduce ? {} : { scale: 0.95 }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : product.status === 'active'
                  ? 'bg-gray-900 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {added ? '✓' : product.status === 'active' ? 'Add' : 'Soon'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
