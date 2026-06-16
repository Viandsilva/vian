import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Trash2, ShieldCheck, Heart, Grid, List, 
  ChevronRight, ArrowRight, X, Sparkles, Check, CreditCard, Loader2
} from 'lucide-react';

interface ApexShopPreviewProps {
  theme: 'dark' | 'light';
}

const PRODUCTS = [
  { id: 'ap-1', name: 'Raw Cotton Heavyweight Tee', price: 65, category: 'Apparel', imgUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=60', desc: 'Japanese loopwheel knit with a structured drape and hand-sewn hem details.' },
  { id: 'ap-2', name: 'Raw Selvedge Denim Jacket', price: 210, category: 'Apparel', imgUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=60', desc: '14.5oz Indigo selvedge denim designed to fade gracefully across semesters.' },
  { id: 'ap-3', name: 'Chunky Lug Sole Derby Boots', price: 340, category: 'Footwear', imgUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=60', desc: 'Full-grain Italian calf leather with microcellular light rubber lug outsoles.' },
  { id: 'ap-4', name: 'Origami Recycled Canvas Tote', price: 95, category: 'Bags', imgUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60', desc: 'Water-resistant double layer canvas with modular internal hardware locks.' }
];

interface CartItem {
  product: typeof PRODUCTS[0];
  quantity: number;
}

export default function ApexShopPreview({ theme }: ApexShopPreviewProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Apparel' | 'Footwear' | 'Bags'>('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'completed'>('cart');
  
  // Checkout Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const removeFromCart = (pId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== pId));
  };

  const updateQuantity = (pId: string, q: number) => {
    if (q <= 0) {
      removeFromCart(pId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === pId ? { ...item, quantity: q } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry) return;
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setCheckoutStep('completed');
      setCart([]);
    }, 1800);
  };

  return (
    <div className="w-full text-left relative font-sans">
      
      {/* Boutique Apex Header */}
      <div className="bg-[#101010] border border-zinc-800 rounded-2xl p-4 mb-6 relative shadow-lg flex justify-between items-center">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-amber-400 rotate-45" />
            <span className="font-extrabold text-white text-sm tracking-widest uppercase">APEX <span className="text-zinc-500">STUDIO</span></span>
          </div>
          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5 leading-none">Minimalist Streetwear Collective</p>
        </div>

        {/* Shopping Bag Button Indicator */}
        <button 
          onClick={() => {
            setIsCartOpen(true);
            setCheckoutStep('cart');
          }}
          className="relative w-9 h-9 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/60 flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
        >
          <ShoppingBag size={14} />
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 text-[8px] font-bold bg-amber-400 text-black rounded-full flex items-center justify-center border-2 border-black">
              {cart.reduce((s, c) => s + c.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Main catalog panel */}
        <div className="md:col-span-8 flex flex-col gap-4">
          
          {/* Controls menu bar */}
          <div className="flex justify-between items-center bg-zinc-950 p-2 border border-zinc-900 rounded-xl gap-2">
            <div className="flex gap-1 overflow-x-auto">
              {['All', 'Apparel', 'Footwear', 'Bags'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-3 py-1 text-[9px] font-mono tracking-wider uppercase rounded-lg transition-colors ${
                    activeCategory === cat 
                      ? 'bg-zinc-800 text-amber-300 font-bold' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-1 border-l border-zinc-850 pl-2 shrink-0">
              <button 
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded transition-colors ${layoutMode === 'grid' ? 'text-amber-400 bg-zinc-900' : 'text-zinc-500'}`}
              >
                <Grid size={11} />
              </button>
              <button 
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded transition-colors ${layoutMode === 'list' ? 'text-amber-400 bg-zinc-900' : 'text-zinc-500'}`}
              >
                <List size={11} />
              </button>
            </div>
          </div>

          {/* Grid Layout of products */}
          {layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map(p => (
                <div 
                  key={p.id} 
                  className="bg-zinc-950 border border-zinc-900/80 rounded-xl overflow-hidden hover:border-zinc-800 transition-colors flex flex-col justify-between"
                >
                  <div className="relative h-28 bg-zinc-900 overflow-hidden">
                    <img 
                      src={p.imgUrl} 
                      alt={p.name} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 duration-500 transition-all"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 right-2 bg-black/80 font-mono text-[9px] text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-800/60 uppercase">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-3 text-left">
                    <h4 className="text-xs font-bold text-zinc-200 uppercase leading-tight line-clamp-1">{p.name}</h4>
                    <p className="text-[9px] text-zinc-500 leading-normal mt-1 line-clamp-2">{p.desc}</p>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-900/60">
                      <span className="font-mono text-xs font-bold text-amber-300">${p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-amber-400 hover:bg-neutral-800 text-[9px] font-mono uppercase tracking-wider text-zinc-300 hover:text-white rounded transition-all cursor-pointer"
                      >
                        + Add to bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredProducts.map(p => (
                <div 
                  key={p.id} 
                  className="bg-zinc-950 border border-zinc-900/80 rounded-xl p-2.5 hover:border-zinc-800 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={p.imgUrl} 
                      alt={p.name} 
                      className="w-10 h-10 object-cover rounded-lg grayscale shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase leading-snug">{p.name}</h4>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">{p.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-amber-300">${p.price}</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-amber-400 hover:bg-neutral-800 text-[9px] font-mono uppercase text-zinc-300 hover:text-white rounded transition-all cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Sidebar cart or Checkout panels */}
        <div className="md:col-span-4 bg-zinc-950/60 border border-zinc-900 rounded-xl p-3 text-left">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Cart and Subtotal view */}
            {checkoutStep === 'cart' && (
              <motion.div
                key="sidebar-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="border-b border-zinc-900 pb-2">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">SHOPPING BAG SUMMARY</span>
                </div>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-[10px] text-zinc-500 font-mono">
                    Bag is empty. Add apparel items to browse.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-h-44 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center text-xs text-zinc-300">
                        <div className="flex flex-col max-w-[70%]">
                          <span className="font-extrabold text-zinc-200 truncate uppercase text-[10px] leading-tight">{item.product.name}</span>
                          <span className="font-mono text-[9px] text-zinc-500 mt-0.5">${item.product.price} each</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button 
                            className="w-4 h-4 bg-zinc-900 hover:bg-zinc-800 rounded flex items-center justify-center font-bold text-zinc-400"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="font-mono text-xs text-white px-0.5">{item.quantity}</span>
                          <button 
                            className="w-4 h-4 bg-zinc-900 hover:bg-zinc-800 rounded flex items-center justify-center font-bold text-zinc-400"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-zinc-900 pt-3 mt-1.5 flex flex-col gap-2">
                      <div className="flex justify-between font-mono text-xs font-bold text-zinc-300">
                        <span>SUBTOTAL</span>
                        <span className="text-amber-400">${subtotal}</span>
                      </div>
                      <button
                        onClick={() => setCheckoutStep('payment')}
                        className="w-full bg-amber-400 hover:bg-amber-300 text-black py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
                      >
                        Secure Stripe Checkout
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Minimalist Mock Stripe Credit Card Form */}
            {checkoutStep === 'payment' && (
              <motion.form
                key="sidebar-payment"
                onSubmit={handlePaySubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold flex items-center gap-1"><CreditCard size={10} className="text-amber-400" /> SECURE CARD ENVELOPE</span>
                  <button 
                    type="button" 
                    onClick={() => setCheckoutStep('cart')}
                    className="text-[9px] text-zinc-500 hover:text-white uppercase font-mono"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex flex-col gap-2 font-mono text-[9px] text-zinc-400">
                  <div className="flex flex-col gap-1">
                    <label className="uppercase">Name on card</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ananya Verma" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-black border border-zinc-800 rounded py-1.5 px-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="uppercase">Credit card details</label>
                    <input 
                      required
                      type="text" 
                      maxLength={19}
                      placeholder="4242 4242 4242 4242" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-black border border-zinc-800 rounded py-1.5 px-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="uppercase">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        maxLength={5}
                        placeholder="12/28" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="bg-black border border-zinc-800 rounded py-1.5 px-2 text-xs text-white focus:outline-none focus:border-amber-400 text-center"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="uppercase">CVC</label>
                      <input 
                        required
                        type="password" 
                        maxLength={3}
                        placeholder="•••" 
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        className="bg-black border border-zinc-800 rounded py-1.5 px-2 text-xs text-white focus:outline-none focus:border-amber-400 text-center"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1 disabled:opacity-50"
                >
                  {isPaying ? (
                    <>
                      <Loader2 size={11} className="animate-spin" />
                      Paying ${subtotal}...
                    </>
                  ) : (
                    <>
                      Authorize Payment
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {/* Step 3: Payment success screen */}
            {checkoutStep === 'completed' && (
              <motion.div
                key="sidebar-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 text-center flex flex-col items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans tracking-wide">ORDER PLACED</h4>
                  <p className="text-[9px] text-zinc-500 font-mono mt-1 uppercase">TRANSACTION SECURED VIA STRIPE API</p>
                </div>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-805 text-[9px] font-mono text-zinc-300 rounded border border-zinc-800 transition-colors uppercase cursor-pointer"
                >
                  Brows Products Again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
