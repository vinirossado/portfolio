"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Star, GitFork, Github, Code2, CircleDot } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { GithubRepository } from "@/models/github-repository"

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

interface Stats {
  repos: number
  stars: number
  forks: number
  languages: { name: string; count: number; pct: number }[]
  lastPush: string | null
}

export default function GithubStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const { t } = useLanguage()
  const [stats, setStats] = useState<Stats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!isInView || stats || failed) return
    let cancelado = false

    ;(async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: GithubRepository[] = await res.json()
        if (!Array.isArray(data)) throw new Error("resposta inesperada")
        if (cancelado) return

        const proprios = data.filter((r: any) => !r.fork)
        const porLingua = new Map<string, number>()
        for (const r of proprios) {
          if (!r.language) continue
          porLingua.set(r.language, (porLingua.get(r.language) ?? 0) + 1)
        }
        const totalComLingua = [...porLingua.values()].reduce((a, b) => a + b, 0) || 1
        const languages = [...porLingua.entries()]
          .map(([name, count]) => ({ name, count, pct: (count / totalComLingua) * 100 }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6)

        setStats({
          repos: proprios.length,
          stars: proprios.reduce((a, r) => a + (r.stargazers_count ?? 0), 0),
          forks: proprios.reduce((a, r: any) => a + (r.forks_count ?? 0), 0),
          languages,
          lastPush: (proprios[0] as any)?.pushed_at ?? null,
        })
      } catch {
        // API do GitHub tem rate limit de 60 req/h por IP sem token.
        // Falhar em silencio e melhor do que mostrar zeros como se fossem reais.
        if (!cancelado) setFailed(true)
      }
    })()

    return () => {
      cancelado = true
    }
  }, [isInView, stats, failed])

  if (failed) return null

  const numeros = [
    { icon: <Code2 className="w-4 h-4" />, valor: stats?.repos, labelKey: "ghRepos" },
    { icon: <Star className="w-4 h-4" />, valor: stats?.stars, labelKey: "ghStars" },
    { icon: <GitFork className="w-4 h-4" />, valor: stats?.forks, labelKey: "ghForks" },
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
                {n.valor === undefined ? (
                  <span className="inline-block w-16 h-9 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
                ) : (
                  n.valor
                )}
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

          {stats ? (
            <>
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
            </>
          ) : (
            <div className="space-y-3">
              <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
