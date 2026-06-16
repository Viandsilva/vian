import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ShieldCheck, TrendingUp, ShoppingBag, Laptop, Tablet, 
  Smartphone, ExternalLink, Globe, Lock, ArrowUpRight, Check, ChevronRight,
  MousePointerClick, CheckSquare, Square, Info, ShieldAlert, Award, FileSpreadsheet,
  LayoutGrid, Plus, X, Folder, Calendar
} from 'lucide-react';
import { Project, Theme } from '../types';
import SecurePestPreview from './SecurePestPreview';
import HorizonWealthPreview from './HorizonWealthPreview';
import ApexShopPreview from './ApexShopPreview';
import OctaneTaskPreview from './OctaneTaskPreview';

interface ProjectsPageProps {
  theme: Theme;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "secure-pest",
    title: "Pest Control Protective Services",
    subtitle: "Lead Generation & Booking Gateway",
    description: "An incredibly fast, highly optimized residential and commercial advertisement, pest profile index, and appointment scheduler. Designed to convert search engine traffic into validated appointments with immediate local dispatch schedules.",
    role: "Full-Stack Web Architect",
    timeline: "Launch 2026",
    accentColor: "#3CB944", // Pest Control green
    techStack: ["React", "TypeScript", "Tailwind CSS", "Animate-Presence", "Supabase CRM"],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Simulated Retention", value: "98.4%" },
      { label: "Local Validation Rate", value: "Instant" }
    ],
    details: [
      "Crafted an interactive pest tab list switching between multiple biological profile panels dynamically.",
      "Embedded a fully operational scheduling engine monitoring submitted appointments.",
      "Engineered clean CSS transitions, glassmorphic container bounds, and high-contrast badges."
    ],
    mockupType: 'editor',
  },
  {
    id: "horizon-wealth",
    title: "Horizon Wealth Ledger",
    subtitle: "Fintech SaaS Asset Visualizer",
    description: "A gorgeous, high-fidelity portfolio tracking application. Engineered with responsive SVG line graphs, filterable transactional ledgers, and an interactive index rebalancer allowing visitors to simulate instant asset restructuring.",
    role: "Senior Systems Engineer",
    timeline: "Launch 2026",
    accentColor: "#22d3ee", // Cyan
    techStack: ["React", "TypeScript", "Tailwind CSS", "Inline SVGs", "Local IndexedDB"],
    metrics: [
      { label: "Chart Render Delay", value: "< 4.5ms" },
      { label: "Client-Side Size", value: "32KB gzip" },
      { label: "Data Parity check", value: "SHA-256" }
    ],
    details: [
      "Optimized inline vector drawing routines rendering yearlong net curves instantly without lag.",
      "Designed a real-time ledger component with search and dual transactional type selectors.",
      "Built an auto-normalizing rebalancer where sliders dynamically balance index allotments."
    ],
    mockupType: 'compiler',
  },
  {
    id: "apex-shop",
    title: "Apex Streetwear Studio",
    subtitle: "Minimalist High-Fashion Storefront",
    description: "A premium boutique shopping cart catalog built for designer garments and footwear. Features grid-to-list visual layouts, interactive bag count badges, slide-out drawer components, and a Stripe payment simulator.",
    role: "UX Interaction Developer",
    timeline: "Launch 2026",
    accentColor: "#f59e0b", // Amber
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe API Mock"],
    metrics: [
      { label: "Average Checkout Rate", value: "97.2%" },
      { label: "Layout Fluidity", value: "60 FPS" },
      { label: "Package Load Weight", value: "18KB" }
    ],
    details: [
      "Engineered responsive catalog layouts switching between custom dual-column grid and spacious detail rows.",
      "Built a fully functioning shopping cart state managing quantitative changes and real-time subtotal. ",
      "Embedded a gorgeous, step-by-step Stripe verification panel with complete validation rules."
    ],
    mockupType: 'editor',
  },
  {
    id: "octane-task",
    title: "Octane Task Hub",
    subtitle: "High-Performance Kanban Planner",
    description: "A fast, beautifully animated sprint workspace with high-contrast priority tags. Supports dynamic prioritization pipelines, multi-status transition cycles, real-time progression ratios, and active form injection blocks.",
    role: "Lead Systems Engineer",
    timeline: "Launch 2025",
    accentColor: "#f97316", // Orange
    techStack: ["React", "TypeScript", "Tailwind Utilities", "Dynamic Ratios", "Animate-Presence"],
    metrics: [
      { label: "State Sync Interval", value: "< 2ms" },
      { label: "UI Layout Frame", value: "62 FPS" },
      { label: "Diagnostic Check", value: "Parity" }
    ],
    details: [
      "Engineered interactive step-by-step status cycle triggers mapping task entries through sprint stages.",
      "Embedded an active calculation model tracking sprint completion ratios in real time.",
      "Designed a clean priority filtering navigation block returning segmented backlogs instantly."
    ],
    mockupType: 'compiler',
  }
];

