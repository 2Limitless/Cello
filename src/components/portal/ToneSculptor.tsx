"use client";

import React from 'react';
import { ToneProfile } from '@/data/products';
import { Sparkles, Activity, Volume2, Zap, Flame, ShieldAlert } from 'lucide-react';

interface ToneSculptorProps {
  toneProfile: ToneProfile;
  onChange: (newProfile: ToneProfile) => void;
}

const ARCHETYPES = [
  {
    name: "Guarneri del Gesù",
    tagline: "Dark & Muscular Core",
    profile: { warmth: 95, projection: 96, brilliance: 86, responsiveness: 94 },
  },
  {
    name: "Antonio Stradivari",
    tagline: "Luminous & Piercing Silver",
    profile: { warmth: 88, projection: 98, brilliance: 97, responsiveness: 96 },
  },
  {
    name: "Domenico Montagnana",
    tagline: "Thunderous C-String Velvet",
    profile: { warmth: 98, projection: 92, brilliance: 82, responsiveness: 91 },
  },
  {
    name: "Nicolò Amati",
    tagline: "Sweet & Intimate Chamber",
    profile: { warmth: 96, projection: 84, brilliance: 85, responsiveness: 93 },
  },
  {
    name: "Virtuoso Soloist",
    tagline: "High-Octane Modern Projection",
    profile: { warmth: 90, projection: 99, brilliance: 94, responsiveness: 97 },
  },
];

export function ToneSculptor({ toneProfile, onChange }: ToneSculptorProps) {
  const current = toneProfile || { warmth: 85, projection: 85, brilliance: 85, responsiveness: 85 };

  const handleSlider = (key: keyof ToneProfile, value: number) => {
    onChange({
      ...current,
      [key]: value,
    });
  };

  const getTimbreDescription = () => {
    const { warmth, projection, brilliance, responsiveness } = current;
    if (warmth >= 90 && projection >= 90) return "Epic Soloist Authority · Dark, muscular velvet with hall-filling core projection.";
    if (brilliance >= 90 && projection >= 90) return "Brilliant Laser Focus · Silvery upper register that slices cleanly over orchestra.";
    if (warmth >= 92 && brilliance < 85) return "Deep Baroque/Venetian Velvet · Warm, woody chocolate timbre ideal for chamber sonatas.";
    return "Balanced Master Atelier Setup · Harmonious frequency balance and immediate bow sensitivity.";
  };

  return (
    <div className="bg-[#FAF8F2] border border-[#1A1A17]/15 rounded-2xl p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1A1A17]/10">
        <div>
          <div className="flex items-center gap-2 text-[#9B7E58] mb-1">
            <Activity size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Acoustic Tone Sculptor</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-[#1A1A17]">Instrument Acoustic Fingerprint</h4>
        </div>

        <div className="text-xs font-mono px-3 py-1 bg-white border border-[#1A1A17]/15 rounded-full text-[#9B7E58] font-bold self-start sm:self-auto">
          Overall Resonance: {Math.round((current.warmth + current.projection + current.brilliance + current.responsiveness) / 4)}/100
        </div>
      </div>

      {/* Preset Archetypes */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-2.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#9B7E58]" /> Quick Master Luthier Archetypes:
        </p>
        <div className="flex flex-wrap gap-2">
          {ARCHETYPES.map((arch) => (
            <button
              key={arch.name}
              type="button"
              onClick={() => onChange(arch.profile)}
              className="text-left px-3 py-1.5 bg-white hover:bg-[#1A1A17] hover:text-white border border-[#1A1A17]/20 rounded-lg text-xs transition-all cursor-pointer shadow-2xs group"
            >
              <span className="font-bold block">{arch.name}</span>
              <span className="text-[9.5px] text-[#1A1A17]/60 group-hover:text-white/70">{arch.tagline}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Warmth */}
        <div className="bg-white p-3.5 rounded-xl border border-[#1A1A17]/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#1A1A17] flex items-center gap-1.5">
              <Flame size={14} className="text-amber-600" /> Velvet Warmth (Low Register)
            </span>
            <span className="font-mono font-bold text-[#9B7E58] text-sm">{current.warmth}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={current.warmth}
            onChange={(e) => handleSlider('warmth', Number(e.target.value))}
            className="w-full accent-[#9B7E58] cursor-pointer"
          />
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-[#7A5B32]" style={{ width: `${current.warmth}%` }} />
          </div>
        </div>

        {/* Projection */}
        <div className="bg-white p-3.5 rounded-xl border border-[#1A1A17]/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#1A1A17] flex items-center gap-1.5">
              <Volume2 size={14} className="text-blue-600" /> Concert Projection (Hall Presence)
            </span>
            <span className="font-mono font-bold text-[#9B7E58] text-sm">{current.projection}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={current.projection}
            onChange={(e) => handleSlider('projection', Number(e.target.value))}
            className="w-full accent-[#9B7E58] cursor-pointer"
          />
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-700" style={{ width: `${current.projection}%` }} />
          </div>
        </div>

        {/* Brilliance */}
        <div className="bg-white p-3.5 rounded-xl border border-[#1A1A17]/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#1A1A17] flex items-center gap-1.5">
              <Sparkles size={14} className="text-yellow-500" /> Tonal Brilliance (Upper Harmonics)
            </span>
            <span className="font-mono font-bold text-[#9B7E58] text-sm">{current.brilliance}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={current.brilliance}
            onChange={(e) => handleSlider('brilliance', Number(e.target.value))}
            className="w-full accent-[#9B7E58] cursor-pointer"
          />
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-600" style={{ width: `${current.brilliance}%` }} />
          </div>
        </div>

        {/* Responsiveness */}
        <div className="bg-white p-3.5 rounded-xl border border-[#1A1A17]/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#1A1A17] flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-600" /> Left-Hand & Bow Responsiveness
            </span>
            <span className="font-mono font-bold text-[#9B7E58] text-sm">{current.responsiveness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={current.responsiveness}
            onChange={(e) => handleSlider('responsiveness', Number(e.target.value))}
            className="w-full accent-[#9B7E58] cursor-pointer"
          />
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-700" style={{ width: `${current.responsiveness}%` }} />
          </div>
        </div>
      </div>

      {/* Real-time Timbre Synthesis Analysis */}
      <div className="p-3.5 bg-[#FAF9F5] border border-[#9B7E58]/30 rounded-xl flex items-start gap-3 text-xs">
        <div className="w-6 h-6 rounded-full bg-[#9B7E58]/20 text-[#7A5B32] flex items-center justify-center shrink-0 mt-0.5 font-serif font-bold">
          ✦
        </div>
        <div>
          <span className="font-bold text-[#7A5B32] uppercase tracking-wider text-[10px] block mb-0.5">
            Acoustic Character Appraisal:
          </span>
          <p className="font-serif italic text-[#1A1A17]/80">{getTimbreDescription()}</p>
        </div>
      </div>
    </div>
  );
}
