"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Cloud, Code, Database, ExternalLink, Layers, Smartphone, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { GithubRepository } from "@/models/github-repository"
import { anosDeExperiencia, anosDesde, EMPRESA_ATUAL } from "@/lib/career"

interface Skill {
  nameKey: string
  year: number
  icon: React.ReactNode
  categoryKey: string
  descriptionKey: string
}

/*
  Forma plural do numeral.

  O russo tem tres: 1 год, 2-4 года, 5+ лет — e a regra olha o ultimo digito,
  com excecao para 11-14. Sem isso a secao mostrava "4 лет" e "2 лет", que um
  leitor russo le como erro de gramatica. Nos outros tres idiomas so existem
  singular e plural, entao "few" cai no mesmo lugar que "many".

  Valores fracionarios (SwiftUI e Bicep tem 1.5) usam a forma "few" em russo,
  que e o genitivo singular exigido depois de decimal, e o plural normal nos
  demais.
*/
type FormaPlural = "one" | "few" | "many"

function formaPlural(n: number, lang: string): FormaPlural {
  if (!Number.isInteger(n)) return lang === "ru" ? "few" : "many"
  if (lang === "ru") {
    const ultimo = n % 10
    const doisUltimos = n % 100
    if (ultimo === 1 && doisUltimos !== 11) return "one"
    if (ultimo >= 2 && ultimo <= 4 && (doisUltimos < 12 || doisUltimos > 14)) return "few"
    return "many"
  }
  return n === 1 ? "one" : "many"
}

const CHAVES_DURACAO = {
  ano: { one: "yearOne", few: "yearsFew", many: "years" },
  mes: { one: "monthOne", few: "monthsFew", many: "months" },
} as const

/**
 * Todo card mostra um numero na mesma unidade — nada de "Aprendendo" no meio
 * de uma coluna de anos. Abaixo de um ano a unidade vira meses, com piso de 1:
 * uma skill que comecei ha tres semanas e "1 mes", nunca "0".
 */
function formatarDuracao(anos: number, t: (k: string) => string, lang: string) {
  if (anos < 1) {
    const meses = Math.max(1, Math.round(anos * 12))
    return `${meses} ${t(CHAVES_DURACAO.mes[formaPlural(meses, lang)])}`
  }
  return `${anos} ${t(CHAVES_DURACAO.ano[formaPlural(anos, lang)])}`
}

/*
  Piso da barra. F# tem semanas contra os 9 anos de C#, entao a largura real
  daria menos de 1% — invisivel, e uma barra vazia le como bug. 2% mostra que
  existe sem alegar proficiencia.
*/
const LARGURA_MINIMA = 2
const larguraDaBarra = (anos: number, max: number) =>
  Math.max(LARGURA_MINIMA, (anos / max) * 100)

const yearsOfExperience = anosDeExperiencia()

