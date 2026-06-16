import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, Share2, Sparkles, SlidersHorizontal, ChevronLeft, Bookmark } from 'lucide-react';
import { BlogPost, Theme } from '../types';

interface BlogPageProps {
  theme: Theme;
}

const BLOGS_DATA: BlogPost[] = [
  {
    title: "Compiling WebAssembly (WASM) directly in the client containers for 2025",
    category: "COMPILERS",
    publishDate: "May 12, 2025",
    readTime: "6 min read",
    summary: "How Vian Studios engineered stateful browser execution layers that boot LLVM compilations in milliseconds without standard server roundtrips.",
    content: "When building educational software, the most noticeable friction point is compilation delay. In past architectures, compiling custom code meant bundling it, sending complex payloads over a telemetry network, awaiting a Docker container boot, compiling, and piping stderr/stdout signals back via WebSocket. By leveraging modern client-side WebAssembly wrappers, CodeNest fully transpile and optimizes TypeScript and Rust nodes directly locally. In this technical layout study, we break down our WebWorker pipeline setup including memory buffers...",
    slug: "compiling-wasm-2025",
    featured: true
  },
  {
    title: "Why we abandoned Tailwind CSS standard presets for custom Liquid Glass",
    category: "DESIGN",
    publishDate: "March 24, 2025",
    readTime: "4 min read",
    summary: "Rethinking web interface rhythms, subverting typical gradients, and building micro mask-composites for high-end digital cards.",
    content: "Many modern web interfaces suffer from template exhaustion. Standard UI cards, identical padding borders, and purple-blue linear gradients create digital noise that tires users. To build a highly memorable digital signature, we shifted our focus towards architectural honesty: high-contrast offwhite styling, vertical layouts, and crisp high-end 'Liquid Glass' cards. In this article, we demonstrate how we use custom inset shadows, ::before pseudo gradient lines, and WebGL backdrops to generate deep depth structures.",
    slug: "designing-liquid-glass",
    featured: false
  },
  {
    title: "Rust Systems: Designing safe and robust sandboxes for education",
    category: "SYSTEMS",
    publishDate: "Jan 18, 2025",
    readTime: "8 min read",
    summary: "How memory safety parameters in Systems Programming prevent classroom script overruns, buffer attacks and optimize container density.",
    content: "Giving students access to standard execution structures comes with high security implications. A simple forgotten recursive loop or memory overflow can crash virtual instances instantly. By building safe sandboxes in Rust with dedicated loop bounds and strict thread allocations, we guarantee that CodeNest runs consistently fast without ever crashing. Let's explore real-world examples of our compiler limits implementation...",
    slug: "rust-sandboxes-education",
    featured: false
  }
];

