export type Element = "Fire" | "Earth" | "Air" | "Water"
export type Modality = "Cardinal" | "Fixed" | "Mutable"

export interface ZodiacSign {
  name: string
  symbol: string
  emoji: string
  element: Element
  modality: Modality
  rulingPlanet: string
  dateRange: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
  description: string
  traits: string[]
  strengths: string[]
  weaknesses: string[]
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    emoji: "🐏",
    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    dateRange: "Mar 21 – Apr 19",
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    description: "The fearless pioneer of the zodiac. Aries charges ahead with unbridled enthusiasm, turning obstacles into stepping stones.",
    traits: ["Bold", "Ambitious", "Energetic", "Pioneering"],
    strengths: ["Courageous", "Determined", "Confident", "Enthusiastic"],
    weaknesses: ["Impatient", "Moody", "Short-tempered", "Impulsive"],
  },
  {
    name: "Taurus",
    symbol: "♉",
    emoji: "🐂",
    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",
    dateRange: "Apr 20 – May 20",
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    description: "The steadfast guardian of comfort and beauty. Taurus builds lasting foundations with patience and an eye for elegance.",
    traits: ["Reliable", "Patient", "Sensual", "Determined"],
    strengths: ["Dependable", "Patient", "Devoted", "Responsible"],
    weaknesses: ["Stubborn", "Possessive", "Uncompromising"],
  },
  {
    name: "Gemini",
    symbol: "♊",
    emoji: "👯",
    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    dateRange: "May 21 – Jun 20",
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    description: "The cosmic communicator and eternal student. Gemini dances between perspectives, weaving connections through words and ideas.",
    traits: ["Versatile", "Curious", "Witty", "Expressive"],
    strengths: ["Gentle", "Affectionate", "Curious", "Adaptable"],
    weaknesses: ["Nervous", "Inconsistent", "Indecisive"],
  },
  {
    name: "Cancer",
    symbol: "♋",
    emoji: "🦀",
    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    dateRange: "Jun 21 – Jul 22",
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    description: "The nurturing heart of the zodiac. Cancer creates sanctuaries of emotional warmth, guided by lunar intuition.",
    traits: ["Intuitive", "Nurturing", "Protective", "Emotional"],
    strengths: ["Tenacious", "Imaginative", "Loyal", "Sympathetic"],
    weaknesses: ["Moody", "Pessimistic", "Suspicious", "Manipulative"],
  },
  {
    name: "Leo",
    symbol: "♌",
    emoji: "🦁",
    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",
    dateRange: "Jul 23 – Aug 22",
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    description: "The radiant sovereign of self-expression. Leo commands the stage with warmth, creativity, and unwavering generosity.",
    traits: ["Confident", "Creative", "Generous", "Dramatic"],
    strengths: ["Creative", "Passionate", "Generous", "Warm-hearted"],
    weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Inflexible"],
  },
  {
    name: "Virgo",
    symbol: "♍",
    emoji: "👼",
    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    dateRange: "Aug 23 – Sep 22",
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    description: "The meticulous alchemist of improvement. Virgo refines the world through keen observation and devoted service.",
    traits: ["Analytical", "Practical", "Diligent", "Modest"],
    strengths: ["Loyal", "Analytical", "Kind", "Hardworking"],
    weaknesses: ["Shyness", "Worry", "Overly critical", "All work no play"],
  },
  {
    name: "Libra",
    symbol: "♎",
    emoji: "⚖️",
    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    dateRange: "Sep 23 – Oct 22",
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    description: "The celestial diplomat and aesthete. Libra seeks harmony in all things, balancing beauty with justice.",
    traits: ["Diplomatic", "Gracious", "Fair-minded", "Social"],
    strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded"],
    weaknesses: ["Indecisive", "Avoids confrontation", "Self-pity"],
  },
  {
    name: "Scorpio",
    symbol: "♏",
    emoji: "🦂",
    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto",
    dateRange: "Oct 23 – Nov 21",
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    description: "The master of transformation and depth. Scorpio probes beneath surfaces, embracing the power of metamorphosis.",
    traits: ["Intense", "Passionate", "Resourceful", "Brave"],
    strengths: ["Resourceful", "Brave", "Passionate", "Stubborn"],
    weaknesses: ["Distrusting", "Jealous", "Secretive", "Violent"],
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    emoji: "🏹",
    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    dateRange: "Nov 22 – Dec 21",
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    description: "The cosmic philosopher and adventurer. Sagittarius pursues truth across horizons, fueled by boundless optimism.",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Free-spirited"],
    strengths: ["Generous", "Idealistic", "Great humor"],
    weaknesses: ["Promises more than can deliver", "Impatient"],
  },
  {
    name: "Capricorn",
    symbol: "♑",
    emoji: "🐐",
    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    dateRange: "Dec 22 – Jan 19",
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    description: "The master architect of ambition. Capricorn scales the highest peaks through discipline, strategy, and timeless patience.",
    traits: ["Disciplined", "Ambitious", "Responsible", "Practical"],
    strengths: ["Responsible", "Disciplined", "Self-control", "Good managers"],
    weaknesses: ["Know-it-all", "Unforgiving", "Condescending"],
  },
  {
    name: "Aquarius",
    symbol: "♒",
    emoji: "🏺",
    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus",
    dateRange: "Jan 20 – Feb 18",
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    description: "The visionary rebel of the zodiac. Aquarius rewrites the rules of tomorrow, championing innovation and collective progress.",
    traits: ["Innovative", "Independent", "Humanitarian", "Original"],
    strengths: ["Progressive", "Original", "Independent", "Humanitarian"],
    weaknesses: ["Runs from emotional expression", "Temperamental", "Uncompromising"],
  },
  {
    name: "Pisces",
    symbol: "♓",
    emoji: "🐟",
    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune",
    dateRange: "Feb 19 – Mar 20",
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    description: "The mystical dreamer who dissolves boundaries. Pisces navigates the ocean of consciousness with empathy and artistic vision.",
    traits: ["Intuitive", "Compassionate", "Artistic", "Mystical"],
    strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle"],
    weaknesses: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality"],
  },
]