// Interactive walkthrough guides for each project inside our Sandbox Modal Simulator
const WALKTHROUGH_GUIDES: Record<string, { task: string; done: boolean }[]> = {
  "secure-pest": [
    { task: "Explore other insect profiles by choosing Cockroaches, Mosquitoes, or Bed Bugs tabs", done: false },
    { task: "Simulate booking a new local dispatch session using the schedule reservation card", done: false },
    { task: "Observe your live dispatch entries being synchronized into the dynamic database rows", done: false }
  ],
  "horizon-wealth": [
    { task: "Drag the Crypto or Equities sliders to trigger live multi-asset mutual fund rebalancing", done: false },
    { task: "Open the Ledger panel and query records using the custom index parameters", done: false },
    { task: "Filter transaction histories by choosing the Expense pattern or Income categories", done: false }
  ],
  "apex-shop": [
    { task: "Switch layout catalogs between modern Dual-Column Grid and spacious Line Rows", done: false },
    { task: "Add custom heavyweight designer garments or footwear accessories into your shopping bag", done: false },
    { task: "Launch the secure payment mock and complete the step-by-step Stripe sandbox flow", done: false }
  ],
  "octane-task": [
    { task: "Create your own customized task entry using the dynamic form block", done: false },
    { task: "Cycle any task row across backlog, progress, and completed stages", done: false },
    { task: "Leverage priority layout switches to refine the visible task pool instantly", done: false }
  ]
};

// High-fidelity curated visuals for cover cards mapping exactly to design aesthetic in the image
const PROJECT_COVER_IMAGES: Record<string, string> = {
  "secure-pest": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", // Environmental clean green cosmetic botanical look
  "horizon-wealth": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Clean white bars structure, luxurious marble layout
  "apex-shop": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80", // Designer high fashion cream minimalist apparel
  "octane-task": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80" // Warm aesthetic calendar pins and lists
};

// Precise color badge pills exactly reflecting the custom color tags shown in the reference image
const PROJECT_BADGES: Record<string, { label: string; type: 'red' | 'green' | 'cyan' | 'amber' }[]> = {
  "secure-pest": [
    { label: "Product Design", type: "red" },
    { label: "Branding", type: "green" }
  ],
  "horizon-wealth": [
    { label: "Fintech SaaS", type: "cyan" },
    { label: "Web Dev", type: "amber" }
  ],
  "apex-shop": [
    { label: "Product Design", type: "red" },
    { label: "Branding", type: "green" }
  ],
  "octane-task": [
    { label: "Sprint Planner", type: "cyan" },
    { label: "Web Dev", type: "amber" }
  ]
};

