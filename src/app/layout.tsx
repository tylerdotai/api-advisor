import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'API Advisor — Find the Right APIs for Your Project',
  description: 'Get recommended free APIs for your project with working code examples. No fluff, just practical recommendations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
