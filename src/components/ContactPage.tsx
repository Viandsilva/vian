import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, AlertCircle, CheckCircle2, RefreshCw, Github, Twitter, Layers } from 'lucide-react';
import { Theme } from '../types';

interface ContactPageProps {
  theme: Theme;
}

export default function ContactPage({ theme }: ContactPageProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formType, setFormType] = useState('Product Design & MVP');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) {
      setErrMessage("Please satisfy all mandatory input fields (*).");
      return;
    }

    setIsSubmitting(true);
    setErrMessage('');

    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormName('');
    setFormEmail('');
    setFormMsg('');
    setFormType('Product Design & MVP');
    setSubmitSuccess(false);
  };

  return (
    <div className={`min-h-screen py-24 px-6 relative z-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#070b0a] text-white' : 'bg-[#f5f8f7] text-dark-bg'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header / Eyebrow */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles size={11} className="text-[#5ed29c]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5ed29c]">
              Initiate Scoping Sprint
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight uppercase leading-none">
            CONTACT ME<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 max-w-xl mx-auto">
            Ready to scale your next product idea? Fill in the parameters below and our architectural leads will reach out within 1 business day.
          </p>
        </div>

        {/* Action Grid Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct contact paths */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-2xl font-extrabold font-sans uppercase text-white dark:text-white theme-light:text-dark-bg">
                  Our Headquarters
                </h3>
                <p className="text-xs text-neutral-500 font-mono mt-1 uppercase">
                  ESTABLISHED COOPERATIVE CHANNELS
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">DIRECT EMAIL ROUTE</span>
                    <a href="mailto:viandsilva08@gmail.com" className="text-sm font-sans font-extrabold text-neutral-100 dark:text-neutral-100 theme-light:text-neutral-900 border-b border-dashed border-neutral-700 hover:border-primary hover:text-primary transition-colors mt-0.5 inline-block">
                      viandsilva08@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5ed29c]/10 border border-[#5ed29c]/20 flex items-center justify-center shrink-0 text-[#5ed29c]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">HOTLINE VERIFICATION</span>
                    <a href="tel:+918010424710" className="text-sm font-sans font-extrabold text-neutral-100 dark:text-neutral-100 theme-light:text-neutral-900 border-b border-dashed border-neutral-700 hover:border-primary hover:text-[#5ed29c] transition-colors mt-0.5 inline-block">
                      +91 8010424710
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 text-rose-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">COORDINATE OFFICE LOCATION</span>
                    <p className="text-xs text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700 leading-relaxed mt-0.5">
                      Vasai West, Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels card */}
            <div className="mt-10 border-t border-white/5 dark:border-white/5 theme-light:border-black/5 pt-8 text-left">
              <span className="text-[10px] font-mono text-neutral-500 block mb-3.5 uppercase">COMMUNITY HUB LOGS:</span>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 border rounded-xl border-white/10 hover:border-primary/40 text-neutral-400 hover:text-white transition-all text-xs font-mono bg-white/[0.01]"
                >
                  <Github size={13} />
                  GITHUB
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 border rounded-xl border-white/10 hover:border-primary/40 text-neutral-400 hover:text-white transition-all text-xs font-mono bg-white/[0.01]"
                >
                  <Twitter size={13} />
                  TWITTER
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 dark:border-white/10 theme-light:border-black/10 bg-neutral-900/40 dark:bg-neutral-900/40 theme-light:bg-white/45 backdrop-blur-xl p-8 relative flex flex-col justify-between text-left h-full shadow-2xl">
              
              <div className="absolute right-4 top-4 pointer-events-none opacity-5">
                <MessageSquare size={160} />
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-white/5 dark:border-white/5 pb-4 mb-6">
                  <h4 className="text-xs font-mono font-bold text-white dark:text-white theme-light:text-dark-bg uppercase flex items-center gap-1.5 leading-none">
                    <Layers size={13} className="text-[#3bf2df]" />
                    Internal Scoping Matrix Form
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">DATABASE VERIFIED</span>
                </div>

                {errMessage && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs font-mono flex items-center gap-2 leading-none">
                    <AlertCircle size={14} />
                    <span>{errMessage}</span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.form
                      key="contact-active-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 relative z-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-500 font-bold">Client Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ananya Verma"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="bg-black/60 dark:bg-black/60 theme-light:bg-black/5 border border-white/5 theme-light:border-black/10 focus:border-primary rounded-lg py-2.5 px-3.5 text-xs text-white dark:text-white theme-light:text-dark-bg focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-500 font-bold">Email Communication *</label>
                          <input
                            type="email"
                            required
                            placeholder="ananya@company.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="bg-black/60 dark:bg-black/60 theme-light:bg-black/5 border border-white/5 theme-light:border-black/10 focus:border-primary rounded-lg py-2.5 px-3.5 text-xs text-white dark:text-white theme-light:text-dark-bg focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono uppercase text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-500 font-bold">Sought After Program</label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value)}
                          className="bg-black border border-white/5 theme-light:bg-white theme-light:border-black/10 focus:border-primary rounded-lg py-2.5 px-3 text-xs text-white dark:text-white theme-light:text-dark-bg focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option>Product Design & MVP (SaaS Launchpad)</option>
                          <option>Full-Stack Application (Product Studio)</option>
                          <option>Consulting retainer/Audits</option>
                          <option>Other complex configurations</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono uppercase text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-500 font-bold">Project description & guidelines *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please provide initial timeline details and system goals..."
                          value={formMsg}
                          onChange={(e) => setFormMsg(e.target.value)}
                          className="bg-black/60 dark:bg-black/60 theme-light:bg-black/5 border border-white/5 theme-light:border-black/10 focus:border-primary rounded-lg p-3 text-xs text-white dark:text-white theme-light:text-dark-bg focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/80 text-dark-bg py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 smooth-transition cursor-pointer mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            Transmitting packet data...
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            Transmit Parameters
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success-state"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="p-8 bg-black/30 rounded-xl border border-primary/20 text-center flex flex-col items-center gap-3 relative z-10"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-extrabold text-white dark:text-white theme-light:text-dark-bg uppercase">Parameters Received</h4>
                        <p className="text-xs text-neutral-500 font-mono mt-1">TRANSMISSION OK // 200 SUCCESS RESPONSE STATUS</p>
                      </div>
                      <div className="bg-white/[0.01] border border-white/5 rounded-lg p-3 text-left w-full text-xs font-mono text-neutral-300 flex flex-col gap-1">
                        <div><span className="text-neutral-500">CLIENT:</span> {formName}</div>
                        <div><span className="text-neutral-500">DIRECT ROUTE:</span> {formEmail}</div>
                        <div><span className="text-neutral-500">CATEGORY:</span> {formType}</div>
                      </div>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-mono uppercase tracking-wider rounded-lg smooth-transition border border-neutral-700 cursor-pointer"
                      >
                        Send another transmission
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
