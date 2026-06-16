import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, Shield, Sparkles, Send, MapPin, Award, CheckCircle2, FileText, Globe, Smartphone, Server, Cpu } from 'lucide-react';
import { Theme } from '../types';

interface AboutPageProps {
  theme: Theme;
}

export default function AboutPage({ theme }: AboutPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'education',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields before sending.");
      return;
    }
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', purpose: 'education', message: '' });
    }, 1500);
  };

  const skills = [
    { name: "Rust / Systems Programming", level: 95, color: "#3bf2df" },
    { name: "WebAssembly (WASM)", level: 90, color: "#5ed29c" },
    { name: "React / Architecture", level: 98, color: "#60a5fa" },
    { name: "LLVM Compiler Toolchains", level: 85, color: "#c084fc" },
    { name: "UX Design & Liquid Glass Styling", level: 96, color: "#f43f5e" }
  ];

  const experience = [
    {
      role: "Founder & Lead Developer",
      company: "Vian Studios",
      period: "2023 - Present",
      bullets: [
        "Architecting elite engineering frameworks and educational curricula.",
        "Delivered core transpilation modules deployed inside CodeNest's custom interactive containers.",
        "Directing immersive user experience paths and premium interactive application setups."
      ]
    },
    {
      role: "Senior Systems Engineer",
      company: "Stripe",
      period: "2021 - 2023",
      bullets: [
        "Optimized client-side rendering engines reducing platform lag by 20%.",
        "Configured high-density compiler layers for standard visual layouts.",
        "Guided cross-departmental sprints deploying next-generation terminal interfaces."
      ]
    },
    {
      role: "Dev Educator & Technical Advisor",
      company: "Google Workspace / Chrome Dev",
      period: "2018 - 2021",
      bullets: [
        "Educated thousands of engineers globally on modern V8 performance standards.",
        "Authored educational tutorials focusing on WASM benchmarks and safe sandboxes."
      ]
    }
  ];

  return (
    <div className={`min-h-screen py-24 px-6 relative z-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#070b0a] text-white' : 'bg-[#f5f8f7] text-dark-bg'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Banner header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Award size={11} className="text-[#5ed29c]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5ed29c]">
              FOUNDER & BIO-LOG
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight uppercase leading-none">
            ABOUT & RESUME<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 max-w-xl mx-auto">
            Discover the legacy code foundations of Vian Studios and get in touch directly to discuss specialized corporate workshops or consultancies.
          </p>
        </div>

        {/* Double Column profile breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Biography narrative & Experience Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-left">
              <h3 className="text-xl font-bold font-sans uppercase text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg flex items-center gap-2">
                <Shield size={18} className="text-primary" />
                Vian Studios Vision
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700">
                Hi, I'm the lead engineer at Vian Studios. I believe that engineering education shouldn't just rest on boring documentation slides or theoretical math. Rather, true competence emerges when students can play with live fullstack systems, execute passes inside compiled playgrounds, and examine actual diagnostic telemetry parameters in real time.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700">
                CodeNest represents my ultimate workspace concept—uniting ultra-high-end responsive typography, HLS video streams, and collaborative visual runtimes into a single educational catalog.
              </p>
            </div>

            {/* Experience timeline list */}
            <div className="flex flex-col gap-6 text-left">
              <h3 className="text-xl font-bold font-sans uppercase text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Professional Timeline
              </h3>

              <div className="border-l border-white/10 dark:border-white/10 theme-light:border-black/5 pl-5 flex flex-col gap-8 ml-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative">
                    {/* Ring dot indicator */}
                    <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-dark-bg dark:border-dark-bg theme-light:border-[#f5f8f7]" />
                    
                    <div className="flex justify-between items-baseline gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-neutral-200 dark:text-neutral-200 theme-light:text-dark-bg font-sans uppercase">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono text-neutral-500">{exp.period}</span>
                    </div>
                    <p className="text-sm font-bold text-primary font-mono lowercase">{exp.company}</p>
                    
                    <ul className="mt-3 flex flex-col gap-2">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 flex gap-2">
                          <span className="text-primary select-none">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive technical skills & Contact Form */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Skills Graph Panel */}
            <div className="p-6 border border-white/5 dark:border-white/5 theme-light:border-black/10 rounded-2xl bg-white/[0.01] backdrop-blur-xl">
              <h3 className="text-sm font-bold font-sans uppercase tracking-widest text-[#5ed29c] mb-5">
                Technical Mastery Matrix
              </h3>
              <div className="flex flex-col gap-4">
                {skills.map((s, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-300 dark:text-neutral-300 theme-light:text-dark-bg">{s.name}</span>
                      <span className="text-neutral-500">{s.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-white/5 dark:bg-white/5 theme-light:bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Contact / inquiry form */}
            <div className="p-6 border border-white/5 dark:border-white/5 theme-light:border-black/10 rounded-2xl bg-white/[0.01] backdrop-blur-sm shadow-xl text-left">
              <h3 className="text-base font-bold font-sans uppercase tracking-wider text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg mb-1.5">
                INQUIRE & CONNECT
              </h3>
              <p className="text-xs text-neutral-500 mb-6 font-sans">
                Awaiting connection. Vian Studios will respond within 12 standard business hours.
              </p>

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                    id="contact-form-success"
                  >
                    <CheckCircle2 size={44} className="text-[#5ed29c] mb-3 animate-bounce" />
                    <h4 className="text-sm font-mono font-bold text-white uppercase">CONNECTION REQUEST TRANSMITTED</h4>
                    <p className="text-xs text-neutral-500 max-w-[280px] mt-2">
                      Your form payloads have been processed and prioritized within Vian Studios message stack successfully!
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="mt-5 px-5 py-2 border border-primary/20 hover:border-primary/50 text-[#5ed29c] font-mono text-[11px] rounded-lg tracking-wider hover:bg-primary/5 smooth-transition"
                    >
                      SEND ANOTHER REQUEST
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4 text-xs font-sans"
                    id="about-contact-form"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Alexander Carter"
                        className="p-3 bg-white/5 dark:bg-white/5 dark:text-white theme-light:bg-black/5 theme-light:text-dark-bg border border-white/5 dark:border-white/5 theme-light:border-black/5 focus:border-primary/50 rounded-lg outline-none smooth-transition text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Your Business Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., alex@company.com"
                        className="p-3 bg-white/5 dark:bg-white/5 dark:text-white theme-light:bg-black/5 theme-light:text-dark-bg border border-white/5 dark:border-white/5 theme-light:border-black/5 focus:border-primary/50 rounded-lg outline-none smooth-transition text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Inquiry Focus</label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        className="p-3 bg-neutral-900 dark:bg-neutral-900 border border-white/5 focus:border-primary/50 rounded-lg outline-none smooth-transition text-xs text-neutral-300"
                      >
                        <option value="education">CodeNest Core Curriculum</option>
                        <option value="workshop">Corporate Technical Training</option>
                        <option value="advisory">Vian Studios Systems Consultancy</option>
                        <option value="other">General Partnership</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Your Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your training or compiler setup constraints..."
                        className="p-3 bg-white/5 dark:bg-white/5 dark:text-white theme-light:bg-black/5 theme-light:text-dark-bg border border-white/5 dark:border-white/5 theme-light:border-black/5 focus:border-primary/50 rounded-lg outline-none smooth-transition text-xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full mt-2 py-3 bg-[#5ed29c] text-[#070b0a] uppercase font-mono text-[11px] tracking-wider font-bold rounded-lg hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 flex items-center justify-center gap-2 smooth-transition cursor-pointer"
                    >
                      {formStatus === 'submitting' ? 'TRANSMITTING INBOX...' : 'TRANSMIT CONNECTION QUERY'}
                      <Send size={12} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
