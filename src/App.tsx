import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Menu, X, ExternalLink, Sparkles, Terminal, Code, Monitor, Smartphone, RefreshCw, Mail, Phone, MapPin, Send, User, CheckCircle2, Shield, Lock, Database, Key, Sun, Moon } from 'lucide-react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { motion, AnimatePresence } from 'motion/react';

// Live Website Previews
import HorizonWealthPreview from './components/HorizonWealthPreview';
import ApexShopPreview from './components/ApexShopPreview';
import OctaneTaskPreview from './components/OctaneTaskPreview';
import SecurePestPreview from './components/SecurePestPreview';
import JackCreatorPreview from './components/JackCreatorPreview';

function SenvoLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="senvoGradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#00B0FF" />
          <stop offset="100%" stopColor="#2979FF" />
        </linearGradient>
        <linearGradient id="senvoGradientSecondary" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#006064" />
          <stop offset="50%" stopColor="#00838F" />
          <stop offset="100%" stopColor="#00B0FF" />
        </linearGradient>
        <linearGradient id="senvoBracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00B0FF" />
        </linearGradient>
      </defs>
      <path
        d="M 50 15 C 25 15 15 35 15 50 C 15 62 25 72 38 82 C 42 85 55 90 65 85 C 75 80 82 65 72 55 C 65 48 55 52 48 45 C 42 39 45 30 55 28 C 65 26 80 32 82 45"
        stroke="url(#senvoGradientPrimary)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50 85 C 75 85 85 65 85 50 C 85 38 75 28 62 18 C 58 15 45 10 35 15 C 25 20 18 35 28 45 C 35 52 45 48 52 55 C 58 61 55 70 45 72 C 35 74 20 68 18 55"
        stroke="url(#senvoGradientSecondary)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path 
        d="M 43 44 L 35 50 L 43 56" 
        stroke="url(#senvoBracketGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M 57 44 L 65 50 L 57 56" 
        stroke="url(#senvoBracketGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indiaTime, setIndiaTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('senvo_dark_mode') === 'true');

  useEffect(() => {
    localStorage.setItem('senvo_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Active Project Website state & interaction states
  const [activeProject, setActiveProject] = useState<'horizon' | 'apex' | 'octane' | 'secure' | 'jack'>('horizon');
  const [sandboxModalOpen, setSandboxModalOpen] = useState(false);

  // Contact Form States
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cLocation, setCLocation] = useState('');
  const [cOccupation, setCOccupation] = useState('');
  const [cMessage, setCMessage] = useState('');
  const [cSubmitting, setCSubmitting] = useState(false);
  const [cSuccess, setCSuccess] = useState(false);
  const [cError, setCError] = useState('');

  // Pipeline Real-time status feedback
  const [pipelineDbSynced, setPipelineDbSynced] = useState(false);
  const [pipelineEmailDispatched, setPipelineEmailDispatched] = useState(false);
  const [pipelineDetails, setPipelineDetails] = useState('');

  // Admin Portal & Authentication States
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('senvo_admin_token') || ''
  );
  const [adminSubmissions, setAdminSubmissions] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminLoginSubmitting, setAdminLoginSubmitting] = useState(false);

  // Auto-authenticate if we already have a token
  useEffect(() => {
    if (adminToken) {
      setAdminAuthenticated(true);
    }
  }, [adminToken]);

  // 1. Live Indian Time update hook
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setIndiaTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Admin Telemetry Operation Handlers
  const fetchAdminSubmissions = async (tokenValue?: string) => {
    const activeToken = tokenValue || adminToken;
    if (!activeToken) return;
    
    setAdminLoading(true);
    setAdminError('');
    try {
      const response = await fetch('/api/contact-submissions', {
        headers: {
          'Authorization': activeToken
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stored telemetries.');
      }
      setAdminSubmissions(data.submissions || []);
    } catch (err: any) {
      console.error('Fetch telemetries failed:', err);
      setAdminError(err.message || 'Transmission reconciliation failed.');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) {
      setAdminError('Please provide administrative password.');
      return;
    }
    setAdminLoginSubmitting(true);
    setAdminError('');
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: adminPassword })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Incorrect administrative access password.');
      }
      
      localStorage.setItem('senvo_admin_token', data.token);
      setAdminToken(data.token);
      setAdminAuthenticated(true);
      await fetchAdminSubmissions(data.token);
    } catch (err: any) {
      console.error('Login failed:', err);
      setAdminError(err.message || 'Incorrect credentials.');
    } finally {
      setAdminLoginSubmitting(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('senvo_admin_token');
    setAdminToken('');
    setAdminAuthenticated(false);
    setAdminSubmissions([]);
    setAdminPassword('');
    setAdminError('');
  };

  // Pull data on opening modal if already authorized
  useEffect(() => {
    if (adminModalOpen && adminAuthenticated) {
      fetchAdminSubmissions();
    }
  }, [adminModalOpen, adminAuthenticated]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased overflow-x-hidden ${isDarkMode ? 'bg-zinc-950 text-zinc-100 selection:bg-orange-950 selection:text-orange-200' : 'bg-white text-gray-900 selection:bg-orange-200 selection:text-gray-900'}`}>

      {/* =========================================================================
          SECTION 1: HERO (Full viewport height)
         ========================================================================= */}
      <section id="hero" className={`relative h-screen flex flex-col justify-between overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900' : 'bg-[#EFEFEF]'}`}>
        
        {/* Full-screen animated shader overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader className="w-full h-full">
            <Swirl colorA={isDarkMode ? "#09090b" : "#ffffff"} colorB={isDarkMode ? "#18181b" : "#f0f0f0"} detail={1.7} />
            <ChromaFlow baseColor={isDarkMode ? "#09090b" : "#ffffff"} downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation Layer */}
        <header className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3 mt-2 sm:mt-4">
          <nav className={`rounded-full p-[5px] flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
            
            {/* LEFT: Logo + Links */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Logo circle */}
              <div id="circle-logo" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-950 rounded-full flex items-center justify-center p-1.5 select-none hover:rotate-12 transition-transform duration-300">
                <SenvoLogo className="w-full h-full" />
              </div>
              
              {/* Navigation Links for Desktop */}
              <div className="hidden md:flex items-center gap-6">
                {[
                  { name: "Projects", href: "#projects" },
                  { name: "Studio", href: "#studio" },
                  { name: "About Us", href: "#about-us" },
                  { name: "Contact", href: "#contact" }
                ].map((item) => (
                  <a
                    id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={item.name}
                    href={item.href}
                    className={`text-[14px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-100 hover:text-zinc-400' : 'text-gray-900 hover:text-gray-500'}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: stats/clock/button + dark mode button grouped nicely to minimize gaps */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                {/* Q1 status */}
                <span className="hidden lg:inline-block text-[13px] text-gray-600 font-medium font-sans">
                  Taking on projects for Q1 2026
                </span>
                
                {/* Clock & India time */}
                <div className={`flex items-center gap-1.5 text-[13px] rounded-full py-1.5 px-3 font-mono transition-colors duration-300 ${isDarkMode ? 'text-zinc-300 bg-zinc-900 border-zinc-800' : 'text-gray-600 bg-gray-50 border-gray-100'}`}>
                  <Clock size={14} className="text-gray-400" />
                  <span className="font-semibold">{indiaTime || "12:00:00 PM"} in Mumbai</span>
                </div>

                {/* Book Call CTA Button */}
                <button 
                  id="btn-book-call"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group text-[13px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-4 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                >
                  {/* Dual-line hover rollup display */}
                  <span className="relative block h-[20px] overflow-hidden">
                    <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                      <span className="h-[20px] flex items-center select-none">Book a strategy call</span>
                      <span className="h-[20px] flex items-center select-none">Book a strategy call</span>
                    </span>
                  </span>
                  
                  {/* Arrow circle */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0 ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'}`}>
                    <ArrowRight size={11} className="stroke-[2.5]" />
                  </div>
                </button>
              </div>

              {/* Theme Toggle button */}
              <button
                id="theme-toggle-btn"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 focus:outline-none shadow-sm cursor-pointer ${
                  isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700 text-yellow-400 hover:bg-zinc-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-[#F0F0F0]'
                }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* MOBILE: Toggle button */}
              <button
                id="mobile-nav-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden rounded-full px-4 py-2 flex items-center gap-1.5 focus:outline-none transition-transform duration-100 active:scale-95 z-30 ${
                  isDarkMode ? 'bg-zinc-100 text-zinc-950' : 'bg-gray-900 text-white'
                }`}
              >
                <span className="text-[13px] font-medium select-none">{mobileOpen ? "Close" : "Menu"}</span>
                {mobileOpen ? <X size={14} /> : <Menu size={14} />}
              </button>
            </div>

          </nav>
        </header>

        {/* Mobile Menu Overlay Drawer */}
        <div
          id="mobile-overlay"
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-500 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        >
          {/* White Bottom Sheet Slide Up */}
          <div
            id="mobile-bottom-sheet"
            className={`absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isDarkMode ? 'bg-zinc-900 text-zinc-100 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-zinc-800' : 'bg-white text-gray-900 shadow-2xl'
            } ${
              mobileOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Live Clock Time header */}
            <div className={`flex items-center gap-1.5 text-[12px] rounded-full py-1.5 px-3 border w-fit mb-6 font-mono transition-colors duration-300 ${isDarkMode ? 'text-zinc-400 bg-zinc-950 border-zinc-800' : 'text-gray-500 bg-gray-50 border-gray-100'}`}>
              <Clock size={12} className="text-gray-400" />
              <span className="font-semibold">{indiaTime || "12:00:00 PM"} in Mumbai</span>
            </div>

            {/* Large Nav list */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Studio", href: "#studio" },
                { name: "About Us", href: "#about-us" },
                { name: "Contact", href: "#contact" }
              ].map((item) => (
                <a
                  id={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-[28px] sm:text-[32px] font-medium transition-colors duration-300 w-fit block ${isDarkMode ? 'text-zinc-100 hover:text-orange-500' : 'text-gray-900 hover:text-[#F26522]'}`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Action start button same as hero */}
            <button
              id="mobile-sheet-start"
              onClick={() => {
                setMobileOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group w-full bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center justify-between transition-colors duration-300"
            >
              <span className="relative block h-[20px] overflow-hidden">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center">Start a project</span>
                  <span className="h-[20px] flex items-center">Start a project</span>
                </span>
              </span>
              <div className="w-8 h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
                <ArrowRight size={14} className="stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Hero Content (z-20, layout bottom of screen) */}
        <div className="relative z-20 flex-grow flex flex-col justify-end w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          
          {/* Small studio title badge */}
          <p id="hero-studio-badge" className={`text-[13px] sm:text-[14px] tracking-wide font-medium mb-5 sm:mb-8 select-none transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-gray-900'}`}>
            Senvo Studio
          </p>

          {/* Core H1 headline statement */}
          <h1 id="hero-title" className={`text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] max-w-[1200px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            We craft digital experiences<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>for brands ready to dominate<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>their category online.
          </h1>

          {/* CTA Group bottom row */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            
            {/* Start a project orange button */}
            <button 
              id="hero-btn-start"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-4 transition-colors duration-300 shadow-sm"
            >
              <span className="relative block h-[20px] overflow-hidden">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center select-none">Start a project</span>
                  <span className="h-[20px] flex items-center select-none">Start a project</span>
                </span>
              </span>
              
              {/* Large rotating Arrow circle */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
                <ArrowRight size={14} className="stroke-[2.5]" />
              </div>
            </button>

            {/* Partner Compass badge */}
            <div 
              id="partner-badge"
              className="inline-flex items-center gap-2.5 sm:gap-3 bg-white px-4 py-2 sm:py-2.5 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100"
            >
              {/* Compass symbol vector */}
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#E8704E]" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100"
              >
                <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
              </svg>
              
              <span className="text-[13px] sm:text-[14px] font-semibold text-gray-900 select-none">
                Partner
              </span>
              
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded font-medium select-none">
                Featured
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: ABOUT (White background)
         ========================================================================= */}
      <section id="studio" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          {/* Numbered circle */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold select-none">
            1
          </div>
          {/* Pill label */}
          <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800 select-none">
            Introducing Senvo Studio
          </div>
        </div>

        {/* Heading h2 */}
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 id="about-heading" className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-[1000px]">
            Strategy-led creatives, delivering<br />results in digital and beyond.
          </h2>
        </div>

        {/* Content area: responsive */}
        {/* A. MOBILE / TABLET layout: (hidden on desktops with lg:grid) */}
        <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-6">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900">
              Through research, creative thinking and iteration we help growing brands realize their digital full potential.
            </p>
            
            {/* About orange roll button */}
            <button className="group bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-4 transition-colors duration-300">
              <span className="relative block h-[20px] overflow-hidden">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center select-none">About our studio</span>
                  <span className="h-[20px] flex items-center select-none">About our studio</span>
                </span>
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
                <ArrowRight size={14} className="stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Grid stack for small + large photos */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            {/* Small image column wrapper */}
            <div className="w-full sm:w-[45%]">
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" 
                alt="Senvo collaboration" 
                className="w-full object-cover rounded-xl sm:rounded-2xl aspect-[438/346]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Large image column wrapper */}
            <div className="w-full sm:w-[55%]">
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" 
                alt="Senvo creative workstation" 
                className="w-full object-cover rounded-xl sm:rounded-2xl aspect-[900/600]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* B. DESKTOP layout: (hidden on mobile, shown on lg+) */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12 w-full">
          {/* Left Column: self-end */}
          <div className="self-end w-full">
            <img 
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" 
              alt="Senvo collaboration desktop" 
              className="w-full object-cover rounded-2xl aspect-[438/346] hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Center Column: self-start, aligns content nicely */}
          <div className="self-start flex flex-col justify-between items-start pl-6 xl:pl-10 h-full py-2">
            <div className="flex flex-col gap-8">
              <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap">
                Through research, creative thinking and iteration<br />
                we help growing brands realize their digital full potential.
              </p>
              
              {/* About orange rollup button */}
              <button className="group w-fit bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] xl:text-[14px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-4 transition-colors duration-300 shadow-sm">
                <span className="relative block h-[20px] overflow-hidden">
                  <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center select-none">About our studio</span>
                    <span className="h-[20px] flex items-center select-none">About our studio</span>
                  </span>
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: self-end */}
          <div className="self-end w-full">
            <img 
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" 
              alt="Senvo creative workstation desktop" 
              className="w-full object-cover rounded-2xl aspect-[3/2] hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: CASE STUDIES (Split-Screen Interactive Sandbox Hub)
         ========================================================================= */}
      <section id="projects" className="bg-[#121212] text-zinc-100 pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32 overflow-hidden border-t border-zinc-900">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Badge row */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-bold select-none">
              2
            </div>
            <div className="text-[12px] sm:text-[13px] font-mono tracking-wider uppercase border border-zinc-800 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-zinc-400 bg-zinc-900/40 select-none">
              Featured Interactive Work
            </div>
          </div>

          {/* Heading h2 */}
          <div className="mb-12 sm:mb-16">
            <h2 id="projects-heading" className="text-[clamp(1.75rem,5vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
              Core Projects Sandbox <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">Real full-stack engineering, zero placeholders.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-[680px] mt-4 leading-relaxed font-sans">
              We don't just show static graphics. Play, click, and interact with four fully functional applications engineered for actual production, right here on-page.
            </p>
          </div>

          {/* Core Master Interactive Sandbox Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: The 4 high-end project selector cards (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Card 1: Horizon Wealth */}
              <div 
                id="proj-btn-horizon"
                onClick={() => setActiveProject('horizon')}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                  activeProject === 'horizon' 
                    ? 'bg-zinc-900 border-emerald-500/50 shadow-[0_4px_24px_rgba(16,185,129,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30'
                }`}
              >
                {/* Accent neon highlight glow bubble */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-xl rounded-full opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      FINTECH ADVISOR
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mt-3 select-none">
                      Horizon Wealth
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    $42M Vol
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-3 font-sans">
                  Interactive portfolio terminal that normalizes decentralized digital indices with automatic matrix balancing and index calculators.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['React 18', 'Recharts', 'Tailwind', 'Asset Matrices'].map((m) => (
                    <span key={m} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    {activeProject === 'horizon' ? 'Currently viewing sandbox' : 'Click to load live website'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-all">
                    <ArrowRight size={13} className="stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Card 2: Apex Shop */}
              <div 
                id="proj-btn-apex"
                onClick={() => setActiveProject('apex')}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                  activeProject === 'apex' 
                    ? 'bg-zinc-900 border-amber-500/50 shadow-[0_4px_24px_rgba(245,158,11,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/15 blur-xl rounded-full opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      LUXURY E-COMMERCE
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mt-3 select-none">
                      Apex Boutique
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                    320ms Lat
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-3 font-sans">
                  Premium commerce boutique specializing in selvedge denim and heavyweight textiles, featuring live basket state engines and Stripe gateways.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['Motion', 'Stripe checkout', 'Cart Engine', 'Luxury Grid'].map((m) => (
                    <span key={m} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    {activeProject === 'apex' ? 'Currently viewing sandbox' : 'Click to load live website'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 transition-all">
                    <ArrowRight size={13} className="stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Card 3: Octane Tasks */}
              <div 
                id="proj-btn-octane"
                onClick={() => setActiveProject('octane')}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                  activeProject === 'octane' 
                    ? 'bg-zinc-900 border-orange-500/50 shadow-[0_4px_24px_rgba(239,86,47,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/15 blur-xl rounded-full opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-orange-400 tracking-wider uppercase bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md">
                      SLA WORKSPACE
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mt-3 select-none">
                      Octane Flow
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-orange-400 transition-colors">
                    -45% cycle
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-3 font-sans">
                  Lightning-fast tasks tracker and sprint organizer modeled for tracking developer compiling tasks, priority filters, and state loops.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['Priority Hooks', 'Task Backlogs', 'Vite 6 Speed', 'GLSL tracker'].map((m) => (
                    <span key={m} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    {activeProject === 'octane' ? 'Currently viewing sandbox' : 'Click to load live website'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-all">
                    <ArrowRight size={13} className="stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Card 4: Secure Pest */}
              <div 
                id="proj-btn-secure"
                onClick={() => setActiveProject('secure')}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                  activeProject === 'secure' 
                    ? 'bg-zinc-900 border-blue-500/50 shadow-[0_4px_24px_rgba(59,130,246,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-xl rounded-full opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                      ENTERPRISE OPERATOR
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mt-3 select-none">
                      Secure Pest Control
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                    99.9% Route
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-3 font-sans">
                  High-capacity service dispatching platform with instant real-time calendar selection, scheduling matrices, and customer profile panels.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['Operational Hub', 'Logistic routing', 'Calendar dispatch', 'Leaflet mock'].map((m) => (
                    <span key={m} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    {activeProject === 'secure' ? 'Currently viewing sandbox' : 'Click to load live website'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-all">
                    <ArrowRight size={13} className="stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Card 5: Jack 3D Creator */}
              <div 
                id="proj-btn-jack"
                onClick={() => setActiveProject('jack')}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                  activeProject === 'jack' 
                    ? 'bg-zinc-900 border-purple-500/50 shadow-[0_4px_24px_rgba(182,0,168,0.06)]' 
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-xl rounded-full opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                      CREATIVE 3D PORTFOLIO
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mt-3 select-none">
                      Portfolio Management
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-purple-400 transition-colors">
                    3D Assets
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mt-3 font-sans">
                  Premium portfolio landing page presenting real-time mouse magnetic vectors, scroll characters reveal, service listings, and sticky-stacking image grids.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['Framer Motion', 'Kanit Display', 'Magnet Physics', 'Scroll Ranges'].map((m) => (
                    <span key={m} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    {activeProject === 'jack' ? 'Currently viewing sandbox' : 'Click to load live website'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 transition-all">
                    <ArrowRight size={13} className="stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Mobile Sandbox Trigger CTA */}
              <button 
                id="btn-play-all-mobile"
                onClick={() => setSandboxModalOpen(true)}
                className="lg:hidden mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
              >
                <Sparkles size={16} />
                Open Live Interactive Sandbox Hub
              </button>

            </div>

            {/* RIGHT COLUMN: The live browser mockup frame (lg:col-span-7) */}
            <div className="hidden lg:block lg:col-span-7 sticky top-24 h-[680px] bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Mock Browser Header Chrome */}
              <div className="bg-zinc-900/80 backdrop-blur-md px-4 py-3 border-b border-zinc-800/65 flex items-center justify-between">
                
                {/* Dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* URL container */}
                <div className="flex-grow max-w-[65%] mx-auto bg-zinc-950/80 border border-zinc-850 px-4 py-1 rounded-lg flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                  <span className="truncate">https://{activeProject === 'horizon' ? 'horizon.wealth' : activeProject === 'apex' ? 'apex.boutique' : activeProject === 'octane' ? 'octane.tasks' : activeProject === 'secure' ? 'secure.pest' : 'jack.portfolio'}.senvo.studio</span>
                  <RefreshCw size={10} className="text-zinc-600 animate-pulse" />
                </div>

                {/* Workspace Tag or Badge */}
                <div className="shrink-0 text-[10px] font-mono text-zinc-500 flex items-center gap-1 select-none">
                  <Terminal size={11} className="text-orange-500" />
                  <span>PREVIEW FRAME v1.0.4</span>
                </div>
              </div>

              {/* Embedded Live application context based on click */}
              <div className="flex-grow p-4 sm:p-5 overflow-y-auto bg-zinc-950/40 select-none custom-scrollbar">
                {activeProject === 'horizon' && <HorizonWealthPreview theme="dark" />}
                {activeProject === 'apex' && <ApexShopPreview theme="dark" />}
                {activeProject === 'octane' && <OctaneTaskPreview theme="dark" />}
                {activeProject === 'secure' && <SecurePestPreview theme="dark" />}
                {activeProject === 'jack' && <JackCreatorPreview theme="dark" />}
              </div>

              {/* Status bar */}
              <div className="bg-zinc-900 py-2 px-4 border-t border-zinc-800/80 flex justify-between items-center text-[10px] font-mono text-zinc-500 select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Sandbox connected successfully</span>
                </span>
                <span className="uppercase">Click elements to test live features</span>
              </div>

            </div>

          </div>
        </div>

        {/* FULL MOBILE PORTAL DRAWERS OVERLAY */}
        {sandboxModalOpen && (
          <div 
            id="mobile-sandbox-overlay"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-end"
          >
            {/* Modal Container */}
            <div className="h-[92vh] bg-zinc-950 rounded-t-3xl border-t border-zinc-800 flex flex-col justify-between overflow-hidden relative">
              
              {/* Header */}
              <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40">
                <div className="text-left">
                  <span className="text-[9px] font-mono font-bold text-orange-400 tracking-wider">ACTIVE MOBILE PORTAL</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                      {activeProject === 'horizon' ? 'Horizon Portfolio' : activeProject === 'apex' ? 'Apex Streetwear' : activeProject === 'octane' ? 'Octane Backlog' : activeProject === 'secure' ? 'Secure Booking' : 'Jack Portfolio'}
                    </h4>
                  </div>
                </div>

                <button 
                  onClick={() => setSandboxModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-850"
                >
                  <X size={15} />
                </button>
              </div>

              {/* App selector in mobile popup top */}
              <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-900 flex items-center gap-1.5 overflow-x-auto">
                {(['horizon', 'apex', 'octane', 'secure', 'jack'] as const).map((projKey) => (
                  <button
                    key={projKey}
                    onClick={() => setActiveProject(projKey)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase shrink-0 transition-colors ${
                      activeProject === projKey 
                        ? 'bg-orange-500 text-white font-bold' 
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {projKey}
                  </button>
                ))}
              </div>

              {/* Main sandbox workspace */}
              <div className="flex-grow p-4 overflow-y-auto bg-zinc-950/20 text-left">
                {activeProject === 'horizon' && <HorizonWealthPreview theme="dark" />}
                {activeProject === 'apex' && <ApexShopPreview theme="dark" />}
                {activeProject === 'octane' && <OctaneTaskPreview theme="dark" />}
                {activeProject === 'secure' && <SecurePestPreview theme="dark" />}
                {activeProject === 'jack' && <JackCreatorPreview theme="dark" />}
              </div>

              {/* Status Indicator */}
              <div className="p-3 bg-zinc-900 border-t border-zinc-850 text-center font-mono text-[9px] text-zinc-500 select-none">
                PROD INTEGRATION RUNNING LIVE • PRESS CLOSE TO RETURN
              </div>

            </div>
          </div>
        )}

      </section>

      {/* =========================================================================
          SECTION 4: ABOUT US (Elegant luxury grid)
         ========================================================================= */}
      <section id="about-us" className={`pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32 overflow-hidden border-t transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-[#FBFBFB] border-gray-150'}`}>
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Badge row */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-[12px] font-bold select-none transition-colors duration-300 ${isDarkMode ? 'bg-zinc-100 text-zinc-950' : 'bg-gray-950 text-white'}`}>
              3
            </div>
            <div className={`text-[12px] sm:text-[13px] font-mono tracking-wider uppercase border rounded-full px-3 sm:px-4 py-1 sm:py-1.5 select-none transition-colors duration-300 ${isDarkMode ? 'text-zinc-300 bg-zinc-900 border-zinc-800 shadow-sm' : 'text-gray-700 bg-white border-gray-300 shadow-sm'}`}>
              Identity & Passion
            </div>
          </div>

          {/* Heading h2 */}
          <div className="mb-14 lg:mb-20">
            <h2 id="about-heading" className={`text-[clamp(1.75rem,5vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              We build with technical rigor<br className="hidden sm:block" />
              <span className={`transition-colors duration-300 ${isDarkMode ? 'text-zinc-400 font-normal' : 'text-gray-500 font-normal'}`}>and unwavering design dedication.</span>
            </h2>
            <p className={`text-sm sm:text-base max-w-[680px] mt-4 leading-relaxed font-sans transition-colors duration-300 ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
              Senvo Studio is an small elite team of designers and engineers. We combine premium typography and motion science with robust, production-ready fullstack capabilities.
            </p>
          </div>

          {/* Bento-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Philosophy */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-200/60 text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'}`}>
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase border px-2 py-0.5 rounded transition-colors duration-300 ${isDarkMode ? 'text-orange-400 bg-orange-950/40 border-orange-900/60' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                  DESIGN MINDSET
                </span>
                <h3 className={`text-xl font-medium tracking-tight mt-4 h-12 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Uncompromising Craft
                </h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed mt-2 font-sans transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  We believe templates limit your authority. That is why every line of CSS, custom layout grid, and motion transition is designed from scratch to complement your brand's natural rhythm.
                </p>
              </div>
              <div className={`mt-8 pt-4 border-t flex items-center gap-2 text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-100 text-gray-400'}`}>
                <span>01 / CORE STANDARDS</span>
              </div>
            </div>

            {/* Card 2: India Roots */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-200/60 text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'}`}>
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#F26522]/5 blur-2xl rounded-full" />
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase border px-2 py-0.5 rounded transition-colors duration-300 ${isDarkMode ? 'text-orange-400 bg-orange-950/40 border-orange-900/60' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                  OUR ORIGIN & REACH
                </span>
                <h3 className={`text-xl font-medium tracking-tight mt-4 h-12 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Mumbai Roots, Global Standards
                </h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed mt-2 font-sans transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Based in the vibrant financial capital of India (Mumbai, Maharashtra), we ship lightning-fast applications for clients in Dubai, London, and San Francisco. Local agility paired with international benchmarks.
                </p>
              </div>
              <div className={`mt-8 pt-4 border-t flex items-center gap-2 text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-100 text-gray-400'}`}>
                <span>02 / HEADQUARTERS</span>
              </div>
            </div>

            {/* Card 3: Technology */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-200/60 text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'}`}>
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase border px-2 py-0.5 rounded transition-colors duration-300 ${isDarkMode ? 'text-orange-400 bg-orange-950/40 border-orange-900/60' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                  CAPABILITIES
                </span>
                <h3 className={`text-xl font-medium tracking-tight mt-4 h-12 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Architected to Perform
                </h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed mt-2 font-sans transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  We specialize in Node.js, Vite 6, WebAssembly, and secure backend routing. Our customized server architectures execute fluidly without overhead, ensuring near-instant loading times.
                </p>
              </div>
              <div className={`mt-8 pt-4 border-t flex items-center gap-2 text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-100 text-gray-400'}`}>
                <span>03 / THE BREADTH</span>
              </div>
            </div>

          </div>

          {/* Mini interactive stats strip */}
          <div className={`mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border grid grid-cols-2 max-w-2xl mx-auto gap-6 text-center transition-all duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-200/60 text-gray-900 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'}`}>
            {[
              { stat: "320ms", label: "Average Response" },
              { stat: "24/7", label: "Customer Care" }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className={`text-xl sm:text-2xl lg:text-3xl font-mono font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{s.stat}</span>
                <span className={`text-[11px] sm:text-xs font-medium mt-1 uppercase tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CONTACT (Differentiated Page Layout with high-end form filling)
         ========================================================================= */}
      <section id="contact" className="bg-[#09090B] text-zinc-100 pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32 overflow-hidden border-t border-zinc-900 relative">
        
        {/* Subtle decorative background vector blobs */}
        <div className="absolute top-1/4 left-10 w-[30vw] h-[30vw] bg-[#F26522]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[25vw] h-[25vw] bg-amber-500/5 blur-[125px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          {/* Badge row */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F26522] text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold select-none">
              4
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono tracking-wider uppercase border border-zinc-800 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-zinc-400 bg-zinc-900/40 select-none">
              Scoped Action Matrix
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Context Card */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div className="text-left">
                <h2 className="text-[clamp(1.75rem,5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                  Let’s initiate <br />
                  your sprint.<span className="text-[#F26522]">.</span>
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-[480px]">
                  Ready to transcend standard template boundaries? Fill out our dedicated contact parameters. Our engineering leads in Mumbai will respond with a structural proposal within 2 business hours.
                </p>

                <div className="mt-10 flex flex-col gap-6">
                  {/* EMail */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-[#F26522]">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">DIRECT EMAIL CHANNELS</span>
                      <a href="mailto:viandsilva08@gmail.com" className="text-sm font-semibold text-zinc-200 hover:text-[#F26522] transition-colors">
                        viandsilva08@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-[#F26522]">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">TELEPHONY CONNECTION</span>
                      <a href="tel:+918010424710" className="text-sm font-semibold text-zinc-200 hover:text-[#F26522] transition-colors">
                        +91 8010424710
                      </a>
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-[#F26522]">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">CORE STUDIO LOCATION</span>
                      <p className="text-sm font-semibold text-zinc-300">
                        Vasai West, Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal or operational notice */}
              <div className="mt-12 pt-8 border-t border-zinc-900 text-left text-xs text-zinc-500 font-mono">
                SECURE END-TO-END TRANSMISSION PROTOCOL V2 // MUMBAI HQ
              </div>
            </div>

            {/* Right Column: Dynamic Form Filling Section */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                
                {/* Header within form card */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
                      Client Verification Node
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">Please populate all required parameters</p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded uppercase font-bold">LIVE METRIC DATA</span>
                </div>

                {cError && (
                  <div className="mb-6 bg-red-900/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-xs font-mono flex items-center gap-2">
                    <span className="font-bold">❌ Error:</span>
                    <span>{cError}</span>
                  </div>
                )}

                {/* Form or Success State toggle */}
                {!cSuccess ? (
                  <form 
                    id="senvo-custom-contact-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!cName || !cEmail || !cPhone || !cLocation) {
                        setCError("Please populate Name, Email, Contact Number, and Location before package transmission.");
                        return;
                      }
                      setCError("");
                      setCSubmitting(true);
                      
                      try {
                        const response = await fetch("/api/contact", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            name: cName,
                            email: cEmail,
                            phone: cPhone,
                            location: cLocation,
                            occupation: cOccupation,
                            message: cMessage
                          })
                        });

                        const data = await response.json();
                        
                        if (!response.ok) {
                          throw new Error(data.error || "An unexpected transmission exception occurred.");
                        }

                        // Save feedback data from backend pipeline
                        setPipelineDbSynced(data.databaseSynced);
                        setPipelineEmailDispatched(data.emailDispatched);
                        setPipelineDetails(data.details || "");
                        
                        setCSubmitting(false);
                        setCSuccess(true);
                      } catch (err: any) {
                        console.error("Form Transmission Error:", err);
                        setCError(err.message || "Network error. Failed to transmit client telemetry packet.");
                        setCSubmitting(false);
                      }
                    }}
                    className="flex flex-col gap-5 text-left font-sans"
                  >
                    
                    {/* Input 1: Customer Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                        Full Name <span className="text-[#F26522] font-semibold">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cName}
                          onChange={(e) => setCName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Dual row for details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Input 2: Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                          Email Address <span className="text-[#F26522] font-semibold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={cEmail}
                          onChange={(e) => setCEmail(e.target.value)}
                          placeholder="rahul@company.in"
                          className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>

                      {/* Input 3: Contact Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                          Contact Number <span className="text-[#F26522] font-semibold">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={cPhone}
                          onChange={(e) => setCPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>

                    </div>

                    {/* Input 4: Location */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                        Your Location Node <span className="text-[#F26522] font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={cLocation}
                        onChange={(e) => setCLocation(e.target.value)}
                        placeholder="e.g. Mumbai, Maharashtra"
                        className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Input 4.5: Occupation */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                        Occupation / Role
                      </label>
                      <input
                        type="text"
                        value={cOccupation}
                        onChange={(e) => setCOccupation(e.target.value)}
                        placeholder="e.g. Founder, Product Manager, Technical Lead"
                        className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Input 5: Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                        Project Details & Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={cMessage}
                        onChange={(e) => setCMessage(e.target.value)}
                        placeholder="Briefly state your project priorities or timeline constraint..."
                        className="w-full bg-zinc-900/40 border border-zinc-800/80 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={cSubmitting}
                      className="group w-full mt-4 bg-[#F26522] hover:bg-[#e05a1a] text-white py-4 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors duration-300 disabled:opacity-55 cursor-pointer"
                    >
                      {cSubmitting ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Transmitting Telemetry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} className="transition-transform group-hover:translate-x-1" />
                          <span>Transmit Parameters</span>
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  <div 
                    id="contact-form-success"
                    className="py-6 text-center flex flex-col items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                      <CheckCircle2 size={32} className="animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-sans text-white uppercase tracking-wide">Payload Transmitted Successfully</h4>
                      <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-widest">Entry processed successfully // Status 200 OK</p>
                    </div>

                    {/* Status Pipelines */}
                    <div className="w-full grid grid-cols-2 gap-3 text-left">
                      <div className={`p-3 rounded-xl border text-xs font-mono transition-colors ${pipelineDbSynced ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" : "bg-zinc-900/40 border-zinc-850/80 text-zinc-400"}`}>
                        <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-bold">DATABASE ACCESS</span>
                        <div className="font-semibold mt-1 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${pipelineDbSynced ? "bg-emerald-400" : "bg-amber-500 animate-pulse"}`} />
                          {pipelineDbSynced ? "Supabase Synced" : "Sandbox Backup"}
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl border text-xs font-mono transition-colors ${pipelineEmailDispatched ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" : "bg-zinc-900/40 border-zinc-850/80 text-zinc-400"}`}>
                        <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-bold">GMAIL TELEMETRY</span>
                        <div className="font-semibold mt-1 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${pipelineEmailDispatched ? "bg-emerald-400" : "bg-amber-500 animate-pulse"}`} />
                          {pipelineEmailDispatched ? "Gmail Alert Dispatched" : "Review Notice"}
                        </div>
                      </div>
                    </div>

                    {pipelineDetails && (
                      <div className="w-full p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl text-left font-mono text-[10px] text-zinc-400 leading-relaxed uppercase">
                        <span className="block text-[8px] text-zinc-500 font-bold tracking-widest mb-1">PIPELINE DETAILS</span>
                        {pipelineDetails}
                      </div>
                    )}

                    <div className="w-full mt-2 bg-zinc-900/50 border border-zinc-850 rounded-2xl p-5 text-left text-xs font-mono text-zinc-300 flex flex-col gap-2.5">
                      <div><span className="text-zinc-500 uppercase tracking-widest">Client Name:</span> <span className="text-[#F26522]">{cName}</span></div>
                      <div><span className="text-zinc-500 uppercase tracking-widest">Email Route:</span> <span>{cEmail}</span></div>
                      <div><span className="text-zinc-500 uppercase tracking-widest">Contact Phone:</span> <span>{cPhone}</span></div>
                      <div><span className="text-zinc-500 uppercase tracking-widest">Location Node:</span> <span>{cLocation}</span></div>
                      {cOccupation && <div><span className="text-zinc-500 uppercase tracking-widest">Occupation:</span> <span>{cOccupation}</span></div>}
                      {cMessage && <div><span className="text-zinc-500 uppercase tracking-widest">Project:</span> <p className="text-zinc-400 leading-relaxed text-xs mt-1 border-t border-zinc-900 pt-1.5 font-sans italic">"{cMessage}"</p></div>}
                    </div>

                    <button
                      onClick={() => {
                        setCName('');
                        setCEmail('');
                        setCPhone('');
                        setCLocation('');
                        setCOccupation('');
                        setCMessage('');
                        setCSuccess(false);
                      }}
                      className="mt-4 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Transmit another packet
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Humble aesthetic footer */}
      <footer className="bg-white border-t border-gray-100 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-950 rounded-full flex items-center justify-center p-1.5 select-none hover:rotate-12 transition-transform duration-300">
              <SenvoLogo className="w-full h-full" />
            </div>
            <span className="text-[13px] font-semibold text-gray-900 select-none">Senvo Studio</span>
          </div>
          <p className="text-[13px] text-gray-500 flex items-center select-none font-sans">
            &copy; {new Date().getFullYear()} Senvo Studio. Crafted with absolute precision
            <span 
              id="admin-secret-trigger"
              onClick={() => setAdminModalOpen(true)}
              className="inline-block w-1.5 h-1.5 bg-gray-200 hover:bg-[#F26522] rounded-full ml-1 cursor-pointer transition-all duration-300 hover:scale-150"
              title="Admin Ingress Node"
            />
          </p>
        </div>
      </footer>

      {/* =========================================================================
          SECTION 6: ADMIN WORKSPACE MODAL OVERLAY
         ========================================================================= */}
      <AnimatePresence>
        {adminModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-sans"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="bg-gradient-to-br from-white via-sky-50 to-blue-50/90 border border-sky-100 w-full max-w-5xl rounded-3xl shadow-2xl shadow-sky-500/10 flex flex-col max-h-[90vh] text-slate-800 overflow-hidden relative"
            >
              
              {/* Ambient High-End Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-blue-300/20 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-sky-100 px-6 py-5 select-none shrink-0 bg-white/70 backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0"
                  >
                    <Shield size={18} />
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2 text-sky-950">
                      SENVO STUDIO CORE INTERFACE
                      <span className="inline-block w-2 h-2 bg-sky-500 rounded-full animate-ping" />
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">Administrative Telemetry Workspace</p>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(14, 165, 233, 0.1)", color: "rgba(3, 105, 161, 1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAdminModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100/50 border border-slate-200/60 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Modal Content container */}
              <div className="flex-grow overflow-y-auto p-6">
                
                {!adminAuthenticated ? (
                  /* SECTION A: Authentication Verification View */
                  <div className="max-w-md mx-auto py-12 flex flex-col justify-center h-full">
                    <motion.div 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-center mb-8"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.02, 1],
                          boxShadow: ["0 4px 10px rgba(14, 165, 233, 0.1)", "0 10px 20px rgba(14, 165, 233, 0.15)", "0 4px 10px rgba(14, 165, 233, 0.1)"]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-16 h-16 rounded-full bg-white border border-sky-100 flex items-center justify-center mx-auto text-sky-500 mb-4"
                      >
                        <Lock size={26} />
                      </motion.div>
                      <h4 className="text-lg font-bold font-sans text-sky-950">Verification Required</h4>
                      <p className="text-xs text-slate-400 font-mono uppercase mt-2 tracking-wider">Please input administrative passcode</p>
                    </motion.div>

                    {adminError && (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-5 p-4 bg-red-50 border border-red-200 text-red-650 rounded-2xl text-xs font-mono flex items-start gap-2.5"
                      >
                        <span className="font-bold shrink-0">FAIL_CODE:</span>
                        <span>{adminError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">PASSKEY PARAMETER</label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="password"
                          required
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••••••••••"
                          className="w-full bg-white border border-sky-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none rounded-2xl py-3.5 px-4 text-sm font-mono text-center tracking-widest text-sky-600 shadow-sm"
                          autoFocus
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#0284c7" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={adminLoginSubmitting}
                        className="w-full bg-sky-500 text-white py-3.5 px-4 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-sky-500/10"
                      >
                        {adminLoginSubmitting ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>Verifying Identity Node...</span>
                          </>
                        ) : (
                          <>
                            <Key size={13} />
                            <span>Establish Credentials</span>
                          </>
                        )}
                      </motion.button>
                    </form>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-8 p-4 bg-sky-500/5 border border-sky-150/40 rounded-2xl text-left select-none hover:bg-sky-500/10 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-sky-600 uppercase block tracking-wider font-bold mb-1">Local Sandbox Setup Information</span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                        To run and test instantly in sandbox/dev mode, use the default passkey: <span className="text-sky-600 font-bold">senvo_studios_2026</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-sans italic">
                        Customize this value in development or deployment secrets by configuring <code className="text-slate-500 font-mono">ADMIN_PORTAL_PASSWORD</code> in your dashboard.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  /* SECTION B: Stored Telemetries View */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-full">
                    
                    {/* Left Column: Submissions dataset */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                      <div className="flex items-center justify-between pb-3 border-b border-sky-100/85">
                        <span className="text-xs font-mono text-sky-900 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Database size={13} className="text-sky-500" />
                          Inbound Registrations Heap
                        </span>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => fetchAdminSubmissions()}
                            disabled={adminLoading}
                            className="text-[10px] font-mono text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-150 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <RefreshCw size={11} className={adminLoading ? "animate-spin" : ""} />
                            Sync dataset
                          </motion.button>
                        </div>
                      </div>

                      {adminError && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-650 rounded-xl text-xs font-mono">
                          {adminError}
                        </div>
                      )}

                      {adminSubmissions.length === 0 ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-20 text-center border border-sky-100/60 rounded-2xl bg-white"
                        >
                          <p className="text-slate-400 font-mono text-xs uppercase tracking-wide">Dataset Empty // No Clients Entered</p>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1">
                          {adminSubmissions.map((sub, index) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                              whileHover={{ y: -2, boxShadow: "0 10px 20px -10px rgba(14, 165, 233, 0.15)", borderColor: "rgba(14, 165, 233, 0.3)" }}
                              key={sub.id} 
                              className="bg-white border border-sky-100/80 rounded-2xl p-5 transition-all text-left"
                            >
                              {/* Card Header information */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-50 pb-3 mb-3">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-sm font-bold text-sky-950 tracking-tight">{sub.name}</h4>
                                    {sub.occupation && (
                                      <span className="text-[9px] font-mono font-bold bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded tracking-wide uppercase">
                                        {sub.occupation}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-slate-500 font-sans flex items-center gap-1 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> {sub.location}
                                  </span>
                                </div>
                                <span className="text-[9.5px] font-mono text-sky-700 bg-sky-50 px-2 py-1 rounded-md tracking-wider">
                                  {new Date(sub.created_at).toLocaleString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                  })} (IST)
                                </span>
                              </div>

                              {/* Client contact tags */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3 font-sans">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Mail size={12} className="text-sky-400" />
                                  <a href={`mailto:${sub.email}`} className="hover:text-sky-600 transition-colors font-medium">{sub.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <Phone size={12} className="text-sky-400" />
                                  <a href={`tel:${sub.phone}`} className="hover:text-sky-600 transition-colors font-medium">{sub.phone}</a>
                                </div>
                              </div>

                              {/* Project description detail message */}
                              {sub.message && (
                                <div className="bg-gradient-to-r from-sky-50/50 to-blue-50/30 p-3 rounded-xl border border-sky-100/40 text-xs italic font-sans text-slate-600 leading-relaxed shadow-inner">
                                  "{sub.message}"
                                </div>
                              )}

                              {/* Verification Pipeline states footer */}
                              <div className="mt-3.5 pt-2.5 border-t border-sky-50 flex flex-wrap items-center gap-3 text-[9.5px] font-mono">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${sub.stored_in_supabase ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  <span className="text-slate-400 uppercase">DB STATUS:</span>
                                  <span className={sub.stored_in_supabase ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                                    {sub.stored_in_supabase ? "Persisted Supabase" : "RAM Backup"}
                                  </span>
                                </div>
                                <span className="text-slate-200 select-none">|</span>
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${sub.email_notified ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  <span className="text-slate-400 uppercase">GMAIL LINK:</span>
                                  <span className={sub.email_notified ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"} title={sub.email_status}>
                                    {sub.email_notified ? "Alerted owner" : "Notice Pending"}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Schema integration & instructions */}
                    <div className="lg:col-span-4 flex flex-col gap-4 text-left">
                      <span className="text-xs font-mono text-sky-900 font-bold uppercase tracking-wider block border-b border-sky-100/85 pb-3">
                        Integration Terminal
                      </span>

                      {/* Supabase SQL bootstrap panel */}
                      <motion.div 
                        whileHover={{ y: -1 }}
                        className="bg-white border border-sky-100 p-4 rounded-2xl flex flex-col gap-3 shadow-sm shadow-sky-100/30"
                      >
                        <div>
                          <span className="text-[9px] font-mono font-bold text-sky-600 tracking-wider uppercase bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">Setup Supabase Database</span>
                          <h5 className="text-xs font-bold text-sky-950 mt-2 select-none">Initialize Contacts Table</h5>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans select-none">
                          Execute this simple DDL inside your Supabase SQL Editor to make the persistent connection functional:
                        </p>
                        
                        <div className="relative">
                          <pre className="text-[9px] font-mono bg-sky-950 p-3 rounded-xl text-sky-200 border border-sky-900 select-all overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
{`CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                          </pre>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans italic select-none">
                          Ensure you specify <code className="text-slate-500 font-mono">SUPABASE_URL</code> and <code className="text-slate-500 font-mono">SUPABASE_ANON_KEY</code> env variables inside setup to bind real-time storage.
                        </p>
                      </motion.div>

                      {/* Email Config directions panel */}
                      <motion.div 
                        whileHover={{ y: -1 }}
                        className="bg-white border border-sky-100 p-4 rounded-2xl flex flex-col gap-2 shadow-sm shadow-sky-100/30"
                      >
                        <div>
                          <span className="text-[9px] font-mono font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Gmail SMTP Routing</span>
                          <h5 className="text-xs font-bold text-sky-950 mt-1.5 select-none">Receive Client Emails</h5>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans select-none">
                          Every submission is routed immediately to <span className="text-sky-600 hover:underline font-semibold">viandsilva08@gmail.com</span>. Let’s connect your Gmail dispatches!
                        </p>
                        <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans select-none">
                          Add <code className="text-sky-600 font-mono">GMAIL_USER</code> and a custom <code className="text-sky-600 font-mono">GMAIL_APP_PASSWORD</code> (configured inside Google Account Security App Passwords) inside secrets parameters to enable automatic email dispatch.
                        </p>
                      </motion.div>

                    </div>

                  </div>
                )}

              </div>

              {/* Modal Footer / Logout Bar */}
              {adminAuthenticated && (
                <div className="border-t border-sky-100 px-6 py-4 bg-white/70 backdrop-blur-xs flex items-center justify-between select-none shrink-0">
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider">AUTHORIZED ACCESS SHELL V1</span>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdminLogout}
                    className="text-[9.5px] font-mono text-red-500 bg-red-50 hover:text-red-650 border border-red-100 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-bold uppercase tracking-wider shadow-sm"
                  >
                    Terminate session
                  </motion.button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
