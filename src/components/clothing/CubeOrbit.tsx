'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FloatingCube } from './FloatingCube';
import { useEffect, useState } from 'react';

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
  gridRef: React.RefObject<HTMLDivElement | null>;
}

export function CubeOrbit({ gridRef }: CubeOrbitProps) {
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [bounds, setBounds] = useState<Array<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endScale: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const calcBounds = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;
      const sp = mobile ? 78 : 98;
      const cellSz = mobile ? 56 : 76;

      const newBounds = ORBIT_CUBES.map((cube, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);

        const startX = (parseFloat(cube.x) / 100) * width;
        const startY = (parseFloat(cube.y) / 100) * height;

        // Grid coordinates centered on screen
        const endX = width / 2 + (col - 1) * sp - (cube.size / 2);
        const endY = height / 2 + (row - 1) * sp - (cube.size / 2);
        const endScale = cellSz / cube.size;

        return {
          startX,
          startY,
          endX,
          endY,
          endScale,
        };
      });
      setBounds(newBounds);
    };

    calcBounds();
    window.addEventListener('resize', calcBounds);
    return () => window.removeEventListener('resize', calcBounds);
  }, [mounted]);

  // Track scroll position to disable idle drift when assembling
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setAssembled(latest > 0.4);
    });
  }, [scrollYProgress]);

  if (!mounted || bounds.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[49] overflow-hidden" aria-hidden="true">
      {ORBIT_CUBES.map((cube, i) => {
        const b = bounds[i];
        if (!b) return null;

        // Scroll mapping: from scattered to grid between scroll progress 0.0 and 0.48
        const x = useTransform(scrollYProgress, [0, 0.48], [b.startX, b.endX]);
        const y = useTransform(scrollYProgress, [0, 0.48], [b.startY, b.endY]);
        const scale = useTransform(scrollYProgress, [0, 0.48], [1.0, b.endScale]);
        const opacity = useTransform(scrollYProgress, [0.48, 0.52], [1, 0]);

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              x,
              y,
              width: cube.size,
              height: cube.size,
              opacity,
              scale: shouldReduce ? 1.0 : scale,
            }}
          >
            <FloatingCube
              color={cube.color}
              size={cube.size}
              shouldDrift={!assembled}
              delay={cube.delay}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
