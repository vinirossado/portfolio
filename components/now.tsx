"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Hammer, Sprout, ExternalLink, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { MediumPost } from "@/lib/medium"

const MEDIUM_URL = "https://medium.com/@viniciusrossado"

export default function Now({ posts }: { posts: MediumPost[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const { t } = useLanguage()

  const cards = [
    { icon: <Hammer className="w-5 h-5" />, titleKey: "nowBuilding", bodyKey: "nowBuildingBody" },
    { icon: <Sprout className="w-5 h-5" />, titleKey: "nowLearning", bodyKey: "nowLearningBody" },
    { icon: <BookOpen className="w-5 h-5" />, titleKey: "nowReading", bodyKey: "nowReadingBody" },
  ]

  return (
    <section id="now" className="py-20 px-4 md:px-8 bg-white dark:bg-slate-900 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("now")}
        </motion.h2>
        <motion.p
          className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t("nowSubtitle")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-orange-800 transition-all hover:shadow-xl group"
            >
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-orange-500 w-fit mb-4 group-hover:bg-blue-600 dark:group-hover:bg-orange-600 group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">{t(card.titleKey)}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{t(card.bodyKey)}</p>
              <div className="mt-4 h-0.5 w-12 bg-blue-200 dark:bg-orange-700 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* ---------- Escrita / Medium ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t("writing")}</h3>
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-orange-400 hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              {t("seeAllOnMedium")} <ExternalLink size={14} />
            </a>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.08 }}
                  className="flex flex-col bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-orange-800 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-slate-800 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </h4>
                    <ArrowUpRight
                      size={16}
                      className="flex-shrink-0 mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors"
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">{post.snippet}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-orange-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {post.date && (
                    <time className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </motion.a>
              ))}
            </div>
          ) : (
            // Feed indisponivel no build — nunca deixa a secao vazia
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-slate-800 rounded-xl p-8 text-center shadow-lg border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-orange-800 transition-all"
            >
              <p className="text-slate-600 dark:text-slate-300">{t("writingFallback")}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-orange-400">
                {t("seeAllOnMedium")} <ExternalLink size={14} />
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
