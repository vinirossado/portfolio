"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

export type ProjectKind = "ios" | "terminal" | "web"

export interface PreviewMedia {
  /** mp4/webm local — preferido para gravacao de tela (10x menor que GIF) */
  demoVideo?: string
  demoGif?: string
  poster?: string
  screenshots?: string[]
}

/**
 * Altura UNICA para todas as molduras.
 *
 * Alturas diferentes por tipo deixariam as linhas do grid desalinhadas — no
 * CSS grid os cards da mesma linha esticam ate o mais alto, entao o texto de
 * um card ficaria fora de registro com o do vizinho. A moldura muda; a caixa nao.
 */
const ALTURA = "h-[26rem]"

/* ------------------------------------------------------------------ */
/* Midia: video com hover-to-play, GIF, ou imagem estatica             */
/* ------------------------------------------------------------------ */
function Media({
  media,
  alt,
  className = "",
  objectFit = "cover",
}: {
  media: PreviewMedia
  alt: string
  className?: string
  objectFit?: "cover" | "contain"
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [erro, setErro] = useState(false)

  const src = media.demoVideo
  const gif = media.demoGif
  const still = media.poster ?? media.screenshots?.[0]

  const fit = objectFit === "cover" ? "object-cover object-top" : "object-contain"

  if (src && !erro) {
    return (
      <video
        ref={videoRef}
        // Nao roda sozinho: 9 videos em autoplay derrubariam a performance da
        // pagina. So anima quando o mouse entra no card.
        muted
        loop
        playsInline
        preload="metadata"
        poster={still}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => videoRef.current?.pause()}
        onError={() => setErro(true)}
        className={`w-full h-full ${fit} ${className}`}
      >
        <source src={src} />
      </video>
    )
  }

  if (gif && !erro) {
    return (
      <img
        src={gif}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setErro(true)}
        className={`w-full h-full ${fit} ${className}`}
      />
    )
  }

  if (still && !erro) {
    return (
      <img
        src={still}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setErro(true)}
        className={`w-full h-full ${fit} ${className}`}
      />
    )
  }

  return null
}

const temMidia = (m: PreviewMedia) =>
  Boolean(m.demoVideo || m.demoGif || m.poster || m.screenshots?.length)

