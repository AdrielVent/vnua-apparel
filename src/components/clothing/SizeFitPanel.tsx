'use client';

import { motion, useReducedMotion } from 'framer-motion';

const SIZE_CHART = [
  { size: 'XS', chest: '34–36"', shoulder: '16"',  length: '27"', sleeve: '32"' },
  { size: 'S',  chest: '36–38"', shoulder: '17"',  length: '28"', sleeve: '33"' },
  { size: 'M',  chest: '38–40"', shoulder: '18"',  length: '29"', sleeve: '34"' },
  { size: 'L',  chest: '40–42"', shoulder: '19"',  length: '30"', sleeve: '35"' },
  { size: 'XL', chest: '42–44"', shoulder: '20"',  length: '31"', sleeve: '36"' },
  { size: '2XL',chest: '44–46"', shoulder: '21"',  length: '32"', sleeve: '37"' },
];

const FIT_NOTES = [
  { label: 'Regular',  desc: 'Standard VNUA cut. True-to-size with a slightly clean torso.' },
  { label: 'Relaxed',  desc: '1–2" of extra room through the body and sleeve. Our most breathable silhouette.' },
  { label: 'Oversized',desc: 'Deliberately wide-body. Size down if you want a relaxed fit, not a drop-shoulder one.' },
  { label: 'Slim',     desc: 'Tailored through the leg or body. Size up for comfort.' },
];

export function SizeFitPanel() {
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
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-mono mb-3">Size &amp; Fit</p>
        <h2 className="font-sans text-4xl font-black text-gray-900 tracking-tight">
          Engineered dimensions.<br />
          <span className="text-gray-400">Built to spec.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Size chart */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="panel overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-sans font-black text-sm text-gray-900 tracking-widest uppercase">
              Size Chart — Tops
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Size', 'Chest', 'Shoulder', 'Length', 'Sleeve'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-gray-400 font-bold tracking-widest uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, i) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">{row.size}</td>
                    <td className="px-6 py-4 text-gray-600">{row.chest}</td>
                    <td className="px-6 py-4 text-gray-600">{row.shoulder}</td>
                    <td className="px-6 py-4 text-gray-600">{row.length}</td>
                    <td className="px-6 py-4 text-gray-600">{row.sleeve}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Fit notes */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {FIT_NOTES.map((note, i) => (
            <motion.div
              key={note.label}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="panel px-6 py-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[10px] font-mono font-bold uppercase">{note.label.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-sans font-black text-sm text-gray-900 mb-1 uppercase tracking-wider">{note.label}</div>
                <div className="font-mono text-xs text-gray-500 leading-relaxed">{note.desc}</div>
              </div>
            </motion.div>
          ))}

          <div className="panel px-6 py-5 bg-gray-50">
            <p className="text-xs font-mono text-gray-500 leading-relaxed">
              <strong className="text-gray-900">Measurements note:</strong> All measurements taken flat. 
              We recommend measuring your favorite-fitting garment and comparing to our chart. 
              When in doubt, size up — VNUA garments are pre-washed and will not shrink.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
