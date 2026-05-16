# Cosmic Oracle

Cosmic Oracle is a dark-themed astrology web app built with Next.js, React, TypeScript, and Supabase. It combines classic zodiac features with an AI chat experience so users can explore horoscopes, generate birth charts, compare compatibility, and ask follow-up questions in a single flow.

## What It Does

- Daily, weekly, and monthly horoscope reading
- Birth chart generation from date and time of birth
- Compatibility reports for two people
- AI astrologer chat powered through OpenRouter
- Auth flows, profile pages, and upgrade screens
- Premium cosmic UI with responsive layouts and reusable components

## Product Walkthrough

### Home
The landing experience introduces the core tools and lets users jump straight into horoscopes, chart generation, compatibility, or chat.

### Horoscopes
Users can browse all zodiac signs and switch between daily, weekly, and monthly forecasts. The app supports a configurable external horoscope API and falls back to local data when no provider is configured.

### Birth Chart
The birth chart flow collects birth date, optional birth time, and city, then generates an approximate chart with planetary placements, houses, and sign distributions.

### Compatibility
The compatibility page compares two generated charts and returns scores, strengths, challenges, and a summary of the relationship dynamic.

### AI Astrologer
The chat page uses the AI SDK with OpenRouter to stream responses from a themed “Cosmic Oracle” assistant.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- AI SDK
- OpenRouter
- Lucide icons

## Local Setup

### Prerequisites

- Node.js 20+
- npm or pnpm
- Docker
- Supabase CLI

### 1. Clone the repo

```bash
git clone <repo-url>
cd cosmic
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

### 3. Start local Supabase

```bash
supabase start
```

This applies the local migrations and prints the values you need for `.env.local`.

### 4. Configure environment variables

Create a local env file:

```bash
cp .env.example .env.local
```

Then set:

```env
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54521"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-local-publishable-key"
SUPABASE_SERVICE_ROLE_KEY="your-local-service-role-key"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

Optional:

```env
HOROSCOPE_API_URL="https://example.com/horoscope"
```

If `HOROSCOPE_API_URL` is not set, the app serves built-in horoscope fallback data.

### 5. Run the app

Using npm:

```bash
npm run dev
```

Using pnpm:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/                 Next.js routes, pages, and API handlers
components/          Reusable UI and feature components
contexts/            React context providers
hooks/               Shared React hooks
lib/                 Astrology logic, utilities, and Supabase clients
public/              Static assets
supabase/            Local config and migrations
```

## Current Notes

- Horoscope API calls are resilient by design and fall back to local data when no external provider is configured.
- Birth chart and compatibility calculations are approximate, demo-oriented calculations rather than ephemeris-grade astrology.
- The AI chat route expects an OpenRouter key for real responses.
- There are still some unrelated repo-level build and dependency issues to clean up outside the core README work.

## Future Improvements

- Persist generated charts and chat history per user
- Improve chart accuracy with a dedicated astrology calculation library
- Add richer compatibility visualizations
- Tighten production build stability and dependency cleanup

## License

No license has been added yet.
