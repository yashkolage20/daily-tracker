import { getSignByDate, type ZodiacSign, ZODIAC_SIGNS } from "./zodiac"

// ── Planet definitions ──

export interface Planet {
  name: string
  symbol: string
  meaning: string
  keywords: string[]
}

export const PLANETS: Planet[] = [
  { name: "Sun", symbol: "☉", meaning: "Core identity, ego, and life purpose", keywords: ["Identity", "Vitality", "Self-expression"] },
  { name: "Moon", symbol: "☽", meaning: "Emotions, intuition, and inner world", keywords: ["Emotions", "Instincts", "Comfort"] },
  { name: "Mercury", symbol: "☿", meaning: "Communication, thinking, and learning", keywords: ["Communication", "Intellect", "Logic"] },
  { name: "Venus", symbol: "♀", meaning: "Love, beauty, values, and relationships", keywords: ["Love", "Beauty", "Harmony"] },
  { name: "Mars", symbol: "♂", meaning: "Drive, energy, aggression, and desire", keywords: ["Action", "Energy", "Desire"] },
  { name: "Jupiter", symbol: "♃", meaning: "Expansion, luck, wisdom, and growth", keywords: ["Growth", "Abundance", "Wisdom"] },
  { name: "Saturn", symbol: "♄", meaning: "Discipline, structure, and life lessons", keywords: ["Discipline", "Responsibility", "Mastery"] },
  { name: "Uranus", symbol: "♅", meaning: "Innovation, rebellion, and sudden change", keywords: ["Innovation", "Freedom", "Revolution"] },
  { name: "Neptune", symbol: "♆", meaning: "Dreams, spirituality, and illusion", keywords: ["Dreams", "Intuition", "Mysticism"] },
  { name: "Pluto", symbol: "♇", meaning: "Transformation, power, and rebirth", keywords: ["Transformation", "Power", "Rebirth"] },
]

// ── House definitions ──

export interface House {
  number: number
  name: string
  meaning: string
  keywords: string[]
}

export const HOUSES: House[] = [
  { number: 1, name: "Self", meaning: "Physical appearance, personality, and first impressions", keywords: ["Identity", "Appearance", "Beginnings"] },
  { number: 2, name: "Possessions", meaning: "Money, material possessions, and self-worth", keywords: ["Finances", "Values", "Security"] },
  { number: 3, name: "Communication", meaning: "Siblings, neighbors, short trips, and early education", keywords: ["Learning", "Siblings", "Local travel"] },
  { number: 4, name: "Home", meaning: "Family, roots, home environment, and emotional foundation", keywords: ["Family", "Home", "Origins"] },
  { number: 5, name: "Creativity", meaning: "Romance, children, creativity, and self-expression", keywords: ["Romance", "Fun", "Children"] },
  { number: 6, name: "Health", meaning: "Daily routines, health, work, and service", keywords: ["Health", "Routine", "Service"] },
  { number: 7, name: "Partnerships", meaning: "Marriage, business partnerships, and open enemies", keywords: ["Marriage", "Contracts", "Others"] },
  { number: 8, name: "Transformation", meaning: "Shared resources, death/rebirth, intimacy, and occult", keywords: ["Intimacy", "Shared resources", "Mystery"] },
  { number: 9, name: "Philosophy", meaning: "Higher education, travel, philosophy, and spiritual seeking", keywords: ["Travel", "Beliefs", "Higher learning"] },
  { number: 10, name: "Career", meaning: "Public reputation, career, authority, and achievements", keywords: ["Career", "Status", "Ambition"] },
  { number: 11, name: "Community", meaning: "Friends, groups, social causes, and future hopes", keywords: ["Friends", "Goals", "Community"] },
  { number: 12, name: "Spirituality", meaning: "Subconscious, hidden strengths, solitude, and karma", keywords: ["Subconscious", "Karma", "Solitude"] },
]

// ── Birth Chart Generation (simplified/approximated) ──

export interface PlanetPlacement {
  planet: Planet
  sign: ZodiacSign
  house: number
  degree: number
  interpretation: string
}

export interface BirthChart {
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  risingSign: ZodiacSign
  placements: PlanetPlacement[]
  elementDistribution: Record<string, number>
  modalityDistribution: Record<string, number>
}

/**
 * Generate an approximated birth chart based on birth date and time.
 * Note: This uses simplified calculations for demonstration purposes.
 * A production app would use Swiss Ephemeris or similar library.
 */
