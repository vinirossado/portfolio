"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Compass, Hammer, Sprout, ExternalLink, ArrowUpRight, Music, Play, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { MediumPost } from "@/lib/medium"
import type { TidalPlaylist } from "@/lib/tidal"

const MEDIUM_URL = "https://medium.com/@viniciusrossado"

export default function Now({ posts, playlist }: { posts: MediumPost[]; playlist: TidalPlaylist | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const { t } = useLanguage()
  /*
    O player do Tidal so e montado depois de um clique. Enquanto ninguem pede,
    nenhuma requisicao sai para o dominio deles e nenhum script de terceiro
    roda — quem esta so passando pelo site nao paga por um player que nao vai
    usar. Tambem evita que a interface do Tidal, que e preta e nao segue o
    tema da pagina, apareca para quem nao escolheu ve-la.
  */
  const [tocando, setTocando] = useState(false)
  /*
    Nao da para alinhar o player ao tema do site, e isso foi verificado, nao
    presumido: o iframe e de outra origem (ler o documento dele levanta
    TypeError), `color-scheme` no elemento nao muda o que ele pinta, e
    ?theme=dark / ?darkMode / ?colorScheme produzem uma imagem byte a byte
    identica. Ele segue o `prefers-color-scheme` do sistema operacional e
    pronto. O que da para controlar e a moldura em volta e a altura.
  */
  const alturaPlayer = Math.min(520, 108 + Math.max(1, playlist?.totalFaixas ?? 1) * 56)

  /*
    O terceiro card era "Lendo", com um livro que eu tinha inventado. Trocado
    por "A seguir", que se sustenta em fato verificavel — a mudanca para a LEGO.
    Os tres agora saem de coisas que existem: projetos publicados, o stack da
    vaga nova, e a data de entrada.
  */
  const cards = [
    { icon: <Hammer className="w-5 h-5" />, titleKey: "nowBuilding", bodyKey: "nowBuildingBody" },
    { icon: <Sprout className="w-5 h-5" />, titleKey: "nowLearning", bodyKey: "nowLearningBody" },
    { icon: <Compass className="w-5 h-5" />, titleKey: "nowNext", bodyKey: "nowNextBody" },
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
          className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t("nowSubtitle")}
        </motion.p>
        {/* Data escrita a mao de proposito: derivar do build diria "atualizado
            hoje" mesmo com o conteudo velho. Atualize junto com os textos. */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-12">
          {t("nowUpdated")}
        </p>

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
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t("writing")}</h3>

          {posts.length > 0 ? (
            <>
              {/*
                Destaque + lista, e nao uma grade uniforme: o numero de posts
                muda sozinho conforme eu publico, e toda grade de N colunas
                acaba com um buraco em alguma contagem. Assim 4, 5 ou 9 posts
                ficam igualmente bem, e o mais recente ganha a capa grande.
              */}
              <div className="grid lg:grid-cols-2 gap-6">
                {(() => {
                  const [destaque, ...resto] = posts
                  return (
                    <>
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-orange-800 hover:shadow-xl transition-all group"
                      >
                        {destaque.capa && (
                          <a href={destaque.link} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                            {/* aspect-video reserva o espaco antes da imagem chegar,
                                senao o card salta quando ela carrega */}
                            <img
                              src={destaque.capa}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="w-full aspect-video object-cover bg-slate-100 dark:bg-slate-700"
                            />
                          </a>
                        )}
                        <div className="flex flex-col flex-grow p-6">
                          <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-orange-400 mb-2">
                            {t("latestPost")}
                          </span>
                          <a
                            href={destaque.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-bold text-slate-800 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors"
                          >
                            {destaque.title}
                          </a>
                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 flex-grow">{destaque.snippet}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            {destaque.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-orange-400 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-between gap-4">
                            {destaque.date && (
                              <time className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(destaque.date).toLocaleDateString(undefined, {
                                  year: "numeric", month: "short", day: "numeric",
                                })}
                              </time>
                            )}
                            <a
                              href={destaque.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white transition-colors"
                            >
                              {t("readOnMedium")} <ArrowUpRight size={15} />
                            </a>
                          </div>
                        </div>
                      </motion.article>

                      <div className="flex flex-col gap-4">
                        {resto.map((post, index) => (
                          <motion.a
                            key={post.link}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.07 }}
                            className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-orange-800 hover:shadow-lg transition-all group"
                          >
                            {post.capa && (
                              <img
                                src={post.capa}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-24 h-24 flex-shrink-0 rounded-lg object-cover bg-slate-100 dark:bg-slate-700"
                              />
                            )}
                            <div className="flex flex-col min-w-0">
                              <h4 className="font-bold text-sm text-slate-800 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors">
                                {post.title}
                              </h4>
                              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[11px] px-1.5 py-0.5 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-orange-400 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              {post.date && (
                                <time className="mt-auto pt-2 text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(post.date).toLocaleDateString(undefined, {
                                    year: "numeric", month: "short", day: "numeric",
                                  })}
                                </time>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </>
                  )
                })()}
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href={MEDIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-orange-700 hover:text-blue-600 dark:hover:text-orange-400 transition-colors shadow-sm"
                >
                  {t("seeAllOnMedium")} <ExternalLink size={15} />
                </a>
              </div>
            </>
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

        {/*
          ---------- Playlist / Tidal ----------
          Depois do Writing de proposito. A tira e curta parada, mas o player
          aberto chega a 520px, e antes do Writing isso empurraria os artigos
          para baixo exatamente quando alguem esta mexendo na musica. O que eu
          escrevi vale mais que o que eu escuto, entao vem antes.
        */}
        {playlist && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-16 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg overflow-hidden"
          >
            {/*
              A faixa fina no topo usa a cor dominante que o proprio Tidal
              extrai da capa. E o unico lugar do site com uma cor que nao e
              azul/laranja — e ela muda junto com a playlist, entao o bloco
              sempre combina com a arte que esta mostrando.
            */}
            {playlist.cor && <div className="h-1 w-full" style={{ backgroundColor: playlist.cor }} />}

            {tocando ? (
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-orange-400">
                    <Music size={13} /> {playlist.nome}
                  </div>
                  <button
                    onClick={() => setTocando(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    {t("closePlayer")} <X size={13} />
                  </button>
                </div>
                {/* O player ja mostra capa e nome, entao a coluna da esquerda
                    sai enquanto ele esta aberto — senao a mesma capa apareceria
                    duas vezes lado a lado. */}
                <iframe
                  src={`https://embed.tidal.com/playlists/${playlist.id}`}
                  title="TIDAL"
                  width="100%"
                  height={alturaPlayer}
                  allow="encrypted-media; clipboard-write https://embed.tidal.com"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  className="w-full rounded-lg border-0 bg-white dark:bg-black"
                />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{t("previewNote")}</p>
              </div>
            ) : (
            <div className="flex flex-col sm:flex-row gap-6 p-6">
              {playlist.capa && (
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 self-start"
                >
                  <img
                    src={playlist.capa}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-40 h-40 sm:w-44 sm:h-44 rounded-lg object-cover shadow-md bg-slate-100 dark:bg-slate-700"
                  />
                </a>
              )}

              <div className="flex flex-col min-w-0 flex-grow">
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-orange-400">
                  <Music size={13} /> {t("listening")}
                </div>
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-lg font-bold text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-orange-400 transition-colors"
                >
                  {playlist.nome}
                </a>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {playlist.totalFaixas} {t("tracks")} · {playlist.duracaoMin} min
                </p>

                {/* Todas as faixas, mas dentro de uma area que rola: uma
                    playlist de 40 musicas esticaria a secao inteira. */}
                {playlist.faixas.length > 0 && (
                  <ol className="mt-4 space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    {playlist.faixas.map((f, i) => (
                      <li key={f.id} className="flex items-baseline gap-3 text-sm">
                        <span className="w-4 flex-shrink-0 text-right text-xs tabular-nums text-slate-400 dark:text-slate-500">
                          {i + 1}
                        </span>
                        <span className="truncate text-slate-700 dark:text-slate-200">{f.titulo}</span>
                        <span className="truncate text-slate-500 dark:text-slate-400">{f.artista}</span>
                        <span className="ml-auto flex-shrink-0 text-xs tabular-nums text-slate-400 dark:text-slate-500">
                          {f.duracao}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => setTocando(true)}
                    aria-expanded={tocando}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white transition-colors"
                  >
                    <Play size={14} className="fill-current" /> {t("playHere")}
                  </button>
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-orange-700 hover:text-blue-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {t("listenOnTidal")} <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
