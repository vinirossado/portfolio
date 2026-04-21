"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Code, Database } from "lucide-react";
import { Server } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ImageIcon } from "lucide-react";
import ProjectMedia, { ScreenshotGallery } from "@/components/project-media";
import BuyMeACoffeeButton from "@/components/buy-me-a-coffee";

const projects = [
  {
    id: crypto.randomUUID(),
    titleKey: "projectTravelAppTitle",
    descriptionKey: "projectTravelAppDescription",
    image: "/projects/TripDetails.png",
    // demoGif: "", // Add a working GIF URL when available
    // demoVideo: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // Travel app demo
    // liveDemo: "https://apps.apple.com/app/travel-planner/example", // Uncomment when app is on the store
    screenshots: ["/projects/TripDetails.png", "/projects/TripView.png"],
    tags: [
      "Swift",
      "SwiftUI",
      "Alamofire",
      "iOS",
      "Swift Data",
      ".Net",
      "PostgreSQL",
    ],
    liveUrl: "tripfinity.eu",
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
    id: crypto.randomUUID(),
    titleKey: "projectIdentityKitTitle",
    descriptionKey: "projectIdentityKitDescription",
    image: "/projects/identitykit-demo.png",
    screenshots: ["/projects/identitykit-demo.png"],
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
    id: crypto.randomUUID(),
    titleKey: "projectSparkTrackerTitle",
    descriptionKey: "projectSparkTrackerDescription",
    image: "/SparkTracker.gif",
    demoGif: "/SparkTracker.gif", // SparkTracker project demo GIF
    demoVideo: "https://www.youtube.com/watch?v=ZixVqmt2KaU", // MTG app demo
    liveDemo: "https://apps.apple.covbm/app/mtg-life-counter/example", // Life counter app example
    screenshots: [
      "https://picsum.photos/400/800?random=25",
      "https://picsum.photos/400/800?random=26",
      "https://picsum.photos/400/800?random=27",
      "https://picsum.photos/400/800?random=28",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectCookbookProTitle",
    descriptionKey: "projectCookbookProDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", // Cooking/recipe app GIF
    demoVideo: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // Recipe app demo
    liveDemo: "https://apps.apple.com/app/cookbook-recipes/example", // Recipe app example
    screenshots: [
      "https://picsum.photos/400/800?random=29",
      "https://picsum.photos/400/800?random=30",
      "https://picsum.photos/400/800?random=31",
      "https://picsum.photos/400/800?random=32",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectUrlShortenerTitle",
    descriptionKey: "projectUrlShortenerDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif", // Typing/coding GIF
    demoVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Demo video
    liveDemo: "https://bit.ly", // Live demo example
    screenshots: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectGcliTitle",
    descriptionKey: "projectGcliDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/L8K62iTDkzGX6/giphy.gif", // Terminal/command line GIF
    demoVideo: "https://asciinema.org/a/335480", // Real Asciinema example
    liveDemo: "https://github.com/vinirossado/gcli#installation", // Installation guide
    screenshots: [
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5",
      "https://picsum.photos/800/600?random=6",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectMtgCardInventoryTitle",
    descriptionKey: "projectMtgCardInventoryDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", // Mobile app interaction GIF
    demoVideo: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // iOS app demo video
    liveDemo: "https://apps.apple.com/app/magic-the-gathering/id1496227521", // MTG app example
    screenshots: [
      "https://picsum.photos/400/800?random=7",
      "https://picsum.photos/400/800?random=8",
      "https://picsum.photos/400/800?random=9",
      "https://picsum.photos/400/800?random=10",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectGcliAdvancedTemplateTitle",
    descriptionKey: "projectGcliAdvancedTemplateDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif", // Developer workflow GIF
    demoVideo: "https://www.youtube.com/watch?v=Uszj_k0DGsg", // Development tutorial
    liveDemo: "https://github.com/vinirossado/gcli-advanced-template#usage", // Usage guide
    screenshots: [
      "https://picsum.photos/800/600?random=14",
      "https://picsum.photos/800/600?random=15",
      "https://picsum.photos/800/600?random=16",
      "https://picsum.photos/800/600?random=17",
    ],
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
    id: crypto.randomUUID(),
    titleKey: "projectPortfolioWebsiteTitle",
    descriptionKey: "projectPortfolioWebsiteDescription",
    image: "/placeholder.svg?height=600&width=800",
    demoGif: "https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif", // Web development GIF
    demoVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example YouTube video
    liveDemo: "https://vinirossado.vercel.app", // Current portfolio
    screenshots: [
      "https://picsum.photos/800/600?random=18",
      "https://picsum.photos/800/600?random=19",
      "https://picsum.photos/800/600?random=20",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://vinirossado.vercel.app",
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
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-white dark:bg-slate-800 rounded-xl
               overflow-hidden shadow-lg hover:shadow-xl transition-all
               duration-300
               border border-slate-100 dark:border-slate-700
               group h-full flex flex-col"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative h-56 overflow-hidden">
                {/* Only show overlay for fallback images, not for media content */}
                {!project.demoGif &&
                  !project.demoVideo &&
                  !project.screenshots?.length && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                {/* Use ProjectMedia component for better project showcases */}
                <ProjectMedia
                  demoGif={project.demoGif}
                  demoVideo={project.demoVideo}
                  liveDemo={project.liveDemo}
                  screenshots={project.screenshots}
                  title={t(project.titleKey)}
                />

                {/* Fallback to static image if no media */}
                {!project.demoGif &&
                  !project.demoVideo &&
                  !project.screenshots?.length && (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  )}

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
