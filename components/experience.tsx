"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const experiences = [
  {
    id: 0,
    titleKey: "exp0Title",
    companyKey: "exp0Company",
    companyUrlKey: "exp0CompanyUrl",
    locationKey: "exp0Location",
    periodKey: "exp0Period",
    descriptionKey: "exp0Description",
    responsibilityKeys: ["exp0Resp1", "exp0Resp2", "exp0Resp3", "exp0Resp4"],
    featured: true,
    current: true,
    technologies: ["F#", "C#", "Event Sourcing", "RDF/SPARQL", "Apache Pulsar", "Postgres", "Docker"],
  },
  {
    id: 1,
    titleKey: "exp1Title",
    companyKey: "exp1Company",
    companyUrlKey: "exp1CompanyUrl",
    locationKey: "exp1Location",
    periodKey: "exp1Period",
    descriptionKey: "exp1Description",
    responsibilityKeys: ["exp1Resp1", "exp1Resp2", "exp1Resp3", "exp1Resp4"],
    featured: true,
    technologies: ["C#", ".Net", "TypeScript", "Ionic", "StencilJS", "Azure"],
  },
  {
    id: 2,
    titleKey: "exp2Title",
    companyKey: "exp2Company",
    companyUrlKey: "exp2CompanyUrl",
    locationKey: "exp2Location",
    periodKey: "exp2Period",
    descriptionKey: "exp2Description",
    responsibilityKeys: ["exp2Resp1", "exp2Resp2", "exp2Resp3", "exp2Resp4"],
    technologies: ["C#", ".Net", "TypeScript", "Ionic", "StencilJS", "Azure"],
  },
  {
    id: 3,
    titleKey: "exp3Title",
    companyKey: "exp3Company",
    locationKey: "exp3Location",
    periodKey: "exp3Period",
    descriptionKey: "exp3Description",
    responsibilityKeys: ["exp3Resp1", "exp3Resp2", "exp3Resp3", "exp3Resp4"],
    technologies: ["C#", ".NET", "Angular", "React Native", "Oracle", "SQL Server", "MongoDB"],
  },
  {
    id: 4,
    titleKey: "exp4Title",
    companyKey: "exp4Company",
    locationKey: "exp4Location",
    periodKey: "exp4Period",
    descriptionKey: "exp4Description",
    responsibilityKeys: ["exp4Resp1", "exp4Resp2", "exp4Resp3", "exp4Resp4"],
    technologies: ["C#", "Elixir", ".NET", "Angular", "Flutter", "SQL Server", "MongoDB"],
  },
  {
    id: 5,
    titleKey: "exp5Title",
    companyKey: "exp5Company",
    locationKey: "exp5Location",
    periodKey: "exp5Period",
    descriptionKey: "exp5Description",
    responsibilityKeys: ["exp5Resp1", "exp5Resp2", "exp5Resp3"],
    technologies: ["C#", ".NET", "Angular", "SQL Server"],
  },
  {
    id: 6,
    titleKey: "exp6Title",
    companyKey: "exp6Company",
    locationKey: "exp6Location",
    periodKey: "exp6Period",
    descriptionKey: "exp6Description",
    responsibilityKeys: ["exp6Resp1", "exp6Resp2", "exp6Resp3"],
    technologies: ["C#", ".NET", "Angular", "Xamarin", "SQL Server"],
  },
  {
    id: 7,
    titleKey: "exp7Title",
    companyKey: "exp7Company",
    locationKey: "exp7Location",
    periodKey: "exp7Period",
    descriptionKey: "exp7Description",
    responsibilityKeys: ["exp7Resp1", "exp7Resp2", "exp7Resp3"],
    technologies: ["Ruby", "Ruby on Rails", "Angular", "SQL Server"],
  },
]

