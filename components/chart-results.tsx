"use client"

import { PlanetCard } from "@/components/planet-card"
import type { BirthChart } from "@/lib/astrology"

interface ChartResultsProps {
  chart: BirthChart
}

export function ChartResults({ chart }: ChartResultsProps) {
  // Sort placements logically: Sun, Moon, Rising (Ascendant equivalents), then planets in order
  const bigThree = [
    chart.placements.find(p => p.planet.name === "Sun"),
    chart.placements.find(p => p.planet.name === "Moon"),
  ].filter(Boolean) as typeof chart.placements

  const otherPlanets = chart.placements.filter(
    p => p.planet.name !== "Sun" && p.planet.name !== "Moon"
  )

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Big Three Header Section */}
      <section className="text-center cosmic-card p-10 rounded-3xl border-primary/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="text-9xl">{chart.sunSign.emoji}</span>
        </div>
        
        <h2 className="text-3xl font-serif font-bold mb-8 relative z-10">Your Cosmic Core</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10 text-center">
          <div>
            <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-2">Sun Sign</div>
            <div className="text-4xl mb-2">{chart.sunSign.emoji}</div>
            <div className="text-2xl font-serif font-bold text-primary glow-text-primary">{chart.sunSign.name}</div>
          </div>
          
          <div className="hidden md:block w-px h-24 bg-border/50"></div>
          
          <div>
            <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-2">Moon Sign</div>
            <div className="text-4xl mb-2">{chart.moonSign.emoji}</div>
            <div className="text-2xl font-serif font-bold text-blue-400 glow-text-accent" style={{ textShadow: "0 0 20px rgba(96,165,250,0.4)" }}>{chart.moonSign.name}</div>
          </div>
          
          <div className="hidden md:block w-px h-24 bg-border/50"></div>
          
          <div>
            <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-2">Rising Sign</div>
            <div className="text-4xl mb-2">{chart.risingSign.emoji}</div>
            <div className="text-2xl font-serif font-bold text-emerald-400" style={{ textShadow: "0 0 20px rgba(52,211,153,0.4)" }}>{chart.risingSign.name}</div>
          </div>
        </div>
      </section>

      {/* Breakdown grids */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Elements */}
        <section className="cosmic-card p-8 rounded-2xl border-border/30">
          <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
            Elemental Balance
          </h3>
          <div className="space-y-4">
            {Object.entries(chart.elementDistribution).map(([element, count]) => {
              const maxCount = Math.max(...Object.values(chart.elementDistribution))
              const percentage = maxCount === 0 ? 0 : (count / 10) * 100 // 10 placements total
              
              let bg = "bg-primary"
              if (element === "Fire") bg = "bg-red-500"
              if (element === "Earth") bg = "bg-green-500"
              if (element === "Air") bg = "bg-blue-500"
              if (element === "Water") bg = "bg-cyan-500"

              return (
                <div key={element}>
                  <div className="flex justify-between text-sm mb-1.5 font-medium">
                    <span>{element}</span>
                    <span className="text-muted-foreground">{count} placements</span>
                  </div>
                  <div className="h-2 bg-[#0F0F23] rounded-full overflow-hidden border border-border/30">
                    <div 
                      className={`h-full ${bg} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Modalities */}
        <section className="cosmic-card p-8 rounded-2xl border-border/30">
          <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
            Modality Balance
          </h3>
          <div className="space-y-4">
            {Object.entries(chart.modalityDistribution).map(([modality, count]) => {
              const percentage = (count / 10) * 100
              
              let bg = "bg-primary"
              if (modality === "Cardinal") bg = "bg-accent"
              if (modality === "Fixed") bg = "bg-purple-500"
              if (modality === "Mutable") bg = "bg-emerald-500"

              return (
                <div key={modality}>
                  <div className="flex justify-between text-sm mb-1.5 font-medium">
                    <span>{modality}</span>
                    <span className="text-muted-foreground">{count} placements</span>
                  </div>
                  <div className="h-2 bg-[#0F0F23] rounded-full overflow-hidden border border-border/30">
                    <div 
                      className={`h-full ${bg} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Planet Grid */}
      <section>
        <h2 className="text-3xl font-serif font-bold mb-8 text-center">Planetary Placements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bigThree.map((p, i) => (
            <PlanetCard key={p.planet.name} placement={p} delay={i * 100} />
          ))}
          {otherPlanets.map((p, i) => (
            <PlanetCard key={p.planet.name} placement={p} delay={(i + 2) * 100} />
          ))}
        </div>
      </section>
    </div>
  )
}
