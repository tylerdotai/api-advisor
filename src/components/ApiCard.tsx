'use client'

import { useState, useCallback } from 'react'
import { ApiRecommendation } from '@/lib/types'
import styles from './ApiCard.module.css'

interface ApiCardProps {
  api: ApiRecommendation
}

export default function ApiCard({ api }: ApiCardProps) {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testError, setTestError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(api.codeExample)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      setTestError('Failed to copy')
    }
  }, [api.codeExample])

  const handleTest = useCallback(async () => {
    setIsTesting(true)
    setTestResult(null)
    setTestError(null)

    try {
      const endpoint = api.endpoints[0]
      let url = `${api.baseUrl}${endpoint.path}`

      if (endpoint.requiresAuth) {
        url = url.replace('{KEY}', 'DEMO_KEY').replace('{TOKEN}', 'DEMO_TOKEN').replace('{API_KEY}', 'DEMO_KEY').replace('{API_KEY}', 'DEMO_KEY')
        if (url.includes('{')) {
          const response = await fetch(url)
          const text = await response.text()
          setTestResult(truncate(text, 500))
          setIsTesting(false)
          return
        }
      }

      if (endpoint.path.includes('{')) {
        const response = await fetch(url)
        const text = await response.text()
        setTestResult(truncate(text, 500))
        setIsTesting(false)
        return
      }

      url = url.replace('{lat}', '32.76').replace('{lon}', '-97.34')
      url = url.replace('{lat}', '32.76').replace('{lon}', '-97.34')
      url = url.replace('{address}', '1600+Pennsylvania+Ave')
      url = url.replace('{zipcode}', '76101')
      url = url.replace('{domain}', 'stripe.com')
      url = url.replace('{word}', 'happy')
      url = url.replace('{encoded_data}', encodeURIComponent('https://example.com'))
      url = url.replace('{encoded_config}', encodeURIComponent(JSON.stringify({ type: 'bar', data: { labels: ['A'], datasets: [{ data: [1] }] } })))
      url = url.replace('{query}', 'queen')
      url = url.replace('{results}', '3')
      url = url.replace('{barcode}', '7622210449283')
      url = url.replace('{SYMBOL}', 'IBM')
      url = url.replace('{BASE_CURRENCY}', 'USD')
      url = url.replace('{country}', 'germany')
      url = url.replace('{artist}', 'queen')
      url = url.replace('{topic}', 'technology')
      url = url.replace('{keyword}', 'nature')

      const response = await fetch(url, {
        headers: endpoint.requiresAuth && !url.includes('DEMO')
          ? {}
          : { 'User-Agent': 'API-Advisor/1.0' }
      })

      const text = await response.text()
      setTestResult(truncate(text, 500))
    } catch (err) {
      setTestError(err instanceof Error ? err.message : 'Request failed')
    }

    setIsTesting(false)
  }, [api])

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{api.name}</h3>
          <span className={styles.category}>{api.category.replace('-', ' ')}</span>
        </div>
        <p className={styles.description}>{api.description}</p>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Rate Limit</span>
          <span className={styles.metaValue}>{api.rateLimit}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Auth</span>
          <span className={styles.metaValue}>
            {api.requiresKey ? (
              <span className={styles.requiresKey}>API key required</span>
            ) : (
              <span className={styles.noKey}>No key needed</span>
            )}
          </span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>CORS</span>
          <span className={styles.metaValue}>{api.cors}</span>
        </div>
      </div>

      <div className={styles.codeSection}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>Code Example</span>
          <button
            onClick={handleCopy}
            className={styles.copyButton}
            aria-label="Copy code"
          >
            {isCopied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M4 4V3a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.25"/>
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <pre className={styles.code}>
          <code>{api.codeExample}</code>
        </pre>
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleTest}
          disabled={isTesting}
          className={styles.testButton}
        >
          {isTesting ? (
            <>
              <span className={styles.spinner}></span>
              Testing...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Test API
            </>
          )}
        </button>

        {api.keySignupUrl && (
          <a
            href={api.keySignupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.signupLink}
          >
            Get API Key
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 9l6-6M9 3H5m4 0v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>

      {testResult && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <span className={styles.resultLabel}>Response</span>
            <button
              onClick={() => setTestResult(null)}
              className={styles.closeResult}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <pre className={styles.resultContent}>{testResult}</pre>
        </div>
      )}

      {testError && (
        <div className={styles.error}>
          <span className={styles.errorLabel}>Error</span>
          <span className={styles.errorMessage}>{testError}</span>
        </div>
      )}
    </article>
  )
}

function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '... (truncated)'
}
