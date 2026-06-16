import React from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme, ActivePage } from '../types';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Header({ theme, setTheme, activePage, setActivePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems: { label: string; page: ActivePage }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'PROJECTS', page: 'projects' },
    { label: 'BLOG', page: 'blog' },
    { label: 'PRICING', page: 'pricing' },
    { label: 'CONTACT US', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b smooth-transition border-white/5 bg-black/10 dark:bg-black/20 theme-light:bg-white/40 theme-light:border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative w-10 h-10 flex items-center justify-between p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-primary/30 to-teal-500/10 border border-primary/20 group-hover:border-primary/50 smooth-transition overflow-hidden">
            {/* Elegant SVG Nest/Brackets logo */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-primary">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" className="fill-primary/20 text-primary" />
            </svg>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 smooth-transition" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-extrabold tracking-tight text-xl text-white dark:text-white theme-light:text-dark-bg">
                CodeNest
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <p className="text-[9px] tracking-wider font-mono text-white/40 dark:text-white/40 theme-light:text-dark-bg/60 uppercase">
              Developer Portfolio
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium tracking-widest font-sans">
          {menuItems.map((item, idx) => (
            <button
              key={`${item.label}-${idx}`}
              onClick={() => handleNavClick(item.page)}
              className={`relative py-2 text-xs font-semibold smooth-transition hover:text-primary ${
                activePage === item.page 
                  ? 'text-primary' 
                  : 'text-white/60 dark:text-white/60 theme-light:text-dark-bg/70'
              }`}
              id={`nav-item-${item.label.toLowerCase()}`}
            >
              {item.label}
              {activePage === item.page && (
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Group */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Selector Button with advanced rotating icons */}
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer bg-white/5 border border-white/10 dark:border-white/10 theme-light:bg-black/5 theme-light:border-black/10 smooth-transition hover:scale-105"
            aria-label="Toggle Theme"
            id="theme-toggler"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              className="absolute left-1 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-dark-bg shadow-sm"
              style={{
                x: theme === 'dark' ? 20 : 0
              }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon size={10} className="stroke-[3]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun size={10} className="stroke-[3]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>

          {/* Elegant Contact Launcher Badge Button */}
          <button 
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1 px-4 py-2 text-[11px] font-mono tracking-wider text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg smooth-transition uppercase font-bold"
            id="contact-badge-btn"
          >
            GET IN TOUCH
            <ArrowUpRight size={12} className="text-primary/70" />
          </button>
        </div>

        {/* Mobile menu trigger + theme toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 dark:bg-white/5 dark:border-white/10 theme-light:bg-black/5 theme-light:border-black/5 text-primary"
            id="theme-toggler-mobile"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white dark:text-white theme-light:text-dark-bg p-1"
            id="mobile-menu-hamburger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-screen Dark Overlay Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-0 top-20 z-40 flex flex-col justify-between p-8 font-sans ${
              theme === 'dark' 
                ? 'bg-dark-bg/95 backdrop-blur-xl border-t border-white/5' 
                : 'bg-white/95 backdrop-blur-xl border-t border-black/5'
            }`}
            id="mobile-full-menu"
          >
            <div className="flex flex-col gap-6 pt-8">
              <span className={`text-[10px] tracking-widest font-mono uppercase ${
                theme === 'dark' ? 'text-white/40' : 'text-dark-bg/40'
              }`}>
                NAVIGATION
              </span>
              <nav className="flex flex-col gap-5 text-2xl font-bold tracking-tight">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left border-b pb-3 smooth-transition ${
                    activePage === 'home' 
                      ? 'text-primary border-primary/20' 
                      : 'border-white/5 text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700'
                  }`}
                  id="mobile-nav-home"
                >
                  HOME
                </button>
                {menuItems.map((item, idx) => (
                  <button
                    key={`mobile-nav-${idx}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`text-left border-b pb-3 smooth-transition ${
                      activePage === item.page 
                        ? 'text-primary border-primary/20' 
                        : 'border-white/5 text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700'
                    }`}
                    id={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
              <div 
                onClick={() => handleNavClick('contact')}
                className={`flex justify-between items-center px-4 py-3 rounded-xl border smooth-transition cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:border-primary/40' 
                    : 'bg-black/5 border-black/10 hover:border-primary/40'
                }`}
                id="mobile-footer-card"
              >
                <div>
                  <h4 className={`text-xs font-bold font-mono tracking-wider uppercase ${
                    theme === 'dark' ? 'text-primary' : 'text-neutral-800'
                  }`}>
                    CODENEST PORTFOLIO
                  </h4>
                  <p className={`text-[11px] ${
                    theme === 'dark' ? 'text-white/50' : 'text-dark-bg/60'
                  }`}>
                    Modern Web Developer 2026
                  </p>
                </div>
                <ArrowUpRight size={18} className="text-primary" />
              </div>

              <p className={`text-[10px] text-center ${
                theme === 'dark' ? 'text-white/30' : 'text-dark-bg/40'
              }`}>
                © {new Date().getFullYear()} CodeNest. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
