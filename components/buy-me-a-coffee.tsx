"use client"

import { useLanguage } from "@/components/language-provider"
import { Coffee } from "lucide-react"

const BMAC_URL = "https://buymeacoffee.com/qY3QfHG"

interface BuyMeACoffeeButtonProps {
  variant: "header" | "hero" | "footer" | "cta"
}

export default function BuyMeACoffeeButton({ variant }: BuyMeACoffeeButtonProps) {
  const { t } = useLanguage()

  if (variant === "header") {
    return (
      <a
        href={BMAC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-28 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xs font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Coffee className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t("buyMeACoffee")}</span>
      </a>
    )
  }

  if (variant === "hero") {
    return (
      <a
        href={BMAC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full font-medium transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 text-sm sm:text-base text-center inline-flex items-center gap-2"
      >
        <Coffee className="w-4 h-4" />
        {t("buyMeACoffee")}
      </a>
    )
  }

  if (variant === "footer") {
    return (
      <a
        href={BMAC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 transition-colors shadow-sm"
        aria-label="Buy me a coffee"
      >
        <Coffee size={20} />
      </a>
    )
  }

  // CTA variant
  return (
    <a
      href={BMAC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl ml-3"
    >
      <Coffee size={18} />
      <span>{t("buyMeACoffee")}</span>
    </a>
  )
}
