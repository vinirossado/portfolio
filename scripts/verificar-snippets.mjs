#!/usr/bin/env node
/**
 * Compila os dois trechos que o terminal do hero exibe.
 *
 * O terminal mostra codigo com cara de codigo real, e alguem pode copiar e
 * colar. Ate agora o C# NAO compilava: `SolveComplexProblems` usava um tipo
 * `Solution` e um campo `_solutions` que nao existiam em lugar nenhum. Isso
 * passou despercebido porque nada nunca tentou compilar — o array de strings
 * e opaco para o TypeScript.
 *
 * Este script le o modulo de verdade (nao uma copia), escreve os dois arquivos
 * e roda `dotnet build` em cada um. Se um deles parar de compilar, falha.
 *
 *   node scripts/verificar-snippets.mjs
 *
 * Precisa do SDK do .NET. Nao esta no GitHub Action de proposito: instalar o
 * SDK a cada deploy custaria minutos para verificar algo que so muda quando
 * alguem mexe nos snippets. Rode a mao ao editar lib/terminal-snippets.ts.
 */
import { execFileSync } from "node:child_process"
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..")

// O modulo e TypeScript com um unico tipo exportado; tirar as anotacoes basta
// para o Node executa-lo. Ler o arquivo real e o ponto: uma copia colada aqui
// envelheceria em silencio.
const fonte = (await import("node:fs")).readFileSync(
  join(raiz, "lib/terminal-snippets.ts"),
  "utf8",
)
const js = fonte
  .replace(/^export /gm, "")
  .replace(/^(interface|export interface)[\s\S]*?^}/gms, "")
  .replace(/^(export )?type .*$/gm, "")
  .replace(/:\s*SnippetTerminal\[\]/g, "")
  .replace(/\{ nome, cargo, empresa, anos \}: DadosPerfil/, "{ nome, cargo, empresa, anos }")

const tmp = mkdtempSync(join(tmpdir(), "snippets-"))
try {
  writeFileSync(join(tmp, "m.mjs"), `${js}\nexport { criarSnippets }\n`)
  const { criarSnippets } = await import(join(tmp, "m.mjs"))
  const snippets = criarSnippets({
    nome: "Vinicius Rossado",
    cargo: "Senior Software Engineer",
    empresa: "The LEGO Group",
    anos: 9,
  })

  const projetos = {
    csharp: {
      proj: "p.csproj",
      xml: `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Library</OutputType><TargetFramework>net10.0</TargetFramework><Nullable>disable</Nullable></PropertyGroup></Project>`,
    },
    fsharp: {
      proj: "p.fsproj",
      xml: (arquivo) =>
        `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Library</OutputType><TargetFramework>net10.0</TargetFramework></PropertyGroup><ItemGroup><Compile Include="${arquivo}" /></ItemGroup></Project>`,
    },
  }

  let falhou = false
  for (const s of snippets) {
    const dir = join(tmp, s.id)
    mkdirSync(dir)
    writeFileSync(join(dir, s.arquivo), s.linhas.join("\n") + "\n")
    const cfg = projetos[s.id]
    writeFileSync(
      join(dir, cfg.proj),
      typeof cfg.xml === "function" ? cfg.xml(s.arquivo) : cfg.xml,
    )
    try {
      execFileSync("dotnet", ["build", "-v", "q", "--nologo"], {
        cwd: dir,
        stdio: "pipe",
        env: { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: "1", DOTNET_NOLOGO: "1" },
      })
      console.log(`ok    ${s.arquivo}`)
    } catch (e) {
      falhou = true
      console.error(`FALHA ${s.arquivo}`)
      console.error(String(e.stdout ?? e.message).split("\n").filter((l) => l.includes("error")).join("\n"))
    }
  }
  process.exit(falhou ? 1 : 0)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
