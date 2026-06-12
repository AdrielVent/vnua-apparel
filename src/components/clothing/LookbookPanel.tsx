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
    <section className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 border-b border-[#1A1A1A]">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono mb-3 font-bold">Lookbook</p>
        <h2 className="font-sans text-4xl font-black text-gray-900 tracking-tight">
          Outfit cells.<br />
          <span className="text-gray-400">One grid, infinite builds.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LOOKBOOK_ENTRIES.map((entry, i) => (
          <div
            key={i}
            className="panel flex flex-col overflow-hidden bg-white border-2 border-[#1A1A1A] rounded-[4px] shadow-[4px_4px_0px_#1A1A1A] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#1A1A1A]"
          >
            {/* Image area */}
            <div
              className="w-full aspect-[4/5] flex items-center justify-center relative overflow-hidden border-b-2 border-[#1A1A1A] bg-stripe-pattern"
            >
              {/* Placeholder visual */}
              <div className="flex flex-col items-center gap-2">
                {/* Mini cube stack */}
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="w-14 h-14 rounded-[2px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A]"
                    style={{
                      marginTop: j === 0 ? 0 : -32,
                      marginLeft: j * 12,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{ background: entry.cubeColor, opacity: 1 - j * 0.2 }}
                    />
                  </div>
                ))}
              </div>

              {/* Mood tag */}
              <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-[#1A1A1A] font-bold bg-white border border-[#1A1A1A] rounded-[2px] px-3 py-2 tracking-widest uppercase shadow-[2px_2px_0px_#1A1A1A]">
                {entry.mood}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-2">
              <div
                className="w-6 h-6 rounded-[2px] border border-[#1A1A1A]"
                style={{ background: entry.cubeColor }}
              />
              <h3 className="font-sans font-black text-lg text-gray-900">{entry.title}</h3>
              <p className="text-xs font-mono text-gray-500 font-bold tracking-wider">{entry.subtitle}</p>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
