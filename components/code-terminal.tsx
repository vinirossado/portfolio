"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { LinguagemTerminal, SnippetTerminal } from "@/lib/terminal-snippets"

interface CodeTerminalProps {
    snippets: SnippetTerminal[]
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
const PAUSA_PONTUACAO = 45 // ; { }
const PAUSA_VIRGULA = 20 // , (
const PAUSA_FIM_DE_LINHA = 90
const CHANCE_HESITACAO = 0.012
const MS_HESITACAO = 110

/*
  Duas correcoes de ritmo, ambas medidas sobre o codigo real.

  1. As pausas estruturais NAO se somam mais. Em C# quase toda linha termina
     em `;`, entao pontuacao (70ms) + fim de linha (120ms) davam 190ms na
     mesma tecla — em toda linha. Agora vale a maior das duas, nao o total.

  2. A hesitacao so acontece em ESPACO. Antes podia cair em qualquer
     caractere, e uma pausa de 190ms no meio de uma palavra nao le como
     alguem pensando: le como a pagina travando. Em fronteira de palavra o
     mesmo atraso le como hesitacao.

  Antes: 36 pausas acima de 150ms em 934 caracteres, uma a cada 26 letras.
  Depois: nenhuma. Mediana 13ms, p95 56ms, maxima 127ms. De quebra o trecho
  todo caiu de 20s para ~15s.
*/
function atrasoDe(char: string, fimDeLinha: boolean) {
    let d = MS_POR_CARACTERE * (0.55 + Math.random() * 1.15)

    let estrutural = 0
    if (char === ";" || char === "{" || char === "}") estrutural = PAUSA_PONTUACAO
    else if (char === "," || char === "(") estrutural = PAUSA_VIRGULA
    if (fimDeLinha) estrutural = Math.max(estrutural, PAUSA_FIM_DE_LINHA)
    d += estrutural

    if (char === " " && Math.random() < CHANCE_HESITACAO) d += MS_HESITACAO
    return d
}

/*
  Vocabulario por linguagem.

  Antes as listas eram literais soltos dentro de classeDoToken, so com palavras
  de C#. Com F# na tela isso pintaria `let`, `match` e `type` como texto comum
  — ou seja, o F# sairia praticamente sem realce.

  `operador` so existe no F#: `|>` e `->` sao a assinatura visual da linguagem,
  e sem cor propria o pipeline, que e o que se quer mostrar, sairia cinza.
*/
const VOCABULARIO: Record<
    LinguagemTerminal,
    { chave: RegExp; tipo: RegExp; funcao: RegExp; operador?: RegExp }
> = {
    csharp: {
        chave: /^(using|namespace|public|private|readonly|record|class|new|new\(\);|return|get;|set;|true|false)$/,
        tipo: /^(string|int|bool|var|List|IEnumerable|Solution)$/,
        funcao: /^(Where|OrderBy|Select|SolveComplexProblems)$/,
    },
    fsharp: {
        chave: /^(let|module|namespace|type|member|match|with|open|fun|rec|and|when|if|then|else|mutable|of|in|do|private|public|true|false)$/,
        tipo: /^(string|int|bool|list|seq|option|unit|Skill|Developer|Problem|List|EventSourcing|Ontology|DistributedSystems)$/,
        funcao: /^(List\.filter|List\.sortBy|List\.fold|List\.map|describe|solve|replay)$/,
        operador: /^(\|>|->|<-)$/,
    },
}

/** Colore um token isolado, em vez de pintar a linha inteira de uma cor so. */
function classeDoToken(token: string, lang: LinguagemTerminal) {
    const v = VOCABULARIO[lang]
    if (v.chave.test(token)) return "text-blue-300 dark:text-orange-300"
    if (v.tipo.test(token)) return "text-teal-300 dark:text-green-400"
    if (v.funcao.test(token)) return "text-purple-400 dark:text-yellow-400"
    if (v.operador?.test(token)) return "text-pink-300 dark:text-pink-400"
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

function LinhaColorida({ line, lang }: { line: string; lang: LinguagemTerminal }) {
    const partes = line.split(LITERAL_DE_STRING).flatMap((parte) =>
        parte.startsWith('"')
            ? [parte] // string inteira: um token so, uma cor so
            // separa mantendo os delimitadores, para preservar a indentacao
            : parte.split(/(\s+|[(){};,])/),
    )
    return (
        <>
            {partes.map((p, i) => (
                <span key={i} className={p.trim() ? classeDoToken(p, lang) : undefined}>
                    {p}
                </span>
            ))}
        </>
    )
}

export default function CodeTerminal({ snippets }: CodeTerminalProps) {
    const prefersReduced = useReducedMotion()
    const terminalRef = useRef<HTMLDivElement>(null)

    const [ativa, setAtiva] = useState(0)
    /*
      Cada linguagem e digitada UMA vez.

      A primeira vez que alguem abre uma aba ela ganha a maquina de escrever;
      da segunda em diante aparece pronta. O motivo dos dois lados: a animacao
      e o que ha de bom aqui, e o F# nunca a recebia quando so a aba inicial
      digitava — mas redigitar a cada troca (15-18s) tornaria impossivel
      alternar para comparar as duas, que e justamente o uso do seletor.

      Uma linguagem conta como vista quando termina de digitar, quando alguem
      aperta "skip", OU quando se sai dela no meio: a chance de assistir ja
      foi dada, e voltar para uma aba so para esperar de novo seria pior.
    */
    const [jaDigitadas, setJaDigitadas] = useState<Set<LinguagemTerminal>>(() => new Set())
    const snippet = snippets[ativa] ?? snippets[0]
    const codeLines = snippet.linhas

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
    /*
      Derivado, nao estado. Se dependesse de `revelados` ser atualizado pelo
      efeito, haveria um frame com o texto da aba nova cortado no comprimento
      da antiga — o efeito so roda depois da pintura.
    */
    const mostrarTudo = prefersReduced || jaDigitadas.has(snippet.id)
    const revelacao = mostrarTudo ? total : revelados
    const concluido = revelacao >= total

    useEffect(() => {
        if (mostrarTudo) {
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
    }, [flat, total, mostrarTudo])

    useEffect(() => {
        if (concluido && !jaDigitadas.has(snippet.id)) {
            setJaDigitadas((s) => new Set(s).add(snippet.id))
        }
    }, [concluido, snippet.id, jaDigitadas])

    const trocarPara = (i: number) => {
        if (i === ativa) return
        // marca a que esta saindo: a chance de ve-la digitar ja passou
        setJaDigitadas((s) => new Set(s).add(snippet.id))
        setAtiva(i)
        // zera antes do efeito rodar, senao a aba nova pisca com o texto
        // cortado no comprimento revelado da anterior
        setRevelados(0)
    }

    // texto visivel por linha, derivado de `revelados`
    const linhasVisiveis = useMemo(() => {
        const out: string[] = codeLines.map(() => "")
        for (let i = 0; i < Math.min(revelacao, total); i++) {
            const c = flat[i]
            out[c.linha] += c.ch
        }
        return out
    }, [revelacao, flat, total, codeLines])

    const linhaAtual = flat[Math.min(revelacao, total - 1)]?.linha ?? 0

    const abaAnterior = useRef(ativa)
    useEffect(() => {
        const el = terminalRef.current
        if (!el) return
        if (abaAnterior.current !== ativa) {
            // Trocou de aba: comeca do topo. Quem clicou na outra linguagem
            // quer ler do inicio, nao cair no fim do arquivo.
            abaAnterior.current = ativa
            el.scrollTop = 0
            return
        }
        // Digitando: acompanha a escrita, sem arrastar a pagina junto.
        // Nao mexe no scroll ao CONCLUIR — isso daria um pulo para o topo
        // no instante em que a digitacao termina.
        if (!concluido) el.scrollTop = el.scrollHeight
    }, [linhaAtual, ativa, concluido])

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
                    {/* Abas de arquivo: o terminal ja imita um editor, entao
                        trocar de linguagem usa o gesto nativo dali. */}
                    <div role="tablist" aria-label="Linguagem" className="ml-4 flex items-center gap-1">
                        {snippets.map((s, i) => (
                            <button
                                key={s.id}
                                role="tab"
                                aria-selected={i === ativa}
                                onClick={() => trocarPara(i)}
                                className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                                    i === ativa
                                        ? "bg-slate-700/70 dark:bg-orange-900/30 text-slate-200 dark:text-orange-200"
                                        : "text-slate-500 dark:text-orange-300/40 hover:text-slate-300 dark:hover:text-orange-200/70"
                                }`}
                            >
                                {s.arquivo}
                            </button>
                        ))}
                    </div>
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
                        /*
                          min-h: uma <div> vazia com whitespace-pre colapsa
                          para altura 0, entao as linhas em branco entre os
                          blocos sumiam e o codigo virava um bloco unico. 20px
                          e a altura de uma linha em text-sm.
                        */
                        <div key={index} className="whitespace-pre min-h-[20px]">
                            <LinhaColorida line={line} lang={snippet.id} />
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
