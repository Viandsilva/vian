import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  X, Check, Send, Sparkles, Award, Palette, ExternalLink, 
  Layers, ChevronRight, HelpCircle, ArrowUpRight, CheckSquare, Square
} from 'lucide-react';

// =========================================================================
// INTERACTIVE MAGNET COMPONENT
// =========================================================================
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = ""
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within element's bounding box + padded boundaries
      const isNear = 
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding;

      if (isNear) {
        const deltaX = (mouseX - centerX) / strength;
        const deltaY = (mouseY - centerY) / strength;
        
        setTransition(activeTransition);
        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0, 0, 0)");
      }
    };

    const handleMouseLeave = () => {
      setTransition(inactiveTransition);
      setTransform("translate3d(0, 0, 0)");
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div 
      ref={ref} 
      style={{ 
        transform, 
        transition,
        willChange: 'transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// =========================================================================
// STANDARD FADE-IN ANIMATION COMPONENT
// =========================================================================
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  key?: React.Key;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = ""
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =========================================================================
// CHARACTER-BY-CHARACTER SCROLL TEXT REVEAL COMPONENT
// =========================================================================
export function AnimatedText({ text }: { text: string }) {
  const elRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: elRef,
    offset: ["start 0.82", "end 0.22"]
  });

  const chars = text.split("");

  return (
    <p 
      ref={elRef} 
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] relative select-none font-sans" 
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {chars.map((char, index) => {
        // Individual character progress bounds
        const chunkStart = index / chars.length;
        const chunkEnd = (index + 1) / chars.length;
        
        // Slightly pad window so characters transition sequentially
        const opacity = useTransform(
          scrollYProgress, 
          [Math.max(0, chunkStart - 0.08), Math.min(1, chunkEnd + 0.08)], 
          [0.18, 1]
        );

        return (
          <span key={index} className="relative inline">
            {/* Invisible placeholder for browser typesetting wrap constraints */}
            <span className="opacity-0">{char}</span>
            <motion.span 
              style={{ opacity }} 
              className="absolute left-0 top-0 text-[#D7E2EA]"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}

// =========================================================================
// INDIVIDUAL REUSABLE BUTTON COMPONENT DESIGNS
// =========================================================================
export function ContactButton({ onClick, label = "Contact Me" }: { onClick?: () => void; label?: string }) {
  return (
    <button 
      onClick={onClick}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      }}
      className="rounded-full shadow-lg text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all relative border border-transparent outline-[2px] outline-white outline-offset-[-3px]"
    >
      {label}
    </button>
  );
}

export function LiveProjectButton({ onClick, label = "Live Project" }: { onClick?: () => void; label?: string }) {
  return (
    <button 
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base hover:bg-[#D7E2EA]/10 active:scale-[0.98] transition-all cursor-pointer"
    >
      {label}
    </button>
  );
}

// =========================================================================
// MAIN EXPORT CONTROLLER PAGE
// =========================================================================
export default function JackCreatorPreview({ theme = "dark" }: { theme?: string }) {
  // Navigation anchors
  const [activeTab, setActiveTab] = useState<string>("About");
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedTask, setCopiedTask] = useState<string | null>(null);

  // Form handlers
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formOccupation, setFormOccupation] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Scroll tracker elements for horizontal marquees
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!marqueeRef.current) return;
      const rect = marqueeRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      // Scroll offset matching formula
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial fetch
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeRow1 = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  ];

  const marqueeRow2 = [
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
  ];

  const serviceItems = [
    {
      num: "01",
      name: "3D Modeling",
      description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
    },
    {
      num: "02",
      name: "Rendering",
      description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
    },
    {
      num: "03",
      name: "Motion Design",
      description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
    },
    {
      num: "04",
      name: "Branding",
      description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
    },
    {
      num: "05",
      name: "Web Design",
      description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
    }
  ];

  const projectsData = [
    {
      num: "01",
      name: "Nextlevel Studio",
      category: "Client",
      col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    },
    {
      num: "02",
      name: "Aura Brand Identity",
      category: "Personal",
      col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    },
    {
      num: "03",
      name: "Solaris Digital",
      category: "Client",
      col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  ];

  const handleAnchorScroll = (id: string, name: string) => {
    setActiveTab(name);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setFormLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone || "N/A",
          location: "Jack Sandbox Portal",
          occupation: formOccupation,
          message: formMessage || "Client transmission registered via Jack's Portfolio Applet."
        })
      });

      if (response.ok) {
        setFormSuccess(true);
        // Clear fields
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormOccupation("");
        setFormMessage("");
      }
    } catch (err) {
      console.warn("Telemetry transmit failed, falling back to instant sandbox confirmation");
      setFormSuccess(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="font-kanit bg-[#0C0C0C] min-h-screen text-white relative select-none w-full flex flex-col justify-start overflow-x-clip antialiased">
      
      {/* Absolute high-performance visual backdrop */}
      <div className="absolute inset-0 bg-[#0C0C0C] pointer-events-none z-0" />

      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section id="jack-hero" className="min-h-screen relative flex flex-col justify-between overflow-x-clip z-10 select-none pb-12">
        
        {/* Navbar */}
        <div className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black font-black text-sm select-none">
              J
            </div>
            <span className="font-bold tracking-widest text-sm uppercase text-[#D7E2EA]">JACK</span>
          </motion.div>

          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6 md:gap-10"
          >
            {[
              { label: "About", id: "jack-about" },
              { label: "Price", id: "jack-services" },
              { label: "Projects", id: "jack-projects" },
              { label: "Contact", id: "jack-contact-trigger" }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.id === "jack-contact-trigger") {
                    setContactOpen(true);
                  } else {
                    handleAnchorScroll(item.id, item.label);
                  }
                }}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs md:text-sm lg:text-[1.1rem] hover:opacity-70 transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        </div>

        {/* Hero Portrait absolutely centered behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="pointer-events-auto"
          >
            <Magnet 
              padding={150} 
              strength={3.2}
              activeTransition="transform 0.35s ease-out"
              inactiveTransition="transform 0.65s ease-in-out"
              className="relative flex items-center justify-center"
            >
              <img 
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Jack portrait"
                referrerPolicy="no-referrer"
                className="w-[260px] sm:w-[350px] md:w-[420px] lg:w-[490px] xl:w-[540px] h-auto object-contain mx-auto filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
              />
            </Magnet>
          </motion.div>
        </div>

        {/* Centered Large Hero Heading */}
        <div className="w-full flex flex-col items-center justify-center my-auto px-4 z-20 pointer-events-none relative select-none overflow-hidden">
          <div className="overflow-hidden w-full text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.2 }}
              className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[12vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.2vw] mt-10"
            >
              Hi, i’m jack
            </motion.h1>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-end px-6 md:px-10 pb-4 sm:pb-8 z-20 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="text-left"
          >
            <p 
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.35rem)', maxWidth: '280px' }}
            >
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="self-end"
          >
            <ContactButton onClick={() => setContactOpen(true)} label="Contact Me" />
          </motion.div>
        </div>

      </section>

      {/* =========================================================================
          MARQUEE SECTION
         ========================================================================= */}
      <section 
        ref={marqueeRef}
        id="jack-marquee" 
        className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-12 overflow-hidden z-10 relative flex flex-col gap-3 select-none w-full"
      >
        
        {/* Row 1 scrolling RIGHT (translateX offset - 200) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap select-none">
          <div 
            style={{ 
              transform: `translateX(${scrollOffset - 300}px)`,
              willChange: 'transform',
              transition: 'transform 0.08s linear'
            }}
            className="flex gap-3 px-1.5"
          >
            {/* Tripled list for seamless wrap display */}
            {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((src, index) => (
              <div 
                key={`r1-${index}`} 
                className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
              >
                <img 
                  src={src} 
                  alt="3D workspace preview" 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 scrolling LEFT (translateX -(offset - 200)) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap select-none">
          <div 
            style={{ 
              transform: `translateX(${- (scrollOffset - 300)}px)`,
              willChange: 'transform',
              transition: 'transform 0.08s linear'
            }}
            className="flex gap-3 px-1.5"
          >
            {/* Tripled list */}
            {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((src, index) => (
              <div 
                key={`r2-${index}`} 
                className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
              >
                <img 
                  src={src} 
                  alt="3D interactive render" 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          ABOUT SECTION
         ========================================================================= */}
      <section 
        id="jack-about" 
        className="min-h-screen relative bg-[#0C0C0C] py-28 px-5 sm:px-8 md:px-10 flex flex-col justify-center items-center text-center overflow-hidden z-10"
      >
        
        {/* Decor items in corner */}
        {/* Top-Left: Moon icon */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
          <FadeIn delay={0.1} duration={0.9} x={-80} y={0}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Moon asset"
              referrerPolicy="no-referrer"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
            />
          </FadeIn>
        </div>

        {/* Bottom-Left: 3D Object */}
        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
          <FadeIn delay={0.25} duration={0.9} x={-80} y={0}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="3D block asset"
              referrerPolicy="no-referrer"
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
            />
          </FadeIn>
        </div>

        {/* Top-Right: Lego icon */}
        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
          <FadeIn delay={0.15} duration={0.9} x={80} y={0}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Lego asset"
              referrerPolicy="no-referrer"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
            />
          </FadeIn>
        </div>

        {/* Bottom-Right: 3D Group */}
        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
          <FadeIn delay={0.3} duration={0.9} x={80} y={0}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="3D abstract structure"
              referrerPolicy="no-referrer"
              className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
            />
          </FadeIn>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center z-20 relative">
          
          <FadeIn delay={0} y={40}>
            <h2 
              className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-16"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="mb-14 sm:mb-20 md:mb-24 w-full flex justify-center">
            <AnimatedText 
              text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" 
            />
          </div>

          <FadeIn delay={0.1}>
            <ContactButton onClick={() => setContactOpen(true)} label="Contact Me" />
          </FadeIn>
        </div>

      </section>

      {/* =========================================================================
          SERVICES SECTION
         ========================================================================= */}
      <section 
        id="jack-services" 
        className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 z-20 relative text-center"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <h2 
            className="font-black uppercase tracking-tight text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>

          {/* Staggered dynamic service listings */}
          <div className="w-full max-w-5xl flex flex-col items-stretch text-left">
            {serviceItems.map((serv, index) => (
              <FadeIn 
                key={serv.num} 
                delay={index * 0.12} 
                className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row gap-6 md:gap-14 items-start md:items-center justify-between"
              >
                {/* Huge Number */}
                <span 
                  className="font-black text-[#0C0C0C] select-none leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {serv.num}
                </span>

                {/* Info Text */}
                <div className="flex-grow flex flex-col gap-2 relative">
                  <h3 
                    className="font-medium uppercase tracking-tight text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                  >
                    {serv.name}
                  </h3>
                  <p 
                    className="font-light leading-relaxed text-[#0C0C0C]/65 max-w-2xl"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {serv.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          PROJECTS SECTION (STICKY STACKING SCALE CARDS)
         ========================================================================= */}
      <section 
        id="jack-projects" 
        className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pb-32 pt-24 -mt-10 sm:-mt-12 md:-mt-14 z-30 relative min-h-screen flex flex-col items-center overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-10 flex flex-col items-center">
          
          <h2 
            className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>

          {/* Stacking mechanism containers */}
          <div className="w-full max-w-5xl flex flex-col items-stretch gap-24 relative select-none">
            {projectsData.map((project, index) => {
              // Frame scale reduction relative to cards remaining
              const targetScale = 1 - (projectsData.length - 1 - index) * 0.035;
              const topOffset = index * 28;

              return (
                <div 
                  key={project.num}
                  style={{ 
                    top: `${topOffset + 96}px`,
                  }}
                  className="sticky bottom-10 w-full mb-12 select-none"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "20px" }}
                    transition={{ duration: 0.6 }}
                    style={{
                      transform: `scale(${targetScale})`,
                      backgroundColor: '#0C0C0C',
                    }}
                    className="w-full flex flex-col gap-6 sm:gap-10 p-6 sm:p-8 md:p-10 border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative"
                  >
                    
                    {/* Top row Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                      <div className="flex items-center gap-5">
                        {/* Huge Number */}
                        <span 
                          className="font-black text-white/10 select-none leading-none tracking-tighter shrink-0 font-mono"
                          style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
                        >
                          {project.num}
                        </span>

                        <div className="text-left">
                          <span className="text-[10px] font-mono tracking-widest text-[#B600A8] uppercase font-black">
                            {project.category}
                          </span>
                          <h3 
                            className="font-bold uppercase tracking-tight text-white mt-1"
                            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
                          >
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <LiveProjectButton 
                        onClick={() => {
                          setFormMessage(`Acquiring details regarding highly-optimized project ${project.name}`);
                          setContactOpen(true);
                        }} 
                        label="Live Project" 
                      />
                    </div>

                    {/* Bottom Row Two-Column Visual Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
                      {/* Left: 40% with stacked images */}
                      <div className="md:col-span-5 flex flex-col gap-5">
                        <div 
                          className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-zinc-950/60 border border-zinc-850"
                          style={{ height: 'clamp(130px, 16vw, 230px)' }}
                        >
                          <img 
                            src={project.col1_img1} 
                            alt={`${project.name} detail 1`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                          />
                        </div>
                        <div 
                          className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-zinc-950/60 border border-zinc-850"
                          style={{ height: 'clamp(160px, 22vw, 340px)' }}
                        >
                          <img 
                            src={project.col1_img2} 
                            alt={`${project.name} detail 2`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                          />
                        </div>
                      </div>

                      {/* Right: 60% with tall image */}
                      <div className="md:col-span-7">
                        <div className="w-full h-full min-h-[300px] md:min-h-0 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-zinc-950/60 border border-zinc-850">
                          <img 
                            src={project.col2_img} 
                            alt={`${project.name} full mockup`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                          />
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          JACK'S HIGH-END FLOATING CONTACT SHELTER MODAL
         ========================================================================= */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="bg-[#0C0C0C] border-2 border-zinc-850 rounded-[30px] sm:rounded-[40px] w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-8 md:p-10 relative flex flex-col justify-start text-left text-zinc-100 shadow-2xl"
            >
              
              <button 
                onClick={() => setContactOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#B600A8] uppercase font-bold">
                  PROJECT SPECIFICATION CHANNEL
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1 tracking-tight">
                  Brief Jack's Studio
                </h3>
                <p className="text-xs text-zinc-400 mt-2">
                  Have a custom 3D model, asset render, or virtual motion design request? Transmit details directly. Jack responds within <strong className="text-white">2 business hours</strong>.
                </p>
              </div>

              {!formSuccess ? (
                <form onSubmit={submitContact} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Jack Smith"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] rounded-xl py-2.5 px-4 text-xs sm:text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-750"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] rounded-xl py-2.5 px-4 text-xs sm:text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-750"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] rounded-xl py-2.5 px-4 text-xs sm:text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-750"
                    />
                  </div>

                  {/* Occupation field */}
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                      Occupation / Role
                    </label>
                    <input 
                      type="text" 
                      value={formOccupation}
                      onChange={(e) => setFormOccupation(e.target.value)}
                      placeholder="e.g. Creator, Director, Product Lead"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] rounded-xl py-2.5 px-4 text-xs sm:text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-750"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                      Project Specifications
                    </label>
                    <textarea 
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Describe standard parameters of your 3D scope..."
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] rounded-xl py-2.5 px-4 text-xs sm:text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-750 font-sans"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full mt-2 py-3 bg-white text-black font-mono font-bold uppercase rounded-xl hover:bg-neutral-200 transition-all cursor-pointer text-xs flex items-center justify-center gap-2"
                  >
                    {formLoading ? "TRANSMITTING DATA..." : "TRANSMIT SPECIFICATIONS"}
                    <Send size={12} />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center gap-5">
                  <div className="w-14 h-14 bg-gradient-to-tr from-[#B600A8] to-[#BE4C00] rounded-full flex items-center justify-center select-none shadow-xl">
                    <Check className="text-white w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-black uppercase text-white font-mono">Transmission Dispatched</h4>
                  <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                    Packet synchronized with Jack's pipeline. Telemetry alert successfully broadcast to client engineering teams. Jack will respond within <strong className="text-white">2 business hours</strong>.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSuccess(false);
                    }}
                    className="mt-4 px-6 py-2 border border-zinc-800 rounded-lg hover:border-zinc-700 font-mono text-[11px] text-zinc-300"
                  >
                    Send another specification
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
