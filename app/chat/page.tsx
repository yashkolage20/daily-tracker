"use client"

import { Navigation } from "@/components/navigation"
import { ChatBubble } from "@/components/chat-bubble"
import { useChat, type Message } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ZODIAC_SIGNS } from "@/lib/zodiac"

export default function ChatPage() {
  // Context to inject into the AI's prompt. Normally this would be pulled from User Profile / Auth Context
  const [userContextStr, setUserContextStr] = useState("")

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      context: userContextStr
    }
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Quick mock of setting the user's chart as context, if they had submitted the birth chart page.
    // In a real app with persistent storage, we'd load this from Supabase.
    setUserContextStr("User is an Aries Sun, Pisces Moon, and Gemini Rising.")
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const presetQuestions = [
    "What does today have in store for me emotionally?",
    "How does my Gemini rising affect my relationships?",
    "Is this a good week to start a new project?"
  ]

  // Allow clicking a preset to instantly submit it
  const handlePresetClick = (q: string) => {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>
    
    // We hack the useChat submission slightly by sending a manual message
    handleSubmit(
      new Event("submit") as any,
      { data: { message: q } }
    )
    // There is no easy way to override useChat's immediate input state without a custom formulation
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col pt-4">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2 flex items-center justify-center gap-2 text-primary glow-text-primary">
              <Sparkles className="w-6 h-6" /> Cosmic Oracle
            </h1>
            <p className="text-muted-foreground text-sm">Your personal, AI-powered astrologer is ready to answer your questions.</p>
          </div>

          <div className="flex-1 cosmic-card rounded-3xl border-primary/20 overflow-hidden flex flex-col max-h-[70vh]">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">Ask the Stars</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Ask about your career, love life, or current transits. I will read the celestial energies for you.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                    {presetQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handlePresetClick(q)}
                        className="text-sm bg-[#0F0F23] border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors rounded-full px-4 py-2"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m: Message) => (
                    <ChatBubble key={m.id} role={m.role as "user" | "assistant"} content={m.content} />
                  ))}
                  {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex gap-4 w-full animate-fade-in-up">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/20 border border-primary/50 text-primary glow-primary">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="bg-[#0F0F23] border border-border/40 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 h-[56px]">
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0F0F23]/80 border-t border-border/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="relative flex items-center max-w-3xl mx-auto">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask the oracle a question..."
                  className="h-14 pr-16 bg-[#1B1B30] border-border/50 rounded-full text-base focus-visible:ring-primary/50 shadow-inner"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="text-center mt-3 text-[10px] text-muted-foreground uppercase tracking-widest">
                Cosmic Oracle relies on celestial data which may occasionally be clouded.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
