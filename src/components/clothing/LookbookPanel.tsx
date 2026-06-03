'use client';

import { motion, useReducedMotion } from 'framer-motion';

const LOOKBOOK_ENTRIES = [
  {
    title: 'The Core System',
    subtitle: 'Core Tee + Motion Shorts',
    mood: 'Studio / All-day creative wear',
    cubeColor: '#D00000',
    description: 'Clean silhouettes built for long creative sessions. The base combo of the VNUA modular wardrobe.',
  },
  {
    title: 'Grid Architecture',
    subtitle: 'Grid Hoodie + System Sweatpants',
    mood: 'Oversized / Layered motion',
    cubeColor: '#0046AD',
    description: 'When structure meets movement. The full fleece system — built to wear from sketch to street.',
  },
  {
    title: 'The Cell Stack',
    subtitle: 'Studio LS + Core Tee + Cell Cap',
    mood: 'Layered / Technical identity',
    cubeColor: '#009B48',
    description: 'A three-piece stack. Each piece is a cell in the grid — swap freely, the system stays coherent.',
  },
];

export function LookbookPanel() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-3">Lookbook</p>
        <h2 className="font-sans text-4xl font-black text-gray-900 tracking-tight">
          Outfit cells.<br />
          <span className="text-gray-400">One grid, infinite builds.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LOOKBOOK_ENTRIES.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            whileHover={shouldReduce ? {} : { y: -4 }}
            className="panel flex flex-col overflow-hidden"
          >
            {/* Image area */}
            <div
              className="w-full aspect-[4/5] flex items-center justify-center relative overflow-hidden"
              style={{ background: `${entry.cubeColor}10` }}
            >
              {/* Placeholder visual */}
              <div className="flex flex-col items-center gap-4">
                {/* Mini cube stack */}
                {[0, 1, 2].map((j) => (
                  <motion.div
                    key={j}
                    className="w-14 h-14 rounded-xl"
                    style={{
                      background: '#1A1A1A',
                      marginTop: j === 0 ? 0 : -28,
                      marginLeft: j * 8,
                    }}
                    animate={shouldReduce ? {} : { y: [0, -4 + j * 2, 0] }}
                    transition={{ duration: 3 + j * 0.5, repeat: Infinity, ease: 'easeInOut', delay: j * 0.2 }}
                  >
                    <div
                      className="m-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg"
                      style={{ background: entry.cubeColor, opacity: 0.9 - j * 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Mood tag */}
              <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-gray-500 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 tracking-widest uppercase">
                {entry.mood}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-2">
              <div
                className="w-6 h-6 rounded-md"
                style={{ background: entry.cubeColor }}
              />
              <h3 className="font-sans font-black text-lg text-gray-900">{entry.title}</h3>
              <p className="text-xs font-mono text-gray-500 font-bold tracking-wider">{entry.subtitle}</p>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">{entry.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
