import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Providers } from "@/lib/providers"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] })

import { AR_One_Sans, Quando } from "next/font/google";


const arOneSans = AR_One_Sans({
  subsets: ['latin'],
  variable: '--font-arOneSans',
  display: 'swap',
})

const quando = Quando({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-quando',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Real Estate Projects Map",
  description: "View real estate projects with interactive maps",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>

        {/* <body className={` ${quando.variable} ${arOneSans.variable} antialiased`}> */}
        <Providers>
          <Header />
          <main className="minh-screen bg-gray-50">{children}</main>
        </Providers>
      </body>
    </html>
  )
}