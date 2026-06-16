import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, HelpCircle, ArrowRight, Shield, Zap, Sparkles, AlertCircle, Building, Trophy, Flame } from 'lucide-react';
import { Theme } from '../types';

interface PricingPageProps {
  theme: Theme;
}

const PRICING_PLANS = [
  {
    name: "Standard Launchpad",
    badge: "Startup Ready",
    priceWeekly: "$1,490",
    priceMonthly: "$5,490",
    description: "Highly polished, pixel-perfect single-page applications or static portals designed to capture attention and convert at maximum efficiency.",
    icon: Zap,
    accentColor: "#3bf2df",
    features: [
      "Custom responsive design (Vite + React)",
      "Tailwind CSS precise, high-end layouts",
      "Motion/react high-fidelity animations",
      "Up to 5 custom interactive interface components",
      "Performance score guarantee (95+ Lighthouse)",
      "SEO semantic tag structure optimization",
      "14 days of direct post-launch assistance"
    ],
    isPopular: false
  },
  {
    name: "Enterprise Product Studio",
    badge: "Most Requested",
    priceWeekly: "$2,890",
    priceMonthly: "$9,990",
    description: "Comprehensive multi-page full-stack platforms, custom databases (Supabase/Firebase/Cloud SQL), and interactive simulators.",
    icon: Flame,
    accentColor: "#5ed29c",
    features: [
      "Everything in Standard Launchpad plan",
      "Relational backend or NoSQL serverless schema setup",
      "Real-time data synchronization (Yjs/WebSockets)",
      "Custom administrative dashboards & logging consoles",
      "Third-party secure payment systems (Stripe integration)",
      "Interactive data visualizations (D3.js / Recharts)",
      "Full API proxy layer with secret key safety",
      "30 days of direct post-launch assistance"
    ],
    isPopular: true
  },
  {
    name: "Sustained Retainer",
    badge: "Ultimate Assurance",
    priceWeekly: "$1,200",
    priceMonthly: "$3,990",
    description: "Ongoing on-demand code updates, modern styling rewrites, and dedicated development sprints to continuously scale your company.",
    icon: Trophy,
    accentColor: "#f43f5e",
    features: [
      "Up to 15 hours of engineering work per week",
      "Ongoing speed testing and database scale optimizations",
      "Feature addition/modification requests answered first",
      "Direct communication channel via dedicated Slack team",
      "Security auditing and software package patches",
      "Same-day patch capabilities for critical emergencies"
    ],
    isPopular: false
  }
];

export default function PricingPage({ theme }: PricingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className={`min-h-screen py-24 px-6 relative z-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#070b0a] text-white' : 'bg-[#f5f8f7] text-dark-bg'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Title and Eyebrow */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles size={11} className="text-[#5ed29c]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5ed29c]">
              Premium Web Crafting Pricing Menu
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight uppercase leading-none">
            INVEST IN QUALITY<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 max-w-xl mx-auto">
            Transparent pricing menus for premium frontend design, full-stack systems, and robust interactive web simulators.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <span className={`text-xs font-mono tracking-widest ${!isAnnual ? 'text-primary font-bold' : 'text-neutral-500'}`}>WEEKLY SPRINT</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer bg-white/5 border border-white/10 dark:border-white/10 theme-light:bg-black/5 theme-light:border-black/10 smooth-transition"
            >
              <div 
                className="w-4.5 h-4.5 bg-primary rounded-full shadow-sm smooth-transition transform"
                style={{ transform: `translateX(${isAnnual ? '20' : '0'}px)` }}
              />
            </button>
            <span className={`text-xs font-mono tracking-widest ${isAnnual ? 'text-primary font-bold' : 'text-neutral-500'}`}>MONTHLY BUNDLE</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.priceMonthly : plan.priceWeekly;
            const period = isAnnual ? "/month" : "/week";

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative border rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/40 theme-light:bg-white/45 theme-light:border-black/5 hover:-translate-y-1 smooth-transition backdrop-blur-xl p-8 flex flex-col justify-between ${
                  plan.isPopular 
                    ? 'border-primary/40 shadow-xl shadow-primary/5 ring-1 ring-primary/20' 
                    : 'border-white/10 dark:border-white/10 theme-light:border-black/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary dark:bg-primary theme-light:bg-emerald-500 text-dark-bg font-mono font-bold text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-primary/20">
                    MOST REQUESTED
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-500 theme-light:text-neutral-700 block mb-1">
                        {plan.badge}
                      </span>
                      <h3 className="text-xl font-extrabold font-sans uppercase text-white dark:text-white theme-light:text-dark-bg">
                        {plan.name}
                      </h3>
                    </div>
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${plan.accentColor}12`, borderColor: `${plan.accentColor}30`, borderWidth: 1 }}
                    >
                      <Icon size={18} style={{ color: plan.accentColor }} />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl font-extrabold font-sans tracking-tight" style={{ color: plan.accentColor }}>{price}</span>
                    <span className="text-xs font-mono text-neutral-500">{period}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700 mb-8 pb-6 border-b border-white/5 dark:border-white/5 theme-light:border-black/5">
                    {plan.description}
                  </p>

                  <div className="flex flex-col gap-4">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 dark:text-neutral-500 theme-light:text-neutral-600 uppercase">INCLUDED SPRINT BENEFITS:</span>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex gap-2.5 items-start text-xs text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700">
                          <Check size={14} className="stroke-[3] mt-0.5 shrink-0" style={{ color: plan.accentColor }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const subject = encodeURIComponent(`Inquiry for ${plan.name}`);
                    const body = encodeURIComponent(`Hello,\n\nI am interested in acquiring your ${plan.name} planning services.\n\nCould we jump on a scoping call?\n\nBest Regards,`);
                    window.location.href = `mailto:viandsilva08@gmail.com?subject=${subject}&body=${body}`;
                  }}
                  className="w-full mt-10 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 smooth-transition cursor-pointer"
                  style={{
                    backgroundColor: plan.isPopular ? plan.accentColor : 'transparent',
                    color: plan.isPopular ? '#070b0a' : plan.accentColor,
                    borderColor: plan.accentColor,
                    borderWidth: 1.5
                  }}
                >
                  Acquire This Plan
                  <ArrowRight size={12} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Frequently Asked Questions */}
        <div className="border border-white/5 dark:border-white/5 theme-light:border-black/5 rounded-2xl bg-neutral-900/20 dark:bg-neutral-900/20 theme-light:bg-black/[0.01]/30 backdrop-blur-xl p-8 text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={18} className="text-primary" />
            <h4 className="text-md font-sans font-extrabold uppercase text-white dark:text-white theme-light:text-dark-bg">Frequently Scoped Queries</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Do you offer tailored custom development?",
                a: "Absolutely. If you possess specific telemetry needs or multi-system database designs, we can formulate bespoke sprints fitted perfectly to your corporate roadmap."
              },
              {
                q: "What payment platforms are supported?",
                a: "Sprints can be securely purchased via standard credit/debit card streams (Stripe processing), bank wire routes, or corporate developer contracts."
              },
              {
                q: "How does post-launch scoping work?",
                a: "We guarantee stable releases by offering dedicated post-launch monitoring sprints included directly in our initial contract definitions."
              },
              {
                q: "Can you take over older code structures?",
                a: "Yes. Our team easily integrates with existing repositories to introduce speedups, style updates, or scale transitions."
              }
            ].map((faq, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-xs font-bold text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg">{faq.q}</span>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-500 theme-light:text-neutral-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
