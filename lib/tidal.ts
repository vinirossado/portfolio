/**
 * Playlist publica do Tidal, lida em BUILD TIME.
 *
 * Por que da para fazer isto sem login: o Tidal aceita `client_credentials`,
 * que autentica a APLICACAO e nao a pessoa. O token resultante le catalogo e
 * playlists publicas — nao o meu historico de escuta, que exigiria
 * Authorization Code + PKCE e um refresh token guardado em algum lugar,
 * rotacionando e quebrando em silencio uma hora. Uma playlist curada tambem e
 * mais honesta que telemetria: e uma escolha, nao um rastro.
 *
 * Sem as variaveis de ambiente a funcao devolve null e a secao simplesmente
 * nao aparece — nunca um bloco vazio nem dado inventado.
 */

const AUTH = "https://auth.tidal.com/v1/oauth2/token"
const API = "https://openapi.tidal.com/v2"
// O catalogo do Tidal varia por pais: uma faixa indisponivel na regiao
// consultada some da resposta. DK e onde eu moro, entao e o que vejo.
const PAIS = "DK"

export interface TidalFaixa {
  id: string
  titulo: string
  artista: string
  duracao: string
}

export interface TidalPlaylist {
  nome: string
  url: string
  capa: string
  /** Cor dominante da capa, vinda do proprio Tidal. Usada como acento. */
  cor: string | null
  totalFaixas: number
  duracaoMin: number
  faixas: TidalFaixa[]
}

/** "PT31M45S" -> 31. O Tidal devolve duracao em ISO 8601. */
function minutosDe(iso: string) {
  const h = +(iso.match(/(\d+)H/)?.[1] ?? 0)
  const m = +(iso.match(/(\d+)M/)?.[1] ?? 0)
  const s = +(iso.match(/(\d+)S/)?.[1] ?? 0)
  return h * 60 + m + (s >= 30 ? 1 : 0)
}

/** "PT3M58S" -> "3:58" */
function tempoDe(iso: string) {
  const m = +(iso.match(/(\d+)M/)?.[1] ?? 0)
  const s = +(iso.match(/(\d+)S/)?.[1] ?? 0)
  return `${m}:${String(s).padStart(2, "0")}`
}

/** Aceita a URL inteira ou so o uuid. */
function idDaPlaylist(valor: string) {
  return valor.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0] ?? null
}

async function pegarToken(id: string, secret: string) {
  const res = await fetch(AUTH, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  if (!res.ok) return null
  return (await res.json())?.access_token ?? null
}

/** Escolhe a maior imagem oferecida; o card renderiza em ate 176px. */
function melhorCapa(arquivos: any[]): string {
  const ordenados = [...(arquivos ?? [])].sort(
    (a, b) => (b?.meta?.width ?? 0) - (a?.meta?.width ?? 0),
  )
  return ordenados[0]?.href ?? ""
}

export async function getTidalPlaylist(): Promise<TidalPlaylist | null> {
  const clientId = process.env.TIDAL_CLIENT_ID
  const secret = process.env.TIDAL_CLIENT_SECRET
  const bruto = process.env.TIDAL_PLAYLIST
  if (!clientId || !secret || !bruto) return null

  const id = idDaPlaylist(bruto)
  if (!id) return null

  try {
    const token = await pegarToken(clientId, secret)
    if (!token) return null
    const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.api+json" }

    /*
      Duas chamadas, e nao uma, porque o endpoint da playlist NAO devolve os
      artistas das faixas — so titulo e duracao. Uma lista de musicas sem quem
      as tocou nao diz nada, entao o segundo pedido busca items.artists.
    */
    const [resPl, resItens] = await Promise.all([
      fetch(`${API}/playlists/${id}?countryCode=${PAIS}&include=coverArt`, { headers }),
      fetch(
        `${API}/playlists/${id}/relationships/items?countryCode=${PAIS}&include=items.artists`,
        { headers },
      ),
    ])
    if (!resPl.ok) return null

    const pl = await resPl.json()
    const attrs = pl?.data?.attributes
    if (!attrs) return null

    const arte = (pl.included ?? []).find((i: any) => i.type === "artworks")

    let faixas: TidalFaixa[] = []
    if (resItens.ok) {
      const itens = await resItens.json()
      const incluidos: any[] = itens.included ?? []
      const artistas = new Map(
        incluidos.filter((i) => i.type === "artists").map((a) => [a.id, a.attributes?.name]),
      )
      faixas = incluidos
        .filter((i) => i.type === "tracks")
        .map((t) => {
          const idArtista = t.relationships?.artists?.data?.[0]?.id
          return {
            id: t.id,
            titulo: t.attributes?.title ?? "",
            artista: artistas.get(idArtista) ?? "",
            duracao: tempoDe(t.attributes?.duration ?? ""),
          }
        })
    }

    return {
      nome: attrs.name ?? "",
      url:
        attrs.externalLinks?.[0]?.href ?? `https://tidal.com/browse/playlist/${id}`,
      capa: melhorCapa(arte?.attributes?.files),
      cor: arte?.attributes?.visualMetadata?.selectedPaletteColor ?? null,
      totalFaixas: attrs.numberOfItems ?? faixas.length,
      duracaoMin: minutosDe(attrs.duration ?? ""),
      faixas,
    }
  } catch {
    // O build nunca quebra por causa do Tidal.
    return null
  }
}
