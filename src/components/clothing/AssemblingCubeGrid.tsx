'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClothingProduct } from '@/data/clothingProducts';

const GRID_COLORS = [
  '#D00000', '#0046AD', '#FFD500',
  '#009B48', '#FF5800', '#D00000',
  '#0046AD', '#FFD500', '#009B48',
];

const OFFSETS = [
  { x: -50, y: -45 },
  { x: 30, y: -60 },
  { x: 80, y: -30 },
  { x: -70, y: 10 },
  { x: 10, y: -15 },
  { x: 60, y: 25 },
  { x: -40, y: 70 },
  { x: 20, y: 55 },
  { x: 80, y: 40 },
];

interface AssemblingCubeGridProps {
  products: ClothingProduct[];
}

export function AssemblingCubeGrid({ products }: AssemblingCubeGridProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-10%' }}
      className="w-full flex flex-col items-center py-32 px-6"
    >
      {/* Section label */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-4">
          The VNUA Grid — Drop 01
        </p>
        <h2 className="font-sans text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Scroll through the drop.<br />
          <span className="text-gray-400">Build the grid.</span>
        </h2>
      </motion.div>

      {/* 3×3 cube face assembly */}
      <div className="cube-grid-3x3 w-[240px] md:w-[300px]">
        {GRID_COLORS.map((color, i) => {
          const product = products[i % products.length];
          const offset = OFFSETS[i % OFFSETS.length];
          return (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: shouldReduce ? 1 : 0.3,
                  x: shouldReduce ? 0 : offset.x,
                  y: shouldReduce ? 0 : offset.y,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    delay: i * 0.06,
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                  },
                },
              }}
              whileHover={shouldReduce ? {} : { scale: 1.06 }}
              className="aspect-square rounded-[10px] flex items-center justify-center cursor-pointer"
              style={{ background: '#1A1A1A' }}
              title={product?.name}
            >
              <div
                className="w-[78%] h-[78%] rounded-[7px]"
                style={{
                  background: color,
                  boxShadow: `inset 0 3px 6px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.25)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Collection summary */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } },
        }}
        className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full"
      >
        {products.slice(0, 6).map((p) => (
          <div key={p.id} className="panel px-5 py-4 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0"
              style={{ background: p.cubeColor, boxShadow: `0 2px 8px ${p.cubeColor}44` }}
            />
            <div>
              <div className="font-sans font-black text-xs text-gray-900 leading-tight">{p.name}</div>
              <div className="font-mono text-xs text-gray-400">${p.price}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
