'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Home() {
  const { toggleCart, addItem } = useCartStore();

  const handleAcquire = (id: string, name: string, price: number, size: string = 'L') => {
    addItem({ id, name, price, size });
    if (!useCartStore.getState().isCartOpen) toggleCart();
  };

  return (
    <div className="flex flex-col w-full bg-black">
      
      {/* Top Banner Marquee */}
      <div className="brutal-border-b bg-neon-green text-black font-sans font-black text-2xl py-2 uppercase tracking-widest flex">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="px-4">/// VNUA SYSTEMS ACTIVE MATRIX /// SECURE CHECKOUT ONLINE ///</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[85vh]">
        
        {/* BLOCK 1: Outerwear / Shells (Red) */}
        <div className="cube-container relative brutal-border-r brutal-border-b md:brutal-border-b-0 group">
          <div className="cube w-full h-full">
            <div className="cube-face cube-front bg-kinetic-red flex flex-col p-8 justify-between">
              <div>
                <h2 className="font-sans font-black text-4xl text-black">DIV-04 // REALITY STONE</h2>
                <p className="text-black font-bold mt-4">HIGH-TENSILE CARBON WEAVE MATRIX.</p>
              </div>
              <div className="text-black text-6xl font-black text-right">01</div>
            </div>
            <div className="cube-face cube-back bg-black flex flex-col justify-center items-center p-8 brutal-border">
              <h3 className="font-sans text-kinetic-red text-3xl font-black mb-4 text-center">VNUA PROTO-SHELL V1</h3>
              <div className="text-white text-xl mb-8">$249.00 USD</div>
              <button 
                onClick={() => handleAcquire('vnua-proto-01', 'VNUA PROTO-SHELL V1', 249)}
                className="bg-kinetic-red text-black font-sans font-black text-xl py-4 px-8 w-full brutal-border hover:bg-white transition-colors"
              >
                [ ACQUIRE SHELL ]
              </button>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Mid-layers / Heavy Tees (Orange) */}
        <div className="cube-container relative brutal-border-r brutal-border-b md:brutal-border-b-0 group">
          <div className="cube w-full h-full">
            <div className="cube-face cube-front bg-flare-orange flex flex-col p-8 justify-between">
              <div>
                <h2 className="font-sans font-black text-4xl text-black">LAB ISSUED SYSTEM</h2>
                <p className="text-black font-bold mt-4">380G/M² HEAVYWEIGHT COMBAT COTTON.</p>
              </div>
              <div className="text-black text-6xl font-black text-right">02</div>
            </div>
            <div className="cube-face cube-back bg-black flex flex-col justify-center items-center p-8 brutal-border">
              <h3 className="font-sans text-flare-orange text-3xl font-black mb-4 text-center">HEAVY TEE // ORANGE</h3>
              <div className="text-white text-xl mb-8">$89.00 USD</div>
              <button 
                onClick={() => handleAcquire('vnua-tee-01', 'LAB ISSUED HEAVY TEE', 89)}
                className="bg-flare-orange text-black font-sans font-black text-xl py-4 px-8 w-full brutal-border hover:bg-white transition-colors"
              >
                [ ACQUIRE TEE ]
              </button>
            </div>
          </div>
        </div>

        {/* BLOCK 3: Accessories / Gear (Blue) */}
        <div className="cube-container relative brutal-border-b md:brutal-border-b-0 group">
          <div className="cube w-full h-full">
            <div className="cube-face cube-front bg-cobalt-blue flex flex-col p-8 justify-between">
              <div>
                <h2 className="font-sans font-black text-4xl text-white">ELECTRIC COBALT GEAR</h2>
                <p className="text-white font-bold mt-4">AEROSPACE GRADE CARRY SYSTEMS.</p>
              </div>
              <div className="text-white text-6xl font-black text-right">03</div>
            </div>
            <div className="cube-face cube-back bg-black flex flex-col justify-center items-center p-8 brutal-border">
              <h3 className="font-sans text-cobalt-blue text-3xl font-black mb-4 text-center">TACTICAL RIG PACK</h3>
              <div className="text-white text-xl mb-8">$120.00 USD</div>
              <button 
                onClick={() => handleAcquire('vnua-rig-01', 'TACTICAL RIG PACK', 120)}
                className="bg-cobalt-blue text-white font-sans font-black text-xl py-4 px-8 w-full brutal-border hover:bg-white hover:text-black transition-colors"
              >
                [ ACQUIRE RIG ]
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black">
        <div className="p-8 brutal-border-r brutal-border-t bg-circuit-gold">
          <h3 className="font-sans font-black text-2xl text-black mb-4">SYSTEMS DIAGNOSTIC</h3>
          <p className="text-black font-bold">ALL PHYSICAL INVENTORY LOGS VERIFIED. READY FOR RAPID DEPLOYMENT.</p>
        </div>
        <div className="p-8 brutal-border-t bg-black flex items-center justify-center">
          <p className="text-neon-green font-sans font-black text-xl animate-pulse">STATUS: DEPLOYMENT NOMINAL</p>
        </div>
      </div>

    </div>
  );
}