export function generateBirthChart(
  birthDate: Date,
  birthHour: number = 12
): BirthChart {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const year = birthDate.getFullYear()

  // Sun sign is determined by birth date
  const sunSign = getSignByDate(month, day)

  // Approximate moon sign - moon moves ~13° per day through the zodiac
  // Full cycle is ~27.3 days, so it changes sign roughly every 2.5 days
  const dayOfYear = getDayOfYear(birthDate)
  const moonIndex = Math.floor((dayOfYear * 13.368 + year * 3.7 + birthHour * 0.55) % 12)
  const moonSign = ZODIAC_SIGNS[moonIndex]

  // Rising sign is determined by time of birth (one sign per ~2 hours)
  const risingIndex = Math.floor(((birthHour + (month * 30 + day) / 30.44) * 1) % 12)
  const risingSign = ZODIAC_SIGNS[risingIndex]

  // Generate planet placements
  const placements: PlanetPlacement[] = PLANETS.map((planet, i) => {
    let signIndex: number
    let house: number
    let degree: number

    if (planet.name === "Sun") {
      signIndex = ZODIAC_SIGNS.indexOf(sunSign)
      house = 1
      degree = Math.floor((day / 30) * 30)
    } else if (planet.name === "Moon") {
      signIndex = moonIndex
      house = 4
      degree = Math.floor((birthHour / 24) * 30)
    } else {
      // Approximate other planet positions using deterministic offsets
      const seed = (year * 365 + dayOfYear + i * 37 + birthHour) % 360
      signIndex = Math.floor(seed / 30) % 12
      house = (Math.floor(seed / 30 + risingIndex) % 12) + 1
      degree = Math.floor(seed % 30)
    }

    const sign = ZODIAC_SIGNS[signIndex]

    return {
      planet,
      sign,
      house,
      degree,
      interpretation: getPlacementInterpretation(planet.name, sign.name),
    }
  })

  // Calculate element distribution
  const elementDistribution: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 }
  placements.forEach((p) => {
    elementDistribution[p.sign.element]++
  })

  // Calculate modality distribution
  const modalityDistribution: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 }
  placements.forEach((p) => {
    modalityDistribution[p.sign.modality]++
  })

  return {
    sunSign,
    moonSign,
    risingSign,
    placements,
    elementDistribution,
    modalityDistribution,
  }
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// ── Compatibility ──

export interface CompatibilityResult {
  overallScore: number
  categories: {
    name: string
    score: number
    description: string
    icon: string
  }[]
  strengths: string[]
  challenges: string[]
  summary: string
}

export function calculateCompatibility(
  chart1: BirthChart,
  chart2: BirthChart
): CompatibilityResult {
  // Element compatibility matrix
  const elementCompat: Record<string, Record<string, number>> = {
    Fire: { Fire: 85, Air: 90, Earth: 50, Water: 40 },
    Earth: { Earth: 80, Water: 85, Fire: 50, Air: 45 },
    Air: { Air: 75, Fire: 90, Water: 55, Earth: 45 },
    Water: { Water: 80, Earth: 85, Air: 55, Fire: 40 },
  }

  // Sun sign compatibility
  const sunCompat = elementCompat[chart1.sunSign.element][chart2.sunSign.element]

  // Moon sign compatibility (emotional)
  const moonCompat = elementCompat[chart1.moonSign.element][chart2.moonSign.element]

  // Rising sign compatibility (surface)
  const risingCompat = elementCompat[chart1.risingSign.element][chart2.risingSign.element]

  // Same sign bonus
  const sameSunBonus = chart1.sunSign.name === chart2.sunSign.name ? 10 : 0
  const sameMoonBonus = chart1.moonSign.name === chart2.moonSign.name ? 8 : 0

  // Opposite sign attraction (moderate bonus)
  const sunIndex1 = ZODIAC_SIGNS.indexOf(chart1.sunSign)
  const sunIndex2 = ZODIAC_SIGNS.indexOf(chart2.sunSign)
  const oppositeBonus = Math.abs(sunIndex1 - sunIndex2) === 6 ? 12 : 0

  // Calculate category scores
  const emotional = Math.min(100, Math.round(moonCompat + sameMoonBonus + Math.random() * 10))
  const intellectual = Math.min(100, Math.round((sunCompat + risingCompat) / 2 + Math.random() * 10))
  const physical = Math.min(100, Math.round((sunCompat + oppositeBonus) + Math.random() * 10))
  const communication = Math.min(100, Math.round((risingCompat + moonCompat) / 2 + Math.random() * 10))

  const overallScore = Math.min(100, Math.round(
    (emotional * 0.3 + intellectual * 0.25 + physical * 0.2 + communication * 0.25) +
    sameSunBonus + oppositeBonus / 2
  ))

  const categories = [
    {
      name: "Emotional",
      score: emotional,
      description: getEmotionalDescription(chart1.moonSign, chart2.moonSign, emotional),
      icon: "💫",
    },
    {
      name: "Intellectual",
      score: intellectual,
      description: getIntellectualDescription(chart1.sunSign, chart2.sunSign, intellectual),
      icon: "🧠",
    },
    {
      name: "Physical",
      score: physical,
      description: getPhysicalDescription(chart1.sunSign, chart2.sunSign, physical),
      icon: "🔥",
    },
    {
      name: "Communication",
      score: communication,
      description: getCommunicationDescription(chart1.risingSign, chart2.risingSign, communication),
      icon: "💬",
    },
  ]

  const strengths = generateStrengths(chart1, chart2, overallScore)
  const challenges = generateChallenges(chart1, chart2, overallScore)
  const summary = generateSummary(chart1, chart2, overallScore)

  return { overallScore, categories, strengths, challenges, summary }
}

