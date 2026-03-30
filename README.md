# API Advisor

Tell me what you want to build. I will recommend free APIs with working code.

## What It Does

Input a project description like "weather dashboard" or "email validator" and get recommended free APIs with:
- Real working code snippets
- Rate limits and auth requirements
- Live test buttons to try APIs directly

## Tech Stack

- Next.js 16 (App Router)
- TypeScript (strict mode)
- CSS Modules + CSS Variables
- Vitest (80%+ test coverage)

## Getting Started

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  app/            # Next.js pages
  components/     # React components
  lib/            # Core logic (api-advisor, api-data, types)
  __tests__/      # Unit and integration tests
```

## The APIs

32 curated free APIs across categories: weather, finance, crypto, geocoding, email, QR codes, news, images, random data, text/NLP, government data, animals, food, sports, movies, music, and jobs.

All APIs include working JavaScript fetch examples.

## Design

No emojis. No filler. Just practical API recommendations.

---

Built by Flume SaaS Factory
