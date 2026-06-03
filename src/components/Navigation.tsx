'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Hexagon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export function Navigation() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center brutal-border-b font-mono text-sm tracking-widest uppercase bg-circuit-gold z-40 relative">
      <Link href="/" className="flex items-center gap-2 text-black font-black hover:bg-black hover:text-white transition-colors brutal-border-r p-4 w-full md:w-auto justify-center md:justify-start h-full">
        <Hexagon className="w-5 h-5 animate-pulse" />
        <span className="font-sans text-xl">VNUA APPAREL</span>
      </Link>
      <div className="flex flex-wrap justify-center items-center text-black font-bold flex-1">
        <Link href="/arsenal" className="hover:bg-kinetic-red hover:text-white p-4 brutal-border-l brutal-border-r -ml-[4px] transition-colors">ARSENAL</Link>
        <Link href="/labs" className="hover:bg-flare-orange hover:text-white p-4 transition-colors">LABS</Link>
        <Link href="/studio" className="hover:bg-cobalt-blue hover:text-white p-4 brutal-border-l brutal-border-r -ml-[4px] transition-colors">STUDIO</Link>
        <Link href="/systems" className="hover:bg-neon-green hover:text-black p-4 transition-colors">SYSTEMS</Link>
      </div>
      <div className="flex">
        <button 
          onClick={toggleCart}
          className="flex items-center gap-2 brutal-border-l bg-black text-white hover:bg-kinetic-red hover:text-black font-black p-4 transition-all group w-full md:w-auto justify-center"
        >
          <ShoppingCart className="w-4 h-4 group-hover:text-black" />
          CART: <span className="text-white group-hover:text-black">{mounted ? items.length.toString().padStart(2, '0') : '00'}</span>
        </button>
      </div>
    </nav>
  );
}
