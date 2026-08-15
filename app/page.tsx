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
  // Server Component: com `output: 'export'` isso roda no build e os posts
  // ficam embutidos no HTML. Se falhar, volta [] e a secao mostra so o link.
  const posts = await getMediumPosts(3)

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
      {/* <Contact /> era importado mas nunca renderizado — o site nao tinha
          secao de contato, e o link "#contact" do About nao levava a lugar nenhum. */}
      <Contact />
      <Footer />
      <EasterEggs />
    </main>
  )
}
