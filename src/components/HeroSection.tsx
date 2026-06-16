import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { ArrowRight, Code2, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Theme, ActivePage } from '../types';
import LiquidGlassCard from './LiquidGlassCard';

interface HeroSectionProps {
  theme: Theme;
  setActivePage: (page: ActivePage) => void;
}

export default function HeroSection({ theme, setActivePage }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    
    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls({ 
          enableWorker: false 
        });
        hls.loadSource("https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Play video in loop, muted splits
          video.play().catch(err => {
            console.log("Autoplay was prevented. Awaiting user interaction.", err);
          });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS fallback (mostly Safari)
        video.src = "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(err => console.log("Native video autoplay prevented", err));
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6">
      {/* 1. Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover scale-105 pointer-events-none opacity-60"
          muted
          loop
          playsInline
          id="background-hls-video"
        />
        
        {/* Overlays */}
        {theme === 'dark' ? (
          <>
            {/* Dark linear gradient from left (#070b0a to transparent) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/70 to-transparent pointer-events-none" />
            {/* Bottom-up gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-transparent to-[#070b0a]/40 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Light gradients for exquisite frosty light theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f8f7] via-[#f5f8f7]/70 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f8f7] via-[#f5f8f7]/30 to-[#f5f8f7]/50 pointer-events-none" />
          </>
        )}
      </div>

      {/* 2. Grid System (visible on desktop) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block" id="desktop-grid-overlay">
        {/* Vertical lines at 25%, 50%, and 75% marks across the screen */}
        <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-white/10 dark:bg-white/10 theme-light:bg-black/5" />
        <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/10 dark:bg-white/10 theme-light:bg-black/5" />
        <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-white/10 dark:bg-white/10 theme-light:bg-black/5" />
      </div>

      {/* 3. Central Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] z-10 pointer-events-none" id="central-glow-overlay">
        <div className="w-full h-full bg-primary opacity-[0.15] dark:opacity-[0.15] theme-light:opacity-[0.12] blur-[100px] rounded-[50%]" />
      </div>

      {/* 4. Hero Content Wrapper */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Glass Card shifted 50px upwards precisely */}
        <div className="mb-6 h-[170px] flex items-center justify-center">
          <LiquidGlassCard theme={theme} />
        </div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-primary/10 border border-primary/20"
        >
          <Sparkles size={11} className="text-[#5ed29c]" />
          <span className="font-jakarta font-bold text-[11px] tracking-wider uppercase text-[#5ed29c]">
            Career-Ready Curriculum
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-extrabold text-[40px] md:text-[72px] leading-[1.05] tracking-tight text-white dark:text-white theme-light:text-dark-bg uppercase select-none transition-all"
          id="main-headline-element"
        >
          LAUNCH YOUR
          <br />
          CODING CAREER
          <span className="text-[#5ed29c]">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-[14.5px] leading-relaxed font-sans text-white/70 dark:text-white/70 theme-light:text-dark-bg/85 max-w-[512px]"
          id="hero-desc-element"
        >
          Master in-demand coding skills alongside top instructors, design pristine fullstack codebases, and compile live production-ready solutions directly in our custom interactive terminal interface.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA - 'Get Started' with ArrowRight icon */}
          <button
            onClick={() => setActivePage('projects')}
            className="w-full sm:w-auto px-8 py-4 bg-[#5ed29c] text-[#070b0a] font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 smooth-transition flex items-center justify-center gap-2 group cursor-pointer"
            id="primary-cta-button"
          >
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-1.5 duration-300 transition-transform" />
          </button>

          {/* Secondary CTA - Consult Now */}
          <button
            onClick={() => setActivePage('contact')}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-[#5ed29c]/50 dark:border-white/20 dark:hover:border-primary/50 theme-light:border-black/20 theme-light:hover:border-primary theme-light:text-dark-bg text-white dark:text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full bg-white/5 hover:bg-[#5ed29c]/5 smooth-transition flex items-center justify-center gap-2 cursor-pointer"
            id="secondary-cta-button"
          >
            Consult Now
            <Code2 size={13} className="text-primary" />
          </button>
        </motion.div>
      </div>

      {/* 5. Trust Footline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-white/30 dark:text-white/30 theme-light:text-black/40 gap-4"
        id="hero-footer-metadata"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
          <span>MUX LIVE BROADCAST STREAM ACTIVE</span>
        </div>
        <div>
          CODENEST CORE // RUNNING ON PORT 3000
        </div>
      </motion.div>
    </section>
  );
}
