'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ClothingNav } from '@/components/clothing/ClothingNav';
import { CubeOrbit } from '@/components/clothing/CubeOrbit';
import { ScrollProductSpotlight } from '@/components/clothing/ScrollProductSpotlight';
import { ProductCubeCard } from '@/components/clothing/ProductCubeCard';
import { AssemblingCubeGrid } from '@/components/clothing/AssemblingCubeGrid';
import { LookbookPanel } from '@/components/clothing/LookbookPanel';
import { SizeFitPanel } from '@/components/clothing/SizeFitPanel';
import { CLOTHING_PRODUCTS } from '@/data/clothingProducts';
import { useCartStore } from '@/store/cartStore';

// Active spotlight products (first 3 for the hero scroll story)
const SPOTLIGHT_PRODUCTS = CLOTHING_PRODUCTS.slice(0, 3);

// All 6 for the grid
const GRID_PRODUCTS = CLOTHING_PRODUCTS;

export default function Home() {
  const shouldReduce = useReducedMotion();
  const { toggleCart } = useCartStore();
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Floating pill nav ─────────────────── */}
      <ClothingNav />

      <div
        className="min-h-screen bg-white bg-stripe-pattern overflow-x-hidden"
        style={{ paddingTop: 0 }}
      >

        {/* ════════════════════════════════════════
            HERO — Orbit stage
        ════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background cubie constellation */}
          <CubeOrbit gridRef={gridRef} />

          {/* Hero text */}
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.35em] text-gray-400 uppercase font-mono mb-5"
            >
              VNUA · Modular Clothing System · Drop 01
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
              className="font-sans font-black text-gray-900 leading-tight tracking-tight"
              style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}
            >
              Modular apparel<br />
              <span className="text-gray-300">for creative systems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 text-sm font-mono text-gray-500 tracking-widest uppercase"
            >
              Built from motion, color, and controlled chaos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <a
                href="#drop"
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-mono font-bold text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
              >
                View Drop 01
              </a>
              <a
                href="#grid"
                className="px-8 py-4 bg-white text-gray-600 rounded-2xl font-mono font-bold text-sm tracking-widest uppercase border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                Full Catalog
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono text-gray-400 tracking-[0.25em] uppercase"
          >
            <span>Scroll through the drop</span>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════
            PRODUCT SCROLL SPOTLIGHTS
        ════════════════════════════════════════ */}
        <section id="drop" className="w-full bg-white">
          {/* Section header */}
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-4">
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-3">Drop 01 — Scroll the story</p>
              <h2 className="font-sans text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Each piece is a cell<br />
                <span className="text-gray-300">in the VNUA grid.</span>
              </h2>
            </motion.div>
          </div>

          {/* Divider line */}
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mb-8">
            <div className="h-px bg-gray-100" />
          </div>

          {/* Spotlight sequence */}
          {SPOTLIGHT_PRODUCTS.map((product, i) => (
            <ScrollProductSpotlight
              key={product.id}
              product={product}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </section>

        {/* ════════════════════════════════════════
            PRODUCT GRID
        ════════════════════════════════════════ */}
        <section id="grid" className="w-full py-24 px-6 md:px-12" style={{ background: '#F8F8F8' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-3">Full Catalog</p>
              <h2 className="font-sans text-4xl font-black text-gray-900 tracking-tight">
                The complete drop.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {GRID_PRODUCTS.map((product, i) => (
                <ProductCubeCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            3×3 ASSEMBLING GRID MOMENT
        ════════════════════════════════════════ */}
        <section className="w-full bg-white">
          <AssemblingCubeGrid products={CLOTHING_PRODUCTS} gridRef={gridRef} />
        </section>

        {/* ════════════════════════════════════════
            LOOKBOOK
        ════════════════════════════════════════ */}
        <section id="lookbook" className="w-full" style={{ background: '#F8F8F8' }}>
          <LookbookPanel />
        </section>

        {/* ════════════════════════════════════════
            SIZE / FIT
        ════════════════════════════════════════ */}
        <section id="size-fit" className="w-full bg-white">
          <SizeFitPanel />
        </section>

        {/* ════════════════════════════════════════
            ABOUT VNUA CLOTHING
        ════════════════════════════════════════ */}
        <section id="about" className="w-full py-24 px-6 md:px-12" style={{ background: '#F8F8F8' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-6">About VNUA Clothing</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="font-sans text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
                    Creativity.<br />Engineering.<br />
                    <span className="text-gray-400">Modular identity.</span>
                  </h2>
                  <p className="font-mono text-sm text-gray-500 leading-relaxed mb-4">
                    VNUA started as an art nickname in eighth grade — a shortened version of Ventura, the last name of Adriel Ventura, mechanical engineering student and designer.
                  </p>
                  <p className="font-mono text-sm text-gray-500 leading-relaxed mb-4">
                    The clothing line is a direct extension of that identity. Each piece is designed with the same systems-thinking applied to CAD models and engineering documentation — intentional, modular, and built to last.
                  </p>
                  <p className="font-mono text-sm text-gray-500 leading-relaxed">
                    This is not a streetwear brand. This is a creative system expressed in fabric. Scroll through the drop. Build the grid.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Identity', value: 'VNUA — Ventura · Est. 2018' },
                    { label: 'Discipline', value: 'Mechanical Engineering + Design' },
                    { label: 'Location', value: 'New York Metro' },
                    { label: 'Philosophy', value: 'Systems-thinking applied to everything' },
                    { label: 'Drop Cadence', value: 'Seasonal · On-demand production' },
                    { label: 'Fulfillment', value: 'Zero overproduction · Print-on-demand' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-start gap-4 py-4 border-b border-gray-100"
                    >
                      <div className="text-[10px] font-mono font-bold text-gray-400 tracking-widest uppercase w-24 flex-shrink-0 pt-0.5">{item.label}</div>
                      <div className="font-mono text-sm text-gray-700 font-bold">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════ */}
        <footer className="w-full bg-gray-900 text-white py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <div className="font-sans font-black text-2xl tracking-widest mb-3">VNUA</div>
              <p className="font-mono text-sm text-gray-400 max-w-xs leading-relaxed">
                Modular apparel for creative systems. Built from motion, color, and controlled chaos.
              </p>
            </div>

            <div className="flex flex-wrap gap-12">
              <div>
                <div className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase mb-3">Navigate</div>
                <ul className="flex flex-col gap-2">
                  {['New Drop', 'Clothing', 'Lookbook', 'Size / Fit', 'About'].map((l) => (
                    <li key={l}><a href={`#${l.toLowerCase().replace(/\s\/?\s/g, '-')}`} className="font-mono text-xs text-gray-400 hover:text-white transition-colors tracking-wider">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase mb-3">Legal</div>
                <p className="font-mono text-[10px] text-gray-600 leading-relaxed max-w-[260px]">
                  VNUA is an open-source creative &amp; prototyping lab. All product concepts are for portfolio and demonstration purposes. No affiliation with any puzzle toy manufacturer.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">© 2026 VNUA. All rights reserved.</p>
            <button
              onClick={toggleCart}
              className="font-mono text-[11px] text-gray-400 hover:text-white transition-colors tracking-widest uppercase"
            >
              Open Cart ↗
            </button>
          </div>
        </footer>

      </div>
    </>
  );
}
