"use client";

import { motion } from "framer-motion";
import { Home, Music, PenTool, Users } from "lucide-react";

export function NavDock({ activeOverlay, setActiveOverlay }: { activeOverlay: string | null, setActiveOverlay: (v: string | null) => void }) {
  const tabs = [
    { id: null, label: "Hub", icon: Home },
    { id: "instruments", label: "Instruments", icon: Music },
    { id: "services", label: "Services", icon: PenTool },
    { id: "about", label: "Heritage", icon: Users },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300]">
      <div className="glass-panel rounded-full px-2 py-2 flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeOverlay === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id === null ? "hub" : tab.id}
              onClick={() => setActiveOverlay(tab.id)}
              className="relative px-6 py-3 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans transition-colors duration-300 hover:text-white"
              style={{ color: isActive ? "#fff" : "rgba(255, 255, 255, 0.5)" }}
            >
              {isActive && (
                <motion.div
                  layoutId="liquid-nav-blob"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={14} />
                <span className="hidden md:inline">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
