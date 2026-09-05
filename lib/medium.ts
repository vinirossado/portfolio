export interface MediumPost {
  title: string
  link: string
  date: string
  tags: string[]
  snippet: string
}

const FEED = "https://medium.com/feed/@viniciusrossado"

function pick(block: string, tag: string) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  if (!m) return ""
  return m[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim()
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Le o RSS do Medium em BUILD TIME.
 *
 * O site e `output: 'export'`, entao Server Components rodam durante o build e
 * o resultado fica embutido no HTML. Buscar no cliente nao funcionaria: o feed
 * do Medium nao manda CORS headers.
 *
 * Contrapartida: os posts so atualizam quando o site e reconstruido.
 * Se a rede falhar no build, retorna [] e a secao mostra so o link do perfil —
 * o build nunca quebra por causa disso.
 */
export async function getMediumPosts(limit = 3): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const xml = await res.text()

    const items = xml.split("<item>").slice(1, limit + 1)
    return items.map((raw) => {
      const content = pick(raw, "content:encoded")
      const text = stripHtml(content)
      return {
        title: stripHtml(pick(raw, "title")),
        link: pick(raw, "link").split("?")[0],
        date: pick(raw, "pubDate"),
        // 5 e o teto do proprio Medium por post, entao na pratica isto mostra
        // TODAS as tags. Era 3, o que escondia duas de cada card sem nenhum
        // sinal de que existiam.
        tags: [...raw.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)]
          .map((m) => m[1])
          .slice(0, 5),
        snippet: text.slice(0, 160) + (text.length > 160 ? "…" : ""),
      }
    })
  } catch {
    return []
  }
}