const skills: Skill[] = [
  {
    nameKey: "skillCSharpName",
    year: yearsOfExperience,
    icon: <Code className="w-6 h-6" />,
    categoryKey: "skillCSharpCategory",
    descriptionKey: "skillCSharpDescription",
  },
  {
    nameKey: "skillFSharpName",
    // Comecou junto com a LEGO; o numero se mantem sozinho.
    year: Math.round(anosDesde(EMPRESA_ATUAL.inicio) * 100) / 100,
    icon: <Code className="w-6 h-6" />,
    categoryKey: "skillFSharpCategory",
    descriptionKey: "skillFSharpDescription",
  },
  {
    nameKey: "skillGoName",
    year: yearsOfExperience - 5,
    icon: <Code className="w-6 h-6" />,
    categoryKey: "skillGoCategory",
    descriptionKey: "skillGoDescription",
  },
  {
    nameKey: "skillTypeScriptName",
    year: yearsOfExperience,
    icon: <Code className="w-6 h-6" />,
    categoryKey: "skillTypeScriptCategory",
    descriptionKey: "skillTypeScriptDescription",
  },
  {
    nameKey: "skillAngularName",
    year: yearsOfExperience,
    icon: <Layers className="w-6 h-6" />,
    categoryKey: "skillAngularCategory",
    descriptionKey: "skillAngularDescription",
  },
  {
    nameKey: "skillIonicName",
    year: yearsOfExperience - 5,
    icon: <Smartphone className="w-6 h-6" />,
    categoryKey: "skillIonicCategory",
    descriptionKey: "skillIonicDescription",
  },
  {
    nameKey: "skillSwiftUIName",
    year: yearsOfExperience - 7.5,
    icon: <Smartphone className="w-6 h-6" />,
    categoryKey: "skillSwiftUICategory",
    descriptionKey: "skillSwiftUIDescription",
  },
  {
    nameKey: "skillStencilJSName",
    year: yearsOfExperience - 5,
    icon: <Layers className="w-6 h-6" />,
    categoryKey: "skillStencilJSCategory",
    descriptionKey: "skillStencilJSDescription",
  },
  {
    nameKey: "skillMongoDBName",
    year: yearsOfExperience - 5,
    icon: <Database className="w-6 h-6" />,
    categoryKey: "skillMongoDBCategory",
    descriptionKey: "skillMongoDBDescription",
  },
  {
    nameKey: "skillSQLServerName",
    year: yearsOfExperience - 2,
    icon: <Database className="w-6 h-6" />,
    categoryKey: "skillSQLServerCategory",
    descriptionKey: "skillSQLServerDescription",
  },
  {
    nameKey: "skillOracleName",
    year: yearsOfExperience - 6,
    icon: <Database className="w-6 h-6" />,
    categoryKey: "skillOracleCategory",
    descriptionKey: "skillOracleDescription",
  },
  {
    nameKey: "skillDockerName",
    year: yearsOfExperience - 4,
    icon: <Cloud className="w-6 h-6" />,
    categoryKey: "skillDockerCategory",
    descriptionKey: "skillDockerDescription",
  },
  {
    nameKey: "skillKubernetesName",
    year: yearsOfExperience - 7,
    icon: <Cloud className="w-6 h-6" />,
    categoryKey: "skillKubernetesCategory",
    descriptionKey: "skillKubernetesDescription",
  },
  {
    nameKey: "skillBicepName",
    year: yearsOfExperience - 7.5,
    icon: <Cloud className="w-6 h-6" />,
    categoryKey: "skillBicepCategory",
    descriptionKey: "skillBicepDescription",
  },
  {
    nameKey: "skillTerraformName",
    year: yearsOfExperience - 6,
    icon: <Cloud className="w-6 h-6" />,
    categoryKey: "skillTerraformCategory",
    descriptionKey: "skillTerraformDescription",
  },
]

// Maior valor real da lista — a barra e proporcional a isso, nao a uma
// constante solta. Se um dia a skill mais antiga mudar, a escala acompanha.
const maxYears = Math.max(...skills.map((s) => s.year))

