import type { GithubRepository } from "@/models/github-repository"

/**
 * Dados do GitHub lidos em BUILD TIME, pelo mesmo motivo do lib/medium.ts.
 *
 * Antes cada visitante disparava DUAS chamadas identicas a
 * `/users/vinirossado/repos` do navegador — uma no github-stats e outra no
 * skills — e ambas contavam contra o limite de 60 req/hora por IP da API sem
 * token. Quem estivesse atras de um IP compartilhado (escritorio, operadora
 * movel, VPN) podia estourar o limite e ver a secao inteira sumir, porque o
 * componente falha em silencio de proposito.
 *
 * Buscando no build: uma chamada so, no CI, e o resultado embutido no HTML.
 * O visitante nao faz requisicao nenhuma, nao ve esqueleto de carregamento, e
 * o conteudo existe mesmo com JavaScript desligado. O rebuild diario mantem
 * os numeros frescos.
 */

const USER = "vinirossado"

export interface GithubLinguagem {
  name: string
  count: number
  pct: number
}

/**
 * So os campos que a secao de skills realmente renderiza.
 *
 * Passar os objetos crus da API custou caro: cada repositorio traz ~80 campos
 * (urls de forks, de branches, de issues, licenca, owner completo) e nada
 * disso e usado. Serializados no HTML, 54 repositorios levaram a pagina de
 * 178 KB para 488 KB — quase o triplo, para economizar duas requisicoes.
 * Trocar peso de rede por peso de rede nao e otimizacao.
 */
export interface RepoResumo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
}

export interface GithubDados {
  repos: number
  stars: number
  forks: number
  languages: GithubLinguagem[]
  lastPush: string | null
  /** Repositorios que a secao de skills pode mostrar, ja enxutos e cortados. */
  lista: RepoResumo[]
}

/** Estado vazio: a secao se esconde em vez de mostrar zeros como se fossem reais. */
export const GITHUB_VAZIO: GithubDados = {
  repos: 0,
  stars: 0,
  forks: 0,
  languages: [],
  lastPush: null,
  lista: [],
}

/**
 * A secao de skills so cruza repositorios com quatro linguagens, e mostra no
 * maximo cinco de cada. Entao mandar as outras 30+ para o navegador seria
 * pagar transferencia por dado que nunca aparece.
 */
const LINGUAGENS_MOSTRADAS = ["C#", "Go", "TypeScript", "Swift"]
const POR_LINGUAGEM = 5

function enxugar(repos: GithubRepository[]): RepoResumo[] {
  return LINGUAGENS_MOSTRADAS.flatMap((lang) =>
    repos
      .filter((r) => r.language === lang)
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, POR_LINGUAGEM)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? null,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count ?? 0,
        updated_at: (r as any).updated_at,
      })),
  )
}

export async function getGithubData(): Promise<GithubDados> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } },
    )
    if (!res.ok) return GITHUB_VAZIO
    const data = await res.json()
    if (!Array.isArray(data)) return GITHUB_VAZIO

    // Forks nao dizem nada sobre o que eu escrevi.
    const proprios = (data as GithubRepository[]).filter((r) => !(r as any).fork)

    const porLingua = new Map<string, number>()
    for (const r of proprios) {
      if (!r.language) continue
      porLingua.set(r.language, (porLingua.get(r.language) ?? 0) + 1)
    }
    const totalComLingua = [...porLingua.values()].reduce((a, b) => a + b, 0) || 1

    return {
      repos: proprios.length,
      stars: proprios.reduce((a, r) => a + (r.stargazers_count ?? 0), 0),
      forks: proprios.reduce((a, r) => a + ((r as any).forks_count ?? 0), 0),
      languages: [...porLingua.entries()]
        .map(([name, count]) => ({ name, count, pct: (count / totalComLingua) * 100 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
      lastPush: (proprios[0] as any)?.pushed_at ?? null,
      lista: enxugar(proprios),
    }
  } catch {
    // Falhar em silencio: o build nunca quebra por causa da API do GitHub.
    return GITHUB_VAZIO
  }
}
