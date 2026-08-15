"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Terminal, X } from "lucide-react"

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
]

/**
 * Dois easter eggs, ambos para quem e do ramo:
 *  1. Mensagem no console do DevTools (quem abre o F12 acha).
 *  2. Konami code -> abre um "console" com uns comandos.
 *
 * Nao renderiza nada ate ser acionado, entao nao custa nada em layout.
 */
export default function EasterEggs() {
  const [aberto, setAberto] = useState(false)

  // ---------- 1. recado no DevTools ----------
  useEffect(() => {
    const estilo = "color:#F97316;font-weight:bold;font-size:13px"
    const normal = "color:#94A3B8;font-size:12px"
    console.log("%cOlá! 👋", estilo)
    console.log(
      "%cVocê abriu o DevTools — então provavelmente é do ramo.\n" +
        "O código deste site está em github.com/vinirossado\n" +
        "Procurando alguém? vinirossado@gmail.com\n\n" +
        "PS: tente o Konami code. ↑↑↓↓←→←→BA",
      normal,
    )
  }, [])

  // ---------- 2. Konami code ----------
  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      // ignora enquanto o usuario digita num campo
      const alvo = e.target as HTMLElement | null
      if (alvo && /^(INPUT|TEXTAREA)$/.test(alvo.tagName)) return

      const esperado = KONAMI[pos]
      const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (tecla === esperado) {
        pos++
        if (pos === KONAMI.length) {
          pos = 0
          setAberto(true)
        }
      } else {
        // se errou, ainda pode ser o inicio de uma nova sequencia
        pos = tecla === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // fecha no Esc
  useEffect(() => {
    if (!aberto) return
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false)
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [aberto])

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
          onClick={() => setAberto(false)}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-slate-900 dark:bg-black rounded-lg border border-slate-700 dark:border-orange-900/40 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-2 bg-slate-800 dark:bg-slate-900 border-b border-slate-700 dark:border-orange-900/30">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 text-xs font-mono text-slate-400 dark:text-orange-300/70 flex items-center gap-1.5">
                <Terminal size={12} /> konami.sh
              </span>
              <button
                onClick={() => setAberto(false)}
                aria-label="Fechar"
                className="ml-auto text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 font-mono text-sm leading-relaxed">
              <p className="text-green-400">$ ./konami.sh</p>
              <p className="text-blue-100 dark:text-orange-100 mt-3">
                Achou. 🎮
              </p>
              <p className="text-slate-400 mt-3">
                Se você chegou até aqui, provavelmente escreve código também.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-1.5 text-slate-300">
                <p>
                  <span className="text-blue-300 dark:text-orange-300">github</span>{" "}
                  <a
                    href="https://github.com/vinirossado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    @vinirossado
                  </a>
                </p>
                <p>
                  <span className="text-blue-300 dark:text-orange-300">medium</span>{" "}
                  <a
                    href="https://medium.com/@viniciusrossado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    @viniciusrossado
                  </a>
                </p>
                <p>
                  <span className="text-blue-300 dark:text-orange-300">email </span>{" "}
                  <a href="mailto:vinirossado@gmail.com" className="underline hover:text-white">
                    vinirossado@gmail.com
                  </a>
                </p>
              </div>
              <p className="text-slate-600 mt-5 text-xs">esc para fechar</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
