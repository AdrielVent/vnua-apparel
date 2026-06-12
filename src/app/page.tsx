'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ClothingNav } from '@/components/clothing/ClothingNav';
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

// Decorative color tiles for the Hero asymmetric matrix
const HERO_TILES = [
  { color: '#D00000', label: 'MOD-01', row: 1, col: 1 },
  { color: '#0046AD', label: 'SYS-A', row: 1, col: 4 },
  { color: '#009B48', label: 'CELL-02', row: 2, col: 5 },
  { color: '#FFD500', label: 'CTRL-Y', row: 4, col: 1 },
  { color: '#FF5800', label: 'GRID-B', row: 4, col: 5 },
];

export default function Home() {
  const shouldReduce = useReducedMotion();
  const { toggleCart } = useCartStore();
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Dashboard Nav ─────────────────── */}
      <ClothingNav />

      <div
        className="min-h-screen bg-white bg-stripe-pattern overflow-x-hidden pt-[68px]"
      >

        {/* ════════════════════════════════════════
            HERO — Asymmetric Matrix Stage
            ════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative w-full min-h-[calc(100vh-68px)] flex items-center justify-center border-b-2 border-[#1A1A1A] p-6"
        >
          {/* Asymmetric Technical Grid Matrix Frame */}
          <div className="w-full max-w-6xl border-2 border-[#1A1A1A] bg-white grid grid-cols-1 md:grid-cols-5 md:grid-rows-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[4px] overflow-hidden">
            
            {/* Row 1 / Col 1-5 */}
            <div className="p-6 md:col-span-3 md:row-span-3 flex flex-col justify-between min-h-[340px] md:min-h-[480px]">
              <div>
                <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase font-mono font-bold mb-4">
                  VNUA // SYSTEM CODE // DROP 01
                </p>
                <h1
                  className="font-sans font-black text-gray-900 leading-tight tracking-tight uppercase"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  Modular apparel<br />
                  <span className="text-gray-400">for creative systems.</span>
                </h1>
              </div>

              <div>
                <p className="text-xs font-mono text-[#1A1A1A] font-bold tracking-widest uppercase mb-6 max-w-lg leading-relaxed">
                  Built from motion, color, and controlled chassis coordinates. Snapped to specification.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="#drop"
                    className="px-6 py-3 border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white rounded-[4px] font-mono font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.1)] active:translate-y-[1px]"
                  >
                    View Drop 01
                  </a>
                  <a
                    href="#grid"
                    className="px-6 py-3 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] rounded-[4px] font-mono font-bold text-xs tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Catalog
                  </a>
                </div>
              </div>
            </div>

            {/* Row 1 Col 4 - Color Module */}
            <div className="p-6 md:col-span-2 md:row-span-2 flex flex-col justify-between bg-stripe-pattern">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] border border-[#1A1A1A] bg-white px-2 py-0.5 rounded-[2px]">
                  TILE_COORD_04
                </span>
                <span className="text-[10px] font-mono text-gray-400">STATUS: ON</span>
              </div>
              <div className="w-24 h-24 border-2 border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A] bg-[#0046AD] self-center my-6" />
              <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                COBALT BLUE MODULE // EXT 01
              </div>
            </div>

            {/* Row 3 Col 4-5 - System telemetry */}
            <div className="p-6 md:col-span-2 md:row-span-1 border-t-2 border-[#1A1A1A] flex flex-col justify-between bg-[#F9F9F9]">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A]">SYSTEMS TELEMETRY</span>
              <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                  <div className="text-[8px] font-mono text-gray-400 uppercase">MATRIX TYPE</div>
                  <div className="text-xs font-mono font-black text-[#1A1A1A]">5x2 HORIZONTAL</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-gray-400 uppercase">LATENCY</div>
                  <div className="text-xs font-mono font-black text-[#1A1A1A]">0.00 MS (SNAPPED)</div>
                </div>
              </div>
            </div>

            {/* Row 4 Col 1-5 footer section */}
            <div className="p-6 md:col-span-5 md:row-span-1 border-t-2 border-[#1A1A1A] grid grid-cols-2 md:grid-cols-5 gap-4 bg-[#1A1A1A] text-white">
              {HERO_TILES.map((tile, i) => (
                <div key={i} className="flex items-center gap-3 border border-white/20 p-2 rounded-[2px]">
                  <div className="w-4 h-4 rounded-[2px] border border-white" style={{ background: tile.color }} />
                  <span className="text-[10px] font-mono font-bold tracking-wider">{tile.label}</span>
                </div>
              ))}
            </div>

          </div>
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
                  <li><a href="https://adrielvent.github.io/vnua-systems/#apparel" className="font-mono text-xs text-gray-400 hover:text-white transition-colors tracking-wider">Main Hub ↗</a></li>
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
