import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Shield, Check, Calendar, ChevronRight, Clock, User, Phone, 
  MapPin, Bug, Sparkles, Award, Leaf, Lock, ShieldAlert,
  RefreshCw, Layers, CheckCircle2, ChevronDown, AlertCircle, Play, 
  Star, Search, X, LogOut, ChevronLeft, CalendarClock, PhoneCall,
  Home, BookOpen, Layers3, Flame, ExternalLink, HelpCircle
} from 'lucide-react';

interface SecurePestPreviewProps {
  theme: 'dark' | 'light';
}

interface Appointment {
  id: string;
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  pestType: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "appt-1",
    name: "Amit Singh",
    phone: "+91 98765 43210",
    address: "742 Evergreen Plaza, Bengaluru",
    serviceType: "Residential Pest Control",
    pestType: "Cockroaches",
    preferredDate: "2026-06-18",
    timeSlot: "10:00 AM – 12:00 PM",
    message: "Seeing cockroaches in kitchen cupboards near trash zone.",
    status: "pending",
    createdAt: "2026-06-15T02:10:00.000Z"
  },
  {
    id: "appt-2",
    name: "Michael Brown",
    phone: "+91 81234 56789",
    address: "105 West Wind Residency, Mumbai",
    serviceType: "Termite Treatment",
    pestType: "Termites",
    preferredDate: "2026-06-20",
    timeSlot: "2:00 PM – 4:00 PM",
    message: "Inspector noticed active wood burrowing trails on wooden support.",
    status: "confirmed",
    createdAt: "2026-06-14T18:45:00.000Z"
  },
  {
    id: "appt-3",
    name: "Kristin Watson",
    phone: "+91 91112 22334",
    address: "Cafeteria Block 3, Space Center, Pune",
    serviceType: "Commercial Pest Control",
    pestType: "Ants",
    preferredDate: "2026-06-22",
    timeSlot: "8:00 AM – 10:00 AM",
    message: "Bi-monthly routine food safety barrier protection program.",
    status: "completed",
    createdAt: "2026-06-12T09:12:00.000Z"
  }
];

const PEST_TAB_DATA = [
  {
    id: 0,
    name: "Cockroaches",
    tagline: "Colony elimination approach",
    description: "Cockroaches spread bacteria, contaminate food, and trigger asthma. Our gel-bait and residual spray approach eliminates entire colonies — including eggs — in a single treatment.",
    img: "https://html.awaikenthemes.com/bugfree/images/protection-item-image-1.png",
    stats: [
      { label: "Species Tracked", value: "4,500+" },
      { label: "Elimination Success", value: "98.4%" },
      { label: "Residual Defense", value: "90 Days" },
      { label: "Action Response", value: "Instant" }
    ],
    accent: "#3CB944"
  },
  {
    id: 1,
    name: "Mosquitoes",
    tagline: "Breeding cycle termination",
    description: "Mosquitoes carry dengue, malaria, and Zika. Our fogging and larvicidal treatments break the breeding cycle — dramatically reducing mosquito populations in and around your property.",
    img: "https://html.awaikenthemes.com/bugfree/images/protection-item-image-2.png",
    stats: [
      { label: "Eggs per Cycle", value: "300+" },
      { label: "Population Reduction", value: "95%" },
      { label: "Rain-Resistant Protection", value: "Yes" },
      { label: "Active Period", value: "Summer" }
    ],
    accent: "#ef4444"
  },
  {
    id: 2,
    name: "Bed Bugs",
    tagline: "Thermodynamic absolute thermal clear",
    description: "Bed bugs easily hide inside wooden joints, seams, and headboards. We raise chamber temperatures safely to 50°C+ which kills 100% of bed bugs at every structural stage (eggs, nymphs, and nesting insects) with zero chemical residue.",
    img: "https://html.awaikenthemes.com/bugfree/images/protection-item-image-3.png",
    stats: [
      { label: "Heat Target", value: "54.4°C" },
      { label: "Elimination Ratio", value: "100%" },
      { label: "Sittings Required", value: "1 Session" },
      { label: "Safety Rating", value: "EPA Approved" }
    ],
    accent: "#3b82f6"
  },
  {
    id: 3,
    name: "Spiders",
    tagline: "Eco-shield perimeter barrier",
    description: "While web builders control other insects, venomous spider nests create domestic threats. We analyze web layouts, treat active nesting corners, and seal physical brick lines to obstruct interior invasion points completely.",
    img: "https://html.awaikenthemes.com/bugfree/images/protection-item-image-4.png",
    stats: [
      { label: "Spider Varieties Covered", value: "100%" },
      { label: "EPA Safety Clearance", value: "Non-Toxic" },
      { label: "Seal Points Protected", value: "50+" },
      { label: "Guaranteed Shield", value: "3 Months" }
    ],
    accent: "#a855f7"
  },
  {
    id: 4,
    name: "Termites",
    tagline: "Hexaflumuron structural bait systems",
    description: "Wood-destroying termites cause billions in real property damage. Our advanced underground baiting modules use slow-acting structural poisons that workers carry back, collapsing parent colonies safely within weeks.",
    img: "https://html.awaikenthemes.com/bugfree/images/protection-item-image-5.png",
    stats: [
      { label: "Damages Guarded", value: "$5B/yr" },
      { label: "Colony Collapse Cycle", value: "6 Weeks" },
      { label: "Annual Evaluation Rate", value: "Included" },
      { label: "Structural Warranty", value: "100% Guaranteed" }
    ],
    accent: "#f59e0b"
  }
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Excellent service from start to finish. The team was professional, punctual, and completely eliminated our pest problem. We haven't seen a single cockroach since the treatment three months ago!",
    author: "Amit Singh",
    role: "Warehouse Supervisor",
    loc: "Bengaluru, India",
    avatar: "https://html.awaikenthemes.com/bugfree/images/author-1.jpg"
  },
  {
    stars: 5,
    text: "Pest Control found and eliminated a termite colony that two other companies completely missed. Their advanced detection equipment is next level. Worth every penny — saved us from major structural damage.",
    author: "Michael Brown",
    role: "Manager, Ind Residence",
    loc: "Mumbai, India",
    avatar: "https://html.awaikenthemes.com/bugfree/images/author-2.jpg"
  },
  {
    stars: 5,
    text: "As a restaurant owner, pest control is critical. Pest Control provides the most thorough and discreet service I've experienced. They work around our hours and always provide detailed reports for our health inspections.",
    author: "Kristin Watson",
    role: "Bistro Proprietor",
    loc: "Pune, India",
    avatar: "https://html.awaikenthemes.com/bugfree/images/author-3.jpg"
  }
];

