'use client'

import { useState, useCallback, useEffect } from 'react'
import { recommendApis, searchApis } from '@/lib/api-advisor'
import { getAllCategories } from '@/lib/api-data'
import { ApiRecommendation, ApiCategory } from '@/lib/types'
import styles from './page.module.css'
import ApiCard from '@/components/ApiCard'

export default function Home() {
  const [input, setInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null)
  const [recommendations, setRecommendations] = useState<ApiRecommendation[]>([])
  const [searchResults, setSearchResults] = useState<ApiRecommendation[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState<'browse' | 'search'>('browse')

  const categories = getAllCategories()

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    setSelectedCategory(null)

    if (value.trim().length > 2) {
      setIsSearching(true)
      const results = searchApis(value)
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }, [])

  const handleRecommend = useCallback(() => {
    if (!input.trim() && !selectedCategory) {
      setRecommendations([])
      return
    }
    const result = recommendApis({
      projectDescription: input,
      category: selectedCategory || undefined
    })
    setRecommendations(result.recommendations)
    setActiveTab('browse')
  }, [input, selectedCategory])

  const handleCategoryClick = useCallback((cat: ApiCategory) => {
    setSelectedCategory(prev => prev === cat ? null : cat)
    setInput('')
    setIsSearching(false)
    setSearchResults([])
  }, [])

  const handleClear = useCallback(() => {
    setInput('')
    setSelectedCategory(null)
    setRecommendations([])
    setSearchResults([])
    setIsSearching(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim() || selectedCategory) {
        handleRecommend()
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [input, selectedCategory, handleRecommend])

  const showResults = recommendations.length > 0 || searchResults.length > 0
  const displayApis = isSearching ? searchResults : recommendations

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>API Advisor</h1>
          <p className={styles.subtitle}>
            Tell me what you want to build. I will recommend free APIs with working code.
          </p>
        </div>
      </header>

      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="weather dashboard, email validator, crypto tracker..."
            className={styles.input}
            aria-label="Project description"
          />
          {(input || selectedCategory) && (
            <button onClick={handleClear} className={styles.clearButton} aria-label="Clear">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`${styles.categoryChip} ${selectedCategory === cat ? styles.categoryActive : ''}`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className={styles.matchInfo}>
            <span className={styles.matchLabel}>Matched on:</span>
            {recommendations[0]?.keywords.slice(0, 3).map(kw => (
              <span key={kw} className={styles.matchTag}>{kw}</span>
            ))}
          </div>
        )}
      </div>

      {showResults && (
        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {isSearching ? 'Search Results' : 'Recommended APIs'}
            </h2>
            <span className={styles.resultsCount}>{displayApis.length} APIs</span>
          </div>

          <div className={styles.apiGrid}>
            {displayApis.map(api => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>

          {displayApis.length === 0 && (
            <div className={styles.noResults}>
              <p>No APIs found. Try a different description or browse by category.</p>
            </div>
          )}
        </section>
      )}

      {!showResults && !isSearching && (
        <section className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <h2 className={styles.emptyTitle}>What can you build?</h2>
            <ul className={styles.exampleList}>
              <li>Weather dashboard with forecasts</li>
              <li>Email validation in signup forms</li>
              <li>Crypto portfolio tracker</li>
              <li>Address to coordinates converter</li>
              <li>Stock price monitor</li>
              <li>Currency exchange calculator</li>
              <li>Random dog image generator</li>
              <li>QR code generator</li>
              <li>Fake user data for testing</li>
              <li>Movie database browser</li>
            </ul>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <p>Free APIs with real code. No fluff.</p>
      </footer>
    </main>
  )
}
