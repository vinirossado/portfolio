"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface ProjectMediaProps {
  demoGif?: string
  demoVideo?: string
  liveDemo?: string
  screenshots?: string[]
  title: string
}

export function GifPreview({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>("")
  const imgRef = useRef<HTMLImageElement>(null)

  // Preload image to prevent blinking
  React.useEffect(() => {
    if (!src) return

    const img = new Image()
    img.onload = () => {
      setImgSrc(src)
      setIsLoading(false)
      setHasError(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
    
    // Add cache busting only if absolutely necessary
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div className={`relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`} style={{ minHeight: '200px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <div className="text-sm">Failed to load preview</div>
          </div>
        </div>
      ) : imgSrc && (
        <>
          <img
            ref={imgRef}
            src={imgSrc}
            alt={alt}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ 
              opacity: isLoading ? 0 : 1,
              display: 'block' // Prevent layout shift
            }}
            loading="eager" // Load immediately for above-the-fold content
            decoding="async" // Non-blocking decode
          />
          
          {!isLoading && (
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center group-hover:opacity-100">
              <div className="bg-black/50 rounded-full p-3">
                <Play className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title 
}: { 
  videoUrl: string
  thumbnailUrl?: string
  title: string 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { t } = useLanguage()

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop()?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    if (url.includes('asciinema.org')) {
      const videoId = url.split('/').pop()
      return `https://asciinema.org/a/${videoId}/embed`
    }
    
    return url // Direct video URL
  }

  if (!isPlaying && thumbnailUrl) {
    return (
      <div className="relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
        <img 
          src={thumbnailUrl} 
          alt={`${title} video thumbnail`}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg">
          <div className="bg-black/70 rounded-full p-4 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {t("watchVideo")}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <iframe
        src={getEmbedUrl(videoUrl)}
        title={title}
        className="w-full aspect-video rounded-lg"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  )
}

// Screenshot Gallery Component
export function ScreenshotGallery({ 
  screenshots, 
  title 
}: { 
  screenshots: string[]
  title: string 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  if (screenshots.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {screenshots.slice(0, 6).map((screenshot, index) => (
          <div
            key={index}
            className="relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer group hover:opacity-80 transition-opacity"
            onClick={() => {
              setCurrentIndex(index)
              setIsModalOpen(true)
            }}
          >
            <img
              src={screenshot}
              alt={`${title} screenshot ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Expand icon */}
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
            
            {index === 5 && screenshots.length > 6 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{screenshots.length - 6}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={screenshots[currentIndex]}
                alt={`${title} screenshot ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {t("imageOf")
                  .replace("{current}", String(currentIndex + 1))
                  .replace("{total}", String(screenshots.length))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function ProjectMedia({ 
  demoGif, 
  demoVideo, 
  liveDemo, 
  screenshots = [], 
  title 
}: ProjectMediaProps) {
  const { t } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)

  const renderCardPreview = () => {
    if (demoGif) {
      return (
        <div className="relative w-full h-full group cursor-pointer">
          <GifPreview src={demoGif} alt={`${title} demo`} className="w-full h-full" />
        </div>
      )
    }
    
    if (screenshots.length > 0) {
      return (
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={screenshots[0]}
            alt={`${title} screenshot`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            loading="lazy" // Lazy load for screenshots below the fold
            decoding="async"
          />
          {screenshots.length > 1 && imageLoaded && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              +{screenshots.length - 1}
            </div>
          )}
        </div>
      )
    }
    
    // Fallback placeholder
    return (
      <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <div className="text-slate-500 dark:text-slate-400 text-center">
          <div className="text-sm">No preview available</div>
        </div>
      </div>
    )
  }

  return renderCardPreview()
}

// Full Project Media Showcase Component (for modals or detailed views)
export function ProjectMediaShowcase({ 
  demoGif, 
  demoVideo, 
  liveDemo, 
  screenshots = [], 
  title 
}: ProjectMediaProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'preview' | 'video' | 'screenshots'>('preview')

  // Determine default tab based on available content
  React.useEffect(() => {
    if (demoGif) setActiveTab('preview')
    else if (demoVideo) setActiveTab('video')
    else if (screenshots.length > 0) setActiveTab('screenshots')
  }, [demoGif, demoVideo, screenshots])

  const tabs = [
    { id: 'preview', label: t("demoPreview"), available: !!demoGif },
    { id: 'video', label: t("watchVideo"), available: !!demoVideo },
    { id: 'screenshots', label: t("viewScreenshots"), available: screenshots.length > 0 },
  ].filter(tab => tab.available)

  if (tabs.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[200px]">
        {activeTab === 'preview' && demoGif && (
          <div className="group cursor-pointer">
            <GifPreview src={demoGif} alt={`${title} demo`} className="w-full aspect-video" />
          </div>
        )}

        {activeTab === 'video' && demoVideo && (
          <VideoPlayer 
            videoUrl={demoVideo} 
            thumbnailUrl={demoGif} 
            title={title} 
          />
        )}

        {activeTab === 'screenshots' && screenshots.length > 0 && (
          <ScreenshotGallery screenshots={screenshots} title={title} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {liveDemo && (
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {t("liveDemo")}
          </a>
        )}
        
        {demoVideo && activeTab !== 'video' && (
          <button
            onClick={() => setActiveTab('video')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <Play className="w-4 h-4" />
            {t("fullDemo")}
          </button>
        )}
      </div>
    </div>
  )
}