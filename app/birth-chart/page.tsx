"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Sparkles, Loader2, ArrowLeft } from "lucide-react"
import { generateBirthChart, type BirthChart } from "@/lib/astrology"
import { ChartResults } from "@/components/chart-results"

export default function BirthChartPage() {
  const [loading, setLoading] = useState(false)
  const [chart, setChart] = useState<BirthChart | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const dateStr = formData.get("date") as string
    const timeStr = formData.get("time") as string
    
    // Simulate generation delay for dramatic cosmic effect
    setTimeout(() => {
      const date = new Date(dateStr)
      // Parse hour, default to noon if not provided
      let hour = 12
      if (timeStr) {
        const [h] = timeStr.split(':').map(Number)
        hour = h
      }
      
      const generatedChart = generateBirthChart(date, hour)
      setChart(generatedChart)
      setLoading(false)
      
      // Scroll to results
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {!chart ? (
            <div className="animate-fade-in-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card text-sm font-medium mb-6">
                  <Moon className="w-4 h-4 text-primary" />
                  <span className="text-foreground/90">Cosmic Blueprint</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Birth Chart Generator</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Enter your birth details below to reveal the exact position of the planets the moment you were born.
                </p>
              </div>

              <div className="max-w-xl mx-auto cosmic-card p-8 rounded-3xl border-primary/30 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-foreground/80">Date of Birth</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      required 
                      className="bg-[#0F0F23]/80 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-foreground/80">Time of Birth <span className="text-muted-foreground font-normal">(Optional, but recommended for accuracy)</span></Label>
                    <Input 
                      id="time" 
                      name="time" 
                      type="time" 
                      className="bg-[#0F0F23]/80 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-foreground/80">City of Birth</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      type="text" 
                      placeholder="e.g. New York, NY"
                      required 
                      className="bg-[#0F0F23]/80 border-border/50 h-12 rounded-xl focus-visible:ring-primary/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg rounded-xl glow-primary mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Aligning Planets...</>
                    ) : (
                      <><Sparkles className="w-5 h-5 mr-2" /> Generate Chart</>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in-up">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground mb-4"
                onClick={() => setChart(null)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> 
                Calculate Another Chart
              </Button>
              
              <ChartResults chart={chart} />
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
