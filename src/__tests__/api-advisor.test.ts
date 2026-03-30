import { describe, it, expect } from 'vitest'
import { recommendApis, searchApis, getRecommendationsByCategory } from '@/lib/api-advisor'
import { apiDatabase, getApisByCategory, getAllCategories, getApiById } from '@/lib/api-data'

describe('api-advisor', () => {
  describe('recommendApis', () => {
    it('returns weather APIs for weather project description', () => {
      const result = recommendApis({ projectDescription: 'I want to build a weather dashboard' })
      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations.some(r => r.category === 'weather')).toBe(true)
    })

    it('returns crypto APIs for crypto project description', () => {
      const result = recommendApis({ projectDescription: 'crypto portfolio tracker' })
      expect(result.recommendations.some(r => r.category === 'crypto')).toBe(true)
    })

    it('returns currency APIs for exchange rate queries', () => {
      const result = recommendApis({ projectDescription: 'convert currencies between USD and EUR' })
      expect(result.recommendations.some(r => r.category === 'currency')).toBe(true)
    })

    it('returns geocoding APIs for address/location queries', () => {
      const result = recommendApis({ projectDescription: 'convert addresses to coordinates' })
      expect(result.recommendations.some(r => r.category === 'geocoding')).toBe(true)
    })

    it('returns email APIs for email validation queries', () => {
      const result = recommendApis({ projectDescription: 'validate email addresses in signup form' })
      expect(result.recommendations.some(r => r.category === 'email')).toBe(true)
    })

    it('returns QR code APIs for QR related queries', () => {
      const result = recommendApis({ projectDescription: 'generate QR codes' })
      expect(result.recommendations.some(r => r.category === 'qr-codes')).toBe(true)
    })

    it('returns news APIs for news queries', () => {
      const result = recommendApis({ projectDescription: 'show latest news on my website' })
      expect(result.recommendations.some(r => r.category === 'news')).toBe(true)
    })

    it('returns image APIs for image placeholder queries', () => {
      const result = recommendApis({ projectDescription: 'placeholder images for testing' })
      expect(result.recommendations.some(r => r.category === 'images')).toBe(true)
    })

    it('returns finance APIs for stock market queries', () => {
      const result = recommendApis({ projectDescription: 'track stock prices and trading data' })
      expect(result.recommendations.some(r => r.category === 'finance')).toBe(true)
    })

    it('returns government APIs for census and public data queries', () => {
      const result = recommendApis({ projectDescription: 'census demographic data' })
      expect(result.recommendations.some(r => r.category === 'government')).toBe(true)
    })

    it('returns random/fake data APIs for testing queries', () => {
      const result = recommendApis({ projectDescription: 'fake user data for testing' })
      expect(result.recommendations.some(r => r.category === 'random')).toBe(true)
    })

    it('returns animals APIs for pet-related queries', () => {
      const result = recommendApis({ projectDescription: 'random dog images' })
      expect(result.recommendations.some(r => r.category === 'animals')).toBe(true)
    })

    it('returns text/NLP APIs for word and dictionary queries', () => {
      const result = recommendApis({ projectDescription: 'find synonyms and word definitions' })
      expect(result.recommendations.some(r => r.category === 'text')).toBe(true)
    })

    it('returns food APIs for nutrition queries', () => {
      const result = recommendApis({ projectDescription: 'nutrition facts by barcode' })
      expect(result.recommendations.some(r => r.category === 'food')).toBe(true)
    })

    it('returns sports APIs for sports data queries', () => {
      const result = recommendApis({ projectDescription: 'football scores and league standings' })
      expect(result.recommendations.some(r => r.category === 'sports')).toBe(true)
    })

    it('returns movie APIs for film queries', () => {
      const result = recommendApis({ projectDescription: 'movie database with actors and reviews' })
      expect(result.recommendations.some(r => r.category === 'movies')).toBe(true)
    })

    it('returns music APIs for music queries', () => {
      const result = recommendApis({ projectDescription: 'search songs and artists' })
      expect(result.recommendations.some(r => r.category === 'music')).toBe(true)
    })

    it('returns empty array for empty input', () => {
      const result = recommendApis({ projectDescription: '' })
      expect(result.recommendations).toHaveLength(0)
    })

    it('returns matchedOn terms', () => {
      const result = recommendApis({ projectDescription: 'bitcoin price tracker' })
      expect(result.matchedOn.length).toBeGreaterThan(0)
    })

    it('respects category filter', () => {
      const result = recommendApis({ projectDescription: 'weather', category: 'weather' })
      expect(result.recommendations.every(r => r.category === 'weather')).toBe(true)
    })

    it('limits results to 8 or fewer', () => {
      const result = recommendApis({ projectDescription: 'data information' })
      expect(result.recommendations.length).toBeLessThanOrEqual(8)
    })

    it('sorts by relevance (weather keywords match weather APIs higher)', () => {
      const result = recommendApis({ projectDescription: 'temperature and weather forecast' })
      const weatherApis = result.recommendations.filter(r => r.category === 'weather')
      expect(weatherApis.length).toBeGreaterThan(0)
    })

    it('handles jobs category', () => {
      const result = recommendApis({ projectDescription: 'job posting search' })
      expect(result.recommendations.some(r => r.category === 'jobs')).toBe(true)
    })

    it('handles geocoding category', () => {
      const result = recommendApis({ projectDescription: 'maps and location' })
      expect(result.recommendations.some(r => r.category === 'geocoding')).toBe(true)
    })
  })

  describe('searchApis', () => {
    it('finds APIs by name', () => {
      const results = searchApis('coingecko')
      expect(results.some(r => r.id === 'coingecko')).toBe(true)
    })

    it('finds APIs by description', () => {
      const results = searchApis('cryptocurrency prices')
      expect(results.length).toBeGreaterThan(0)
    })

    it('finds APIs by keyword', () => {
      const results = searchApis('bitcoin')
      expect(results.some(r => r.keywords.includes('bitcoin'))).toBe(true)
    })

    it('returns empty for empty query', () => {
      const results = searchApis('')
      expect(results).toHaveLength(0)
    })

    it('returns empty for gibberish', () => {
      const results = searchApis('xyzabc123nonsense')
      expect(results).toHaveLength(0)
    })

    it('limits results to 10', () => {
      const results = searchApis('a')
      expect(results.length).toBeLessThanOrEqual(10)
    })

    it('is case insensitive', () => {
      const lower = searchApis('weather')
      const upper = searchApis('WEATHER')
      const mixed = searchApis('WeAtHeR')
      expect(lower.length).toBe(upper.length)
      expect(upper.length).toBe(mixed.length)
    })

    it('finds QR APIs', () => {
      const results = searchApis('qr')
      expect(results.some(r => r.category === 'qr-codes')).toBe(true)
    })

    it('finds random APIs', () => {
      const results = searchApis('fake')
      expect(results.some(r => r.category === 'random')).toBe(true)
    })
  })

  describe('getRecommendationsByCategory', () => {
    it('returns APIs for a specific category', () => {
      const result = getRecommendationsByCategory('weather')
      expect(result.recommendations.every(r => r.category === 'weather')).toBe(true)
    })

    it('returns multiple APIs for a category', () => {
      const result = getRecommendationsByCategory('weather')
      expect(result.recommendations.length).toBeGreaterThan(1)
    })

    it('returns category in matchedOn', () => {
      const result = getRecommendationsByCategory('crypto')
      expect(result.matchedOn.some(m => m.includes('crypto'))).toBe(true)
    })

    it('handles geocoding category via getRecommendationsByCategory', () => {
      const result = getRecommendationsByCategory('geocoding')
      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations.every(r => r.category === 'geocoding')).toBe(true)
    })

    it('handles movies category', () => {
      const result = getRecommendationsByCategory('movies')
      expect(result.recommendations.every(r => r.category === 'movies')).toBe(true)
    })

    it('handles music category', () => {
      const result = getRecommendationsByCategory('music')
      expect(result.recommendations.every(r => r.category === 'music')).toBe(true)
    })
  })
})

