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
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pt-4 px-4 pointer-events-none"
    >
      <div
        className="nav-pill pointer-events-auto flex items-center gap-0 bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A]"
      >
        {/* Brand mark */}
        <a
          href="#hero"
          className="font-sans font-black text-sm text-[#1A1A1A] tracking-widest px-4 py-3 hover:bg-[#1A1A1A]/5 transition-colors border-r-2 border-[#1A1A1A]"
        >
          VNUA
        </a>

        {/* Nav links separated by | */}
        <div className="flex items-center">
          {NAV_TABS.map((tab, idx) => (
            <div key={tab.label} className="flex items-center">
              {idx > 0 && <span className="text-gray-400 font-bold select-none px-1">|</span>}
              <a
                href={tab.href}
                onClick={() => setActiveTab(tab.label)}
                className={`relative px-4 py-3 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
                  activeTab === tab.label
                    ? 'text-[#1A1A1A] bg-[#1A1A1A]/5'
                    : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {tab.label}
              </a>
            </div>
          ))}
        </div>

        {/* Separator block */}
        <div className="h-full border-r-2 border-[#1A1A1A]" />

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] text-white text-[11px] font-mono font-bold tracking-widest uppercase hover:bg-[#1A1A1A]/90 transition-colors border-l-2 border-[#1A1A1A] transition-all hover:translate-y-[1px] hover:translate-x-[1px]"
        >
          <span>Cart</span>
          {totalQty > 0 && (
            <span
              className="w-5 h-5 rounded-[2px] bg-white text-[#1A1A1A] text-[10px] font-black flex items-center justify-center border border-[#1A1A1A]"
            >
              {totalQty}
            </span>
          )}
        </button>

        {/* Hub Access link */}
        <a
          href="https://adrielvent.github.io/vnua-systems/#apparel"
          className="px-4 py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-gray-500 hover:text-gray-800 hover:bg-[#1A1A1A]/5 transition-colors border-l-2 border-[#1A1A1A]"
          title="VNUA Main Hub"
        >
          Hub ↗
        </a>
      </div>
    </motion.header>
  );
}
