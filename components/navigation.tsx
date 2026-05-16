"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Menu, X, Star, ChevronDown, Sparkles, Moon, Heart, MessageCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useRef, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const features = [
    { href: "/horoscopes", label: "Horoscopes", icon: Star, description: "Daily, weekly & monthly" },
    { href: "/birth-chart", label: "Birth Chart", icon: Moon, description: "Your cosmic blueprint" },
    { href: "/compatibility", label: "Compatibility", icon: Heart, description: "Celestial matchmaking" },
    { href: "/chat", label: "AI Astrologer", icon: MessageCircle, description: "Personalized readings" },
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-border/50 bg-[#0F0F23]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0F0F23]/60 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-serif text-lg font-semibold tracking-wide">Cosmic Oracle</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/30 px-6 py-4 space-y-1 bg-[#0F0F23]/98 backdrop-blur">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors ${
                  pathname === feature.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <feature.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium text-sm">{feature.label}</div>
                  <div className="text-xs opacity-60">{feature.description}</div>
                </div>
              </Link>
            ))}
            <div className="border-t border-border/30 pt-3 mt-3">
              {!isLoading && (
                <>
                  {user ? (
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium text-sm">Profile</span>
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full" size="sm">Sign In</Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-border/30 bg-[#0F0F23]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#0F0F23]/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide">Cosmic Oracle</span>
            </Link>

            {/* Center nav links */}
            <div className="flex items-center gap-1">
              {/* Features Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    featuresOpen
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  Features
                  <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
                </button>
                {featuresOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-card border border-border/50 shadow-2xl shadow-primary/10 overflow-hidden">
                    {features.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          pathname === feature.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                        onClick={() => setFeaturesOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-foreground">{feature.label}</div>
                          <div className="text-xs text-muted-foreground">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct links */}
              {features.map((feature) => (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === feature.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <feature.icon className="w-4 h-4" />
                  {feature.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {!isLoading && (
                <>
                  {user ? (
                    <Link
                      href="/profile"
                      className={`p-2 rounded-lg transition-colors ${
                        pathname === "/profile" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                      title="Profile"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                  ) : (
                    <Button size="sm" className="text-sm glow-primary" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
