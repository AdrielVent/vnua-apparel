'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingCubeProps {
  color: string;
  size?: number;
  delay?: number;
  /** If set, cube moves to this position (assembled state) */
  targetX?: number;
  targetY?: number;
  /** 0–1 assembly progress driven by parent scroll */
  assembleProgress?: number;
  className?: string;
  onClick?: () => void;
  label?: string;
  shouldDrift?: boolean;
}

export function FloatingCube({
  color,
  size = 64,
  delay = 0,
  className = '',
  onClick,
  label,
  shouldDrift = true,
}: Omit<FloatingCubeProps, 'targetX' | 'targetY' | 'assembleProgress'>) {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Sticker inset = 78% of body size
  const stickerSize = Math.round(size * 0.78);

  // Idle drift animation — simple sine-like float
  const driftAnim = (shouldReduce || !shouldDrift) ? {} : {
    y: [0, -10, 4, -8, 0],
    rotate: [0, 3, -2, 1, 0],
    transition: {
      duration: 5 + delay * 0.7,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  };

  if (!mounted) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`cubie-body flex-shrink-0 ${className}`}
      >
        <div
          className="cubie-sticker"
          style={{ width: stickerSize, height: stickerSize, background: color }}
        />
      </div>
    );
  }

  return (
    <motion.div
      animate={driftAnim}
      whileHover={shouldReduce ? {} : { scale: 1.08, rotate: 0 }}
      whileTap={shouldReduce ? {} : { scale: 0.94 }}
      onClick={onClick}
      className={`cubie-body flex-shrink-0 cursor-pointer select-none ${className}`}
      style={{ width: size, height: size, position: 'relative' }}
      aria-label={label ?? `Color module: ${color}`}
      role={onClick ? 'button' : undefined}
    >
      {/* Plastic body renders via CSS class */}
      {/* Color sticker face */}
      <div
        className="cubie-sticker"
        style={{ width: stickerSize, height: stickerSize, background: color }}
      />
    </motion.div>
  );
}
