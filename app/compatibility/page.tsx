"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Loader2, RefreshCw, X } from "lucide-react"
import { generateBirthChart, calculateCompatibility, type BirthChart, type CompatibilityResult } from "@/lib/astrology"
import { CompatibilityResults } from "@/components/compatibility-results"

export default function CompatibilityPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ p1: BirthChart, p2: BirthChart, comp: CompatibilityResult } | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Simulate complex calculation wait
    setTimeout(() => {
      // Person A
      const dateA = new Date(formData.get("dateA") as string)
      const timeStrA = formData.get("timeA") as string
      let hourA = 12
      if (timeStrA) hourA = Number(timeStrA.split(':')[0])
      
      // Person B  
      const dateB = new Date(formData.get("dateB") as string)
      const timeStrB = formData.get("timeB") as string
      let hourB = 12
      if (timeStrB) hourB = Number(timeStrB.split(':')[0])

      const p1Chart = generateBirthChart(dateA, hourA)
      const p2Chart = generateBirthChart(dateB, hourB)
      const compResult = calculateCompatibility(p1Chart, p2Chart)
      
      setResult({ p1: p1Chart, p2: p2Chart, comp: compResult })
      setLoading(false)
      
      window.scrollTo({ top: 400, behavior: "smooth" })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-foreground/90">Cosmic Matchmaking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Compatibility Report</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compare two birth charts to reveal the energetic dynamics, strengths, and challenges of the connection.
            </p>
          </div>

          {!result ? (
            <div className="animate-fade-in-up pb-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 relative">
                  {/* Decorative divider for desktop */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border border-border items-center justify-center text-muted-foreground glow-primary">
                    <X className="w-4 h-4" />
                  </div>

                  {/* Person A Form */}
                  <div className="cosmic-card p-8 rounded-3xl border-primary/30 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <h2 className="text-2xl font-serif font-bold mb-6">Person A</h2>
                    
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label>Name / Identifier</Label>
                        <Input name="nameA" placeholder="e.g. You" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input name="dateA" type="date" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time of Birth <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                        <Input name="timeA" type="time" className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>City of Birth</Label>
                        <Input name="locA" placeholder="e.g. London" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                    </div>
                  </div>

                  {/* Person B Form */}
                  <div className="cosmic-card p-8 rounded-3xl border-accent/30 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                    <h2 className="text-2xl font-serif font-bold mb-6">Person B</h2>
                    
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label>Name / Identifier</Label>
                        <Input name="nameB" placeholder="e.g. Partner, Friend" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input name="dateB" type="date" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time of Birth <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                        <Input name="timeB" type="time" className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>City of Birth</Label>
                        <Input name="locB" placeholder="e.g. Paris" required className="bg-[#0F0F23]/80 border-border/50 h-12" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full md:w-auto md:min-w-[300px] h-14 text-lg rounded-xl glow-primary bg-primary hover:bg-primary/90 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Connection...</>
                    ) : (
                      <><Heart className="w-5 h-5 mr-2" /> Check Compatibility</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center mb-8">
                <Button 
                  variant="outline" 
                  onClick={() => setResult(null)}
                  className="rounded-full cosmic-card hover:bg-primary/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Another Match
                </Button>
              </div>
              <CompatibilityResults 
                result={result.comp} 
                person1={result.p1} 
                person2={result.p2} 
              />
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
