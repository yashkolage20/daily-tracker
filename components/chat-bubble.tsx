import { User, Sparkles } from "lucide-react"

interface ChatBubbleProps {
  role: "user" | "assistant"
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user"

  // Very basic markdown handling for bold formatting
  const formatText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-bold">{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className={`flex gap-4 w-full ${isUser ? "flex-row-reverse" : "flex-row"} animate-fade-in-up`}>
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
          isUser 
            ? "bg-[#0F0F23] border-border text-muted-foreground" 
            : "bg-primary/20 border-primary/50 text-primary glow-primary"
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </div>

      <div 
        className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "cosmic-card border-border/40 text-foreground/90 rounded-tl-sm leading-relaxed"
        }`}
      >
        {/* Render content keeping basic newlines and bold */}
        <div className="whitespace-pre-wrap font-light text-[15px]">
          {formatText(content)}
        </div>
      </div>
    </div>
  )
}
