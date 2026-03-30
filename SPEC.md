# API Advisor — SPEC.md

## What It Is

A developer tool that takes a project idea and recommends free APIs to power it — with working code snippets and live examples. Built for developers who know what they want to build but don't want to spend hours hunting down the right APIs.

No fluff. No filler. Just "here's what you need and here's how to wire it up."

## Core Feature

User inputs a project type in plain language:
- "I want to build a weather dashboard"
- "I need to validate email addresses in my signup form"
- "I'm building a crypto portfolio tracker"
- "I want to show the latest news on my site"

System outputs:
1. **Recommended APIs** from the inventory
2. **Working code snippets** in JavaScript/TypeScript (fetch-based, copy-paste ready)
3. **Live test button** — see the API respond without leaving the page
4. **Rate limits and auth requirements** clearly stated

## Project Structure

```
~/api-advisor/
  SPEC.md
  README.md
  src/
    app/
      page.tsx           — Main interactive page
      layout.tsx          — Root layout
      globals.css         — CSS variables + base styles
    components/
      ProjectInput.tsx    — Text input for project idea
      ApiRecommendations.tsx — List of recommended APIs
      ApiCard.tsx         — Individual API with code + live test
      CodeBlock.tsx       — Syntax-highlighted code snippet
      LiveTest.tsx        — Live API test button + response viewer
      CategoryFilter.tsx  — Filter by API category
    lib/
      api-advisor.ts      — Core recommendation logic
      api-data.ts         — Curated API dataset (subset of inventory)
      types.ts            — TypeScript interfaces
    __tests__/
      api-advisor.test.ts — Unit tests for recommendation engine
      components.test.tsx — Component tests
```

## Design Principles

### Voice
- Direct, technical, no marketing speak
- Lists facts without padding ("Rate limits: 1000/day" not "Incredible rate limits of up to 1000 requests per day!")
- Code examples are real, working, copy-paste ready

### Interaction
- Real-time filtering as user types project description
- One-click code copy
- Live API test without leaving the page
- Category browsing for exploration

### Anti-Slop Rules (from anti-ai-slop skill)
- No emojis anywhere
- No "Just drop this in" without explaining what it does
- No engagement bait ("Amazing!" / "Game changer!")
- No fake testimonials or social proof
- Show real rate limits, real auth requirements, real gotchas

## Curated API Dataset

Start with 30-40 high-value, genuinely free, well-documented APIs across these categories:

| Category | APIs |
|----------|------|
| Weather | Open-Meteo, National Weather Service |
| Finance | Alpha Vantage, Exchange Rate API |
| Crypto | CoinGecko |
| Geocoding | Nominatim, Zippopotam.us |
| Email Validation | Hunter (free tier), Abstract API |
| QR Codes | QRServer, QuickChart |
| Company Data | Company Hub, OpenCorporates |
| News | GNews, Currents API |
| Maps | OpenStreetMap (via Nominatim) |
| Text/ NLP | Datamuse, WordsAPI |
| Random Data | Official Joke API, Random User API |
| Images | Unsplash Source, Lorem Picsum |
| Currency | ExchangeRate-API, Frankfurter |
| Sports | API-Football (limited free) |
| Government | NASA APOD, College Scorecard |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** CSS Modules + CSS Variables (no Tailwind per project rules)
- **Testing:** Vitest + React Testing Library
- **Syntax Highlighting:** Prism.js or highlight.js
- **Deploy:** Vercel

## Test Coverage Target

80% minimum across:
- `api-advisor.ts` — recommendation logic (unit tests)
- Component rendering tests
- Interaction tests (input → output)

## Build Verification

Before claiming complete:
1. `npm run build` — must succeed with no errors or warnings
2. `npm run test` — 80%+ coverage, all tests pass
3. `npm run dev` — local dev server starts
4. Live test buttons actually call APIs and return responses
5. Code copy button works
6. Deployed to Vercel and verified live
