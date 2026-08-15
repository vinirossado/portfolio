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
