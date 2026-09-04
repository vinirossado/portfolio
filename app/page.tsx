import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import GithubStats from "@/components/github-stats"
import Now from "@/components/now"
import Footer from "@/components/footer"
import LanguageSwitcher from "@/components/language-switcher"
import Contact from "@/components/contact"
import ThemeToggle from "@/components/theme-toggle"
import BuyMeACoffeeButton from "@/components/buy-me-a-coffee"
import EasterEggs from "@/components/easter-eggs"
import { getMediumPosts } from "@/lib/medium"

export default async function Home() {
  /*
    Server Component: com `output: 'export'` isso roda no build e os posts
    ficam embutidos no HTML. Se falhar, volta [] e a secao mostra so o link.

    Quatro, nao tres: o feed do Medium tem quatro posts hoje e o limite de 3
    escondia o mais antigo sem nenhum sinal de que havia mais. Quatro tambem
    preenche exatamente uma linha da grade em telas grandes. Se um dia houver
    mais, aparecem os 4 mais recentes — que e o que uma secao "/now" quer
    dizer — e o link "ver todos no Medium" ao lado cobre o resto.
  */
  const posts = await getMediumPosts(4)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <ThemeToggle />
      <LanguageSwitcher />
      <BuyMeACoffeeButton variant="header" />
      <Hero name="Vinicius Rossado" title="Senior Software Engineer" photoUrl="/profilepic.jpeg" />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GithubStats />
      <Now posts={posts} />
      {/*
        Contato escondido por enquanto (sem backend para receber o envio).
        O componente continua pronto: basta descomentar e, se quiser o envio
        de verdade, definir NEXT_PUBLIC_CONTACT_ENDPOINT (Formspree/Web3Forms).
        Sem essa variavel ele ja cai para mailto, que funciona sem servidor.

        IMPORTANTE: enquanto isto estiver comentado, os CTAs do Hero e do About
        NAO podem apontar para "#contact" — a ancora nao existe e o clique nao
        faz nada. Eles estao em mailto: ate o contato voltar.
      */}
      {/* <Contact /> */}
      <Footer />
      <EasterEggs />
    </main>
  )
}
