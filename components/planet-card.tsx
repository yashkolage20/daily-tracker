"use client"

import { Star, Home, Calendar, MapPin, Loader2 } from "lucide-react"
import type { PlanetPlacement } from "@/lib/astrology"

interface PlanetCardProps {
  placement: PlanetPlacement
  delay: number
}

export function PlanetCard({ placement, delay }: PlanetCardProps) {
  const { planet, sign, house, degree, interpretation } = placement
  
  // Set glow color based on the sign's element
  let glowClass = "glow-primary border-primary/30"
  if (sign.element === "Fire") glowClass = "shadow-[0_0_15px_rgba(239,68,68,0.2)] border-red-500/30"
  if (sign.element === "Earth") glowClass = "shadow-[0_0_15px_rgba(34,197,94,0.2)] border-green-500/30"
  if (sign.element === "Wait") glowClass = "shadow-[0_0_15px_rgba(6,182,212,0.2)] border-cyan-500/30"
  if (sign.element === "Air") glowClass = "shadow-[0_0_15px_rgba(59,130,246,0.2)] border-blue-500/30"

  // Special styling for the "Big Three"
  const isBigThree = ["Sun", "Moon"].includes(planet.name)
  
  return (
    <div 
      className={`cosmic-card rounded-2xl p-6 h-full flex flex-col transition-transform hover:scale-[1.02] animate-fade-in-up ${
        isBigThree ? glowClass + ' bg-primary/5' : 'border-border/40'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-[#0F0F23] border border-border/50`}>
            {planet.symbol}
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">{planet.name}</h3>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{planet.keywords.slice(0, 2).join(" • ")}</div>
          </div>
        </div>
        <div className="text-3xl opacity-80" title={sign.name}>{sign.emoji}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#0F0F23]/60 rounded-lg p-3 flex flex-col items-center justify-center text-center border border-border/30">
          <Star className="w-4 h-4 text-accent mb-1" />
          <div className="text-[10px] uppercase text-muted-foreground font-semibold">Sign</div>
          <div className="font-medium text-sm">{sign.name}</div>
        </div>
        <div className="bg-[#0F0F23]/60 rounded-lg p-3 flex flex-col items-center justify-center text-center border border-border/30">
          <Home className="w-4 h-4 text-primary mb-1" />
          <div className="text-[10px] uppercase text-muted-foreground font-semibold">House</div>
          <div className="font-medium text-sm">{house}{[1, 21, 31].includes(house) ? 'st' : [2, 22].includes(house) ? 'nd' : [3, 23].includes(house) ? 'rd' : 'th'}</div>
        </div>
      </div>
      
      <div className="mt-auto">
        <p className="text-sm leading-relaxed text-foreground/80 font-light">
          {interpretation}
        </p>
      </div>
      
      <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/40 font-semibold">
        {degree}°
      </div>
    </div>
  )
}