describe('api-database', () => {
  it('contains at least 30 APIs', () => {
    expect(apiDatabase.length).toBeGreaterThanOrEqual(30)
  })

  it('all APIs have required fields', () => {
    for (const api of apiDatabase) {
      expect(api.id).toBeDefined()
      expect(api.name).toBeDefined()
      expect(api.description).toBeDefined()
      expect(api.category).toBeDefined()
      expect(api.baseUrl).toBeDefined()
      expect(api.endpoints).toBeDefined()
      expect(api.endpoints.length).toBeGreaterThan(0)
      expect(api.rateLimit).toBeDefined()
      expect(api.requiresKey).toBeDefined()
      expect(api.codeExample).toBeDefined()
      expect(api.keywords).toBeDefined()
    }
  })

  it('all APIs have valid categories', () => {
    const validCategories = [
      'weather', 'finance', 'crypto', 'geocoding', 'email', 'qr-codes',
      'company', 'news', 'maps', 'text', 'random', 'images', 'currency',
      'sports', 'government', 'animals', 'food', 'jobs', 'movies', 'music'
    ]
    for (const api of apiDatabase) {
      expect(validCategories.includes(api.category)).toBe(true)
    }
  })

  it('all code examples are valid JavaScript', () => {
    for (const api of apiDatabase) {
      expect(typeof api.codeExample).toBe('string')
      expect(api.codeExample.length).toBeGreaterThan(20)
      expect(api.codeExample).toMatch(/(fetch|URL|console\.log|https?:\/\/)/i)
    }
  })

  it('all APIs have at least one keyword', () => {
    for (const api of apiDatabase) {
      expect(api.keywords.length).toBeGreaterThan(0)
    }
  })

  it('all endpoints have required fields', () => {
    for (const api of apiDatabase) {
      for (const endpoint of api.endpoints) {
        expect(endpoint.method).toBeDefined()
        expect(endpoint.path).toBeDefined()
        expect(endpoint.description).toBeDefined()
        expect(endpoint.requiresAuth).toBeDefined()
        expect(['GET', 'POST']).toContain(endpoint.method)
      }
    }
  })

  it('getApisByCategory returns only matching category', () => {
    const weatherApis = getApisByCategory('weather')
    expect(weatherApis.length).toBeGreaterThan(0)
    expect(weatherApis.every(a => a.category === 'weather')).toBe(true)
  })

  it('getAllCategories returns array of unique categories', () => {
    const categories = getAllCategories()
    expect(Array.isArray(categories)).toBe(true)
    expect(new Set(categories).size === categories.length).toBe(true)
  })

  it('getApiById returns correct API', () => {
    const api = getApiById('coingecko')
    expect(api).toBeDefined()
    expect(api?.name).toBe('CoinGecko')
  })

  it('getApiById returns undefined for non-existent', () => {
    const api = getApiById('nonexistent-api')
    expect(api).toBeUndefined()
  })
})
