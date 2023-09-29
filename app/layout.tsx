import './globals.css'
import {Analytics} from '@vercel/analytics/react';
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from "@/components/Header";

config.autoAddCss = false

export const metadata = {
  title: 'ADEPS Walks',
  description: 'Generated by create next app',
}

export const runtime = 'edge'

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <main className="container">
      <Header/>
      {children}
      <Analytics/>
    </main>
    </body>
    </html>
  )
}