export default function BlogPage({ theme }: BlogPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(false);
  const [subscribeEmail, setSubscribeEmail] = useState<string>("");

  const categories = ["ALL", "COMPILERS", "DESIGN", "SYSTEMS"];

  const filteredBlogs = selectedCategory === "ALL" 
    ? BLOGS_DATA 
    : BLOGS_DATA.filter(b => b.category === selectedCategory);

  const activeBlog = BLOGS_DATA.find(b => b.slug === selectedSlug);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setEmailSubscribed(true);
    setSubscribeEmail("");
  };

  return (
    <div className={`min-h-screen py-24 px-6 relative z-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#070b0a] text-white' : 'bg-[#f5f8f7] text-dark-bg'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selectedSlug ? (
            // GRID DIRECTORY VIEW OF BLOGS
            <motion.div
              key="directory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-10"
            >
              {/* Header Title segment */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20">
                  <BookOpen size={11} className="text-[#5ed29c]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5ed29c]">
                    TECHNICAL PUBLICATIONS
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight uppercase leading-none">
                  CODENEST LOGS<span className="text-primary">.</span>
                </h2>
                <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-600 max-w-xl">
                  Deep dives into systems architecture, shader structures, UX iterations, and modern web compiler paradigms authored by researchers at Vian Studios.
                </p>
              </div>

              {/* Filtering Sub-header bar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mt-4">
                <div className="flex gap-2.5 overflow-x-auto select-none">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3 py-1.5 font-mono text-[10px] rounded-lg border transition-all ${
                        selectedCategory === c
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'border-white/5 hover:border-white/20 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                  <SlidersHorizontal size={12} />
                  <span>FILTER LOGS</span>
                </div>
              </div>

              {/* Featured & lists Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-2">
                
                {/* Left side: Highlighted / Featured blog */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {BLOGS_DATA.filter(b => b.featured).map((b, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedSlug(b.slug)}
                      className="p-6 border border-white/10 dark:border-white/10 theme-light:border-black/10 rounded-2xl bg-white/[0.01] hover:border-primary/40 dark:hover:border-primary/40 theme-light:hover:border-primary group cursor-pointer transition-all duration-300 flex flex-col justify-between text-left h-full"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[#5ed29c] font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10">
                            {b.category}
                          </span>
                          <span className="text-white/40 dark:text-white/40 theme-light:text-black/40 font-mono text-xs flex items-center gap-1">
                            <Clock size={11} /> {b.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold pb-2 group-hover:text-primary smooth-transition text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg uppercase">
                          {b.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-neutral-400">
                          {b.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                        <span className="text-neutral-500 font-mono text-xs">{b.publishDate}</span>
                        <span className="text-[#5ed29c] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read Case Study
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right side: standard stack lists + Subscribe panel */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {filteredBlogs.filter(b => !b.featured).map((b, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedSlug(b.slug)}
                      className="p-5 border border-white/5 dark:border-white/5 theme-light:border-black/10 rounded-xl bg-white/[0.01] hover:border-primary/30 dark:hover:border-primary/30 theme-light:hover:border-primary smooth-transition group cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-2.5">
                        <span className="text-[#5ed29c]">{b.category}</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-200 dark:text-neutral-200 theme-light:text-dark-bg uppercase group-hover:text-primary smooth-transition line-clamp-2">
                        {b.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-neutral-500 mt-2 line-clamp-2">
                        {b.summary}
                      </p>
                    </div>
                  ))}

                  {/* Newsletter panel */}
                  <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-left mt-2 relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-[100px] leading-none font-sans font-black text-primary/5 select-none pointer-events-none">
                      LOGS
                    </div>
                    
                    <h4 className="text-sm font-sans font-bold text-[#5ed29c] uppercase flex items-center gap-2">
                      <Sparkles size={14} className="text-primary" />
                      SUBSCRIBE TO CASE STUDIES
                    </h4>
                    <p className="text-[11px] leading-relaxed text-neutral-400 mt-2 mb-4">
                      Get premium design matrices, WASM optimizations and high-end technical articles compiled directly to your inbox every Friday.
                    </p>

                    {emailSubscribed ? (
                      <div className="p-3 bg-primary/20 border border-primary/40 rounded-lg text-center text-[#5ed29c] font-mono text-xs">
                        ✓ Subscription active. Awaiting deliveries!
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribe} className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={subscribeEmail}
                          onChange={(e) => setSubscribeEmail(e.target.value)}
                          placeholder="your.email@nest.com"
                          className="flex-grow p-2.5 bg-neutral-900 border border-white/10 rounded-lg outline-none text-xs text-white focus:border-primary"
                        />
                        <button type="submit" className="px-4 bg-[#5ed29c] hover:bg-emerald-400 text-dark-bg font-sans font-bold text-xs uppercase rounded-lg smooth-transition cursor-pointer">
                          Join
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            // EXPANDED SINGLE CASE CASE STUDY PAGE VIEW
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto text-left"
            >
              {/* Back selector button */}
              <button
                onClick={() => setSelectedSlug(null)}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/5 dark:border-white/5 theme-light:border-black/5 hover:border-primary/40 rounded-lg font-mono text-xs tracking-wider text-neutral-400 dark:text-neutral-400 theme-light:text-neutral-700 bg-white/5 hover:bg-white/10 hover:text-white uppercase smooth-transition mb-10 cursor-pointer"
              >
                <ChevronLeft size={14} />
                Back to Case Studies
              </button>

              {activeBlog && (
                <div className="flex flex-col gap-6">
                  {/* Category, Date, read timing info */}
                  <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                    <span className="text-[#5ed29c] font-bold uppercase">{activeBlog.category}</span>
                    <span>•</span>
                    <span>{activeBlog.publishDate}</span>
                    <span>•</span>
                    <span>{activeBlog.readTime}</span>
                  </div>

                  {/* Blog Title */}
                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase leading-snug text-neutral-100 dark:text-neutral-100 theme-light:text-dark-bg font-sans">
                    {activeBlog.title}
                  </h1>

                  {/* Summary Callout Banner */}
                  <blockquote className="p-4 border-l-2 border-primary bg-primary/5 rounded-r-xl italic font-sans text-xs leading-relaxed text-neutral-300 dark:text-neutral-300 theme-light:text-neutral-700">
                    {activeBlog.summary}
                  </blockquote>

                  {/* Content Paragraph text layouts */}
                  <div className="font-sans text-sm leading-relaxed text-neutral-300 dark:text-neutral-300 theme-light:text-neutral-700 flex flex-col gap-4 pt-4 border-t border-white/5 dark:border-white/5 theme-light:border-black/5">
                    <p>{activeBlog.content}</p>
                    <p>In designing these modules, the main considerations are latency, memory management, and responsiveness. When our terminal calls a compile-pass, memory allocation buffers are strictly tracked so the client tab doesn't freeze. By testing this under ultra-performance scenarios, CodeNest handles rendering loops at lightning speed.</p>
                    <p>This study underlines Vian Studios technical philosophy of architecture: combining responsive client states with clean local compilations. In our upcoming articles, we will explore styling layout grids and managing shader render frames using React Canvas wrappers.</p>
                  </div>

                  {/* Actions footer frame */}
                  <div className="flex justify-between items-center border-t border-white/5 dark:border-white/5 theme-light:border-black/5 pt-6 mt-8 font-mono text-xs text-neutral-500">
                    <button 
                      onClick={() => alert("Deep Link copied to clipboard. Share the knowledge!")}
                      className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
                    >
                      <Share2 size={13} />
                      Share Case Study
                    </button>
                    <button 
                      onClick={() => alert("Case Study bookmarked successfully inside your browser storage.")}
                      className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
                    >
                      <Bookmark size={13} />
                      Bookmark
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
