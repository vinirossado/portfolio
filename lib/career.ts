/**
 * Fonte unica dos anos de experiencia.
 *
 * Antes havia tres numeros diferentes na pagina: o badge do hero mostrava "8+"
 * (default hardcoded do componente, que o page.tsx nunca sobrescrevia), o
 * terminal ao lado mostrava 9 (`yearsOfExperience + 1`) e o skills.tsx
 * calculava 9 por conta propria. Dois deles apareciam na mesma tela.
 */
export const CARREIRA_INICIO = 2017

export const anosDeExperiencia = () => new Date().getFullYear() - CARREIRA_INICIO

/**
 * Empresa atual. Fica aqui pela mesma razao dos anos de experiencia: o nome
 * aparece no Hero, no /now e na timeline de experiencia — tres lugares que
 * antes so ficavam em sincronia por disciplina. O texto traduzido continua
 * no language-provider; aqui fica so o que nao se traduz (nome e URL).
 */
export const EMPRESA_ATUAL = {
  nome: "The LEGO Group",
  url: "https://www.lego.com",
  /* Primeiro dia. Serve para calcular ha quanto tempo estou em F#, que
     comecou junto com o cargo — assim o numero se atualiza sozinho em vez
     de virar um "1 mes" mentiroso daqui a um ano. */
  inicio: "2026-09-01",
} as const

/**
 * Tempo decorrido desde uma data ISO, em anos fracionarios.
 *
 * Fracionario de proposito: skills com menos de um ano existem (F# tem
 * semanas), e o formatador na secao de skills decide se mostra meses ou anos.
 * Um `Math.floor` aqui faria uma skill nova valer zero.
 */
export const anosDesde = (iso: string) =>
  (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
