"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ZODIAC_SIGNS, getSignByName } from "@/lib/zodiac"
import { HoroscopeCard, type HoroscopeData } from "@/components/horoscope-card"
import { Navigation } from "@/components/navigation"
import { Calendar } from "lucide-react"

type Timeframe = "daily" | "weekly" | "monthly"

function HoroscopesContent() {
  const searchParams = useSearchParams()
  const initialSign = searchParams.get("sign") || "aries"
  
  const [selectedSign, setSelectedSign] = useState(initialSign)
  const [timeframe, setTimeframe] = useState<Timeframe>("daily")
  const [data, setData] = useState<HoroscopeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeSign = getSignByName(selectedSign) || ZODIAC_SIGNS[0]

  useEffect(() => {
    async function fetchHoroscope() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/horoscope?sign=${selectedSign}&timeframe=${timeframe}`)
        if (!res.ok) throw new Error("Failed to fetch horoscope")
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError("The stars are clouded right now. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHoroscope()
  }, [selectedSign, timeframe])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card text-sm font-medium mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-foreground/90">Cosmic Forecast</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Horoscope</h1>
            <p className="text-muted-foreground text-lg">Select a sign and timeframe to reveal your astrological insights.</p>
          </div>

          {/* Zodiac Selector Horizontal Scroll */}
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-6 px-6 sm:mx-0 sm:px-0 gap-3 scrollbar-hide snap-x animate-fade-in-up animate-delay-100">
            {ZODIAC_SIGNS.map((sign) => {
              const isSelected = selectedSign === sign.name.toLowerCase()
              return (
                <button
                  key={sign.name}
                  onClick={() => setSelectedSign(sign.name.toLowerCase())}
                  className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl transition-all snap-center ${
                    isSelected 
                      ? "bg-primary/20 border-primary/50 text-white scale-105 shadow-[0_0_15px_rgba(124,58,237,0.3)]" 
                      : "bg-[#1B1B30]/50 text-muted-foreground hover:bg-[#1B1B30] border-transparent"
                  } border`}
                >
                  <span className="text-2xl mb-1">{sign.emoji}</span>
                  <span className="text-xs font-semibold">{sign.name}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Sign Details */}
            <div className="md:col-span-1 space-y-6 animate-fade-in-up animate-delay-200">
              <div className="cosmic-card p-6 rounded-2xl text-center">
                <div className="text-6xl mb-4">{activeSign.emoji}</div>
                <h2 className="text-2xl font-serif font-bold mb-1">{activeSign.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">{activeSign.dateRange}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className={`text-xs px-2 py-1 rounded-md bg-background border border-border font-medium`} style={{ color: "var(--primary)" }}>
                    {activeSign.element}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-md bg-background border border-border font-medium text-foreground/80">
                    {activeSign.modality}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-md bg-background border border-border font-medium text-foreground/80">
                    {activeSign.rulingPlanet}
                  </span>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed font-light">
                  {activeSign.description}
                </p>
              </div>
            </div>

            {/* Right Column: Horoscope Content */}
            <div className="md:col-span-2 flex flex-col animate-fade-in-up animate-delay-300">
              {/* Tabs */}
              <div className="flex p-1 bg-[#131328] rounded-xl mb-6 border border-border/40">
                {(["daily", "weekly", "monthly"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold capitalize transition-all ${
                      timeframe === t 
                        ? "bg-primary text-white shadow-lg" 
                        : "text-muted-foreground hover:text-foreground hover:bg-[#1B1B30]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Content */}
              {error ? (
                <div className="cosmic-card rounded-2xl p-8 text-center text-destructive border-destructive/20">
                  <p>{error}</p>
                </div>
              ) : (
                <HoroscopeCard 
                  data={data} 
                  loading={loading} 
                  title={`${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Forecast`} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function HoroscopesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading cosmic insights...</div>}>
      <HoroscopesContent />
    </Suspense>
  )
}
