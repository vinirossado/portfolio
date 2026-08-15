"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Code, Database } from "lucide-react";
import { Server } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ImageIcon } from "lucide-react";
import { ScreenshotGallery } from "@/components/project-media";
import ProjectPreview from "@/components/project-frames";
import BuyMeACoffeeButton from "@/components/buy-me-a-coffee";

const projects = [
  {
    id: "travelapp",
    kind: "ios" as const,
    titleKey: "projectTravelAppTitle",
    descriptionKey: "projectTravelAppDescription",
    image: "/projects/TripDetails.webp",
    // demoGif: "", // Add a working GIF URL when available
    // demoVideo: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // Travel app demo
    // liveDemo: "https://apps.apple.com/app/travel-planner/example", // Uncomment when app is on the store
    screenshots: ["/projects/TripDetails.webp", "/projects/TripView.webp"],
    tags: [
      "Swift",
      "SwiftUI",
      "Alamofire",
      "iOS",
      "Swift Data",
      ".Net",
      "PostgreSQL",
    ],
    liveUrl: "https://tripfinity.eu",
    // githubUrl: "https://github.com/vinirossado/travel-app",
    featureKeys: [
      "projectTravelAppFeature1",
      "projectTravelAppFeature2",
      "projectTravelAppFeature3",
      "projectTravelAppFeature4",
      "projectTravelAppFeature5",
    ],
  },
  {
    id: "identitykit",
    kind: "ios" as const,
    titleKey: "projectIdentityKitTitle",
    descriptionKey: "projectIdentityKitDescription",
    image: "/projects/identitykit-demo.webp",
    screenshots: [
      "/projects/identitykit-demo.webp",
      "/projects/01_intro_light.webp",
      "/projects/02_intro_dark.webp",
      "/projects/03_document_capture.webp",
      "/projects/04_liveness_check.webp",
      "/projects/05_review.webp",
      "/projects/06_review_dark.webp",
    ],
    tags: [
      "Swift",
      "UIKit",
      "AVFoundation",
      "Vision",
      "SPM",
      "XCTest",
      "Fastlane",
    ],
    liveUrl: "https://vinirossado.github.io/Swift-KYC/documentation/identitykitcore",
    githubUrl: "https://github.com/vinirossado/Swift-KYC",
    featureKeys: [
      "projectIdentityKitFeature1",
      "projectIdentityKitFeature2",
      "projectIdentityKitFeature3",
      "projectIdentityKitFeature4",
      "projectIdentityKitFeature5",
    ],
  },
  {
    id: "sparktracker",
    kind: "ios" as const,
    titleKey: "projectSparkTrackerTitle",
    descriptionKey: "projectSparkTrackerDescription",
    image: "/SparkTracker.webp",
    demoGif: "/SparkTracker.webp", // SparkTracker project demo GIF
    tags: [
      "Swift",
      "SwiftUI",
      "iOS",
      "iPad",
      "Alamofire",
      "Swift Data",
      ".Net",
      "PostgreSQL",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/spark-tracker",
    featureKeys: [
      "projectSparkTrackerFeature1",
      "projectSparkTrackerFeature2",
      "projectSparkTrackerFeature3",
      "projectSparkTrackerFeature4",
      "projectSparkTrackerFeature5",
    ],
  },
  {
    id: "cookbookpro",
    kind: "ios" as const,
    titleKey: "projectCookbookProTitle",
    descriptionKey: "projectCookbookProDescription",
    image: "/placeholder.svg?height=600&width=800",
    tags: [
      "Swift",
      "SwiftUI",
      "Alamofire",
      "iOS",
      "Swift Data",
      ".Net",
      "PostgreSQL",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/cookbook-pro",
    featureKeys: [
      "projectCookbookProFeature1",
      "projectCookbookProFeature2",
      "projectCookbookProFeature3",
      "projectCookbookProFeature4",
      "projectCookbookProFeature5",
      "projectCookbookProFeature6",
    ],
  },
  {
    id: "urlshortener",
    kind: "terminal" as const,
    cmd: [
      "$ curl -X POST api/shorten \\",
      "    -d '{\"url\":\"https://...\"}'",
      "",
      "{ \"short\": \"/aX9k2\" }",
      "",
      "$ _",
    ],
    titleKey: "projectUrlShortenerTitle",
    descriptionKey: "projectUrlShortenerDescription",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["C#", ".Net", "CosmosDB", "Azure", "Bicep", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/URL-Shortener",
    featureKeys: [
      "projectUrlShortenerFeature1",
      "projectUrlShortenerFeature2",
      "projectUrlShortenerFeature3",
      "projectUrlShortenerFeature4",
    ],
  },
  {
    id: "gcli",
    kind: "terminal" as const,
    cmd: [
      "$ gcli new my-api --db postgres",
      "",
      "✓ scaffold criado",
      "✓ docker-compose.yml",
      "✓ migrations/",
      "",
      "$ _",
    ],
    titleKey: "projectGcliTitle",
    descriptionKey: "projectGcliDescription",
    image: "/placeholder.svg?height=600&width=800",
    liveDemo: "https://github.com/vinirossado/gcli#installation", // Installation guide
    tags: ["Golang", "PostgreSQL", "Mustache", "Cobra", "Gorm", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/gcli",
    featureKeys: [
      "projectGcliFeature1",
      "projectGcliFeature2",
      "projectGcliFeature3",
      "projectGcliFeature4",
      "projectGcliFeature5",
    ],
  },
  {
    id: "mtgcardinventory",
    kind: "ios" as const,
    titleKey: "projectMtgCardInventoryTitle",
    descriptionKey: "projectMtgCardInventoryDescription",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["SwiftUI", "Swift", "PostgreSQL", ".Net"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/MTG-Card-Inventory",
    featureKeys: [
      "projectMtgCardInventoryFeature1",
      "projectMtgCardInventoryFeature2",
      "projectMtgCardInventoryFeature3",
    ],
  },
  {
    id: "gcliadvancedtemplate",
    kind: "terminal" as const,
    cmd: [
      "$ gcli init --template advanced",
      "",
      "✓ Gorm + Zap + Swagger",
      "✓ JWT middleware",
      "✓ Dockerfile multi-stage",
      "",
      "$ _",
    ],
    titleKey: "projectGcliAdvancedTemplateTitle",
    descriptionKey: "projectGcliAdvancedTemplateDescription",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Go", "Gorm", "Zap", "Swagger", "JWT", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinirossado/gcli-advanced-template",
    featureKeys: [
      "projectGcliAdvancedTemplateFeature1",
      "projectGcliAdvancedTemplateFeature2",
      "projectGcliAdvancedTemplateFeature3",
      "projectGcliAdvancedTemplateFeature4",
    ],
  },
  {
    id: "portfoliowebsite",
    kind: "web" as const,
    titleKey: "projectPortfolioWebsiteTitle",
    descriptionKey: "projectPortfolioWebsiteDescription",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://vinirossado.dev",
    githubUrl: "https://github.com/vinirossado/melhorzin",
    featureKeys: [
      "projectPortfolioWebsiteFeature1",
      "projectPortfolioWebsiteFeature2",
      "projectPortfolioWebsiteFeature3",
      "projectPortfolioWebsiteFeature4",
    ],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [screenshotProject, setScreenshotProject] = useState<number | null>(
    null,
  );
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-white dark:from-slate-900 to-blue-50 dark:to-slate-800 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("projects")}
        </motion.h2>

        <motion.p
          className="text-slate-600 dark:text-slate-200 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("recentProjects")}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: Math.min(0.06 * index, 0.36) }}
              className="bg-white dark:bg-slate-800 rounded-xl
               overflow-hidden shadow-lg hover:shadow-xl transition-all
               duration-300
               border border-slate-100 dark:border-slate-700
               group h-full flex flex-col"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/*
                Antes: uma caixa h-56 fixa para 9 projetos de naturezas
                diferentes — app iOS vertical, CLI em Go, site. Os mockups de
                celular ficavam em 35% da largura numa caixa baixa e larga, e o
                `object-cover object-top` cortava tudo.
                Agora a moldura acompanha o tipo do projeto; so a altura da
                caixa e que continua unica, para o grid nao desalinhar.
              */}
              <div className="relative overflow-hidden">
                <ProjectPreview
                  kind={project.kind}
                  title={t(project.titleKey)}
                  url={project.liveUrl}
                  cmd={project.cmd}
                  media={{
                    demoVideo: project.demoVideo,
                    demoGif: project.demoGif,
                    poster: project.image?.startsWith("/placeholder") ? undefined : project.image,
                    screenshots: project.screenshots,
                  }}
                />

                {/* Overlay tech icons */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex gap-2">
                    {project.tags.includes("React") && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={
                          activeProject === index ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="w-8 h-8 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <Code className="w-4 h-4" />
                      </motion.div>
                    )}
                    {project.tags.includes("Node.js") && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={
                          activeProject === index ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="w-8 h-8 rounded-full bg-green-600/80 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <Server className="w-4 h-4" />
                      </motion.div>
                    )}
                    {project.tags.includes("MongoDB") && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={
                          activeProject === index ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="w-8 h-8 rounded-full bg-green-700/80 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <Database className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Project links - only show GitHub when URL exists */}
                {project.githubUrl && (
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-1 text-sm text-white bg-slate-800/90 hover:bg-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={14} />
                      <span>{t("viewOnGithub")}</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-orange-500 transition-colors">
                  {t(project.titleKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-200 mb-4 text-sm flex-shrink-0">
                  {t(project.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-orange-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features list */}
                <div className="mt-auto space-y-2">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-100">
                    {t("mainFeatures")}
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4">
                    {project.featureKeys.map((featureKey, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-orange-500 shrink-0"></div>
                        <span>{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Media action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={
                          project.liveUrl.startsWith("http")
                            ? project.liveUrl
                            : `https://${project.liveUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t("visitWebsite")}
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t("liveDemo")}
                      </a>
                    )}

                    {project.demoVideo && (
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs rounded-lg font-medium transition-colors">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t("watchVideo")}
                      </button>
                    )}
                    {project.screenshots && project.screenshots.length > 0 && (
                      <button
                        onClick={() =>
                          setScreenshotProject(
                            screenshotProject === index ? null : index,
                          )
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg font-medium transition-colors"
                      >
                        <ImageIcon className="w-3 h-3" />
                        {t("viewScreenshots")} ({project.screenshots.length})
                      </button>
                    )}
                  </div>

                  {/* Screenshot Gallery */}
                  {screenshotProject === index &&
                    project.screenshots &&
                    project.screenshots.length > 0 && (
                      <div className="mt-3">
                        <ScreenshotGallery
                          screenshots={project.screenshots}
                          title={t(project.titleKey)}
                        />
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="https://github.com/vinirossado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl "
          >
            <Github size={18} />
            <span>{t("seeMoreGithub")}</span>
          </a>
          <BuyMeACoffeeButton variant="cta" />
        </motion.div>
      </div>
    </section>
  );
}