// Mapeamento de tecnologias para tipos
const technologyTypes: Record<string, "language" | "framework" | "tool" | "database" | "cloud"> = {
  React: "framework",
  "Next.js": "framework",
  TypeScript: "language",
  JavaScript: "language",
  Elixir: "language",
  Ruby: "language",
  Swift: "language",
  "C#": "language",
  ".NET": "framework",
  Flutter: "framework",
  Xamarin: "framework",
  "React Native": "framework",
  Angular: "framework",
  "F#": "language",
  "RDF/SPARQL": "language",
  "Event Sourcing": "tool",
  "Apache Pulsar": "tool",
  Docker: "tool",
  "SQL Server": "database",
  Oracle: "database",
  MongoDB: "database",
  Postgres: "database",
  Azure: "cloud",
  AWS: "cloud",
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  // Abre o cargo atual por padrao. As responsabilidades sao a substancia da
  // secao — deixar as 8 fechadas escondia tudo atras de um clique.
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    experiences[0]?.id ?? null,
  )
  const { t } = useLanguage()

  const toggleExperience = (id: number) => {
    if (expandedExperience === id) {
      setExpandedExperience(null)
    } else {
      setExpandedExperience(id)
    }
  }

  /*
    Antes isso lia `document.documentElement.classList.contains("dark")` DURANTE
    o render. Dois problemas: no servidor `window` e undefined, entao o HTML
    saia sempre com as cores claras (mismatch de hidratacao); e como nao era
    estado, as cores nao mudavam ao alternar o tema.
    Classes `dark:` do Tailwind resolvem os dois — quem decide e o CSS.
  */
  const getTechnologyColor = (tech: string) => {
    switch (technologyTypes[tech] || "framework") {
      case "language":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
      case "framework":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
      case "tool":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
      case "database":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
      case "cloud":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
    }
  }

  return (
    <section
      id="experience"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 dark:from-slate-800 to-white dark:to-slate-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231E3A8A' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-orange-900/50 text-blue-700 dark:text-orange-400 rounded-full text-sm font-medium mb-4">
            {t("careerJourney")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t("professionalExperience")}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-200 max-w-2xl mx-auto">{t("experienceDescription")}</p>
        </motion.div>

        {/* Timeline: uma linha continua ligando os cargos, em vez de 8 cards soltos */}
        <div className="relative md:pl-16">
          <div
            aria-hidden
            className="hidden md:block absolute left-[26px] top-3 bottom-3 w-px
              bg-gradient-to-b from-blue-400 via-blue-200 to-transparent
              dark:from-orange-500 dark:via-orange-900/50 dark:to-transparent"
          />

          <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              // Antes: 0.2 * index. Com 8 cargos o ultimo so aparecia 1,6s
              // depois — a secao lia como quebrada durante o scroll.
              transition={{ duration: 0.45, delay: Math.min(0.07 * index, 0.35) }}
              className="relative"
            >
              {/* marcador na linha do tempo */}
              <div
                aria-hidden
                className={`hidden md:flex absolute -left-16 top-6 w-[53px] items-center justify-start`}
              >
                <span
                  className={`relative w-[13px] h-[13px] rounded-full border-2 ${
                    exp.current
                      ? "bg-blue-600 border-blue-200 dark:bg-orange-500 dark:border-orange-900"
                      : exp.featured
                        ? "bg-blue-400 border-blue-100 dark:bg-orange-700 dark:border-slate-800"
                        : "bg-slate-300 border-slate-100 dark:bg-slate-600 dark:border-slate-800"
                  }`}
                >
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-blue-500 dark:bg-orange-500 animate-ping opacity-60" />
                  )}
                </span>
              </div>

              <div
                className={`bg-white dark:bg-slate-800/95 rounded-xl shadow-md overflow-hidden border transition-shadow hover:shadow-lg ${
                  exp.current
                    ? "border-blue-300 dark:border-orange-700/70 ring-1 ring-blue-200/60 dark:ring-orange-900/40"
                    : exp.featured
                      ? "border-blue-200 dark:border-orange-900/50"
                      : "border-slate-200 dark:border-slate-700"
                }`}
              >
              {/* Experience header */}
              <div className={`p-6 ${exp.featured ? "bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-800" : ""}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${exp.featured
                        ? "bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-orange-500"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                      } flex-shrink-0`}
                    >
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t(exp.titleKey)}</h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700 dark:bg-orange-900/50 dark:text-orange-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-orange-500" />
                            {t("currentRole")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        {exp.companyUrlKey ? (
                          <a
                            href={t(exp.companyUrlKey)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-blue-600 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-400 transition-colors flex items-center"
                          >
                            {t(exp.companyKey)}
                            <ExternalLink size={14} className="ml-1.5 opacity-70" />
                          </a>
                        ) : (
                          <span className="text-lg font-medium text-blue-600 dark:text-orange-500">{t(exp.companyKey)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 text-sm text-slate-500 dark:text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-slate-400 dark:text-slate-500" />
                      <span>{t(exp.periodKey)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
                      <span>{t(exp.locationKey)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-slate-600 dark:text-slate-200">{t(exp.descriptionKey)}</p>
                </div>

                {/* Technologies */}
                {exp.technologies && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTechnologyColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Toggle button */}
                <button
                  onClick={() => toggleExperience(exp.id)}
                  className={`mt-4 flex items-center gap-1 text-sm font-medium ${exp.featured ?
                    "text-blue-600 hover:text-blue-700 dark:text-orange-500 dark:hover:text-orange-400" :
                    "text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"} transition-colors`}
                >
                  {expandedExperience === exp.id ? (
                    <>
                      <span>{t("showLess")}</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>{t("showMore")}</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Expanded content  */}
              {expandedExperience === exp.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`px-6 pb-6 ${exp.featured ? "bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-800" : "dark:bg-slate-800"}`}
                >
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <h4 className="font-medium text-slate-800 dark:text-white mb-3">{t("responsibilities")}</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                      {exp.responsibilityKeys.map((key) => (
                        <li key={key}>{t(key)}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
