"use client"

import type { CompatibilityResult, BirthChart } from "@/lib/astrology"
import { Heart, Brain, Flame, MessageCircle, AlertTriangle, Sparkles } from "lucide-react"

interface CompatibilityResultsProps {
  result: CompatibilityResult
  person1: BirthChart
  person2: BirthChart
}

export function CompatibilityResults({ result, person1, person2 }: CompatibilityResultsProps) {
  // Determine overall status based on score
  let statusColor = "text-emerald-500"
  let statusGlow = "shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  if (result.overallScore < 70) {
    statusColor = "text-yellow-500"
    statusGlow = "shadow-[0_0_30px_rgba(234,179,8,0.3)]"
  }
  if (result.overallScore < 50) {
    statusColor = "text-orange-500"
    statusGlow = "shadow-[0_0_30px_rgba(249,115,22,0.3)]"
  }

  // Icons for categories
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Emotional": return <Heart className="w-5 h-5 text-pink-500" />
      case "Intellectual": return <Brain className="w-5 h-5 text-blue-500" />
      case "Physical": return <Flame className="w-5 h-5 text-red-500" />
      case "Communication": return <MessageCircle className="w-5 h-5 text-cyan-500" />
      default: return <Sparkles className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header Match Score */}
      <section className="text-center cosmic-card p-10 rounded-3xl border-primary/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-3xl font-serif font-bold mb-8">Cosmic Connection</h2>

        <div className="flex items-center justify-center gap-6 md:gap-12 mb-12">
          {/* Person 1 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-[#0F0F23] border border-border flex items-center justify-center text-4xl mb-3 glow-primary">
              {person1.sunSign.emoji}
            </div>
            <div className="font-serif font-bold text-lg">Person A</div>
            <div className="text-sm text-primary">{person1.sunSign.name}</div>
          </div>

          {/* Score Circle */}
          <div className="relative">
            <div className={`w-32 h-32 rounded-full bg-[#0F0F23] flex items-center justify-center border-4 border-border/50 ${statusGlow}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${statusColor}`}>{result.overallScore}%</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">Match</div>
              </div>
            </div>
            {/* SVG Ring Animation */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * result.overallScore) / 100}
                className={`${statusColor} opacity-50`}
                style={{ transition: "stroke-dashoffset 2s ease-out" }}
              />
            </svg>
          </div>

          {/* Person 2 */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-[#0F0F23] border border-border flex items-center justify-center text-4xl mb-3 glow-accent">
              {person2.sunSign.emoji}
            </div>
            <div className="font-serif font-bold text-lg">Person B</div>
            <div className="text-sm text-accent">{person2.sunSign.name}</div>
          </div>
        </div>

        <p className="text-lg text-foreground/90 max-w-2xl mx-auto leading-relaxed font-light">
          {result.summary}
        </p>
      </section>

      {/* Category Breakdown */}
      <section>
        <h3 className="text-2xl font-serif font-bold mb-6 text-center">Compatibility Dimensions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {result.categories.map((cat, i) => (
            <div key={cat.name} className="cosmic-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F0F23] border border-border/50 flex items-center justify-center">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <h4 className="font-bold text-lg">{cat.name}</h4>
                </div>
                <div className="text-xl font-bold" style={{ color: `hsl(${cat.score * 1.2}, 70%, 50%)` }}>
                  {cat.score}%
                </div>
              </div>
              
              <div className="h-1.5 w-full bg-[#0F0F23] rounded-full overflow-hidden mb-4 border border-border/30">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${cat.score}%`, 
                    backgroundColor: `hsl(${cat.score * 1.2}, 70%, 50%)` 
                  }}
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths & Challenges */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="cosmic-card p-6 rounded-2xl border-emerald-500/20">
          <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5" /> Cosmic Strengths
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((str, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cosmic-card p-6 rounded-2xl border-orange-500/20">
          <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2 text-orange-400">
            <AlertTriangle className="w-5 h-5" /> Areas for Growth
          </h3>
          <ul className="space-y-3">
            {result.challenges.map((str, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
