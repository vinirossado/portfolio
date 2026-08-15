import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://vinirossado.dev"
const title = "Vinicius Rossado — Senior Software Engineer"
const description =
  "Senior software engineer building identity, payments and mobile systems in .NET, Go and Swift."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // Arquivos em /public são servidos na raiz — o prefixo "/public" dava 404.
  icons: {
    icon: "/favicon.ico",
    apple: "/apple.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    images: [{ url: "/profilepic.jpeg", width: 1200, height: 630, alt: "Vinicius Rossado" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profilepic.jpeg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
