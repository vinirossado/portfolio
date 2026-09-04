"use client"

import { Github, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import BuyMeACoffeeButton from "@/components/buy-me-a-coffee"

/*
  O lucide-react nao tem icone do Medium (a biblioteca so mantem alguns poucos
  logos de marca), entao vai o proprio logo — os tres circulos da wordmark.
  `currentColor` para acompanhar o tema e o hover como os outros icones.
*/
function MediumIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12M20.96 12c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.51-6.42 3.38-6.42S20.96 8.46 20.96 12M24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="py-10 px-4 md:px-8 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Vinicius Rossado</h3>
            <p className="text-slate-600 dark:text-slate-200 mt-1">{t("fullstackDev")}</p>
          </div>

          <div className="flex gap-4 items-center">
            <BuyMeACoffeeButton variant="footer" />
            <a
              target="_blank"
              href="https://www.github.com/vinirossado"
              className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-700
              dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50
               transition-colors shadow-sm"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/viniciusrossado/"
              className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-700
              dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50
               transition-colors shadow-sm"              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@viniciusrossado"
              className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-700
              dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50
               transition-colors shadow-sm"
              aria-label="Medium"
            >
              <MediumIcon size={20} />
            </a>

            <a
              target="_blank"
              href="https://www.instagram.com/vinirossado"
              className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-700
              dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50
               transition-colors shadow-sm"              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {currentYear} Vinicius Rossado. {t("footerRights")}</p>
        </div>
      </div>
    </footer>
  )
}