export default function Skills() {
  const ref = useRef(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [repos, setRepos] = useState<GithubRepository[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { t, language } = useLanguage()

  // Map skill name keys to GitHub language identifiers
  const skillToGithubLanguage: Record<string, string> = {
    skillCSharpName: "C#",
    skillGoName: "Go",
    skillTypeScriptName: "TypeScript",
    skillSwiftUIName: "Swift",
  }

  // Helper functions for translation
  function getSkillName(skill: Skill) {
    return t(skill.nameKey)
  }
  function getSkillCategory(skill: Skill) {
    return t(skill.categoryKey)
  }
  function getSkillDescription(skill: Skill) {
    return t(skill.descriptionKey)
  }

  function getGithubLanguage(skill: Skill): string | null {
    return skillToGithubLanguage[skill.nameKey] || null
  }

  // Handle skill click with auto-scroll for both mobile and desktop
  const handleSkillClick = (skill: Skill) => {
    setActiveSkill(skill)
    
    // Auto-scroll to details panel for better UX
    if (detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: window.innerWidth < 1024 ? 'start' : 'center',
          inline: 'nearest'
        })
      }, 100)
    }
  }

  // Fetch repos once and cache them
  useEffect(() => {
    const fetchRepos = async () => {
      if (repos.length > 0) return
      if (activeSkill && getGithubLanguage(activeSkill)) {
        setIsLoading(true)
        try {
          const response = await fetch(`https://api.github.com/users/vinirossado/repos?sort=updated&per_page=100`)
          const data = await response.json()
          setRepos(data)
        } catch (error) {
          console.error("Error fetching repos:", error)
          setRepos([])
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchRepos()
  }, [activeSkill])

  const githubLang = activeSkill ? getGithubLanguage(activeSkill) : null
  const filteredRepos = githubLang
    ? repos.filter((repo) => repo.language === githubLang)
    : []

  // Agrupar habilidades por categoria
  const categories = skills.reduce(
    (acc: Record<string, Skill[]>, skill: Skill) => {
      const category = getSkillCategory(skill)
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section id="skills" className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-blue-50 dark:bg-slate-900 opacity-70">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 100, 0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Client-only animated background */}
      {/* <AnimatedBackground /> */}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("skills")}
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Skill hexagon grid */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 order-2 lg:order-1">
            {skills.sort((a, b) => b.year - a.year)
              .map((skill, index) => (
                <motion.div
                  key={skill.nameKey}
                  // Antes: delay 0.1 * index. Com 14 skills o ultimo card so
                  // aparecia 1,3s depois, entao a secao lia como "quebrada"
                  // durante o scroll. Teto de 0.3s no stagger.
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.28, delay: isLoaded ? 0 : Math.min(0.03 * index, 0.3) }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border transition-all cursor-pointer ${
                    activeSkill?.nameKey === skill.nameKey 
                      ? 'border-blue-500 dark:border-orange-500 ring-2 ring-blue-200 dark:ring-orange-200' 
                      : 'border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-orange-800'
                  }`}
                  onClick={() => handleSkillClick(skill)}
                  onAnimationComplete={() => index === skills.length - 1 ? setIsLoaded(true) : null}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r
                      from-blue-400 to-blue-600
                      dark:from-orange-400 dark:to-orange-600
                     rounded-t-xl"
                    style={{ opacity: Math.max(0.25, skill.year / yearsOfExperience) }}
                  ></div>

                  <div className="flex flex-col items-center text-center h-full">
                    <div className="mb-3 p-3 rounded-full
                     bg-blue-100/50 dark:bg-slate-700/50
                     text-blue-600 dark:text-orange-500">
                      {skill.icon}
                    </div>

              <h3 className="font-bold
                text-slate-800 dark:text-white
                mb-1">{getSkillName(skill)}</h3>
              <div className="text-xs
              text-slate-500 dark:text-slate-400
               mb-3">
               {getSkillCategory(skill)}
              </div>

                    <div className="mt-auto pt-3 w-full">
                      {/*
                        A barra so tinha largura quando `isInView` era true E a
                        animacao (delay 0.3 + 0.1*index) ja tinha rodado. Com 14
                        skills o ultimo card so preenchia depois de 1,7s — e na
                        pratica C# e TypeScript apareciam VAZIOS. Agora a largura
                        e o estado base; a animacao so a acompanha.
                      */}
                      {/*
                        SEM animacao de propósito. A barra ja falhou uma vez por
                        depender de uma animacao para ficar visivel: com
                        `initial={{width:0}}` + gate de isInView, C# e TypeScript
                        apareciam VAZIOS. Trocar por scaleX(0) teria o mesmo
                        modo de falha — se o rAF nao roda (aba em segundo plano,
                        JS lento), a barra fica invisivel de novo.
                        A largura e a informacao; ela nao pode depender de nada.
                      */}
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r
                           from-blue-400 to-blue-600
                           dark:from-orange-400 dark:to-orange-600"
                          style={{ width: `${larguraDaBarra(skill.year, maxYears)}%` }}
                        />
                      </div>

                      {/*
                        Antes: {t("fromYear")} e {yearsOfExperience} — valores
                        globais, entao TODOS os 14 cards liam "0 -> 9 Years",
                        independente da skill. Agora mostra os anos da skill.
                      */}
                      <div className="mt-1 text-right text-xs font-medium text-blue-600 dark:text-orange-400">
                        {formatarDuracao(skill.year, t, language)}
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Skill details panel */}
          <motion.div
            ref={detailsRef}
            className="lg:col-span-1
            bg-white/80 dark:bg-slate-800/80
            backdrop-blur-sm rounded-xl p-6 h-full border
            border-blue-100 dark:border-orange-700 
            lg:sticky lg:top-24
            order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">
              {t("skillDetails")}
            </h3>
            {/* Mobile hint */}
            <div className="lg:hidden mb-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              {!activeSkill && t("clickSkill")}
            </div>
            {activeSkill ? (
              <motion.div
                key={activeSkill.nameKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg
                   bg-blue-100/50 dark:bg-slate-700/50
                   text-blue-600 dark:text-orange-500">
                    {activeSkill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{getSkillName(activeSkill)}</h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{getSkillCategory(activeSkill)}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{t("proficiencyLevel")}</div>
                  {/* mesma regra do card: a largura nao depende de animacao */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r
                           from-blue-400 to-blue-600
                           dark:from-orange-400 dark:to-orange-600"
                      style={{ width: `${larguraDaBarra(activeSkill.year, maxYears)}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formatarDuracao(activeSkill.year, t, language)}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">{t("description")}</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{getSkillDescription(activeSkill)}</p>
                </div>

                {getGithubLanguage(activeSkill) && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                      <span>
                        {t("Related Repos")} ({filteredRepos.length})
                      </span>
                      {filteredRepos.length > 0 && (
                        <a
                          href={`https://github.com/vinirossado?tab=repositories&q=&language=${getGithubLanguage(activeSkill)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-orange-500 hover:underline flex items-center"
                        >
                          {t("seeAll")} <ExternalLink size={12} className="ml-1" />
                        </a>
                      )}
                    </h5>

                    {isLoading ? (
                      <div className="flex justify-center items-center py-6 space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    ) : filteredRepos.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                        {filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).map((repo) => (
                          <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br
                             from-white to-blue-50
                              dark:from-slate-800 dark:to-slate-900
                              rounded-lg shadow-sm
                              border border-blue-100
                            dark:border-orange-700/30
                              overflow-hidden hover:shadow-md transition-all
                              dark:hover:border-orange-600/50"
                          >
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block p-3">
                              <div className="flex items-start justify-between">
                                <h6 className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-orange-400 dark:hover:text-orange-300 transition-colors line-clamp-1">
                                  {repo.name}
                                </h6>
                                <div className="flex items-center text-xs text-slate-500 whitespace-nowrap ml-2">
                                  <Star size={12} className="text-amber-400 mr-1" />
                                  <span>{repo.stargazers_count}</span>
                                </div>
                              </div>

                              {repo.description && (
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 min-h-[2rem]">
                                  {repo.description}
                                </p>
                              )}

                              <div className="mt-2 flex items-center justify-between text-xs">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-orange-500 mr-1.5"></div>
                                  <span className="text-slate-600 dark:text-slate-300">{repo.language || getSkillName(activeSkill)}</span>
                                </div>
                                <span className="text-slate-500 text-[10px]">
                                  {new Date(repo.updated_at).toLocaleDateString(undefined, {
                                    year: "2-digit",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </a>
                          </motion.div>
                        ))}

                        {filteredRepos.length > 5 && (
                          <a
                            href={`https://github.com/vinirossado?tab=repositories&q=&language=${getGithubLanguage(activeSkill)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center text-xs text-blue-600 hover:text-blue-800 dark:text-orange-400 dark:hover:text-orange-300 py-2 bg-blue-50 dark:bg-slate-800 rounded-md border border-blue-100 dark:border-orange-700/30 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            {t("seeAllRepos").replace("{count}", String(filteredRepos.length - 5))}
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="bg-blue-50/50 dark:bg-slate-800/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-300">{t("noReposFound")}</p>
                        <a
                          href={`https://github.com/vinirossado`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-xs text-blue-600 dark:text-orange-400 hover:underline"
                        >
                          {t("seeAllRepos")}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-4">
                <p className="text-slate-500 text-sm">{t("clickSkill")}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Skill categories */}
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {Object.entries(categories).map(([category, categorySkills], index) => (
            <div key={category} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-xl p-5 border border-blue-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800  dark:text-white mb-3">{category}</h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div key={skill.nameKey} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <div className="mb-3 p-3 rounded-full
                     bg-blue-100/50 dark:bg-slate-700/50
                     text-blue-600 dark:text-orange-500">
                      {skill.icon}
                    </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{getSkillName(skill)}</span>
                    </div>
                    
                    {/* Terceiro lugar que renderiza a duracao — os outros dois
                        sao o card e o painel de detalhes. Os tres passam pelo
                        mesmo formatarDuracao para nao divergirem de novo. */}
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-orange-400 rounded-full">
                      {formatarDuracao(skill.year, t, language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section >
  )
}