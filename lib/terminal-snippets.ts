/**
 * Os dois codigos que o terminal do hero digita.
 *
 * Antes o array de linhas era montado inline no hero.tsx e o nome do arquivo
 * ("SeniorDeveloper.cs") era string fixa dentro do proprio terminal — dois
 * lugares diferentes descrevendo a mesma coisa. Com duas linguagens isso nao
 * se sustenta, entao cada snippet carrega o que lhe pertence: o nome do
 * arquivo, o rotulo da aba e as linhas.
 *
 * As duas versoes dizem A MESMA COISA. Esse e o ponto do seletor: nao sao dois
 * conteudos diferentes, e o mesmo perfil escrito em duas linguagens — por isso
 * vale comparar. O F# e F# de verdade (record, uniao discriminada, match,
 * pipeline), nao C# de sotaque: escrever F# como se fosse C# seria pior do que
 * nao ter a aba.
 */

export type LinguagemTerminal = "csharp" | "fsharp"

export interface SnippetTerminal {
  id: LinguagemTerminal
  /** Nome exibido na aba e usado como identidade do "arquivo". */
  arquivo: string
  linhas: string[]
}

interface DadosPerfil {
  nome: string
  cargo: string
  empresa: string
  anos: number
}

export function criarSnippets({ nome, cargo, empresa, anos }: DadosPerfil): SnippetTerminal[] {
  return [
    {
      id: "csharp",
      arquivo: "SeniorDeveloper.cs",
      linhas: [
        "using System.Linq;",
        "using System.Collections.Generic;",
        "",
        "namespace Portfolio",
        "{",
        // Solution e _solutions eram referenciados por SolveComplexProblems
        // sem existir em lugar nenhum — o trecho nao compilava se alguem
        // copiasse. Agora compila.
        "    public record Solution(bool IsScalable, bool IsEfficient, int Complexity);",
        "",
        "    public class SeniorDeveloper",
        "    {",
        `        public string Name { get; } = "${nome}";`,
        `        public string Role { get; } = "${cargo}";`,
        `        public string Company { get; } = "${empresa}";`,
        `        public int YearsOfExperience { get; } = ${anos};`,
        "        public List<string> Skills { get; } = new List<string>",
        "        {",
        '            "Event Sourcing",',
        '            "Ontology / RDF",',
        '            "Distributed Systems",',
        '            "Architecture",',
        '            "Mentoring"',
        "        };",
        "",
        "        private readonly List<Solution> _solutions = new();",
        "",
        "        public IEnumerable<Solution> SolveComplexProblems()",
        "        {",
        "            return _solutions",
        "                .Where(s => s.IsScalable && s.IsEfficient)",
        "                .OrderBy(s => s.Complexity);",
        "        }",
        "    }",
        "}",
      ],
    },
    {
      id: "fsharp",
      arquivo: "SeniorDeveloper.fs",
      linhas: [
        "module Portfolio.SeniorDeveloper",
        "",
        "type Skill =",
        "    | EventSourcing",
        "    | Ontology",
        "    | DistributedSystems",
        "",
        "type Developer =",
        "    { Name    : string",
        "      Role    : string",
        "      Company : string",
        "      Years   : int",
        "      Skills  : Skill list }",
        "",
        // Problem existe para que `solve` compile de verdade: sem um tipo
        // conhecido, a inferencia do F# nao resolve `p.Complexity`.
        "type Problem =",
        "    { Title      : string",
        "      IsScalable : bool",
        "      Complexity : int }",
        "",
        "let me =",
        `    { Name    = "${nome}"`,
        `      Role    = "${cargo}"`,
        `      Company = "${empresa}"`,
        `      Years   = ${anos}`,
        "      Skills  = [ EventSourcing",
        "                  Ontology",
        "                  DistributedSystems ] }",
        "",
        "let describe skill =",
        "    match skill with",
        '    | EventSourcing      -> "append-only, replayable"',
        '    | Ontology           -> "RDF, Turtle, SPARQL"',
        '    | DistributedSystems -> "Pulsar, Postgres, Docker"',
        "",
        "let solve (problems: Problem list) =",
        "    problems",
        "    |> List.filter (fun p -> p.IsScalable)",
        "    |> List.sortBy (fun p -> p.Complexity)",
      ],
    },
  ]
}
