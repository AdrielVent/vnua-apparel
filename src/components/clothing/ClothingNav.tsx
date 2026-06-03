'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';

const NAV_TABS = [
  { label: 'New Drop',    href: '#drop' },
  { label: 'Clothing',   href: '#grid' },
  { label: 'Lookbook',   href: '#lookbook' },
  { label: 'Size / Fit', href: '#size-fit' },
  { label: 'About',      href: '#about' },
];

export function ClothingNav() {
  const { items, toggleCart } = useCartStore();
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('New Drop');

  const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduce ? 0 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-4 px-4 pointer-events-none"
    >
      <div
        className={`nav-pill pointer-events-auto flex items-center gap-1 px-3 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-xl' : 'shadow-md'
        }`}
      >
        {/* Brand mark */}
        <a
          href="#hero"
          className="font-sans font-black text-sm text-gray-900 tracking-widest px-3 py-2 hover:text-gray-600 transition-colors mr-1"
        >
          VNUA
        </a>

        {/* Separator dot */}
        <div className="w-1 h-1 rounded-full bg-gray-300" />

        {/* Nav links */}
        {NAV_TABS.map((tab) => (
          <a
            key={tab.label}
            href={tab.href}
            onClick={() => setActiveTab(tab.label)}
            className={`relative px-3 py-2 text-[11px] font-mono font-bold tracking-widest uppercase rounded-full transition-all duration-200 ${
              activeTab === tab.label
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {activeTab === tab.label && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-gray-100 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </a>
        ))}

        {/* Separator */}
        <div className="w-1 h-1 rounded-full bg-gray-300" />

        {/* Cart */}
        <motion.button
          onClick={toggleCart}
          whileTap={shouldReduce ? {} : { scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-[11px] font-mono font-bold tracking-widest uppercase transition-colors hover:bg-gray-700 ml-1"
        >
          <span>Cart</span>
          {totalQty > 0 && (
            <motion.span
              key={totalQty}
              initial={{ scale: shouldReduce ? 1 : 1.5 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 rounded-full bg-white text-gray-900 text-[10px] font-black flex items-center justify-center"
            >
              {totalQty}
            </motion.span>
          )}
        </motion.button>

        {/* Hub Access link */}
        <a
          href="/"
          className="px-3 py-2 text-[11px] font-mono font-bold tracking-widest uppercase text-gray-400 hover:text-gray-700 transition-colors"
          title="VNUA Main Hub"
        >
          Hub ↗
        </a>
      </div>
    </motion.header>
  );
}