/* ------------------------------------------------------------------ */
/* iOS — moldura de iPhone, vertical                                    */
/* ------------------------------------------------------------------ */
/** Um aparelho. `src` nulo mostra o estado vazio. */
function Aparelho({
  media,
  src,
  title,
  className = "",
}: {
  media?: PreviewMedia
  src?: string
  title: string
  className?: string
}) {
  return (
    <div
      className={`relative h-[24rem] aspect-[9/19.5] rounded-[2rem] p-[3px]
        bg-slate-800 dark:bg-slate-950
        shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/10
        transition-transform duration-300 ${className}`}
    >
      <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-slate-900">
        {src ? (
          <img src={src} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
        ) : media && temMidia(media) ? (
          <Media media={media} alt={title} />
        ) : (
          <VazioInterno />
        )}
        {/* dynamic island */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[34%] h-[9px] rounded-full bg-black" />
      </div>
    </div>
  )
}

function PhoneFrame({ media, title }: { media: PreviewMedia; title: string }) {
  // Com o grid em 2 colunas o card tem largura de sobra. Se o projeto tem
  // mais de um screenshot, vale mostrar dois aparelhos em vez de deixar
  // espaco vazio dos dois lados. So vale quando NAO ha video/GIF — animar
  // dois ao mesmo tempo seria ruido.
  const segundo =
    !media.demoVideo && !media.demoGif && media.screenshots && media.screenshots.length >= 2
      ? media.screenshots[1]
      : null

  return (
    <div
      className={`relative ${ALTURA} w-full flex items-center justify-center overflow-hidden
        bg-gradient-to-br from-slate-100 to-blue-100
        dark:from-slate-900 dark:to-slate-800`}
    >
      {/* brilho suave atras do aparelho */}
      <div className="absolute w-56 h-56 rounded-full blur-3xl bg-blue-400/20 dark:bg-orange-500/15" />

      {segundo ? (
        <div className="relative flex items-center justify-center">
          <Aparelho
            src={segundo}
            title={`${title} 2`}
            className="-mr-10 rotate-[-5deg] opacity-90 scale-[0.94] group-hover:-translate-y-1 group-hover:rotate-[-7deg]"
          />
          <Aparelho
            media={media}
            title={title}
            className="z-10 rotate-[3deg] group-hover:-translate-y-1.5 group-hover:rotate-[5deg]"
          />
        </div>
      ) : (
        <Aparelho media={media} title={title} className="group-hover:-translate-y-1" />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Terminal — CLI em Go e APIs                                          */
/* ------------------------------------------------------------------ */
function TerminalFrame({
  media,
  title,
  cmd,
}: {
  media: PreviewMedia
  title: string
  cmd?: string[]
}) {
  return (
    <div className={`relative ${ALTURA} w-full p-4 bg-slate-100 dark:bg-slate-900 flex items-center`}>
      <div
        className="w-full h-full rounded-lg overflow-hidden shadow-xl
          bg-slate-900 dark:bg-black
          border border-slate-700/60 dark:border-orange-900/30
          transition-transform duration-300 group-hover:-translate-y-1 flex flex-col"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 dark:bg-slate-900 border-b border-slate-700/60 dark:border-orange-900/30 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-2 text-[10px] font-mono text-slate-400 truncate">{title}</span>
        </div>

        <div className="flex-1 min-h-0">
          {temMidia(media) ? (
            <Media media={media} alt={title} objectFit="contain" className="bg-black" />
          ) : (
            // Sem gravacao ainda: mostra o comando de verdade, nao uma imagem falsa
            <div className="p-3 font-mono text-[11px] leading-relaxed">
              {(cmd ?? ["$ _"]).map((linha, i) => (
                <div key={i} className="whitespace-pre">
                  {linha.startsWith("$") ? (
                    <>
                      <span className="text-green-400">$</span>
                      <span className="text-blue-100 dark:text-orange-100">{linha.slice(1)}</span>
                    </>
                  ) : linha.startsWith("✓") ? (
                    <span className="text-green-400">{linha}</span>
                  ) : (
                    <span className="text-slate-400">{linha}</span>
                  )}
                </div>
              ))}
              <span className="inline-block w-[6px] h-[12px] bg-blue-300 dark:bg-orange-400 animate-pulse align-[-2px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Web — chrome de browser com a URL real                               */
/* ------------------------------------------------------------------ */
function BrowserFrame({ media, title, url }: { media: PreviewMedia; title: string; url?: string }) {
  const host = (() => {
    if (!url || url === "#") return "localhost:3000"
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).host
    } catch {
      return url
    }
  })()

  return (
    <div className={`relative ${ALTURA} w-full p-4 bg-slate-100 dark:bg-slate-900 flex items-center`}>
      <div
        className="w-full h-full rounded-lg overflow-hidden shadow-xl bg-white dark:bg-slate-950
          border border-slate-300 dark:border-slate-700
          transition-transform duration-300 group-hover:-translate-y-1 flex flex-col"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="ml-2 flex-1 min-w-0">
            <div className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
              {host}
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-slate-50 dark:bg-slate-900">
          {temMidia(media) ? <Media media={media} alt={title} /> : <VazioInterno />}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function VazioInterno() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-500">
      <Play className="w-6 h-6 opacity-40" />
      <span className="text-[10px] font-mono opacity-60">preview em breve</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
export default function ProjectPreview({
  kind,
  media,
  title,
  url,
  cmd,
}: {
  kind: ProjectKind
  media: PreviewMedia
  title: string
  url?: string
  cmd?: string[]
}) {
  if (kind === "ios") return <PhoneFrame media={media} title={title} />
  if (kind === "terminal") return <TerminalFrame media={media} title={title} cmd={cmd} />
  return <BrowserFrame media={media} title={title} url={url} />
}
