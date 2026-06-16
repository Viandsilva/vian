import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, 
  Search, ListFilter, RefreshCw, Layers, PieChart, ShieldCheck, CreditCard
} from 'lucide-react';

interface HorizonWealthPreviewProps {
  theme: 'dark' | 'light';
}

const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', desc: 'Stripe Payout - App Sales', amount: 4890.00, type: 'income', category: 'Revenue', date: 'June 15, 2026' },
  { id: 'tx-2', desc: 'AWS Cloud Services', amount: -642.50, type: 'expense', category: 'Infrastructure', date: 'June 14, 2026' },
  { id: 'tx-3', desc: 'Vercel Pro Node Deploy', amount: -40.00, type: 'expense', category: 'Hosting', date: 'June 12, 2026' },
  { id: 'tx-4', desc: 'Acme Corp Advisory retainer', amount: 3500.00, type: 'income', category: 'Consulting', date: 'June 10, 2026' },
  { id: 'tx-5', desc: 'Interactive Canvas UI Purchase', amount: -180.00, type: 'expense', category: 'Design Assets', date: 'June 09, 2026' }
];

export default function HorizonWealthPreview({ theme }: HorizonWealthPreviewProps) {
  const [activeTab, setActiveTabTab] = useState<'overview' | 'ledger' | 'assets'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  
  // Interactive Allocator State
  const [cryptoAlloc, setCryptoAlloc] = useState(30);
  const [stocksAlloc, setStocksAlloc] = useState(50);
  const [bondsAlloc, setBondsAlloc] = useState(20);

  // Auto normalizer to make sure totals equal 100%
  const handleAllocChange = (category: 'crypto' | 'stocks' | 'bonds', newVal: number) => {
    if (category === 'crypto') {
      const remaining = 100 - newVal;
      const sumOthers = stocksAlloc + bondsAlloc;
      if (sumOthers > 0) {
        setCryptoAlloc(newVal);
        setStocksAlloc(Math.round((stocksAlloc / sumOthers) * remaining));
        setBondsAlloc(Math.round((bondsAlloc / sumOthers) * remaining));
      } else {
        setCryptoAlloc(newVal);
        setStocksAlloc(Math.round(remaining / 2));
        setBondsAlloc(Math.round(remaining / 2));
      }
    } else if (category === 'stocks') {
      const remaining = 100 - newVal;
      const sumOthers = cryptoAlloc + bondsAlloc;
      if (sumOthers > 0) {
        setStocksAlloc(newVal);
        setCryptoAlloc(Math.round((cryptoAlloc / sumOthers) * remaining));
        setBondsAlloc(Math.round((bondsAlloc / sumOthers) * remaining));
      } else {
        setStocksAlloc(newVal);
        setCryptoAlloc(Math.round(remaining / 2));
        setBondsAlloc(Math.round(remaining / 2));
      }
    } else {
      const remaining = 100 - newVal;
      const sumOthers = cryptoAlloc + stocksAlloc;
      if (sumOthers > 0) {
        setBondsAlloc(newVal);
        setCryptoAlloc(Math.round((cryptoAlloc / sumOthers) * remaining));
        setStocksAlloc(Math.round((stocksAlloc / sumOthers) * remaining));
      } else {
        setBondsAlloc(newVal);
        setCryptoAlloc(Math.round(remaining / 2));
        setStocksAlloc(Math.round(remaining / 2));
      }
    }
  };

  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(tx => {
      const matchesSearch = tx.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const totalBalance = 24590.50;
  const totalAlloc = cryptoAlloc + stocksAlloc + bondsAlloc;

  return (
    <div className="w-full text-left relative font-sans">
      
      {/* Platform Branded Header bar */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-black font-black text-sm">H</div>
          <div>
            <span className="font-extrabold text-white text-sm tracking-wider uppercase">HORIZON <span className="text-cyan-400">WEALTH</span></span>
            <p className="text-[9px] text-zinc-500 font-mono tracking-widest leading-none uppercase mt-1">SaaS Investment Ledger</p>
          </div>
        </div>

        {/* Small Navigation tabs */}
        <div className="flex services-tab bg-zinc-900 border border-zinc-800 p-0.5 rounded-xl gap-1">
          {[
            { id: 'overview', label: 'OVERVIEW' },
            { id: 'ledger', label: 'LEDGER' },
            { id: 'assets', label: 'ALLOCATOR' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabTab(tab.id as any)}
              className={`px-3 py-1.5 text-[10px] font-mono tracking-wider font-semibold rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-zinc-800 text-cyan-400 shadow-sm border border-zinc-700/50' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Top Stat row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">ASSETS UNDER CONTROL</span>
                  <span className="text-xl font-extrabold text-white font-sans mt-1 block">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <TrendingUp size={14} />
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">NET MONTHLY DEPOSITS</span>
                  <span className="text-xl font-extrabold text-[#5ed29c] font-sans mt-1 block">+$8,390.00</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">CLOUD EXPENSE RATE</span>
                  <span className="text-xl font-extrabold text-zinc-300 font-sans mt-1 block">-$862.50</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <ArrowDownRight size={14} />
                </div>
              </div>
            </div>

            {/* Custom Interactive SVG Balance History Curve Chart */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[9px] font-mono text-cyan-400 tracking-widest block uppercase">REAL-TIME NET GRAPH</span>
                  <h4 className="text-sm font-sans font-extrabold text-zinc-200 mt-0.5">Wealth Scale Parameters // 12-Month Sprints</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#5ed29c] font-bold font-mono">+18.5% YoY</span>
                </div>
              </div>

              {/* Sophisticated Custom-Designed Inline SVG Chart (Gives extreme professional flair with zero weight) */}
              <div className="h-28 w-full mt-2 relative">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="5" x2="100" y2="5" stroke="#334155" strokeWidth="0.1" strokeDasharray="1,1" />
                  <line x1="0" y1="15" x2="100" y2="15" stroke="#334155" strokeWidth="0.1" strokeDasharray="1,1" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.1" strokeDasharray="1,1" />

                  {/* Gradient Area under the spline */}
                  <path 
                    d="M 0 25 Q 15 22, 30 15 T 60 12 T 85 6 T 100 4 L 100 30 L 0 30 Z" 
                    fill="url(#chart-grad)" 
                  />

                  {/* High precision graph line */}
                  <path 
                    d="M 0 25 Q 15 22, 30 15 T 60 12 T 85 6 T 100 4" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="0.65" 
                    strokeLinecap="round" 
                  />

                  {/* Interactive node indicator */}
                  <circle cx="85" cy="6" r="1.1" fill="#22d3ee" stroke="#000" strokeWidth="0.3" className="animate-pulse" />
                </svg>

                <div className="absolute top-2 right-[18%] bg-cyan-400 text-black text-[8px] font-mono font-black rounded px-1.5 py-0.5 pointer-events-none mt-1 shadow-md">
                  $24,590.50
                </div>
              </div>

              {/* Monthly labels */}
              <div className="flex justify-between font-mono text-[8px] text-zinc-500 pt-2 border-t border-zinc-900/60">
                <span>JAN</span>
                <span>MAR</span>
                <span>MAY</span>
                <span>JUL</span>
                <span>SEP</span>
                <span>NOV</span>
                <span>JUN '26</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LEDGER (FULLY FILTERABLE LIST) */}
        {activeTab === 'ledger' && (
          <motion.div
            key="ledger-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-4"
          >
            {/* Search & filter toolbar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
              <div className="relative flex-grow">
                <Search size={12} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter payouts, hosting, AWS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="flex gap-1.5">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'income', label: 'Income' },
                  { value: 'expense', label: 'Expenses' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterType(opt.value as any)}
                    className={`px-3 py-1.5 text-[10px] font-mono border rounded-lg transition-all ${
                      filterType === opt.value 
                        ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-400 font-bold' 
                        : 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction rows */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden text-xs max-h-56 overflow-y-auto">
              {filteredTransactions.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 font-mono text-[10px]">
                  No records satisfying matrix criteria.
                </div>
              ) : (
                <div className="divide-y divide-zinc-900">
                  {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="p-3.5 flex justify-between items-center hover:bg-zinc-900/30 smooth-transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          tx.type === 'income' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                        }`}>
                          {tx.type === 'income' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        </div>
                        <div>
                          <span className="font-extrabold text-zinc-200 block">{tx.desc}</span>
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase mt-0.5">{tx.category} • {tx.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-zinc-400'}`}>
                          {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 px-1 uppercase">
              <span>LEDGER DATABASE ENCRYPTED VIA CHIP ID</span>
              <span>SHA-256 PARITY CHECK OK</span>
            </div>
          </motion.div>
        )}

        {/* TAB 3: ASSET REBALANCING SIMULATOR */}
        {activeTab === 'assets' && (
          <motion.div
            key="assets-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl relative">
              <span className="text-[9px] font-mono text-cyan-400 tracking-widest block uppercase mb-1">INTERACTIVE SCHEDULER</span>
              <h4 className="text-xs font-sans font-extrabold text-zinc-200 mb-4 uppercase">Slide parameters to simulate automated rebalancing</h4>

              <div className="flex flex-col gap-3.5">
                {/* Sliders */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">Crypto Assets Index</span>
                    <span className="text-cyan-400 font-bold">{cryptoAlloc}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="90" 
                    value={cryptoAlloc}
                    onChange={(e) => handleAllocChange('crypto', Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">Equities & Tech Mutual Funds</span>
                    <span className="text-indigo-400 font-bold">{stocksAlloc}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="90" 
                    value={stocksAlloc}
                    onChange={(e) => handleAllocChange('stocks', Number(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">Fixed Yield Government Bonds</span>
                    <span className="text-zinc-300 font-bold">{bondsAlloc}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="90" 
                    value={bondsAlloc}
                    onChange={(e) => handleAllocChange('bonds', Number(e.target.value))}
                    className="w-full accent-zinc-400 cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Allocation Visualizer Bars */}
            <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl flex flex-col gap-3">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Live Index Representation:</span>
              
              {/* Stacked bar chart */}
              <div className="h-4 rounded-lg overflow-hidden flex bg-zinc-800" style={{ opacity: totalAlloc === 100 ? 1 : 0.8 }}>
                <div className="bg-cyan-400 transition-all duration-300" style={{ width: `${cryptoAlloc}%` }} />
                <div className="bg-indigo-500 transition-all duration-300" style={{ width: `${stocksAlloc}%` }} />
                <div className="bg-zinc-400 transition-all duration-300" style={{ width: `${bondsAlloc}%` }} />
              </div>

              {/* Legendary visual indicators */}
              <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>CRYPTO (${Math.round(totalBalance * cryptoAlloc / 100).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>STOCKS (${Math.round(totalBalance * stocksAlloc / 100).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <span>BONDS (${Math.round(totalBalance * bondsAlloc / 100).toLocaleString()})</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
