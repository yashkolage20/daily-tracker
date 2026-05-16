import { NextResponse } from "next/server"

type Timeframe = "daily" | "weekly" | "monthly"

const FALLBACK_DATA: Record<Timeframe, {
  description: string
  compatibility: string
  mood: string
  color: string
  lucky_number: string
  lucky_time: string
}> = {
  daily: {
    description: "The cosmos is aligning to bring you unexpected opportunities today. Stay open to new ideas and trust your intuition. A surprising conversation could lead to an exciting path forward.",
    compatibility: "Libra",
    mood: "Optimistic",
    color: "Indigo",
    lucky_number: "7",
    lucky_time: "3:00 PM"
  },
  weekly: {
    description: "This week focuses on bringing your long-term visions into reality. You may feel a push to restructure your daily routines to better support your goals. Relationship dynamics take center stage around Thursday—communicate clearly.",
    compatibility: "Aquarius",
    mood: "Focused",
    color: "Emerald Green",
    lucky_number: "4",
    lucky_time: "Morning"
  },
  monthly: {
    description: "A transformative month lies ahead. The planetary shifts encourage you to shed old habits and embrace a more authentic version of yourself. Career opportunities may present themselves unexpectedly, while your personal life demands more emotional honesty.",
    compatibility: "Scorpio",
    mood: "Transformative",
    color: "Deep Purple",
    lucky_number: "9",
    lucky_time: "Evening"
  }
}

const SIGN_TRAITS: Record<string, string> = {
  aries: "Lead with courage, but leave room for patience.",
  taurus: "Steady choices will create the strongest momentum.",
  gemini: "A timely conversation can unlock your next step.",
  cancer: "Trust your instincts when emotions point toward care.",
  leo: "Your confidence carries best when generosity leads it.",
  virgo: "The details matter, but they do not need to slow you down.",
  libra: "Balance becomes easier once you name what you truly want.",
  scorpio: "Honesty will deepen the bonds that already matter.",
  sagittarius: "Follow the spark of curiosity that keeps returning.",
  capricorn: "Consistency now creates freedom later.",
  aquarius: "Your unconventional view is more useful than you think.",
  pisces: "Imagination becomes powerful when paired with clear action."
}

function formatCurrentDate(day: string) {
  const now = new Date()
  const offsetDays = day === "tomorrow" ? 1 : day === "yesterday" ? -1 : 0
  now.setDate(now.getDate() + offsetDays)

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(now)
}

function buildFallbackHoroscope(sign: string, timeframe: Timeframe, day: string) {
  const template = FALLBACK_DATA[timeframe]
  const trait = SIGN_TRAITS[sign] ?? "Stay open to what the day is trying to teach you."

  return {
    ...template,
    current_date: formatCurrentDate(day),
    description: `${template.description} ${trait}`.trim()
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sign = searchParams.get("sign")?.toLowerCase()
  const timeframe = (searchParams.get("timeframe")?.toLowerCase() || "daily") as Timeframe
  const day = searchParams.get("day")?.toLowerCase() || "today" // today, tomorrow, yesterday
  const horoscopeApiUrl = process.env.HOROSCOPE_API_URL?.trim()

  if (!sign) {
    return NextResponse.json({ error: "Sign parameter is required" }, { status: 400 })
  }

  if (timeframe !== "daily") {
    return NextResponse.json(buildFallbackHoroscope(sign, timeframe, day))
  }

  // The previously hardcoded Aztro endpoint now returns 404s, so we only call
  // an upstream service when one is explicitly configured.
  if (!horoscopeApiUrl) {
    return NextResponse.json(buildFallbackHoroscope(sign, timeframe, day))
  }

  const fallback = buildFallbackHoroscope(sign, timeframe, day)

  try {
    const upstreamUrl = new URL(horoscopeApiUrl)
    upstreamUrl.searchParams.set("sign", sign)
    upstreamUrl.searchParams.set("day", day)

    const horoscopeResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: AbortSignal.timeout(5000)
    })

    if (!horoscopeResponse.ok) {
      return NextResponse.json(fallback)
    }

    const data = await horoscopeResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Horoscope API unavailable, using local fallback.", error)
    }

    return NextResponse.json(fallback)
  }
}
