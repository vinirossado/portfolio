"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star, GitFork, Github, Code2, CircleDot } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { GithubDados } from "@/lib/github"

const USER = "vinirossado"

// Cores oficiais do linguist para as linguagens que ele usa.
// Esta e a unica excecao a paleta azul/laranja: sao cores de dado, nao de marca.
const LANG_COLOR: Record<string, string> = {
  "C#": "#178600",
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Swift: "#F05138",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  Ruby: "#701516",
  Python: "#3572A5",
}

export default function GithubStats({ dados }: { dados: GithubDados }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const { t } = useLanguage()

  /*
    Os dados chegam prontos do build (lib/github.ts). Nao ha mais fetch no
    cliente, entao tambem nao ha estado de carregamento nem de falha: ou o
    build conseguiu ler a API e a secao aparece completa, ou nao conseguiu e
    ela nao existe. Meio-termo com esqueleto piscando era pior.
  */
  const stats = dados
  if (stats.repos === 0) return null

  const numeros = [
    { icon: <Code2 className="w-4 h-4" />, valor: stats.repos, labelKey: "ghRepos" },
    { icon: <Star className="w-4 h-4" />, valor: stats.stars, labelKey: "ghStars" },
    { icon: <GitFork className="w-4 h-4" />, valor: stats.forks, labelKey: "ghForks" },
  ]

  return (
    <section id="github" className="py-20 px-4 md:px-8 bg-blue-50 dark:bg-slate-800 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("githubActivity")}
        </motion.h2>
        <motion.p
          className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t("githubActivitySubtitle")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {numeros.map((n, index) => (
            <motion.div
              key={n.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-orange-500 mb-2">
                {n.icon}
                <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t(n.labelKey)}
                </span>
              </div>
              <div className="text-4xl font-bold text-slate-800 dark:text-white tabular-nums">
                {n.valor}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between gap-4 mb-5">
            <h3 className="font-bold text-slate-800 dark:text-white">{t("ghLanguages")}</h3>
            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-orange-400 hover:underline flex items-center gap-1.5"
            >
              <Github size={14} /> @{USER}
            </a>
          </div>

          {/* barra unica proporcional, como no GitHub */}
          <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 mb-5">
                {stats.languages.map((l) => (
                  <div
                    key={l.name}
                    style={{ width: `${l.pct}%`, backgroundColor: LANG_COLOR[l.name] ?? "#94A3B8" }}
                    title={`${l.name} — ${l.count}`}
                  />
                ))}
              </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {stats.languages.map((l) => (
              <div key={l.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: LANG_COLOR[l.name] ?? "#94A3B8" }}
                    />
                    <span className="text-slate-700 dark:text-slate-200">{l.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 tabular-nums">{l.pct.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
          {stats.lastPush && (
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <CircleDot size={12} className="text-green-500" />
                  {t("ghLastPush")}{" "}
                  {new Date(stats.lastPush).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
        </motion.div>
      </div>
    </section>
  )
}