// ── Interpretation helpers ──

function getPlacementInterpretation(planetName: string, signName: string): string {
  const interpretations: Record<string, Record<string, string>> = {
    Sun: {
      Aries: "Your core essence radiates with pioneering fire. You lead with courage and thrive on being first.",
      Taurus: "Your identity is rooted in stability and sensuality. You find yourself through beauty and persistence.",
      Gemini: "Your spirit dances between ideas. Communication and versatility define your core self.",
      Cancer: "Your soul nurtures and protects. Emotional depth and family are central to who you are.",
      Leo: "Your essence shines with creative brilliance. You're here to express, inspire, and lead with heart.",
      Virgo: "Your identity finds purpose in refinement. Analytical precision and service define your path.",
      Libra: "Your core seeks harmony and justice. Relationships and beauty are fundamental to your being.",
      Scorpio: "Your essence probes the depths. Transformation and intensity are woven into your soul.",
      Sagittarius: "Your spirit soars toward truth. Adventure and philosophical exploration drive your core.",
      Capricorn: "Your identity is forged through ambition. Discipline and long-term mastery define you.",
      Aquarius: "Your essence disrupts and innovates. Humanitarian vision and independence fuel your spirit.",
      Pisces: "Your soul flows with cosmic empathy. Intuition and artistic vision are your core gifts.",
    },
    Moon: {
      Aries: "Your emotional nature is passionate and impulsive. You process feelings through action.",
      Taurus: "Your emotional world craves comfort and security. You find peace through the senses.",
      Gemini: "Your feelings are processed through intellect. Communicating emotions helps you understand them.",
      Cancer: "Your emotions run deep and nurturing. You feel most secure when caring for others.",
      Leo: "Your emotional expression is dramatic and warm. You need recognition for how you feel.",
      Virgo: "Your emotional nature is analytical. You process feelings through practical service.",
      Libra: "Your emotions seek balance and fairness. You feel most at peace in harmony.",
      Scorpio: "Your emotional depths are profound. You feel everything intensely and transformatively.",
      Sagittarius: "Your emotional nature is optimistic and free. You process feelings through exploration.",
      Capricorn: "Your emotions are controlled and structured. You feel most secure with achievement.",
      Aquarius: "Your emotional nature is detached yet humanitarian. You process feelings intellectually.",
      Pisces: "Your emotions are oceanic and empathic. You absorb the feelings of the world around you.",
    },
  }

  return (
    interpretations[planetName]?.[signName] ??
    `${planetName} in ${signName} brings the qualities of ${signName} to the domain of ${
      PLANETS.find((p) => p.name === planetName)?.meaning ?? planetName
    }.`
  )
}

function getEmotionalDescription(moon1: ZodiacSign, moon2: ZodiacSign, score: number): string {
  if (score >= 80) return `${moon1.name} Moon and ${moon2.name} Moon create a deeply intuitive emotional bond. You understand each other's needs instinctively.`
  if (score >= 60) return `${moon1.name} Moon and ${moon2.name} Moon share a workable emotional rhythm. With patience, emotional understanding deepens over time.`
  return `${moon1.name} Moon and ${moon2.name} Moon approach emotions differently. This contrast can create growth through learning each other's emotional language.`
}

