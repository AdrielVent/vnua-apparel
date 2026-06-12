'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClothingProduct } from '@/data/clothingProducts';

// 5x2 horizontal split-pane grid colors
const GRID_COLORS = [
  '#D00000', '#0046AD', '#FFD500', '#009B48', '#FF5800',
  '#0046AD', '#D00000', '#009B48', '#FF5800', '#FFD500',
];

interface AssemblingCubeGridProps {
  products: ClothingProduct[];
  gridRef: React.RefObject<HTMLDivElement | null>;
}

export function AssemblingCubeGrid({ products, gridRef }: AssemblingCubeGridProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      ref={gridRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-10%' }}
      className="w-full flex flex-col items-center py-32 px-6 border-b border-[#1A1A1A]"
    >
      {/* Section label */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono mb-4 font-bold">
          The VNUA Matrix — Drop 01
        </p>
        <h2 className="font-sans text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Systems Overlap.<br />
          <span className="text-gray-400">Tactile Modular Grid.</span>
        </h2>
      </motion.div>

      {/* 5×2 split-pane assembly matrix */}
      <div className="grid grid-cols-5 gap-3 p-3 bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[8px_8px_0px_#1A1A1A] w-full max-w-[500px] md:max-w-[640px]">
        {GRID_COLORS.map((color, i) => {
          const product = products[i % products.length];
          return (
            <motion.div
              key={i}
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              className="aspect-square border-2 border-[#1A1A1A] rounded-[4px] flex items-center justify-center cursor-pointer bg-white transition-all hover:translate-y-[1px] hover:translate-x-[1px]"
              title={product?.name}
            >
              <div
                className="w-[84%] h-[84%] rounded-[2px]"
                style={{
                  background: color,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Collection summary */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
        }}
        className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full"
      >
        {products.slice(0, 6).map((p) => (
          <div key={p.id} className="panel px-5 py-4 flex items-center gap-3 bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A]">
            <div
              className="w-8 h-8 rounded-[2px] border border-[#1A1A1A] flex-shrink-0"
              style={{ background: p.cubeColor }}
            />
            <div>
              <div className="font-sans font-black text-xs text-gray-900 leading-tight">{p.name}</div>
              <div className="font-mono text-xs text-gray-500 font-bold mt-1">${p.price}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
