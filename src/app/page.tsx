'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiDatabase, getAllCategories } from '@/lib/api-data'
import { ApiCategory } from '@/lib/types'
import styles from './page.module.css'
import ApiCard from '@/components/ApiCard'
import integrationResults from '../../integration-test-results.json' assert { type: 'json' }

// Build status map from integration results
const statusMap: Record<string, string> = {}
for (const r of integrationResults.results as Array<{id: string; status: string}>) {
  statusMap[r.id] = r.status
}

export default function Home() {
  const ALL_CATEGORIES = getAllCategories()

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const api of apiDatabase) {
      counts[api.category] = (counts[api.category] || 0) + 1
    }
    return counts
  }, [])

  const totalGreen = useMemo(() => {
    return apiDatabase.filter(a => statusMap[a.id] === 'GREEN').length
  }, [])

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null)
  const [showNoKeyOnly, setShowNoKeyOnly] = useState(false)
  const [showGreenOnly, setShowGreenOnly] = useState(false)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 200)
    return () => clearTimeout(timer)
  }, [search])

  // Filter logic
  const filteredApis = useMemo(() => {
    let apis = apiDatabase

    if (selectedCategory) {
      apis = apis.filter(a => a.category === selectedCategory)
    }

    if (showNoKeyOnly) {
      apis = apis.filter(a => !a.requiresKey)
    }

    if (showGreenOnly) {
      apis = apis.filter(a => statusMap[a.id] === 'GREEN')
    }

    const q = debouncedSearch.toLowerCase().trim()
    if (q.length > 0) {
      apis = apis.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some(k => k.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      )
    }

    return apis
  }, [selectedCategory, showNoKeyOnly, showGreenOnly, debouncedSearch])

  const handleCategoryClick = useCallback((cat: ApiCategory | null) => {
    setSelectedCategory(prev => prev === cat ? null : cat)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearch('')
    setSelectedCategory(null)
    setShowNoKeyOnly(false)
    setShowGreenOnly(false)
  }, [])

  const hasActiveFilters = selectedCategory || showNoKeyOnly || showGreenOnly || debouncedSearch.length > 0

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#FF6B00"/>
                <path d="M8 20V8l12 12V8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div>
              <h1 className={styles.title}>API Advisor</h1>
              <p className={styles.tagline}>Free APIs with working code. No fluff.</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{apiDatabase.length}</span>
              <span className={styles.statLabel}>APIs</span>
            </div>
            <div className={styles.statDivider}/>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.statGreen}`}>{totalGreen}</span>
              <span className={styles.statLabel}>GREEN</span>
            </div>
            <div className={styles.statDivider}/>
            <div className={styles.stat}>
              <span className={styles.statValue}>{ALL_CATEGORIES.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search + Filters */}
      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search APIs by name, keyword, or category..."
              className={styles.searchInput}
              aria-label="Search APIs"
            />
            {search && (
              <button onClick={() => setSearch('')} className={styles.clearSearch} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter row */}
        <div className={styles.filterRow}>
          <div className={styles.categoryChips}>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`${styles.chip} ${selectedCategory === null ? styles.chipActive : ''}`}
            >
              All
              <span className={styles.chipCount}>{apiDatabase.length}</span>
            </button>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
              >
                {cat.replace('-', '\u2011')}
                <span className={styles.chipCount}>{categoryCounts[cat] || 0}</span>
              </button>
            ))}
          </div>

          <div className={styles.toggles}>
            <button
              onClick={() => setShowNoKeyOnly(v => !v)}
              className={`${styles.toggle} ${showNoKeyOnly ? styles.toggleActive : ''}`}
            >
              <span className={styles.toggleDot}/>
              No key
            </button>
            <button
              onClick={() => setShowGreenOnly(v => !v)}
              className={`${styles.toggle} ${showGreenOnly ? styles.toggleActiveGreen : ''}`}
            >
              <span className={`${styles.toggleDot} ${showGreenOnly ? styles.toggleDotGreen : ''}`}/>
              GREEN only
            </button>
            {hasActiveFilters && (
              <button onClick={handleClearFilters} className={styles.clearFilters}>
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <section className={styles.results}>
        <div className={styles.resultsBar}>
          <span className={styles.resultsCount}>
            {filteredApis.length === apiDatabase.length
              ? `All ${apiDatabase.length} APIs`
              : `${filteredApis.length} of ${apiDatabase.length} APIs`}
            {selectedCategory && ` in ${selectedCategory}`}
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </span>
        </div>

        {filteredApis.length > 0 ? (
          <motion.div
            className={styles.apiGrid}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredApis.map((api, i) => (
                <motion.div
                  key={api.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.4) }}
                >
                  <ApiCard api={api} status={statusMap[api.id] || 'UNKNOWN'} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M32 32l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 22h8M22 18v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>No APIs match your filters</h3>
            <p>Try adjusting your search or filters</p>
            <button onClick={handleClearFilters} className={styles.emptyButton}>
              Clear filters
            </button>
          </motion.div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>Built by Flume SaaS Factory. APIs tested live. Status reflects real-world availability.</p>
      </footer>
    </main>
  )
}