function getIntellectualDescription(sun1: ZodiacSign, sun2: ZodiacSign, score: number): string {
  if (score >= 80) return `${sun1.name} and ${sun2.name} share a stimulating mental connection. Your ideas complement and energize each other.`
  if (score >= 60) return `${sun1.name} and ${sun2.name} bring different perspectives to the table. This diversity of thought enriches conversations.`
  return `${sun1.name} and ${sun2.name} think in very different ways. This can lead to creative breakthroughs when both perspectives are honored.`
}

function getPhysicalDescription(sun1: ZodiacSign, sun2: ZodiacSign, score: number): string {
  if (score >= 80) return `The ${sun1.element}-${sun2.element} combination creates magnetic physical chemistry. There's a natural spark between you.`
  if (score >= 60) return `There's a steady physical connection between ${sun1.name} and ${sun2.name}. Attraction builds through shared experiences.`
  return `The physical dynamic between ${sun1.name} and ${sun2.name} may require intentional cultivation, but can become surprisingly deep.`
}

function getCommunicationDescription(rising1: ZodiacSign, rising2: ZodiacSign, score: number): string {
  if (score >= 80) return `${rising1.name} Rising and ${rising2.name} Rising communicate effortlessly. You naturally understand each other's social style.`
  if (score >= 60) return `Communication between ${rising1.name} Rising and ${rising2.name} Rising flows with some effort. You complement each other's social presence.`
  return `${rising1.name} Rising and ${rising2.name} Rising have contrasting communication styles. Conscious effort in dialogue strengthens the bond.`
}

function generateStrengths(chart1: BirthChart, chart2: BirthChart, score: number): string[] {
  const strengths: string[] = []
  if (chart1.sunSign.element === chart2.sunSign.element) strengths.push(`Shared ${chart1.sunSign.element} element creates natural understanding`)
  if (chart1.moonSign.element === chart2.moonSign.element) strengths.push("Emotional wavelengths are naturally in sync")
  if (score >= 70) strengths.push("Strong overall cosmic alignment supports long-term harmony")
  strengths.push(`${chart1.sunSign.name}'s ${chart1.sunSign.traits[0].toLowerCase()} nature complements ${chart2.sunSign.name}'s ${chart2.sunSign.traits[1].toLowerCase()} energy`)
  strengths.push("Both charts show potential for growth through this connection")
  return strengths
}

function generateChallenges(chart1: BirthChart, chart2: BirthChart, score: number): string[] {
  const challenges: string[] = []
  if (chart1.sunSign.element !== chart2.sunSign.element) challenges.push(`Different elemental natures (${chart1.sunSign.element} vs ${chart2.sunSign.element}) may require patience`)
  if (chart1.moonSign.modality === chart2.moonSign.modality && chart1.moonSign.modality === "Fixed") challenges.push("Both Fixed Moon signs may lead to stubborn emotional standoffs")
  challenges.push(`${chart1.sunSign.name} may need to learn from ${chart2.sunSign.name}'s approach to ${chart2.sunSign.weaknesses[0]?.toLowerCase() ?? "life"}`)
  if (score < 60) challenges.push("Lower overall alignment means conscious effort is needed to bridge differences")
  return challenges
}

function generateSummary(chart1: BirthChart, chart2: BirthChart, score: number): string {
  if (score >= 85) return `This is a powerfully aligned cosmic connection. ${chart1.sunSign.name} and ${chart2.sunSign.name} resonate on multiple levels, creating a relationship rich with mutual understanding, shared passion, and complementary strengths. The stars strongly favor this pairing.`
  if (score >= 70) return `${chart1.sunSign.name} and ${chart2.sunSign.name} share a promising cosmic bond. While there are areas that require conscious growth, the overall alignment suggests a relationship with strong potential for lasting harmony and mutual enrichment.`
  if (score >= 55) return `The connection between ${chart1.sunSign.name} and ${chart2.sunSign.name} is one of growth through contrast. Different perspectives and approaches create opportunities for both partners to evolve. With intentional effort, this pairing can become deeply rewarding.`
  return `${chart1.sunSign.name} and ${chart2.sunSign.name} face a cosmic learning curve. This connection challenges both individuals to expand beyond their comfort zones. While demanding, the growth potential is significant for those willing to embrace the journey.`
}
