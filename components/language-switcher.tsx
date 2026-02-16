"use client"

import { useLanguage } from "@/components/language-provider"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "pt", label: "PT", name: t("Portuguese") },
    { code: "en", label: "EN", name: t("English") },
    { code: "ru", label: "RU", name: t("Russian") },
    { code: "et", label: "ET", name: t("Estonian") },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md text-sm font-medium text-slate-700 hover:bg-white transition-colors"
        >
          <span>{currentLanguage?.label}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-1 w-36 border border-slate-100 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'pt' | 'en' | 'ru' | 'et')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm ${
                  language === lang.code ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="font-medium mr-2">{lang.label}</span>
                <span className="text-xs">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