export function getSignByDate(month: number, day: number): ZodiacSign {
  // Special handling for Capricorn which spans year boundary
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth > sign.endMonth) {
      // Spans year boundary (Capricorn: Dec 22 - Jan 19)
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign
      }
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay) ||
        (month > sign.startMonth && month < sign.endMonth)
      ) {
        return sign
      }
    }
  }
  return ZODIAC_SIGNS[0] // fallback to Aries
}

export function getSignByName(name: string): ZodiacSign | undefined {
  return ZODIAC_SIGNS.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  )
}

export const ELEMENTS: Record<Element, { color: string; signs: string[] }> = {
  Fire: { color: "#EF4444", signs: ["Aries", "Leo", "Sagittarius"] },
  Earth: { color: "#22C55E", signs: ["Taurus", "Virgo", "Capricorn"] },
  Air: { color: "#3B82F6", signs: ["Gemini", "Libra", "Aquarius"] },
  Water: { color: "#06B6D4", signs: ["Cancer", "Scorpio", "Pisces"] },
}

export const MODALITIES: Record<Modality, { description: string; signs: string[] }> = {
  Cardinal: {
    description: "Initiators who start new cycles",
    signs: ["Aries", "Cancer", "Libra", "Capricorn"],
  },
  Fixed: {
    description: "Stabilizers who sustain and deepen",
    signs: ["Taurus", "Leo", "Scorpio", "Aquarius"],
  },
  Mutable: {
    description: "Adapters who transform and transition",
    signs: ["Gemini", "Virgo", "Sagittarius", "Pisces"],
  },
}
