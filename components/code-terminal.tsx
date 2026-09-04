"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface CodeTerminalProps {
    codeLines: string[]
    name: string
    title: string
    yearsOfExperience: number
}

/**
 * Ritmo da digitacao.
 *
 * A versao anterior usava `Math.random() * 10 + 5` ms POR CARACTERE mais 30ms
 * por linha. Sobre ~1600 caracteres isso dava ~16 segundos, e o `useEffect`
 * dependia de `currentLineIndex` — entao ele re-disparava a cada linha e comia
 * o primeiro caractere (o famoso "uing System;" no lugar de "using System;").
 *
 * Aqui o efeito roda uma vez so, e o atraso varia por caractere: e a variacao
 * que faz parecer alguem digitando. Revelar N chars/segundo de forma linear
 * nao parece digitacao em velocidade nenhuma.
 */
const MS_POR_CARACTERE = 11
const PAUSA_PONTUACAO = 70 // ; { }
const PAUSA_VIRGULA = 30 // , (
const PAUSA_FIM_DE_LINHA = 120
const CHANCE_HESITACAO = 0.015
const MS_HESITACAO = 190

function atrasoDe(char: string, fimDeLinha: boolean) {
    let d = MS_POR_CARACTERE * (0.55 + Math.random() * 1.15)
    if (char === ";" || char === "{" || char === "}") d += PAUSA_PONTUACAO
    else if (char === "," || char === "(") d += PAUSA_VIRGULA
    if (Math.random() < CHANCE_HESITACAO) d += MS_HESITACAO
    if (fimDeLinha) d += PAUSA_FIM_DE_LINHA
    return d
}

/** Colore um token isolado, em vez de pintar a linha inteira de uma cor so. */
function classeDoToken(token: string) {
    if (/^(using|namespace|public|private|class|new|return|get;|set;|true|false)$/.test(token))
        return "text-blue-300 dark:text-orange-300"
    if (/^(string|int|bool|var|List|IEnumerable|Solution|CodeReview)$/.test(token))
        return "text-teal-300 dark:text-green-400"
    if (/^(Where|OrderBy|Select|SolveComplexProblems|DeliverQualityCode)$/.test(token))
        return "text-purple-400 dark:text-yellow-400"
    if (/^"/.test(token)) return "text-amber-200 dark:text-amber-300"
    if (/^\d+$/.test(token)) return "text-orange-300 dark:text-orange-400"
    if (/^\/\//.test(token)) return "text-slate-500 dark:text-slate-500"
    return "text-blue-100 dark:text-orange-100"
}

/*
  Extrai os literais de string INTEIROS antes de qualquer outra divisao.

  Antes a linha era quebrada por espaco primeiro, e o teste de string era
  /^"/ — que so bate no fragmento que comeca com aspas. Entao "Event Sourcing"
  virava ["Event, ` `, Sourcing",] e so "Event ficava ambar; a segunda palavra
  saia com a cor de texto comum. Valia para todo literal de mais de uma
  palavra na tela: "Vinicius Rossado", "Senior Software Engineer",
  "The LEGO Group".

  O grupo de captura mantem os literais no array do split. A aspa final e
  opcional (`"|$`) de proposito: o terminal revela um caractere por vez, entao
  durante a digitacao existe um instante em que a string ainda esta aberta —
  sem isso ela piscaria sem cor ate a aspa de fechamento aparecer.
*/
const LITERAL_DE_STRING = /("(?:[^"\\]|\\.)*(?:"|$))/

function LinhaColorida({ line }: { line: string }) {
    const partes = line.split(LITERAL_DE_STRING).flatMap((parte) =>
        parte.startsWith('"')
            ? [parte] // string inteira: um token so, uma cor so
            // separa mantendo os delimitadores, para preservar a indentacao
            : parte.split(/(\s+|[(){};,])/),
    )
    return (
        <>
            {partes.map((p, i) => (
                <span key={i} className={p.trim() ? classeDoToken(p) : undefined}>
                    {p}
                </span>
            ))}
        </>
    )
}

export default function CodeTerminal({ codeLines, name, title, yearsOfExperience }: CodeTerminalProps) {
    const prefersReduced = useReducedMotion()
    const terminalRef = useRef<HTMLDivElement>(null)

    // mapa plano de caracteres, sabendo onde cada linha termina
    const { flat, total } = useMemo(() => {
        const flat: { ch: string; linha: number; fim: boolean }[] = []
        codeLines.forEach((linha, li) => {
            const texto = linha === "\n" ? "" : linha
            for (let i = 0; i < texto.length; i++) {
                flat.push({ ch: texto[i], linha: li, fim: i === texto.length - 1 })
            }
            if (texto.length === 0) flat.push({ ch: "", linha: li, fim: true })
        })
        return { flat, total: flat.length }
    }, [codeLines])

    const [revelados, setRevelados] = useState(() => (prefersReduced ? total : 0))
    const concluido = revelados >= total

    useEffect(() => {
        if (prefersReduced) {
            setRevelados(total)
            return
        }
        // efeito roda UMA vez: sem dependencia de indice, sem re-disparo,
        // portanto sem perder o primeiro caractere de cada linha.
        let cancelado = false
        let i = 0
        let timer: ReturnType<typeof setTimeout>

        const passo = () => {
            if (cancelado) return
            i += 1
            setRevelados(i)
            if (i >= total) return
            const c = flat[i]
            timer = setTimeout(passo, atrasoDe(c?.ch ?? "", c?.fim ?? false))
        }
        timer = setTimeout(passo, 400) // respiro antes de comecar

        return () => {
            cancelado = true
            clearTimeout(timer)
        }
    }, [flat, total, prefersReduced])

    // texto visivel por linha, derivado de `revelados`
    const linhasVisiveis = useMemo(() => {
        const out: string[] = codeLines.map(() => "")
        for (let i = 0; i < Math.min(revelados, total); i++) {
            const c = flat[i]
            out[c.linha] += c.ch
        }
        return out
    }, [revelados, flat, total, codeLines])

    const linhaAtual = flat[Math.min(revelados, total - 1)]?.linha ?? 0

    useEffect(() => {
        // acompanha a escrita sem arrastar a pagina junto
        const el = terminalRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [linhaAtual])

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
        >
            <div className="bg-slate-900/90 dark:bg-black/80 backdrop-blur-md rounded-lg border border-slate-700/50 dark:border-orange-900/30 shadow-xl overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-slate-800/80 dark:bg-slate-900/80 border-b border-slate-700/50 dark:border-orange-900/30">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-xs font-mono text-slate-400 dark:text-orange-300/70">SeniorDeveloper.cs</div>
                    {!concluido && (
                        <button
                            onClick={() => setRevelados(total)}
                            className="ml-auto text-[10px] font-mono tracking-wider text-slate-500 hover:text-blue-300 dark:hover:text-orange-300 border border-slate-700 dark:border-orange-900/40 rounded px-2 py-0.5 transition-colors"
                        >
                            skip
                        </button>
                    )}
                </div>
                <div
                    ref={terminalRef}
                    className="p-4 h-[420px] overflow-y-auto font-mono text-sm text-blue-100 dark:text-orange-100 custom-scrollbar"
                >
                    {linhasVisiveis.map((line, index) => (
                        <div key={index} className="whitespace-pre">
                            <LinhaColorida line={line} />
                            {!concluido && index === linhaAtual && (
                                <span className="inline-block w-[7px] h-[14px] align-[-2px] bg-blue-300 dark:bg-orange-400 animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