export default function SecurePestPreview({ theme }: SecurePestPreviewProps) {
  // Navigation states
  const [activeNav, setActiveNav] = useState('home');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [selectedPestIdx, setSelectedPestIdx] = useState<number>(0);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  // Carousel slider state
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);

  // Booking form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formService, setFormService] = useState('Residential Pest Control');
  const [formPest, setFormPest] = useState('Cockroaches');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('10:00 AM – 12:00 PM');
  const [formNotes, setFormNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video modal modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Admin section state
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isAdminDashActive, setIsAdminDashActive] = useState(false);

  // References for scrolling
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const mainScrollContainerRef = useRef<HTMLDivElement>(null);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToBooking = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Swiper autoplay emulation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestiIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formAddress.trim() || !formDate) {
      setErrorMessage("Please fill out all required fields (*).");
      return;
    }

    const payload: Appointment = {
      id: `appt-${Date.now()}`,
      name: formName,
      phone: formPhone,
      address: formAddress,
      serviceType: formService,
      pestType: formPest,
      preferredDate: formDate,
      timeSlot: formTime,
      message: formNotes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [payload, ...prev]);
    setBookingSuccess(true);
    setErrorMessage('');
    displayToast(`Booking registered successfully for ${formName}!`);
  };

  const handleResetForm = () => {
    setFormName('');
    setFormPhone('');
    setFormAddress('');
    setFormService('Residential Pest Control');
    setFormPest('Cockroaches');
    setFormDate('');
    setFormTime('10:00 AM – 12:00 PM');
    setFormNotes('');
    setBookingSuccess(false);
  };

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'Pest Control@Admin2024') {
      setIsAdminLoginOpen(false);
      setIsAdminDashActive(true);
      setAdminPasswordInput('');
      setAdminLoginError('');
      displayToast('Authenticated securely as Systems Administrator.');
    } else {
      setAdminLoginError('Incorrect password credentials.');
    }
  };

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(item => item.id === id ? { ...item, status } : item)
    );
    displayToast(`Status successfully upgraded to: ${status}`);
  };

  const currentPest = PEST_TAB_DATA[selectedPestIdx];

  return (
    <div className="w-full text-left font-sans bg-[#000502] text-neutral-100 min-h-screen relative overflow-hidden rounded-xl border border-neutral-800" ref={mainScrollContainerRef}>
      
      {/* Toast Alert message banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -25, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -25, x: "-50%" }}
            className="absolute top-24 left-1/2 z-50 px-5 py-2.5 bg-neutral-900 border border-[#3CB944] text-white rounded-full flex items-center gap-2.5 text-[11px] shadow-2xl min-w-[300px] justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[#3CB944] animate-ping" />
            <span className="font-mono font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER NAVIGATION STRIP */}
      <nav className="sticky top-0 z-30 w-full bg-neutral-950/90 backdrop-blur-md border-b border-white/5 py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#3CB944] flex items-center justify-center font-black text-white text-sm">P</div>
          <div>
            <span className="font-sans font-black text-white text-xs tracking-wider uppercase">PEST <span className="text-[#3CB944]">CONTROL</span></span>
            <p className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5 leading-none">Protective Services</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase font-black tracking-wider text-neutral-400">
          <button onClick={() => setActiveNav('home')} className={`hover:text-[#3CB944] ${activeNav === 'home' ? 'text-[#3CB944]' : ''}`}>Home</button>
          <button onClick={() => setActiveNav('about')} className="hover:text-[#3CB944]">About</button>
          <button onClick={() => setActiveNav('services')} className="hover:text-[#3CB944]">Services</button>
          <button onClick={() => setActiveNav('pests')} className="hover:text-[#3CB944]">Target pests</button>
          <button onClick={() => setActiveNav('pricing')} className="hover:text-[#3CB944]">Pricing</button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isAdminDashActive ? (
            <button 
              onClick={() => setIsAdminDashActive(false)}
              className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-mono text-[9px] uppercase font-bold rounded flex items-center gap-1 transition-colors"
            >
              <LogOut size={10} />
              EXIT ADMIN
            </button>
          ) : (
            <button 
              onClick={scrollToBooking}
              className="px-3.5 py-1.5 bg-[#3CB944] hover:bg-[#3CB944]/85 text-white font-mono text-[9px] uppercase font-bold rounded-lg tracking-wider transition-all"
            >
              BOOK DISPATCH
            </button>
          )}
        </div>
      </nav>

      {isAdminDashActive ? (
        /* SYSTEMS ADMINISTRATIVE DATA VIEW */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 flex flex-col gap-5 text-left font-mono"
        >
          {/* Header alert */}
          <div className="bg-[#0c1f11] border border-[#22c55e]/30 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3CB944]/10 border border-[#3CB944]/40 flex items-center justify-center text-[#3CB944]">
                <Lock size={14} />
              </div>
              <div>
                <span className="font-extrabold text-white text-xs tracking-wider uppercase">ADMIN PANEL GATEWAY // ACTIVE</span>
                <p className="text-[8px] text-[#22c55e] font-mono tracking-widest uppercase mt-0.5 font-bold">Pest control local sqlite parity engine</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-mono text-neutral-400">STATE SYNCHRONIZED: PASSING</span>
            </div>
          </div>

          {/* Admin metric blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              { label: "Total Bookings", value: appointments.length, color: "text-[#3CB944]" },
              { label: "Pending Verification", value: appointments.filter(a => a.status === 'pending').length, color: "text-amber-500" },
              { label: "Confirmed Dispatch", value: appointments.filter(a => a.status === 'confirmed').length, color: "text-blue-400" },
              { label: "Completed Success", value: appointments.filter(a => a.status === 'completed').length, color: "text-emerald-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-center flex flex-col justify-center">
                <span className="text-[8px] uppercase tracking-wider text-neutral-500 leading-none">{stat.label}</span>
                <p className={`text-xl font-bold font-sans mt-1.5 leading-none ${stat.color}`}>{stat.value}</p>
                <div className="h-0.5 w-[50%] bg-neutral-800 mx-auto rounded-full mt-2" />
              </div>
            ))}
          </div>

          {/* Database Appointments table container */}
          <div className="border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden">
            <div className="p-4 border-b border-neutral-800/60 bg-neutral-950/80 flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                <Layers size={13} className="text-[#3CB944]" />
                Appointment ledger storage
              </h4>
              <span className="text-[8px] text-neutral-500">REFRESH FREQUENCY: INSTANT</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10.5px] text-neutral-300">
                <thead className="bg-[#050706] border-b border-neutral-800">
                  <tr>
                    <th className="py-2.5 px-3 text-left font-bold text-neutral-500 uppercase text-[8px]">Client details</th>
                    <th className="py-2.5 px-3 text-left font-bold text-neutral-500 uppercase text-[8px]">Requested Program</th>
                    <th className="py-2.5 px-3 text-left font-bold text-neutral-500 uppercase text-[8px]">Pest target</th>
                    <th className="py-2.5 px-3 text-left font-bold text-neutral-500 uppercase text-[8px]">Reserved Date</th>
                    <th className="py-2.5 px-3 text-left font-bold text-neutral-500 uppercase text-[8px]">Status State</th>
                    <th className="py-2.5 px-3 text-right font-bold text-neutral-500 uppercase text-[8px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-500 text-[10px]">No appointments booked in this session.</td>
                    </tr>
                  ) : (
                    appointments.map(appt => (
                      <tr key={appt.id} className="hover:bg-neutral-900/40 smooth-transition">
                        <td className="py-2.5 px-3">
                          <strong className="text-white font-sans">{appt.name}</strong>
                          <p className="text-[8px] text-neutral-500 mt-0.5">{appt.phone}</p>
                          <p className="text-[8.5px] text-neutral-400 mt-0.5 shrink-0 max-w-[200px] truncate">{appt.address}</p>
                        </td>
                        <td className="py-2.5 px-3 text-neutral-400 font-sans">{appt.serviceType}</td>
                        <td className="py-2.5 px-3 text-neutral-400 font-sans">{appt.pestType}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-white">{appt.preferredDate}</span>
                          <p className="text-[8.5px] text-neutral-500 mt-0.5">{appt.timeSlot}</p>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 text-[8px] rounded font-bold uppercase ${
                            appt.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                            appt.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400' :
                            appt.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <select
                            value={appt.status}
                            onChange={(e) => handleUpdateStatus(appt.id, e.target.value as Appointment['status'])}
                            className="bg-black text-neutral-200 border border-neutral-800 rounded py-1 px-1.5 text-[9px] focus:outline-none focus:border-[#3CB944] cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ) : (
        /* STANDARD DYNAMIC CODENEST CLIENT SUITE WEBSITE */
        <div className="flex flex-col gap-0">
          
          {/* SECTION 1: HERO SECTION */}
          <div className="relative pt-12 pb-16 px-5 bg-gradient-to-br from-neutral-950 via-[#030905] to-neutral-950 overflow-hidden border-b border-neutral-900">
            {/* Ambient backdrop network vectors */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#3CB944]/5 blur-[90px] pointer-events-none" />

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 text-left">
              <div className="md:col-span-7 flex flex-col items-start">
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3CB944]/15 border border-[#3CB944]/30 rounded-full text-[9px] font-mono tracking-widest text-[#3CB944] uppercase font-bold mb-5 shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3CB944] animate-pulse" />
                  TRUSTED PEST PROFESSIONALS
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
                  PROTECTING <span className="text-[#3CB944] block sm:inline">WHAT MATTERS</span> MOST TO YOU.
                </h1>

                <p className="text-xs font-mono tracking-wider text-[#3CB944] uppercase font-bold mt-2.5">
                  Bye-Bugs, Hello Comfort
                </p>

                <p className="mt-3.5 text-xs text-neutral-400 leading-relaxed max-w-md">
                  Our certified specialists deploy advanced, EPA bio-safe solutions to safely eliminate termites, bed bugs, cockroaches, and garden mosquitoes with guaranteed relief.
                </p>

                {/* Simulated playback controller triggers */}
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={scrollToBooking}
                    className="px-5 py-3.5 bg-[#3CB944] hover:bg-[#3CB944]/80 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#3CB944]/15 cursor-pointer"
                  >
                    Free Site Inspection
                  </button>
                  
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex items-center gap-2 text-neutral-300 hover:text-white group focus:outline-none cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-[#3CB944] flex items-center justify-center text-[#3CB944] transition-all">
                      <Play size={10} className="fill-current ml-0.5" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Watch how it works</span>
                  </button>
                </div>

                {/* Bullet safety indicators in hero */}
                <div className="mt-10 grid grid-cols-3 gap-3 w-full border-t border-neutral-900 pt-7">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3CB944]/10 text-[#3CB944] flex items-center justify-center shrink-0">
                      <Leaf size={12} />
                    </div>
                    <div>
                      <strong className="text-[10px] text-white font-bold block">100% Bio-Safe</strong>
                      <span className="text-[8px] text-neutral-500 font-mono uppercase">EPA Approved</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3CB944]/10 text-[#3CB944] flex items-center justify-center shrink-0">
                      <Shield size={12} />
                    </div>
                    <div>
                      <strong className="text-[10px] text-white font-bold block">30-Day Guarantee</strong>
                      <span className="text-[8px] text-neutral-500 font-mono uppercase">Free Re-sprays</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3CB944]/10 text-[#3CB944] flex items-center justify-center shrink-0">
                      <Clock size={12} />
                    </div>
                    <div>
                      <strong className="text-[10px] text-white font-bold block">Same-Day OK</strong>
                      <span className="text-[8px] text-neutral-500 font-mono uppercase">Express Dispatch</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* R. Hero Mockup Frame Panel */}
              <div className="md:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                  {/* Real-life EPA certificate overlay */}
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-[#091f0d] border border-[#22c55e]/30 text-[#22c55e] text-[8px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                    <Award size={9} />
                    EPA CERTIFIED
                  </div>

                  <img 
                    src="https://html.awaikenthemes.com/bugfree/images/about-us-image-1.jpg" 
                    alt="Eradication technician"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 md:h-80 object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floater metric card */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-neutral-950/90 border border-neutral-800 rounded-xl backdrop-blur-md flex justify-between items-center">
                    <div>
                      <span className="text-[7.5px] uppercase text-neutral-500 font-mono block">Annual client base</span>
                      <strong className="text-sm font-sans font-extrabold text-white">1000+ CUSTOMERS</strong>
                    </div>
                    <div className="px-2 py-1 rounded bg-[#3CB944]/15 border border-[#3CB944]/30 text-[#3CB944] font-mono text-[9px] font-black uppercase">
                      4.9 / 5 RATINGS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ACCREDITATIONS & PARTNERS DISPLAY */}
          <div className="bg-neutral-950 border-b border-neutral-900 py-3.5 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-60 text-neutral-400 font-mono text-[9px] uppercase font-bold tracking-widest">
              <div className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-[#3CB944]" /> EPA AUTHORIZED</div>
              <div className="flex items-center gap-1.5"><Award size={11} className="text-[#3CB944]" /> NPMA MEMBER</div>
              <div className="flex items-center gap-1.5"><Shield size={11} className="text-[#3CB944]" /> ISO 9001 STATUS</div>
              <div className="flex items-center gap-1.5"><Leaf size={11} className="text-[#3CB944]" /> ECO RESPONSIVE</div>
              <div className="flex items-center gap-1.5"><Star size={11} className="text-[#3CB944]" /> BBB A+ CLASSIFIED</div>
            </div>
          </div>

          {/* SECTION 3: ABOUT US OVERVIEW */}
          <div className="py-14 px-5 bg-black" id="about-us-sec">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              
              <div className="md:col-span-6 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#3CB944] uppercase font-extrabold">25+ Years Experience</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-sans leading-tight uppercase text-white mt-1.5">
                    DEDICATED TO PROTECTING YOUR SPACE FROM <span className="text-[#3CB944]">PESTS</span>
                  </h2>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  For over two decades, Pest Control has pioneered responsive perimeter defense solutions. We combine physical blockages with bio-barrier formulations to terminate entry avenues long-term.
                </p>

                <div className="flex flex-col gap-3 mt-1.5">
                  {[
                    { title: "EPA Licensed Specialists", desc: "Every dispatched personnel undergoes severe FBI background checks & state certifications." },
                    { title: "Smart Heatwave Infest Scans", desc: "We utilize heat-sensing infrared sights to capture rodent chambers behind brick frames." },
                    { title: "Transparent upfront pricing structures", desc: "Zero surprise hourly extensions. The quotes agreed is the final fee logged." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded bg-[#3CB944]/15 border border-[#3CB944]/30 text-[#3CB944] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase">{item.title}</h4>
                        <p className="text-[9px] text-neutral-500 font-mono mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* R. Double Overlapping Thumbnails layout */}
              <div className="md:col-span-6 grid grid-cols-12 gap-2 relative">
                <div className="col-span-7 rounded-xl overflow-hidden border border-neutral-900">
                  <img src="https://html.awaikenthemes.com/bugfree/images/about-us-image-1.jpg" alt="About img 1" className="w-full h-44 object-cover" />
                </div>
                <div className="col-span-5 rounded-xl overflow-hidden border border-neutral-900 mt-10">
                  <img src="https://html.awaikenthemes.com/bugfree/images/about-us-image-2.jpg" alt="About img 2" className="w-full h-36 object-cover" />
                </div>
                
                {/* Years badge pill */}
                <div className="absolute left-1/3 top-1/3 p-3 rounded-xl bg-[#3CB944] text-black text-center shadow-2xl">
                  <strong className="text-lg font-black block leading-none font-sans">25+</strong>
                  <span className="text-[7.5px] font-mono uppercase font-black tracking-wider block mt-1">years active</span>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 4: DETAILED SERVICES COMPONENT */}
          <div className="py-14 px-5 bg-neutral-950/60 border-t border-b border-neutral-900" id="services-sec">
            <div className="max-w-5xl mx-auto flex flex-col gap-10">
              
              <div className="text-center max-w-xl mx-auto flex flex-col items-center">
                <span className="text-[10px] font-mono tracking-widest text-[#3CB944] uppercase font-bold">Comprehensive Protection Plan</span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-sans leading-none text-white uppercase mt-1">
                  EXPERT ERADICATION <span className="text-[#3CB944]">PROGRAMS</span>
                </h2>
                <div className="w-10 h-0.5 bg-[#3CB944] mt-3" />
                <p className="text-xs text-neutral-400 leading-relaxed mt-2.5">
                  We supply multi-stage residential and commercial protective suites formulated to destroy crawling and nesting threats completely.
                </p>
              </div>

              <div className="relative">
                {/* Elegant light-colored ambient glow behind the grid wrapper */}
                <div className="absolute -inset-4 md:-inset-10 bg-radial from-[#3CB944]/15 via-white/[0.03] to-transparent rounded-[40px] blur-3xl opacity-70 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Residential Spray",
                      desc: "Monthly customized spray matrices creating protective micro-shields inside domestic rooms.",
                      img: "https://html.awaikenthemes.com/bugfree/images/service-1.jpg",
                      meta: "EPA Bio-Safe"
                    },
                    {
                      title: "Bed Bug Thermal",
                      desc: "Direct heat applications which bake bugs, eggs, and larvae in wooden channels safely.",
                      img: "https://html.awaikenthemes.com/bugfree/images/service-2.jpg",
                      meta: "100% Thermal Clearance"
                    },
                    {
                      title: "Cockroach Baiting",
                      desc: "Custom gel matrices that trace nests and clear cockroach species from food spaces.",
                      img: "https://html.awaikenthemes.com/bugfree/images/service-3.jpg",
                      meta: "Colony Collapse Gel"
                    },
                    {
                      title: "Termite Defense",
                      desc: "Hexaflumuron underground traps forming solid protection limits around properties.",
                      img: "https://html.awaikenthemes.com/bugfree/images/service-4.jpg",
                      meta: "Colony Collapse Warranty"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="group flex flex-col bg-neutral-950/90 border border-neutral-800/90 hover:border-[#3CB944]/80 rounded-xl overflow-hidden text-left hover:bg-neutral-900/45 smooth-transition shadow-lg hover:shadow-[#3CB944]/10">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/85 border border-[#3CB944]/30 text-[#3CB944] font-mono text-[7px] font-bold">
                          {item.meta}
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-gradient-to-b from-neutral-950 to-neutral-950/50">
                        <div>
                          <h4 className="text-[11px] font-bold text-white uppercase tracking-tight group-hover:text-[#3BBA43] transition-colors">{item.title}</h4>
                          <p className="text-[9.5px] text-neutral-300 leading-normal mt-1">{item.desc}</p>
                        </div>

                        <button 
                          onClick={scrollToBooking}
                          className="text-[9px] font-mono text-[#3CB944] hover:text-[#3CB944]/80 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer focus:outline-none"
                        >
                          BOOK SERVICE
                          <ChevronRight size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 5: PEST TYPES (TABS DEMO) */}
          <div className="py-14 px-5 bg-black" id="pests-tabcase-sec">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              
              <div className="text-left">
                <span className="text-[10px] text-[#3CB944] font-mono uppercase tracking-widest font-black">Infestation catalog</span>
                <h2 className="text-xl font-sans font-extrabold uppercase text-white tracking-tight mt-1 leading-none">
                  BIOLOGICAL PESTS WE <span className="text-[#3CB944]">ELIMINATE</span> ONLY
                </h2>
                <p className="text-[10px] text-neutral-500 font-mono mt-1.5 uppercase">Interactive estimator tab selectors</p>
              </div>

              {/* Slider tabs selectors */}
              <div className="flex border-b border-neutral-900 gap-1 overflow-x-auto pb-1 scrollbar-none">
                {PEST_TAB_DATA.map((pt, i) => (
                  <button
                    key={pt.name}
                    onClick={() => setSelectedPestIdx(i)}
                    className={`px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-t-lg transition-all border-t border-x cursor-pointer ${
                      selectedPestIdx === i
                        ? 'bg-neutral-900 border-neutral-800 text-[#3CB944]'
                        : 'border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {pt.name}
                  </button>
                ))}
              </div>

              {/* Slider Active Panel layout */}
              <div className="p-5 rounded-2xl border border-neutral-900 bg-neutral-950/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                
                {/* Left illustrative image */}
                <div className="md:col-span-5 rounded-xl overflow-hidden bg-neutral-900 flex justify-center items-center p-2 relative h-40">
                  <img 
                    src={currentPest.img} 
                    alt={currentPest.name} 
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/85 border border-[#3CB944]/30 rounded text-[#3CB944] font-mono text-[7px] uppercase font-bold">
                    Colony Elimination
                  </div>
                </div>

                {/* Right detailed information block */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[8.5px] font-mono text-neutral-400 uppercase font-black tracking-widest">{currentPest.tagline}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white uppercase">{currentPest.name} Efficacy Metrics</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">{currentPest.description}</p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    {currentPest.stats.map((st, sIdx) => (
                      <div key={sIdx} className="bg-neutral-950 border border-neutral-900 rounded-lg p-2 flex flex-col justify-center text-center">
                        <span className="text-[7.5px] font-mono text-neutral-500 uppercase leading-none">{st.label}</span>
                        <strong className="text-xs font-sans font-extrabold text-[#3CB944] leading-none mt-1">{st.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* SECTION 6: DYNAMIC STEP-BY-STEP PROCESS */}
          <div className="py-14 px-5 bg-neutral-950/60 border-t border-b border-neutral-900" id="process-sec">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-neutral-900">
                <img src="https://html.awaikenthemes.com/bugfree/images/process-image.jpg" alt="Dispatch process" className="w-full h-60 md:h-80 object-cover opacity-85" />
              </div>

              <div className="md:col-span-7 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#3CB944] uppercase font-bold">Rigorous Methodology</span>
                  <h3 className="text-lg font-black text-white uppercase mt-1 leading-none">HOW WE SECURE YOUR BOUNDS</h3>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { step: "01", title: "Comprehensive Scanning", desc: "Our certified specialist evaluates entry lanes, heat levels, damp zones, and nested locations." },
                    { step: "02", title: "Bespoke Barrier Strategy", desc: "We deploy targeted biological gel baits and spray patterns aligned to nesting behaviors." },
                    { step: "03", title: "Safety Seal & Maintenance", desc: "We block physical gaps and conduct standard follow-up sprays to secure the boundary." }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      onMouseEnter={() => setActiveProcessStep(idx)}
                      className={`p-3 border rounded-xl flex gap-3 cursor-pointer smooth-transition ${
                        activeProcessStep === idx 
                          ? 'border-[#3CB944]/30 bg-neutral-900/60' 
                          : 'border-transparent bg-transparent hover:border-neutral-900'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                        activeProcessStep === idx ? 'bg-[#3CB944] text-black' : 'bg-neutral-900 text-neutral-500'
                      }`}>
                        {item.step}
                      </div>

                      <div>
                        <h4 className="text-[11px] font-black text-white uppercase leading-snug">{item.title}</h4>
                        <p className="text-[9px] text-neutral-500 leading-normal mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 7: PRICING GRIDS */}
          <div className="py-14 px-5 bg-black" id="pricing-plan-sec">
            <div className="max-w-5xl mx-auto flex flex-col gap-10">
              
              <div className="text-center max-w-xl mx-auto flex flex-col items-center">
                <span className="text-[10px] font-mono tracking-widest text-[#3CB944] uppercase font-semibold">Cost-Effective Maintenance</span>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white mt-1 leading-none">
                  SIMPLE, FLAT-RATE <span className="text-[#3CB944]">PRICING</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-2">No contractual surprises. Stop coverage anytime.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {[
                  {
                    plan: "Basic Plan",
                    price: "3,299",
                    desc: "Ideal for apartments needing routine protective spray shields.",
                    features: ["Quarterly inspection visits", "Ant & Cockroach baiting", "Spider web clearances", "Digital inspection logging report", "30-Day guarantee"],
                    negatives: ["Emergency call-out coverage", "Priority scheduling queues"],
                    btnStyle: "bg-neutral-900 border border-neutral-800 text-white hover:border-[#3CB944]"
                  },
                  {
                    plan: "Standard Plan",
                    price: "4,999",
                    desc: "Perfect for villas requiring active recurring protective services.",
                    features: ["Monthly inspection visits", "4 Pest target programs active", "Rodent trapping system", "Exterior barrier seal points", "1 Emergency call-out yearly", "Complete satisfaction guarantee"],
                    negatives: ["Priority scheduling queues"],
                    btnStyle: "bg-[#3CB944] text-white hover:bg-[#3CB944]/80",
                    isFeatured: true
                  },
                  {
                    plan: "Premium plan",
                    price: "7,499",
                    desc: "Full comprehensive shielding with prioritized emergency schedules.",
                    features: ["Bi-weekly monitoring inspections", "All biological pest targets covered", "Unlimited emergency dispatch visits", "Priority dispatch queue line", "24/7 Phone helpline channels", "Structural damage logging", "Warranty coverage protection"],
                    negatives: [],
                    btnStyle: "bg-neutral-900 border border-neutral-800 text-white hover:border-[#3CB944]"
                  }
                ].map((pt, i) => (
                  <div 
                    key={i} 
                    className={`rounded-2xl border flex flex-col justify-between text-left p-5 relative overflow-hidden transition-all duration-300 ${
                      pt.isFeatured 
                        ? 'border-[#3CB944] bg-neutral-900/40 shadow-xl shadow-[#3CB944]/5' 
                        : 'border-neutral-900 bg-neutral-950/60'
                    }`}
                  >
                    {pt.isFeatured && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#3CB944] text-black font-mono text-[8.5px] font-black uppercase rounded tracking-wider">
                        MOST POPULAR
                      </div>
                    )}

                    <div>
                      <span className="text-[9px] font-mono uppercase text-neutral-500 font-bold block">{pt.plan}</span>
                      <div className="flex items-baseline gap-1 mt-1.5 mb-2.5">
                        <span className="text-sm font-sans font-bold text-neutral-400">₹</span>
                        <strong className="text-2xl font-sans font-black text-white">{pt.price}</strong>
                        <span className="text-[9px] font-mono text-neutral-500 uppercase ml-1">/ Month</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-normal mb-4 font-sans">{pt.desc}</p>

                      <div className="h-[1px] bg-neutral-900 w-full mb-4" />

                      <ul className="flex flex-col gap-2">
                        {pt.features.map((item, id) => (
                          <li key={id} className="flex gap-2 items-center text-[10px] text-neutral-300 font-medium font-sans">
                            <Check size={11} className="text-[#3CB944] shrink-0" />
                            {item}
                          </li>
                        ))}
                        {pt.negatives.map((item, id) => (
                          <li key={id} className="flex gap-2 items-center text-[10px] text-neutral-600 line-through font-sans">
                            <X size={11} className="text-neutral-800 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={scrollToBooking}
                      className={`w-full py-2.5 rounded-xl font-mono text-[9px] font-bold uppercase tracking-widest mt-6 cursor-pointer ${pt.btnStyle}`}
                    >
                      GET PROTECTED NOW
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* SECTION 8: AUTOMATIC TESTIMONIAL CAROUSEL */}
          <div className="py-14 px-5 bg-neutral-950/65 border-t border-b border-neutral-900" id="testi-sec">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              
              <div className="md:col-span-4 flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-widest text-[#3CB944] uppercase font-bold">Verified Success</span>
                <h3 className="text-lg font-black text-white uppercase leading-tight">WHAT CUSTOMERS TALK ABOUT US</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                  We secure warehouses, residential chambers, IT hubs, and restaurant counters. Read our real clients reviews.
                </p>

                {/* Simulated navigation handles */}
                <div className="flex gap-1.5 mt-2">
                  <button 
                    onClick={() => setActiveTestiIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="w-7 h-7 bg-neutral-900 border border-neutral-800 hover:border-[#3CB944] rounded text-[#3CB944] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button 
                    onClick={() => setActiveTestiIndex(prev => (prev + 1) % TESTIMONIALS.length)}
                    className="w-7 h-7 bg-neutral-900 border border-neutral-800 hover:border-[#3CB944] rounded text-[#3CB944] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Slider panel content */}
              <div className="md:col-span-8 p-6 rounded-2xl border border-neutral-900 bg-neutral-950 flex flex-col gap-4 relative overflow-hidden min-h-[180px]">
                <div className="absolute right-4 top-4 hidden sm:block">
                  <span className="text-[10px] font-mono text-neutral-800 font-extrabold tracking-wider">PEST CONTROL INTL</span>
                </div>

                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[activeTestiIndex].stars)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>

                <p className="text-xs text-neutral-300 font-sans italic leading-relaxed">
                  "{TESTIMONIALS[activeTestiIndex].text}"
                </p>

                <div className="flex items-center gap-2.5 border-t border-neutral-900 pt-3.5">
                  <img 
                    src={TESTIMONIALS[activeTestiIndex].avatar} 
                    alt={TESTIMONIALS[activeTestiIndex].author} 
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-neutral-800 object-cover"
                  />
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-white font-sans">{TESTIMONIALS[activeTestiIndex].author}</h5>
                    <p className="text-[8px] text-neutral-500 font-mono tracking-wider mt-0.5 uppercase">
                      {TESTIMONIALS[activeTestiIndex].role} · {TESTIMONIALS[activeTestiIndex].loc}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 9: REVOLUTIONARY SCHEDULER & BOOKING CONSOLE */}
          <div className="py-14 px-5 bg-black" ref={bookingFormRef} id="booking-sec">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-5 text-left flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-[#3CB944] font-mono uppercase tracking-widest font-black">Secure Pipeline Reservation</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-white mt-1 leading-none">
                    SCHEDULE YOUR PEST <span className="text-[#3CB944]">ERADICATION</span>
                  </h2>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Input coordinates to request same-day emergency dispatch. State verification is completed in real time.
                </p>

                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#3CB944]/10 text-[#3CB944] flex items-center justify-center shrink-0">
                      <Clock size={14} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase font-mono tracking-wider">Fast Check In 2-hr Bounds</h4>
                      <p className="text-[8.5px] text-neutral-500 font-mono">We confirm schedules within 120 minutes max.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#3CB944]/10 text-[#3CB944] flex items-center justify-center shrink-0">
                      <ShieldAlert size={14} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase font-mono tracking-wider">EPA bio-barrier formulas</h4>
                      <p className="text-[8.5px] text-neutral-500 font-mono">Low toxicity, non-staining, pet safe shields.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-neutral-950 border border-neutral-900 rounded-2xl p-5 text-left">
                {errorMessage && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-500 text-xs font-mono">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!bookingSuccess ? (
                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3 bg-[#030604]/50 p-1 rounded-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Your Full Name *</label>
                          <div className="relative">
                            <User size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                            <input
                              required
                              type="text"
                              placeholder="Jane Smith"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Contact Phone *</label>
                          <div className="relative">
                            <Phone size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                            <input
                              required
                              type="tel"
                              placeholder="+91 99999 00000"
                              value={formPhone}
                              onChange={(e) => setFormPhone(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Site Property Address *</label>
                        <div className="relative">
                          <MapPin size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                          <input
                            required
                            type="text"
                            placeholder="Flat A3, Greenwoods Apartment, Bengaluru"
                            value={formAddress}
                            onChange={(e) => setFormAddress(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Eradication service</label>
                          <select
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option>Residential Pest Control</option>
                            <option>Commercial Pest Control</option>
                            <option>Termite Treatment</option>
                            <option>Bed Bug Treatment</option>
                            <option>Cockroach & Ant Control</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Target Pest</label>
                          <select
                            value={formPest}
                            onChange={(e) => setFormPest(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option>Cockroaches</option>
                            <option>Mosquitoes</option>
                            <option>Bed Bugs</option>
                            <option>Spiders</option>
                            <option>Termites</option>
                            <option>Other / Not Sure</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Reservation Date *</label>
                          <input
                            required
                            type="date"
                            value={formDate}
                            onChange={(e) => setFormDate(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 px-3 text-xs text-white focus:outline-none font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Block Time Slot</label>
                          <select
                            value={formTime}
                            onChange={(e) => setFormTime(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          >
                            <option>8:00 AM – 10:00 AM</option>
                            <option>10:00 AM – 12:00 PM</option>
                            <option>12:00 PM – 2:00 PM</option>
                            <option>2:00 PM – 4:00 PM</option>
                            <option>4:00 PM – 6:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono uppercase text-neutral-400 font-bold">Special remarks</label>
                        <textarea
                          rows={2}
                          placeholder="Sightings mostly in crawlspaces. Beware of family cat."
                          value={formNotes}
                          onChange={(e) => setFormNotes(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#3CB944] rounded-lg p-2.5 text-xs text-white focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#3CB944] hover:bg-[#3CB944]/80 text-white font-mono text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-all mt-2"
                      >
                        LOCK RESERVATION SESSION
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      key="success-card"
                      initial={{ scale: 0.96 }}
                      animate={{ scale: 1 }}
                      className="p-5 border border-[#22c55e]/20 rounded-xl bg-[#030d06]/60 text-center flex flex-col items-center gap-3.5 relative z-10"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center text-[#22c55e]">
                        <CheckCircle2 size={22} />
                      </div>

                      <div>
                        <h4 className="text-[13px] font-black uppercase text-white tracking-tight">Eradication Session Registered</h4>
                        <p className="text-[8.5px] text-neutral-500 font-mono mt-1">SIMULATED SQL DATABASE SAVE SUCCESS</p>
                      </div>

                      <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-3 text-left w-full text-[10.5px] font-mono text-neutral-300 flex flex-col gap-1.5">
                        <div><span className="text-neutral-505">CLIENT PROFILE:</span> {formName}</div>
                        <div><span className="text-neutral-505">Target schedule:</span> {formDate} @ {formTime}</div>
                        <div><span className="text-neutral-505">Program type:</span> {formService} · target {formPest}</div>
                      </div>

                      <button
                        onClick={handleResetForm}
                        className="px-4 py-2 bg-neutral-905 hover:bg-neutral-800 text-[9px] text-[#3CB944] font-mono uppercase tracking-widest font-extrabold rounded-lg transition-colors border border-[#3CB944]/20 cursor-pointer"
                      >
                        Open fresh booking session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* SECTION 10: COMPREHENSIVE FOOTER & ADMIN PORTAL ENTRY */}
          <footer className="bg-neutral-950 border-t border-neutral-900 py-10 px-5 text-neutral-500 text-left">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-neutral-400">
              
              <div className="md:col-span-4 flex flex-col gap-3">
                <span className="font-sans font-black text-white text-xs tracking-wider uppercase">SECUR<span className="text-[#3CB944]">E</span> PEST</span>
                <p className="text-[10px] text-neutral-500 leading-relaxed max-w-xs font-sans">
                  Superior ecological pest barrier programs protecting real properties since 1999. ISO 9001 authorized license bounds.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2.5">
                <span className="text-[9px] uppercase font-mono text-[#3CB944] font-extrabold tracking-widest">Client Service Channels</span>
                <div className="flex flex-col gap-1.5 text-[10.5px] font-sans">
                  <div className="flex items-center gap-2"><PhoneCall size={11} className="text-[#3CB944]" /> +91 98765 43210 (Direct Dispatch)</div>
                  <div className="flex items-center gap-2"><MapPin size={11} className="text-[#3CB944]" /> 3rd Cross, Indiranagar, Bengaluru</div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2.5 text-right md:-mt-1">
                <span className="text-[9.5px] uppercase font-mono text-neutral-400">AUTHENTIC REQUISITIONS</span>
                <p className="text-[8.5px] text-neutral-600 leading-snug">
                  This interface coordinates directly to simulated state memory buffers modeling the standard Supabase DB backend metrics.
                </p>

                {/* Subtly disguised Administrator entry button */}
                <button 
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="font-mono text-[7px] text-neutral-750 hover:text-[#3CB944] uppercase tracking-widest text-left md:text-right mt-2 transition-colors inline-block"
                >
                  [ SYSTEMS ADMIN LOGIN ]
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-neutral-900 w-full max-w-5xl mx-auto my-6" />
            
            <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center text-[9px] font-mono uppercase text-neutral-600 gap-2">
              <span>© 2026 Pest Control Protective Services. All rights reserved.</span>
              <div className="flex gap-4">
                <span>Safe treatment warranty</span>
                <span>ISO certified</span>
              </div>
            </div>
          </footer>

        </div>
      )}

      {/* MODAL 1: AUTOPLAY YOUTUBE DEMO PLAYER */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center border border-neutral-800 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>

              <div className="p-4 border-b border-neutral-900 font-mono text-[9px] uppercase text-neutral-400">
                PROMOTIONAL PORTFOLIO VIDEO SIMULATION
              </div>

              {/* simulated placeholder visual so iframe runs fine */}
              <div className="aspect-video bg-neutral-900 flex flex-col justify-center items-center p-8 text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3CB944]/10 border border-[#3CB944]/40 flex items-center justify-center text-[#3CB944] animate-pulse">
                  <Play size={18} className="fill-current ml-0.5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest">Eradication Pipeline Demo active</h4>
                  <p className="text-[9px] text-neutral-500 max-w-xs uppercase mt-2 leading-relaxed">
                    [ Sandbox Simulation: In production environment this block plays the official corporate overview program ]
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SECURE SYSTEM AUTH LOGIN GATES */}
      <AnimatePresence>
        {isAdminLoginOpen && (
          <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4 text-left">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl max-w-xs w-full relative font-mono"
            >
              <button 
                type="button"
                onClick={() => setIsAdminLoginOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={14} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Lock size={15} className="text-[#3CB944]" />
                <span className="text-[10px] font-black uppercase text-white tracking-wider">SQL ACCESS CONTROL</span>
              </div>

              {adminLoginError && (
                <div className="mb-3.5 bg-red-500/10 border border-red-500/20 rounded p-2.5 text-red-500 text-[9px] uppercase leading-none">
                  {adminLoginError}
                </div>
              )}

              <form onSubmit={handleAdminVerify} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] text-neutral-500 uppercase font-black">Authentication Code</label>
                  <input
                    required
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="bg-black border border-neutral-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#3CB944]"
                  />
                  <p className="text-[8px] text-neutral-600 mt-1 uppercase">Try: Pest Control@Admin2024</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3CB944] hover:bg-[#3CB944]/80 text-black font-extrabold py-2.5 rounded text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Initiate connection
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
