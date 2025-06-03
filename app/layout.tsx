

import './ui/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/auth'
import { Ubuntu, Lato, Poppins, Outfit } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

//const ubuntu = Ubuntu({
  //subsets: ['latin'],
  //weight: ['300', '400', '500', '700'],
  //variable: '--font-ubuntu',
//})

//const lato = Lato({
  //subsets: ['latin'],
  //weight: ['300', '400', '700'],
  //variable: '--font-lato',
  //display: 'swap',
  //style: 'normal',
  //fallback: ['system-ui', 'sans-serif'],
  //preload: true,
  //adjustFontFallback: true,
  //})

//const poppins = Poppins({
  //subsets: ['latin'],
  //weight: ['300', '400', '500', '600'],
  //variable: '--font-poppins',
  //display: 'swap',
  //style: 'normal',
  //fallback: ['system-ui', 'sans-serif'],
  //preload: true,
  //adjustFontFallback: true,
//})

const outfit = Outfit({ subsets: ['latin'],weight: ['200', '300', '400', '500', '600', '700'] ,  variable: '--font-outfit', fallback: ['system-ui', 'sans-serif'], display: 'swap', style: 'normal', preload: true, adjustFontFallback: true, })
const inter = Inter({ subsets: ['latin'],weight: ['300', '400', '500'], variable: '--font-inter', fallback: ['system-ui', 'sans-serif'], display: 'swap', style: 'normal', preload: true, adjustFontFallback: true, })


export const metadata: Metadata = {
  title: 'DASOS UPM',
  description: 'Dashboard de datos academicos para estudiantes de la UPM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-inter">
  
        <AuthProvider>
          {children}
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}