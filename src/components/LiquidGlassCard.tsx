import React from 'react';
import { motion } from 'motion/react';
import { Award, Code2, Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface LiquidGlassCardProps {
  theme: Theme;
}

export default function LiquidGlassCard({ theme }: LiquidGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -30 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [-50, -58, -50], // precise 50px upward shift with a continuous smooth float cycle
      }}
      transition={{
        opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
        y: { 
          duration: 5.5, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }
      }}
      className={`liquid-glass-card flex flex-col justify-between p-5 text-left aspect-square overflow-hidden group select-none ${
        theme === 'light' ? 'theme-light' : ''
      }`}
      id="liquid-glass-card-element"
    >
      {/* Glow highlight reflecting hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40 group-hover:opacity-80 smooth-transition pointer-events-none" />

      {/* Card Header: [ 2025 ] badge */}
      <div className="flex justify-between items-center z-10">
        <span className="font-mono text-[11px] font-semibold tracking-widest text-[#5ed29c] px-2 py-0.5 rounded-full bg-[#5ed29c]/10">
          [ 2025 ]
        </span>
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/20 smooth-transition">
          <Code2 size={12} className="text-primary" />
        </div>
      </div>

      {/* Card Body: Taught by Industry Professionals */}
      <div className="flex flex-col gap-1.5 z-10 mt-auto">
        <h3 className="text-[17px] font-sans font-bold leading-snug text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg">
          Taught by{' '}
          <span className="font-instrument italic text-[#5ed29c] text-xl font-normal block sm:inline">
            Industry
          </span>{' '}
          Professionals
        </h3>
        
        <p className="text-[10px] leading-relaxed font-sans text-white/50 dark:text-white/50 theme-light:text-dark-bg/60">
          Curated by veteran developers from Netflix, Stripe, and Google.
        </p>
      </div>

      {/* Absolute micro grid decor */}
      <div className="absolute bottom-1 right-2 font-mono text-[8px] text-white/10 dark:text-white/10 theme-light:text-black/10 select-none">
        NEST::CLASS_V1.4
      </div>
    </motion.div>
  );
}
