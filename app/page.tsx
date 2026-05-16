"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Star, Moon, Heart, MessageCircle, ArrowRight } from "lucide-react"
import { ZODIAC_SIGNS } from "@/lib/zodiac"

export default function HomePage() {
  const features = [
    {
      icon: Star,
      title: "Daily Horoscopes",
      description: "Personalized daily, weekly, and monthly insights based on your sun sign.",
      href: "/horoscopes",
      color: "text-[#CA8A04]"
    },
    {
      icon: Moon,
      title: "Birth Chart",
      description: "Discover your cosmic blueprint with full house and planet breakdowns.",
      href: "/birth-chart",
      color: "text-[#7C3AED]"
    },
    {
      icon: Heart,
      title: "Compatibility",
      description: "Celestial matchmaking to understand your relationship dynamics.",
      href: "/compatibility",
      color: "text-[#EF4444]"
    },
    {
      icon: MessageCircle,
      title: "AI Astrologer",
      description: "Chat with our expert AI for personalized readings and life guidance.",
      href: "/chat",
      color: "text-[#06B6D4]"
    },
  ]

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 text-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card text-sm font-medium border border-primary/40">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-foreground/90">Unlock Your Cosmic Path</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight font-serif drop-shadow-lg">
            Navigate Life with the <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#A78BFA] to-accent">
              Stars' Guidance
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Discover your true self through AI-powered horoscopes, detailed birth chart analysis, and personalized spiritual readings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="px-8 py-6 text-lg rounded-xl glow-primary" asChild>
              <Link href="/birth-chart">Generate Birth Chart <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl cosmic-card border-primary/50 hover:bg-primary/10" asChild>
              <Link href="/horoscopes">Read Daily Horoscope</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Zodiac Selector Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-in-up animate-delay-200">
          <h2 className="text-3xl font-serif font-bold mb-4">Choose Your Sign</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Select your sun sign to reveal your daily cosmic forecast.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in-up animate-delay-300">
          {ZODIAC_SIGNS.map((sign) => (
            <Link
              key={sign.name}
              href={`/horoscopes?sign=${sign.name.toLowerCase()}`}
              className="cosmic-card flex flex-col items-center p-6 rounded-2xl group text-center"
            >
              <span className={`text-4xl mb-3 transition-transform group-hover:scale-110 group-hover:text-primary`}>
                {sign.emoji}
              </span>
              <h3 className="font-serif font-bold text-lg">{sign.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{sign.dateRange}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Cosmic Tools</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
            Everything you need to understand yourself and your relationship to the universe.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Link key={feature.title} href={feature.href} className="group">
                <div className="flex flex-col h-full p-8 rounded-2xl cosmic-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="w-32 h-32" />
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-[#0F0F23] flex items-center justify-center mb-6 border border-border/50`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-serif font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg flex-1">{feature.description}</p>
                  <div className="mt-8 flex items-center text-primary font-medium text-sm">
                    Explore <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/30">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif font-bold">Begin Your Journey</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Create an account to save your birth chart, track your daily horoscopes, and save your AI readings.
            </p>
            <Button size="lg" className="px-8 py-6 text-lg rounded-xl glow-primary" asChild>
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