export default function ProjectsPage({ theme }: ProjectsPageProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  // Immersive Modal Live Preview Screen Controls
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  
  // Custom sandbox request form for "+ New" card
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [newRequestInput, setNewRequestInput] = useState("");
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const currentProject = PROJECTS_DATA.find(p => p.id === activeProjectId) || PROJECTS_DATA[0];

  const handleOpenProjectSimulator = (id: string) => {
    setActiveProjectId(id);
    setDeviceMode('desktop');
    setIsSimulatorOpen(true);
  };

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Helper mock URL mapping for real browser aesthetics
  const getMockUrl = (id: string) => {
    switch (id) {
      case 'secure-pest': return 'https://securepest.co';
      case 'horizon-wealth': return 'https://horizonledger.io';
      case 'apex-shop': return 'https://apexapparel.shop';
      case 'octane-task': return 'https://octanesprints.dev';
      default: return 'https://codenest.dev';
    }
  };

  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestInput.trim()) return;
    setIsRequestSubmitted(true);
    setTimeout(() => {
      setIsNewRequestModalOpen(false);
      setIsRequestSubmitted(false);
      setNewRequestInput("");
    }, 2500);
  };

  const tasksList = WALKTHROUGH_GUIDES[currentProject.id] || [];

  return (
    <div className={`min-h-screen py-24 px-4 sm:px-6 relative transition-colors duration-500 overflow-hidden ${
      theme === 'dark' 
        ? 'bg-[#060a09] text-white selection:bg-[#5ed29c]/30 selection:text-[#5ed29c]' 
        : 'bg-[#f4f7f6] text-neutral-900 selection:bg-primary/20 selection:text-primary'
    }`}>
      
      {/* Absolute background grid graphics for modern design aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Gallery Title Header exactly matching pristine Swiss layout style */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight font-sans text-neutral-100 dark:text-neutral-100 theme-light:text-neutral-900 uppercase">
            Projects
          </h2>
          
          {/* Active Navigation line: "Gallery view" identical to user reference image */}
          <div className="flex border-b border-white/10 dark:border-white/10 theme-light:border-neutral-200 mt-5">
            <button className="relative px-4 py-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5ed29c] font-bold border-b-2 border-[#5ed29c]">
              <LayoutGrid size={13} />
              Gallery view
            </button>
          </div>
        </div>

        {/* 3-Column Responsive Interactive Grid exactly matching layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {PROJECTS_DATA.map((proj) => {
            const coverImage = PROJECT_COVER_IMAGES[proj.id] || PROJECT_COVER_IMAGES["secure-pest"];
            const badges = PROJECT_BADGES[proj.id] || [];
            
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleOpenProjectSimulator(proj.id)}
                className={`group flex flex-col justify-between border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700/90 shadow-lg hover:shadow-black/40' 
                    : 'bg-white border-neutral-200/90 hover:border-neutral-300 shadow-sm hover:shadow-neutral-200'
                }`}
              >
                {/* Visual Top Thumbnail Cover with neat fixed aspect ratio */}
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-neutral-950 border-b border-neutral-800/20">
                  <img 
                    src={coverImage} 
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  
                  {/* Subtle hover play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-350">
                    <div className="px-4 py-2 rounded-lg bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
                      <MousePointerClick size={12} className="animate-bounce" />
                      Browse Live Website
                    </div>
                  </div>
                </div>

                {/* Card copy block conforming directly page styles */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Icon + Title block */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Folder size={13} className="text-neutral-400 group-hover:text-[#5ed29c] transition-colors" />
                      <h3 className="text-sm font-bold text-neutral-100 dark:text-neutral-100 theme-light:text-neutral-900 uppercase group-hover:text-primary transition-colors tracking-tight">
                        {proj.title === "Pest Control Protective Services" ? "Pest Control" : proj.title === "Horizon Wealth Ledger" ? "Horizon Wealth" : proj.title === "Apex Streetwear Studio" ? "Minimalist Shop" : proj.title}
                      </h3>
                    </div>

                    <p className="text-[11px] leading-relaxed text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 line-clamp-2 mb-4">
                      {proj.description}
                    </p>
                  </div>

                  {/* Metadata and Badge Pills aligned exactly with reference image */}
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 mb-3 uppercase font-medium flex items-center gap-1">
                      <Calendar size={10} />
                      {proj.timeline}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {badges.map((badge, bIdx) => {
                        let colorClass = "bg-neutral-800 text-neutral-400";
                        if (badge.type === 'red') {
                          colorClass = theme === 'dark' 
                            ? 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/20' 
                            : 'bg-red-50 text-red-700 border border-red-200';
                        } else if (badge.type === 'green') {
                          colorClass = theme === 'dark'
                            ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/20'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                        } else if (badge.type === 'cyan') {
                          colorClass = theme === 'dark'
                            ? 'bg-[#06b6d4]/15 text-[#06b6d4] border border-[#06b6d4]/20'
                            : 'bg-cyan-50 text-cyan-700 border border-cyan-200';
                        } else if (badge.type === 'amber') {
                          colorClass = theme === 'dark'
                            ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20'
                            : 'bg-amber-50 text-amber-700 border border-amber-200';
                        }
                        return (
                          <span 
                            key={bIdx}
                            className={`px-2.5 py-0.5 rounded text-[9px] font-semibold tracking-wide uppercase ${colorClass}`}
                          >
                            {badge.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}

          {/* 5th Card: "+ New" minimalist dashed card exactly matching user's image */}
          <motion.div 
            onClick={() => setIsNewRequestModalOpen(true)}
            whileHover={{ scale: 0.99 }}
            className={`border border-dashed border-neutral-700/60 dark:border-neutral-800 theme-light:border-neutral-300 rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[340px] hover:border-[#5ed29c] transition-colors group relative ${
              theme === 'dark' ? 'bg-neutral-900/10' : 'bg-neutral-100/30'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full border border-dashed border-neutral-600 dark:border-neutral-700 flex items-center justify-center text-neutral-500 group-hover:text-[#5ed29c] group-hover:border-[#5ed29c] transition-colors">
                <Plus size={18} />
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-500 group-hover:text-neutral-300 uppercase font-bold transition-colors">
                + New Project
              </span>
              <p className="text-[10px] text-neutral-500 font-mono tracking-wider max-w-[160px] leading-relaxed mt-1">
                Inject a personalized prompt to draft custom client requirements.
              </p>
            </div>
          </motion.div>

        </div>

      </div>

      {/* FULL-SCREEN LIVE WEBSITE SIMULATOR WORKSPACE (Modal dialog window) */}
      <AnimatePresence>
        {isSimulatorOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 text-left"
          >
            
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.97, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-full max-w-7xl rounded-2xl border overflow-hidden shadow-2xl flex flex-col bg-[#080d0b] text-neutral-200 border-neutral-800 max-h-[92vh]`}
            >
              
              {/* Header control strip with title and Close button */}
              <div className="px-5 py-4 bg-[#0c100e] border-b border-neutral-900 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentProject.accentColor }} />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight leading-none">
                      {currentProject.title}
                    </h3>
                    <p className="text-[9px] font-mono text-neutral-505 dark:text-neutral-550 uppercase tracking-widest mt-1">
                      {currentProject.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#5ed29c]/10 text-[#5ed29c] font-mono text-[9px] uppercase tracking-wider font-extrabold">
                    <Sparkles size={9} />
                    Prototype Live Mode
                  </div>
                  
                  <button 
                    onClick={() => setIsSimulatorOpen(false)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Grid content inside modal */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[80vh]">
                
                {/* COLUMN 1: Specs and Checklists (col-span-4) */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-5 border-r border-neutral-900/60 pr-0 lg:pr-5">
                  <div className="flex flex-col gap-4">
                    
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-[#5ed29c] px-1.5 py-0.5 bg-[#5ed29c]/10 rounded uppercase font-bold">
                        {currentProject.timeline}
                      </span>
                      <p className="text-xs text-neutral-400 leading-relaxed mt-2.5">
                        {currentProject.description}
                      </p>
                    </div>

                    {/* High Precision Metrics counters */}
                    <div className="grid grid-cols-3 gap-2 py-0.5">
                      {currentProject.metrics.map((m, idx) => (
                        <div 
                          key={idx} 
                          className="p-3 border rounded-xl flex flex-col gap-1 bg-neutral-950 border-neutral-900"
                        >
                          <span className="text-[8px] font-mono text-neutral-500 uppercase leading-none font-semibold">{m.label}</span>
                          <span className="text-xs font-sans font-bold mt-1 text-white" style={{ color: currentProject.accentColor }}>{m.value}</span>
                          <div className="h-0.5 w-full bg-neutral-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-current" style={{ width: '80%', color: currentProject.accentColor }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SUTTLE USER WALKTHROUGH IN PANEL */}
                    <div className="p-4 border rounded-xl flex flex-col gap-3 bg-neutral-950/80 border-neutral-900">
                      <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                        <MousePointerClick size={12} className="text-[#5ed29c]" />
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#5ed29c] font-black uppercase">
                            USER EMBED CHECKLIST
                          </span>
                          <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-wider">Interact & tick off steps directly</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {tasksList.map((item, idx) => {
                          const taskKey = `${currentProject.id}-task-${idx}`;
                          const isDone = completedTasks[taskKey] || false;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleToggleTask(taskKey)}
                              className="flex gap-2.5 items-start text-left text-[11px] group focus:outline-none cursor-pointer"
                            >
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckSquare size={13} className="text-[#5ed29c]" />
                                ) : (
                                  <Square size={13} className="text-zinc-650 group-hover:text-zinc-300" />
                                )}
                              </div>
                              <span className={`leading-tight transition-all duration-200 ${
                                isDone 
                                  ? 'line-through text-neutral-500' 
                                  : 'text-neutral-300 font-medium'
                              }`}>
                                {item.task}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  <div>
                    {/* Technologies indicators */}
                    <span className="text-[9px] font-mono text-zinc-500 block mb-2 font-bold uppercase tracking-widest">Built with technology:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[9px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* COLUMN 2: Actual high-fidelity device browser preview (col-span-8) */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  
                  {/* Viewport simulation tabs */}
                  <div className="flex justify-between items-center px-3.5 py-2 rounded-xl border border-neutral-900 bg-[#090e0c]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
                      <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-widest">
                        Live Web Simulation Console
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {[
                        { mode: 'desktop', icon: Laptop, text: 'DESKTOP' },
                        { mode: 'tablet', icon: Tablet, text: 'TABLET' },
                        { mode: 'mobile', icon: Smartphone, text: 'MOBILE' }
                      ].map(item => {
                        const isActive = deviceMode === item.mode;
                        return (
                          <button
                            key={item.mode}
                            onClick={() => setDeviceMode(item.mode as any)}
                            className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[9px] font-bold tracking-wider transition-all cursor-pointer ${
                              isActive 
                                ? 'bg-[#5ed29c] text-black' 
                                : 'text-neutral-400 hover:text-white bg-neutral-900/50 hover:bg-neutral-900'
                            }`}
                          >
                            <item.icon size={11} />
                            {item.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Browser Frame */}
                  <div className="flex-1 w-full flex items-center justify-center relative">
                    <motion.div
                      animate={{
                        width: deviceMode === 'desktop' ? '100%' : deviceMode === 'tablet' ? '640px' : '365px',
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className={`w-full relative shadow-2xl rounded-xl border bg-black overflow-hidden flex flex-col min-h-[500px] border-neutral-800`}
                    >
                      {/* Top Chrome */}
                      <div className="w-full flex items-center justify-between bg-[#0b0f0d] border-b border-neutral-900 p-3 select-none">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                          <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                          <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                        </div>

                        <div className="flex-grow max-w-sm mx-3 relative">
                          <div className="w-full bg-neutral-950 border border-neutral-900 rounded-lg py-1 px-3 pl-8 text-[9px] text-[#5ed29c] font-mono flex items-center gap-1 select-all truncate">
                            <Lock size={9} className="text-[#10b981] absolute left-2.5 top-1.5" />
                            <span className="text-neutral-500 shrink-0">https://</span>
                            <span className="truncate text-[#5ed29c]">{getMockUrl(currentProject.id).replace('https://', '')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[8px] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="hidden sm:inline text-neutral-400 font-bold uppercase">BROWSER PREVIEW</span>
                        </div>
                      </div>

                      {/* Embed active component */}
                      <div className="flex-1 p-4 overflow-y-auto max-h-[520px] bg-[#090d0b] text-neutral-200">
                        <AnimatePresence mode="wait">
                          {currentProject.id === 'secure-pest' && (
                            <motion.div
                              key="pest-site-browser"
                              initial={{ opacity: 0, scale: 0.99 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.99 }}
                              transition={{ duration: 0.2 }}
                            >
                              <SecurePestPreview theme="dark" />
                            </motion.div>
                          )}

                          {currentProject.id === 'horizon-wealth' && (
                            <motion.div
                              key="wealth-site-browser"
                              initial={{ opacity: 0, scale: 0.99 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.99 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HorizonWealthPreview theme="dark" />
                            </motion.div>
                          )}

                          {currentProject.id === 'apex-shop' && (
                            <motion.div
                              key="apex-site-browser"
                              initial={{ opacity: 0, scale: 0.99 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.99 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ApexShopPreview theme="dark" />
                            </motion.div>
                          )}

                          {currentProject.id === 'octane-task' && (
                            <motion.div
                              key="octane-site-browser"
                              initial={{ opacity: 0, scale: 0.99 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.99 }}
                              transition={{ duration: 0.2 }}
                            >
                              <OctaneTaskPreview theme="dark" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer */}
                      <div className="bg-[#0b0e0d] border-t border-neutral-900 p-2.5 px-4 text-[8px] font-mono text-neutral-500 flex justify-between uppercase">
                        <span>Interactive Sandbox Environment</span>
                        <span>CODENEST PARITY SECURE</span>
                      </div>
                    </motion.div>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "+ NEW PROJECT" CREATOR FORM MODAL (Easter egg dynamic workflow matching image placeholders) */}
      <AnimatePresence>
        {isNewRequestModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 text-left"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-[#080d0b] border border-neutral-800 p-6 rounded-2xl max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsNewRequestModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-[#5ed29c]">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-tight">Synthesize New Prototype</h3>
                  <p className="text-[9px] font-mono text-neutral-500 uppercase">Interactive AI requirement integration</p>
                </div>
              </div>

              {!isRequestSubmitted ? (
                <form onSubmit={handleCustomRequestSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase font-black">Requirements description</label>
                    <textarea
                      required
                      value={newRequestInput}
                      onChange={(e) => setNewRequestInput(e.target.value)}
                      placeholder="e.g. A dark cosmic sound synthesizer with interactive audio loop nodes..."
                      rows={4}
                      className="bg-black/60 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#5ed29c] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary hover:bg-[#5ed29c]/85 text-black font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-xl transition-all"
                  >
                    Transmit Requirements
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center flex flex-col items-center justify-center gap-3 animate-pulse"
                >
                  <div className="w-12 h-12 rounded-full bg-[#5ed29c]/10 text-[#5ed29c] flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <span className="text-xs font-mono font-black text-[#5ed29c] uppercase tracking-widest leading-none">Transmission success</span>
                  <p className="text-[10px] text-neutral-400 font-mono max-w-xs uppercase leading-relaxed">
                    AI Studio compiler has validated your prompts. Custom node successfully injected into Sandbox index.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
