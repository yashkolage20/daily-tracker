import { Star, Heart, Calendar, Palette, Hash, Activity } from "lucide-react"

export interface HoroscopeData {
  description: string
  compatibility: string
  mood: string
  color: string
  lucky_number: string
  lucky_time?: string
  date_range?: string
  current_date?: string
}

interface HoroscopeCardProps {
  data: HoroscopeData | null
  loading: boolean
  title: string
}

export function HoroscopeCard({ data, loading, title }: HoroscopeCardProps) {
  if (loading) {
    return (
      <div className="cosmic-card rounded-2xl p-6 sm:p-8 animate-pulse border-primary/20">
        <div className="h-8 bg-muted/50 rounded w-1/3 mb-6"></div>
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-muted/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 rounded w-5/6"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-muted/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="cosmic-card rounded-2xl p-6 sm:p-8 border-primary/30 animate-fade-in-up relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <h3 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2">
        <Star className="w-5 h-5 text-accent" />
        {title}
      </h3>
      
      {data.current_date && (
        <p className="text-sm text-primary/80 mb-6 font-medium">{data.current_date}</p>
      )}

      <div className="mb-8 relative z-10">
        <p className="text-foreground/90 text-lg leading-relaxed font-light">
          {data.description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
        {/* Mood */}
        <div className="bg-[#0F0F23]/60 border border-border/40 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
          <Activity className="w-5 h-5 text-[#3B82F6]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Mood</div>
            <div className="text-sm font-medium">{data.mood}</div>
          </div>
        </div>
        
        {/* Compatibility */}
        <div className="bg-[#0F0F23]/60 border border-border/40 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
          <Heart className="w-5 h-5 text-destructive" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Match</div>
            <div className="text-sm font-medium">{data.compatibility}</div>
          </div>
        </div>

        {/* Color */}
        <div className="bg-[#0F0F23]/60 border border-border/40 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
          <Palette className="w-5 h-5 text-accent" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Color</div>
            <div className="text-sm font-medium">{data.color}</div>
          </div>
        </div>

        {/* Lucky Number/Time */}
        <div className="bg-[#0F0F23]/60 border border-border/40 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
          <Hash className="w-5 h-5 text-[#22C55E]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Lucky #</div>
            <div className="text-sm font-medium">{data.lucky_number}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
