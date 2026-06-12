'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClothingProduct } from '@/data/clothingProducts';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ScrollProductSpotlightProps {
  product: ClothingProduct;
  index: number;
  /** Flip image/text side on alternating items */
  reverse?: boolean;
}

export function ScrollProductSpotlight({ product, index, reverse = false }: ScrollProductSpotlightProps) {
  const { addItem, toggleCart } = useCartStore();
  const shouldReduce = useReducedMotion();
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    if (!useCartStore.getState().isCartOpen) toggleCart();
  };

  const animVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
  };

  const cubeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-15%' }}
      className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 border-b border-[#1A1A1A]"
    >
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>

        {/* ── Product Image Cube ──────────────────── */}
        <motion.div variants={cubeVariants} className="flex-1 w-full max-w-[480px] mx-auto">
          {/* Large cubie frame */}
          <div
            className="spotlight-image-frame relative w-full bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[8px_8px_0px_#1A1A1A]"
          >
            {/* Color face overlay at bottom-left corner */}
            <div
              className="absolute bottom-4 left-4 w-14 h-14 rounded-[4px] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[4px_4px_0px_#1A1A1A] z-10 bg-white"
            >
              <div
                className="w-10 h-10 rounded-[2px]"
                style={{ background: product.cubeColor }}
              />
            </div>

            {/* Placeholder image area */}
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 p-12 bg-stripe-pattern">
              {/* Animated color swatch as placeholder */}
              <div
                className="w-48 h-48 rounded-[4px] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A]"
                style={{ background: product.cubeColor }}
              />
              <p className="text-xs font-mono text-[#1A1A1A] font-bold tracking-widest uppercase mt-4 bg-white px-2 py-1 border border-[#1A1A1A] rounded-[2px]">
                Image Coming Drop Day
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Product Info ────────────────────────── */}
        <motion.div variants={animVariants} className="flex-1 flex flex-col gap-6">

          {/* Index tag */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-[4px] border-2 border-[#1A1A1A] flex items-center justify-center"
              style={{ background: product.cubeColor }}
            >
              <span className="text-[#1A1A1A] text-xs font-mono font-black">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs tracking-[0.25em] text-gray-500 uppercase font-mono font-bold">
              {product.category}
            </span>
          </div>

          {/* Name */}
          <div>
            <h2 className="font-sans text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h2>
            <p className="mt-2 text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">
              {product.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 font-mono text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Specs row */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
              <div key={key} className="bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[2px_2px_0px_#1A1A1A] px-4 py-3">
                <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono font-bold mb-1">{key}</div>
                <div className="text-xs font-mono font-bold text-gray-800">{val}</div>
              </div>
            ))}
          </div>

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div>
              <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono font-bold mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-[4px] text-xs font-mono font-bold tracking-widest uppercase border-2 transition-all duration-100 ${
                      selectedSize === sz
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[0px_0px_0px_#1A1A1A] translate-y-[2px] translate-x-[2px]'
                        : 'border-[#1A1A1A] bg-white text-gray-600 hover:bg-[#1A1A1A]/5 shadow-[2px_2px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_#1A1A1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center gap-6 pt-2">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono font-bold">Price</div>
              <div className="text-3xl font-sans font-black text-gray-900">
                ${product.price}
                <span className="text-sm font-mono font-normal text-gray-400 ml-1">USD</span>
              </div>
            </div>

            {product.status === 'active' ? (
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 border-2 border-[#1A1A1A] rounded-[4px] font-mono font-bold text-sm tracking-widest uppercase transition-all duration-100 ${
                  added
                    ? 'bg-green-500 text-white shadow-[0px_0px_0px_#1A1A1A] translate-y-[2px] translate-x-[2px]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white shadow-[4px_4px_0px_#1A1A1A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[0px_0px_0px_#1A1A1A]'
                }`}
              >
                {added ? '✓ Added to grid' : 'Add to cart'}
              </button>
            ) : (
              <div className="flex-1 py-4 rounded-[4px] border-2 border-gray-300 bg-gray-100 text-gray-400 font-mono font-bold text-sm tracking-widest uppercase text-center">
                Coming Soon
              </div>
            )}
          </div>

          {/* Fit badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 font-bold">
            <span className="px-2 py-1 bg-white border border-[#1A1A1A] rounded-[2px] uppercase tracking-widest">
              {product.fit} fit
            </span>
            <span className="px-2 py-1 bg-white border border-[#1A1A1A] rounded-[2px] uppercase tracking-widest">
              {product.color}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
