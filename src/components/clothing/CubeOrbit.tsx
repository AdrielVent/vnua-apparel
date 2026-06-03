'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FloatingCube } from './FloatingCube';

const ORBIT_CUBES = [
  { color: '#D00000', size: 56, x: '8%',  y: '18%', delay: 0 },
  { color: '#0046AD', size: 44, x: '82%', y: '12%', delay: 0.6 },
  { color: '#FFD500', size: 38, x: '15%', y: '68%', delay: 1.1 },
  { color: '#009B48', size: 50, x: '78%', y: '72%', delay: 0.3 },
  { color: '#FF5800', size: 34, x: '50%', y: '8%',  delay: 0.9 },
  { color: '#D00000', size: 28, x: '92%', y: '42%', delay: 1.4 },
  { color: '#0046AD', size: 40, x: '4%',  y: '42%', delay: 0.7 },
  { color: '#FFD500', size: 32, x: '60%', y: '82%', delay: 1.6 },
  { color: '#009B48', size: 36, x: '30%', y: '78%', delay: 0.4 },
];

interface CubeOrbitProps {
  /** 0–1: when 1, cubes fade and scale away to "assemble" later */
  exitProgress?: number;
}

export function CubeOrbit({ exitProgress = 0 }: CubeOrbitProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {ORBIT_CUBES.map((cube, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: cube.x,
            top: cube.y,
            opacity: 1 - exitProgress * 0.85,
            scale: 1 - exitProgress * 0.3,
          }}
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.4 }}
          animate={shouldReduce ? {} : { opacity: 1 - exitProgress * 0.85, scale: 1 - exitProgress * 0.3 }}
          transition={{ delay: cube.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <FloatingCube
            color={cube.color}
            size={cube.size}
            delay={cube.delay}
          />
        </motion.div>
      ))}
    </div>
  );
}
