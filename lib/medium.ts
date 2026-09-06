export interface MediumPost {
  title: string
  link: string
  date: string
  tags: string[]
  snippet: string
  /** Primeira imagem do post, usada como capa. Vazio se o post nao tiver. */
  capa: string
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
 * Primeira imagem do corpo do post — no Medium, e a capa.
 *
 * O feed nao tem um campo de imagem destacada; o que existe e o HTML inteiro
 * do post dentro de `content:encoded`. A primeira <img> dali e a capa em todos
 * os posts verificados. Devolve "" quando o post nao tem imagem nenhuma, e a
 * secao simplesmente nao mostra capa nesse caso.
 */
function primeiraImagem(html: string) {
  const m = html.match(/<img[^>]+src="([^"]+)"/)
  return m ? m[1] : ""
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
/*
  Sem limite por padrao, e isso e deliberado.

  Este parametro ja foi 3 (escondia o quarto post) e depois 4, fixado com a
  justificativa de que "preenche exatamente uma linha da grade". Dois dias
  depois saiu um quinto post e o mais antigo sumiu de novo, em silencio — o
  mesmo bug, pela mesma causa: um numero cravado no codigo para casar com um
  layout. O layout agora e destaque + lista, que acomoda qualquer quantidade,
  entao o corte deixou de existir. O proprio Medium ja limita o feed a ~10.
*/
export async function getMediumPosts(limit = 20): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const xml = await res.text()

    const items = xml.split("<item>").slice(1, limit + 1)
    return items.map((raw) => {
      const content = pick(raw, "content:encoded")
      const text = stripHtml(content)
      const capa = primeiraImagem(content)
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
        // 240 e nao 160: so o card em destaque mostra trecho, e ele tem
        // espaco para mais uma linha ou duas.
        snippet: text.slice(0, 240) + (text.length > 240 ? "…" : ""),
        capa,
      }
    })
  } catch {
    return []
  }
}
