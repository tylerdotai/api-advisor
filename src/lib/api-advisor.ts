import { apiDatabase, getAllCategories } from './api-data'
import { AdvisorInput, AdvisorResult, ApiRecommendation, ApiCategory } from './types'

/**
 * Keyword mapping: project intent phrases -> API keywords
 */
const intentKeywordMap: Record<string, string[]> = {
  weather: ['weather', 'forecast', 'meteorological', 'temperature', 'rain', 'climate'],
  finance: ['stock', 'finance', 'trading', 'investing', 'market', 'portfolio', 'equity', 'bond'],
  crypto: ['crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'coin', 'trading', 'defi', 'nft'],
  currency: ['currency', 'exchange rate', 'forex', 'conversion', 'money', 'convert'],
  geocoding: ['geocoding', 'address', 'location', 'coordinates', 'map', 'lat', 'lon', 'zipcode', 'postal'],
  email: ['email', 'verification', 'validate email', 'lead', 'contact'],
  qr: ['qr', 'qr code', 'barcode', 'scan', 'generator'],
  news: ['news', 'headline', 'article', 'media', 'blog', 'rss', 'feed'],
  images: ['image', 'photo', 'picture', 'stock photo', 'placeholder', 'random image'],
  random: ['random', 'fake', 'mock', 'dummy', 'test data', 'generate'],
  text: ['text', 'nlp', 'word', 'synonym', 'definition', 'dictionary', 'language'],
  government: ['government', 'public data', 'census', 'nasa', 'official'],
  animals: ['animal', 'dog', 'cat', 'pet', 'wildlife'],
  food: ['food', 'nutrition', 'recipe', 'restaurant', 'menu', 'barcode'],
  sports: ['sports', 'football', 'soccer', 'basketball', 'score', 'league', 'team'],
  movies: ['movie', 'film', 'cinema', 'actor', 'director', 'tmdb'],
  music: ['music', 'spotify', 'artist', 'album', 'track', 'playlist'],
  company: ['company', 'business', 'corporate', 'organization', 'ceo', 'employee'],
  jobs: ['job', 'career', 'employment', 'hiring', 'work']
}

function scoreApiForInput(api: ApiRecommendation, searchText: string): number {
  const query = searchText.toLowerCase()
  const words = query.split(/\s+/)

  let score = 0

  // Check intent keywords
  for (const [intent, keywords] of Object.entries(intentKeywordMap)) {
    const matchesKeyword = keywords.some(kw => query.includes(kw))
    const matchesCategory = api.category === intent
    if (matchesKeyword) score += matchesCategory ? 3 : 1
  }

  // Direct keyword matching on API keywords
  for (const keyword of api.keywords) {
    if (query.includes(keyword.toLowerCase())) {
      score += 2
    }
  }

  // Check if project type words match
  const projectTypeWords = ['dashboard', 'app', 'website', 'tool', 'service', 'tracker', 'application']
  for (const word of projectTypeWords) {
    if (query.includes(word) && api.keywords.some(kw => kw.includes(word.slice(0, 4)))) {
      score += 1
    }
  }

  // Name matching
  if (api.name.toLowerCase().split(' ').some(part => query.includes(part))) {
    score += 2
  }

  return score
}

function buildMatchedTerms(input: string, matched: ApiRecommendation[]): string[] {
  const terms: string[] = []
  const query = input.toLowerCase()

  for (const api of matched) {
    for (const keyword of api.keywords) {
      if (query.includes(keyword.toLowerCase())) {
        terms.push(keyword)
      }
    }
  }

  return [...new Set(terms)]
}

export function recommendApis(input: AdvisorInput): AdvisorResult {
  const { projectDescription, category } = input

  if (!projectDescription && !category) {
    return { recommendations: [], matchedOn: [] }
  }

  let candidates: ApiRecommendation[]

  if (category) {
    candidates = apiDatabase.filter(api => api.category === category)
  } else {
    candidates = [...apiDatabase]
  }

  if (!projectDescription) {
    return {
      recommendations: candidates.slice(0, 10),
      matchedOn: [`Category: ${category}`]
    }
  }

  const scored = candidates.map(api => ({
    api,
    score: scoreApiForInput(api, projectDescription)
  }))

  scored.sort((a, b) => b.score - a.score)

  const matched = scored
    .filter(s => s.score > 0)
    .slice(0, 8)
    .map(s => s.api)

  const matchedOn = buildMatchedTerms(projectDescription, matched)

  return { recommendations: matched, matchedOn }
}

export function getRecommendationsByCategory(category: ApiCategory): AdvisorResult {
  return recommendApis({ projectDescription: '', category })
}

export function searchApis(query: string): ApiRecommendation[] {
  if (!query.trim()) return []

  const q = query.toLowerCase()
  return apiDatabase
    .filter(api =>
      api.name.toLowerCase().includes(q) ||
      api.description.toLowerCase().includes(q) ||
      api.keywords.some(k => k.toLowerCase().includes(q))
    )
    .slice(0, 10)
}
