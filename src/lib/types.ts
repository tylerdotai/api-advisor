export interface ApiEndpoint {
  method: 'GET' | 'POST'
  path: string
  description: string
  requiresAuth: boolean
  authType?: 'none' | 'api-key' | 'header'
}

export interface ApiRecommendation {
  id: string
  name: string
  description: string
  category: ApiCategory
  baseUrl: string
  endpoints: ApiEndpoint[]
  rateLimit: string
  requiresKey: boolean
  keySignupUrl?: string
  freeTier: string
  cors: 'yes' | 'no' | 'unknown'
  codeExample: string
  keywords: string[]
  verified?: boolean
}

export type ApiCategory =
  | 'weather'
  | 'finance'
  | 'crypto'
  | 'geocoding'
  | 'email'
  | 'qr-codes'
  | 'company'
  | 'news'
  | 'maps'
  | 'text'
  | 'random'
  | 'images'
  | 'currency'
  | 'sports'
  | 'government'
  | 'animals'
  | 'food'
  | 'jobs'
  | 'movies'
  | 'music'

export interface AdvisorInput {
  projectDescription: string
  category?: ApiCategory
}

export interface AdvisorResult {
  recommendations: ApiRecommendation[]
  matchedOn: string[]
}
