"use client";

import { motion, Variants } from "framer-motion";
import { X, Check } from "lucide-react";

const overlayVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { 
    opacity: 1, 
    y: "0%", 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    y: "100%", 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function InstrumentsOverlay({ close }: { close: () => void }) {
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-40 bg-background-dark/95 backdrop-blur-2xl overflow-y-auto px-6 py-24 pb-48"
    >
      <button
        onClick={close}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        aria-label="Close Collection"
      >
        <X size={20} />
      </button>
      <div className="max-w-6xl mx-auto">
        <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-7xl text-white mb-4 pb-2">The Collection</motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 font-sans tracking-widest uppercase text-sm mb-16">
          Violins, Violas, Cellos & Basses
        </motion.p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Violins", "Violas", "Cellos", "Basses"].map((item, i) => (
            <div key={item} className={`glass-panel p-8 rounded-3xl flex flex-col justify-end min-h-[300px] group cursor-pointer transition-all hover:bg-white/10 ${i === 2 ? "md:col-span-2 md:row-span-2 min-h-[616px]" : ""}`}>
              <div className="font-serif text-3xl text-white group-hover:-translate-y-2 transition-transform duration-500">
                {item}
              </div>
              <div className="h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700 mt-4" />
            </div>
          ))}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-end min-h-[300px] md:col-span-2 group cursor-pointer hover:bg-white/10">
            <div className="font-serif text-3xl text-white group-hover:-translate-y-2 transition-transform duration-500">
              Fine Bows & Accessories
            </div>
            <div className="h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700 mt-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ServicesOverlay({ close }: { close: () => void }) {
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-40 bg-background-dark/95 backdrop-blur-2xl overflow-y-auto px-6 py-24 pb-48"
    >
      <button
        onClick={close}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        aria-label="Close Services"
      >
        <X size={20} />
      </button>
      <div className="max-w-6xl mx-auto">
        <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-7xl text-white mb-4 pb-2">Luthier Services</motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 font-sans tracking-widest uppercase text-sm mb-16">
          Exquisite work, Prompt turnaround
        </motion.p>

        <div className="relative mb-24 overflow-hidden rounded-3xl p-8 md:p-16 border border-white/10 bg-black/50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[200px] opacity-[0.03] uppercase font-black font-sans pointer-events-none whitespace-nowrap">
            Unmatched
          </div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-red-400/80 mb-8 pb-2 border-b border-red-500/20">The Industry Standard</h3>
              <ul className="space-y-4">
                {["Outsourced bow rehairing", "Generic setup and bridging", "Long wait times", "Depreciating trade-ins"].map((t) => (
                  <li key={t} className="flex items-center gap-4 text-white/50 font-sans text-sm">
                    <X size={16} className="text-red-500/50" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-accent mb-8 pb-2 border-b border-accent/20">The Lane & Edwards Standard</h3>
              <ul className="space-y-4">
                {["In-house master rehairing", "Customized acoustic adjustments", "Prompt, reliable turnaround", "100% purchase trade-in credit"].map((t) => (
                  <li key={t} className="flex items-center gap-4 text-white font-sans text-sm">
                    <Check size={16} className="text-accent" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeritageOverlay({ close }: { close: () => void }) {
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-40 bg-background-dark/95 backdrop-blur-2xl overflow-y-auto px-6 py-24 pb-48"
    >
      <button
        onClick={close}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
        aria-label="Close Heritage"
      >
        <X size={20} />
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={itemVariants} className="w-16 h-16 mx-auto bg-white/5 rounded-full mb-8 flex items-center justify-center border border-white/10">
          <span className="font-serif text-2xl text-accent italic">L&E</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-7xl text-white mb-12 pb-4">Our Heritage</motion.h2>
        
        <motion.div variants={itemVariants} className="prose prose-invert prose-lg mx-auto text-white/70 font-sans font-light leading-relaxed">
          <p className="mb-6 text-xl">
            After decades of pairing musicians with quality instruments, offering generous rental credits, and friendly service to all, teachers continue to insist on the knowledge and experience offered by Mark Edwards and Matt Lane.
          </p>
          <p className="mb-6">
            Enthusiasts and professionals alike trust Lane & Edwards for exquisite work, prompt turnaround, and unmatched dedication. We believe that every instrument holds a unique voice, waiting to be drawn out by the right hands.
          </p>
          <div className="mt-16 inline-block">
            <div className="text-3xl font-serif italic text-white/40 mb-2 font-light">Mark Edwards & Matt Lane</div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
