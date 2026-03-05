import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jackie Tan Yen',
  description: 'builder, investor, generalist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-terminal-bg text-terminal-text font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
