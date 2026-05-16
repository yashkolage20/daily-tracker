import Link from "next/link"
import { Sparkles, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-[#0F0F23] mt-auto">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-lg font-semibold tracking-wide">Cosmic Oracle</span>
            </Link>
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xs">
              Navigating life's journey through the ancient wisdom of the stars and the power of artificial intelligence.
            </p>
          </div>

          {/* Nav: Astrology */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Astrology Tools</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/horoscopes" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Daily Horoscopes
                </Link>
              </li>
              <li>
                <Link href="/birth-chart" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Birth Chart Generator
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Compatibility Reports
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  AI Astrologer
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Support & Info</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Astrology FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1B1B30] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-[#1B1B30]/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1B1B30] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-[#1B1B30]/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1B1B30] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-[#1B1B30]/80 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cosmic Oracle. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground/60">
            Design inspired by Nebula
          </div>
        </div>
      </div>
    </footer>
  )
}
