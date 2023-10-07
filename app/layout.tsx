import './globals.css'
import {Analytics} from '@vercel/analytics/react';
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export const runtime = 'edge';

export const metadata = {
  title: 'Marche ADEPS',
  description: 'Chaque dimanche et jour férié, des promenades balisées sont proposées en une vingtaine de sites disséminés sur tout le territoire de la Wallonie et de Bruxelles.',
  keywords: ['marches', 'adeps', 'point vert']
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <main className="container">
      {children}
      <Analytics/>
    </main>
    </body>
    </html>
  )
}
