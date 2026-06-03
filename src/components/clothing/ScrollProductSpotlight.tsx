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
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 },
    },
  };

  const cubeVariants = {
    hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.7, rotate: shouldReduce ? 0 : -8 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-15%' }}
      className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24"
    >
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>

        {/* ── Product Image Cube ──────────────────── */}
        <motion.div variants={cubeVariants} className="flex-1 w-full max-w-[480px] mx-auto">
          {/* Large cubie frame */}
          <div
            className="spotlight-image-frame relative w-full"
            style={{ boxShadow: `0 24px 80px ${product.cubeColor}28, 0 8px 32px rgba(0,0,0,0.08)` }}
          >
            {/* Color face overlay at bottom-left corner */}
            <div
              className="absolute bottom-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg z-10"
              style={{ background: '#1A1A1A' }}
            >
              <div
                className="w-10 h-10 rounded-lg"
                style={{ background: product.cubeColor }}
              />
            </div>

            {/* Placeholder image area */}
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 p-12">
              {/* Animated color swatch as placeholder */}
              <motion.div
                className="w-48 h-48 rounded-3xl shadow-xl"
                style={{ background: `linear-gradient(135deg, ${product.cubeColor}EE 0%, ${product.cubeColor}88 100%)` }}
                animate={shouldReduce ? {} : {
                  y: [0, -8, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
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
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: product.cubeColor }}
            >
              <span className="text-white text-xs font-mono font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs tracking-[0.25em] text-gray-400 uppercase font-mono">
              {product.category}
            </span>
          </div>

          {/* Name */}
          <div>
            <h2 className="font-sans text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h2>
            <p className="mt-2 text-gray-500 font-mono text-sm tracking-widest uppercase">
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
              <div key={key} className="bg-gray-50 rounded-xl px-4 py-3">
                <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono mb-1">{key}</div>
                <div className="text-xs font-mono font-bold text-gray-800">{val}</div>
              </div>
            ))}
          </div>

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div>
              <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase border-2 transition-all duration-200 ${
                      selectedSize === sz
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
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
              <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-mono">Price</div>
              <div className="text-3xl font-sans font-black text-gray-900">
                ${product.price}
                <span className="text-sm font-mono font-normal text-gray-400 ml-1">USD</span>
              </div>
            </div>

            {product.status === 'active' ? (
              <motion.button
                onClick={handleAdd}
                whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className={`flex-1 py-4 rounded-2xl font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
                style={added ? {} : {
                  boxShadow: `0 8px 32px ${product.cubeColor}44`,
                }}
              >
                {added ? '✓ Added to grid' : 'Add to cart'}
              </motion.button>
            ) : (
              <div className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-400 font-mono font-bold text-sm tracking-widest uppercase text-center">
                Coming Soon
              </div>
            )}
          </div>

          {/* Fit badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="px-2 py-1 bg-gray-100 rounded-md uppercase tracking-widest">
              {product.fit} fit
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-md uppercase tracking-widest">
              {product.color}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
