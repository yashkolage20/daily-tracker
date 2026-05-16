import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Cormorant } from "next/font/google"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cosmic Oracle — AI Astrology & Horoscopes",
  description: "Discover your cosmic blueprint with AI-powered horoscopes, birth chart analysis, compatibility reports, and personalized astrology readings.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${cormorant.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <SubscriptionProvider>
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </SubscriptionProvider>
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
