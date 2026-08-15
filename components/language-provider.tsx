"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "pt" | "en" | "ru" | "et";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    currentRole: "Atual",

    // ---- LEGO (RASCUNHO — escopo do cargo, nao realizacoes) ----
    exp0Title: "Engenheiro de Software Senior",
    exp0Company: "The LEGO Group",
    exp0CompanyUrl: "https://www.lego.com",
    exp0Location: "Billund, Dinamarca",
    exp0Period: "Set 2026 - Presente",
    exp0Description:
      "Time PELM, dentro de Product Delivery Technology. Construo os servicos que sustentam o processo de desenvolvimento de produto da LEGO — consistencia, rastreabilidade e automacao entre os dominios envolvidos em cada mudanca.",
    exp0Resp1:
      "Propriedade ponta a ponta de features e servicos, do desenho a operacao em producao (you build it, you run it)",
    exp0Resp2:
      "Desenho de APIs escalaveis e sistemas distribuidos em nuvem, com foco em observabilidade, confiabilidade e seguranca",
    exp0Resp3:
      "Integracao de dados entre dominios de negocio com arquitetura orientada a eventos e estrategias de persistencia SQL/NoSQL",
    exp0Resp4:
      "Mentoria de engenheiros e elevacao dos padroes de codigo, testes e CI/CD do time",
    welcome: "Bem-vindo ao meu portfolio",
    about: "Sobre Mim",
    skills: "Minhas Habilidades",
    seeAllRepos: "Ver todos os repositórios",
    projects: "Projetos Recentes",
    exp1Title: "Engenheiro de Software Sênior",
    exp1Company: "Riverty",
    exp1CompanyUrl: "https://riverty.com",
    exp1Location: "Tallinn, Estônia",
    exp1Period: "2022 - 2026",
    exp1Description:
      "Liderança da arquitetura frontend para produtos financeiros usando Web Components com StencilJS e microserviços .NET Core. Construindo o design system utilizado por múltiplos times.",
    exp1Resp1:
      "Arquitetura de Web Components reutilizáveis com StencilJS para a plataforma financeira da empresa",
    exp1Resp2:
      "Desenvolvimento e manutenção de microserviços .NET Core com Kafka para processamento event-driven",
    exp1Resp3:
      "Gestão de infraestrutura Azure com Bicep e Kubernetes para deploys em produção",
    exp1Resp4:
      "Mentoria de desenvolvedores e revisão de código em times multifuncionais",
    exp2Title: "Engenheiro de Software",
    exp2Company: "Arvato Financial Solutions Tech Center",
    exp2CompanyUrl: "https://arvato.com",
    exp2Location: "Tallinn, Estônia",
    exp2Period: "2022 - 2022",
    exp2Description:
      "Contribuição na migração de sistemas legados para tecnologias web modernas na divisão de soluções financeiras, que posteriormente se tornou Riverty.",
    exp2Resp1:
      "Migração de aplicações frontend legadas para Web Components modernos em TypeScript",
    exp2Resp2:
      "Desenvolvimento de apps mobile híbridos com Ionic para ferramentas financeiras internas",
    exp2Resp3:
      "Integração de componentes frontend com serviços backend .NET Core existentes",
    exp2Resp4: "Colaboração com times internacionais entre Estônia e Alemanha",
    exp3Title: "Desenvolvedor Full Stack",
    exp3Company: "MAGIT IT PARTNER",
    exp3Location: "Ribeirão Preto, Brasil",
    exp3Period: "2020 - 2022",
    exp3Description:
      "Desenvolvimento full-stack para clientes enterprise, construindo SPAs em Angular com APIs .NET e trabalhando com múltiplas tecnologias de banco de dados.",
    exp3Resp1:
      "Construção de SPAs em Angular e apps mobile com React Native para clientes enterprise",
    exp3Resp2:
      "Desenvolvimento de APIs REST .NET Core integradas com Oracle e SQL Server",
    exp3Resp3:
      "Implementação de MongoDB para armazenamento baseado em documentos em novos microserviços",
    exp3Resp4:
      "Entrega de funcionalidades ponta a ponta, da modelagem de banco ao deploy do frontend",
    exp4Title: "Desenvolvedor Full Stack",
    exp4Company: "GooWe",
    exp4Location: "Ribeirão Preto, Brasil",
    exp4Period: "2019 - 2020",
    exp4Description:
      "Atuação em uma stack multi-plataforma usando .NET, Angular e Flutter, explorando diferentes frameworks para entregar soluções mobile e web.",
    exp4Resp1:
      "Desenvolvimento de aplicações web com Angular e serviços backend .NET",
    exp4Resp2:
      "Construção de funcionalidades mobile cross-platform com Flutter",
    exp4Resp3:
      "Exploração de Elixir para funcionalidades backend em tempo real junto à stack principal .NET",
    exp4Resp4:
      "Gerenciamento de camadas de dados SQL Server e MongoDB para funcionalidades do produto",
    exp5Title: "Desenvolvedor Full Stack",
    exp5Company: "Kezz IT",
    exp5Location: "Ribeirão Preto, Brasil",
    exp5Period: "2019 - 2019",
    exp5Description:
      "Atuação focada na construção de ferramentas internas e aplicações para clientes com Angular e .NET.",
    exp5Resp1:
      "Desenvolvimento de ferramentas internas e dashboards para clientes com Angular",
    exp5Resp2: "Construção e manutenção de APIs .NET com SQL Server",
    exp5Resp3:
      "Implementação de componentes UI responsivos seguindo especificações de design",
    exp6Title: "Desenvolvedor Full Stack",
    exp6Company: "Onsoft Web",
    exp6Location: "Ribeirão Preto, Brasil",
    exp6Period: "2018 - 2019",
    exp6Description:
      "Início de carreira onde adquiri experiência prática com .NET, Angular e Xamarin para desenvolvimento mobile em diversos projetos de clientes.",
    exp6Resp1:
      "Construção de aplicações web com Angular e .NET para diversas necessidades de clientes",
    exp6Resp2: "Desenvolvimento de apps mobile com Xamarin para iOS e Android",
    exp6Resp3:
      "Escrita de stored procedures e gerenciamento de bancos SQL Server",
    exp7Title: "Web Freelancer",
    exp7Company: "Freelance",
    exp7Location: "Ribeirão Preto, Brasil",
    exp7Period: "2018 - 2019",
    exp7Description:
      "Início da carreira como freelancer construindo sites e pequenas aplicações web para negócios locais, aprendendo os fundamentos do desenvolvimento web na prática.",
    exp7Resp1:
      "Criação de sites responsivos e landing pages para negócios locais",
    exp7Resp2:
      "Desenvolvimento de pequenas aplicações web com Ruby on Rails e Angular",
    exp7Resp3:
      "Gestão de relacionamento com clientes, levantamento de requisitos e entrega de projetos",
    skillCSharpName: "C#",
    skillCSharpCategory: "Linguagens",
    skillCSharpDescription:
      "Nove anos depois, ainda é onde me sinto em casa. Quase tudo que coloquei em produção roda nela — os fluxos de pagamento na Riverty, os backends dos meus apps, os padrões sobre os quais escrevo no Medium. É a linguagem que eu escolho quando a coisa precisa aguentar de verdade.",
    skillGoName: "Go",
    skillGoCategory: "Linguagens",
    skillGoDescription:
      "Peguei Go para o que C# torna pesado. Escrevi o GCLI para parar de refazer o mesmo esqueleto de projeto toda vez — ele gera um serviço com migrations e Docker já ligados. Binário pequeno, concorrência que dá para enxergar, deploy sem runtime junto.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Linguagens",
    skillTypeScriptDescription:
      "A outra metade do meu dia, há quase tanto tempo quanto C#. A biblioteca de componentes da Riverty era TypeScript, e este site também é. Uso o sistema de tipos como ferramenta de design: quando os tipos ficam estranhos, normalmente é o desenho que está errado.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Onde aprendi a construir coisas feitas para durar anos, não sprints. Painéis corporativos, portais internos e algumas migrações de AngularJS que ninguém pediu para fazer. Também ensinei — explicar change detection para iniciante é o jeito mais rápido de descobrir se você entende de verdade.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobile",
    skillIonicDescription:
      "Como entrei em mobile antes de ir para nativo. Apps cross-platform com Angular e Capacitor, quando manter duas bases nativas não se pagava. Me deixou com traquejo de revisão de app store e com a noção de onde a web deixa de ser suficiente.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobile",
    skillSwiftUIDescription:
      "Onde está a maior parte da minha curiosidade ultimamente. Tripfinity, Spark Tracker e o fluxo de revisão do IdentityKit nasceram aqui. UI declarativa fez sentido mais rápido do que eu esperava, mas ainda encontro as bordas onde UIKit é a resposta honesta.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "Na Riverty eu construí a biblioteca de componentes que os outros times consumiam. Stencil compila para web components puros, então os apps Angular e os híbridos podiam usar os mesmos botões sem ninguém precisar concordar sobre framework antes.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Banco de Dados",
    skillMongoDBDescription:
      "Usei onde o dado era mesmo documento — catálogos com campos que variam, logs de evento que só crescem. Não como fuga de modelagem. Aprender quando não usar demorou mais do que aprender a linguagem de consulta.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Banco de Dados",
    skillSQLServerDescription:
      "A espinha dorsal de quase tudo que construí no Brasil. Modelagem, ajuste de índice e leitura de plano de execução quando um relatório começava a estourar o tempo. Boa parte dos meus instintos sobre dados vem desses anos.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Banco de Dados",
    skillOracleDescription:
      "Herdado, não escolhido. PL/SQL e integrações com ERPs corporativos dentro de sistemas financeiros. Me ensinou a trabalhar dentro de algo que você não tem permissão para redesenhar — o que acabou sendo mais útil do que eu imaginava.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Tudo que construo vira container, normalmente antes de fazer qualquer coisa útil. O GCLI já sai com Dockerfile. No fim é a vitória chata que importa: a coisa se comporta igual no meu notebook e no servidor.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Rodei os serviços da plataforma financeira nele na Riverty — escala, deploy gradual e descobrir por que um pod reiniciava sozinho. O suficiente para ser útil e para ficar de plantão, mas não vou dizer que é onde sou mais fundo.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Escrevi nele a infraestrutura Azure do meu encurtador de URL — CosmosDB, App Service, rede, tudo revisável num pull request. Na Riverty era o padrão. Infra que dá para ler vale mais do que infra que alguém clicou.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Usei junto com Bicep dependendo de onde a coisa precisava rodar. Mesma ideia, alcance maior. Ganhando mais da minha atenção agora que AWS entrou no horizonte.",
    projectUrlShortenerTitle: "URL-Shortener",
    projectUrlShortenerDescription:
      "Plataforma para encurtar URLS sendo capaz de suportar um grade volume de dados, tendo sido feito deploy na Azure.",
    projectUrlShortenerFeature1: "Geração de URLs curtas",
    projectUrlShortenerFeature2: "Redirecionamento de URLs",
    projectUrlShortenerFeature3: "Estatísticas de acesso",
    projectUrlShortenerFeature4: "Observabilidade",
    projectGcliTitle: "GCLI",
    projectGcliDescription:
      "CLI em Golang para criação de projetos projetos em Golang, ja contendo uma estrutura robusta e pronta para producao.",
    projectGcliFeature1:
      "Criação de projetos em Golang com multiplos templates",
    projectGcliFeature2: "Geração de CRUDs de formas simplificadas",
    projectGcliFeature3: "Servidor de Migration com Hot Reload",
    projectGcliFeature4: "Dockerização do projeto",
    projectGcliFeature5: "Pronto para produção",
    projectMtgCardInventoryTitle: "MTG Card Inventory",
    projectMtgCardInventoryDescription:
      "Aplicativo para gerenciamento de inventário e decks de cartas de Magic The Gathering.",
    projectMtgCardInventoryFeature1:
      "Listagem de cartas catalogadas com filtros avançados",
    projectMtgCardInventoryFeature2: "Criação de decks personalizados",
    projectMtgCardInventoryFeature3: "Sincronização com banco de dados remoto",
    projectGcliAdvancedTemplateTitle: "GCLI Advanced Template",
    projectGcliAdvancedTemplateDescription:
      "Template avançado para o GCLI, contendo autenticação, autorização, testes e documentação.",
    projectGcliAdvancedTemplateFeature1: "Autenticação e autorização",
    projectGcliAdvancedTemplateFeature2: "Testes unitários e de integração",
    projectGcliAdvancedTemplateFeature3: "Documentação com Swagger",
    projectGcliAdvancedTemplateFeature4: "Dockerização",
    projectPortfolioWebsiteTitle: "Portfolio Website",
    projectPortfolioWebsiteDescription:
      "Site de portfolio responsivo com animações suaves e design moderno.",
    projectPortfolioWebsiteFeature1: "Animações suaves",
    projectPortfolioWebsiteFeature2: "Design responsivo",
    projectPortfolioWebsiteFeature3: "Modo escuro",
    projectPortfolioWebsiteFeature4: "Formulário de contato",
    // New Projects
    projectTravelAppTitle: "Travel App",
    projectTravelAppDescription:
      "Aplicativo completo para planejamento e gerenciamento de viagens, com recursos de itinerário inteligente e compartilhamento de experiências.",
    projectTravelAppFeature1: "Planejamento de itinerários inteligente",
    projectTravelAppFeature2: "Compartilhamento e colaboração em grupo",
    projectTravelAppFeature3: "Compartilhamento de experiências",
    projectTravelAppFeature4: "Desafios de viagem gamificados",
    projectTravelAppFeature5: "Modo offline",

    projectSparkTrackerTitle: "Spark Tracker",
    projectSparkTrackerDescription:
      "Contador de vida avançado para Magic: The Gathering com suporte multiplayer, estatísticas detalhadas e personalização completa.",
    projectSparkTrackerFeature1: "Contador de vida para até 6 jogadores",
    projectSparkTrackerFeature2: "Rastreamento de dano de comandante",
    projectSparkTrackerFeature3: "Rastreamento de contadores e veneno",
    projectSparkTrackerFeature4: "Temas personalizáveis e modo escuro",
    projectSparkTrackerFeature5: "Suporte a iPad com interface otimizada",

    projectCookbookProTitle: "Cookbook Pro",
    projectCookbookProDescription:
      "Plataforma completa para descobrir, organizar e compartilhar receitas culinárias com recursos inteligentes de planejamento de refeições.",
    projectCookbookProFeature1: "Biblioteca de receitas com busca avançada",
    projectCookbookProFeature2: "Planejador de refeições semanal",
    projectCookbookProFeature3: "Lista de compras automática",
    projectCookbookProFeature4: "Compartilhamento de receitas favoritas",
    projectCookbookProFeature5: "Calculadora nutricional integrada",
    projectCookbookProFeature6: "Integração com Apple Watch",

    projectIdentityKitTitle: "IdentityKit SDK",
    projectIdentityKitDescription:
      "SDK iOS para verificação de identidade (KYC) — captura de documentos com detecção de bordas e verificação facial por liveness. Arquitetura modular com 5 módulos, 125 testes, zero dependências externas.",
    projectIdentityKitFeature1: "Captura de documentos com detecção de bordas via Vision",
    projectIdentityKitFeature2: "Verificação facial com liveness challenges",
    projectIdentityKitFeature3: "Retry com backoff exponencial e circuit breaker",
    projectIdentityKitFeature4: "Armazenamento seguro via Keychain",
    projectIdentityKitFeature5: "Distribuição via Swift Package Manager",

    contact: "Entre em Contato",
    viewWork: "Conheça meu trabalho",
    contactMe: "Entre em contato",
    seeAll: "Ver Todos",
    fullstackDev: "Engenheiro de Software Sênior",
    seeProjects: "Ver projetos",
    sendMessage: "Enviar Mensagem",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    phone: "Telefone",
    location: "Localização",
    letsChat: "Vamos conversar!",
    availableFor:
      "Estou disponível para projetos freelance, oportunidades de trabalho ou apenas para trocar ideias sobre desenvolvimento web.",
    recentProjects:
      "Explore alguns dos meus trabalhos mais recentes, demonstrando minhas habilidades em desenvolvimento web full-stack.",
    mainFeatures: "Principais recursos:",
    seeMoreGithub: "Ver mais no GitHub",
    buyMeACoffee: "Me pague um café",
    checkoutMyLinkedIn: "LinkedIn",
    fromYear: "0",
    untilYear: "Anos",
    skillDetails: "Detalhes",
    proficiencyLevel: "Tempo de experiência",
    description: "Descrição",
    clickSkill: "Clique em uma habilidade para ver mais detalhes",
    transformingIdeas:
      "Transformando ideias em experiências digitais excepcionais",
    frontendDev: "Desenvolvimento Frontend",
    backendDev: "Desenvolvimento Backend",
    database: "Banco de Dados",
    fullWebApps: "Aplicações Web Completas",
    yearsExperience: "anos de experiência",
    seniorAchievement1: "Liderança técnica em projetos de grande escala",
    seniorAchievement2: "Arquitetura de soluções escaláveis e resilientes",
    seniorAchievement3: "Mentoria de desenvolvedores e equipes",
    keyAchievements: "Principais Conquistas",
    careerJourney: "Trajetória Profissional",
    professionalExperience: "Experiência Profissional",
    experienceDescription:
      "Minha jornada profissional inclui trabalho com empresas inovadoras, liderando projetos desafiadores e entregando soluções de alta qualidade.",
    showMore: "Ver mais detalhes",
    showLess: "Mostrar menos",
    discussYourProject: "Vamos discutir seu projeto",
    responsibilities: "Responsabilidades",
    expWebDevelopment:
      "Desenvolvimento de aplicações web modernas e responsivas",
    expTeamCollaboration: "Colaboração efetiva com equipes multidisciplinares",
    expBestPractices: "Implementação de melhores práticas de desenvolvimento",
    expCodeReview: "Revisão de código e mentoria de desenvolvedores juniores",
    aboutServiceFrontend:
      "Criação de interfaces modernas e responsivas com React, Next.js e Tailwind CSS.",
    aboutServiceBackend:
      "Construção de APIs robustas e escaláveis com Node.js, Express e TypeScript.",
    aboutServiceDatabase:
      "Modelagem e otimização de bancos de dados SQL e NoSQL.",
    aboutServiceFullWebApps:
      "Desenvolvimento full-stack de aplicações web de ponta a ponta.",
    aboutIntro1:
      "Olá! Sou um desenvolvedor FullStack apaixonado por criar soluções web elegantes e funcionais.",
    aboutIntro2:
      "Olá, me chamo Vinicius. Atualmente trabalho com Stencil e .NET Core em uma empresa financeira. Uma das minhas atividades favoritas no tempo livre (além de tocar guitarra) é criar novas arquiteturas para me desafiar com novos padrões de desenvolvimento. Além disso, um dos meus hobbies é aprender novas stacks, por exemplo, agora estou bastante interessado em Golang.",
    aboutIntro3:
      "Nos últimos anos também tenho me interessado por aprender novos idiomas e culturas, especialmente as nórdicas. Você pode me contatar por e-mail, e se quiser ver meus projetos pessoais, confira a seção de projetos.",
    // Project media translations
    viewDemo: "Ver Demo",
    watchVideo: "Assistir Vídeo",
    liveDemo: "Demo ao Vivo",
    visitWebsite: "Visitar Site",
    viewScreenshots: "Ver Capturas",
    projectGallery: "Galeria do Projeto",
    demoPreview: "Prévia da Demo",
    fullDemo: "Demo Completo",
    openInNewTab: "Abrir em Nova Aba",
    viewOnGithub: "Ver no GitHub",
    techStack: "Stack Técnica",
    projectDetails: "Detalhes do Projeto",
    closeModal: "Fechar",
    nextImage: "Próxima Imagem",
    previousImage: "Imagem Anterior",
    imageOf: "Imagem {current} de {total}",

    // ---- Localizacao / contato ----
    locationValue: "Dinamarca",
    contactError: "Nao consegui enviar. Me escreva direto:",
    // ---- Secao Agora (EDITE ESTES TRES TEXTOS) ----
    now: "Agora",
    nowSubtitle: "No que estou trabalhando, estudando e lendo neste momento.",
    nowBuilding: "Construindo",
    nowBuildingBody: "Tripfinity — planejador de viagens para iOS em SwiftUI sobre um backend .NET/PostgreSQL.",
    nowLearning: "Estudando",
    nowLearningBody: "Swift Concurrency e arquitetura offline-first para apps moveis.",
    nowReading: "Lendo",
    nowReadingBody: "Designing Data-Intensive Applications, de Martin Kleppmann.",
    // ---- Escrita / Medium ----
    writing: "Escrevendo",
    seeAllOnMedium: "Ver tudo no Medium",
    writingFallback: "Escrevo sobre .NET, Go e desenvolvimento iOS no Medium.",
    // ---- GitHub ----
    githubActivity: "Atividade no GitHub",
    githubActivitySubtitle: "Numeros reais, direto da API publica do GitHub.",
    ghRepos: "Repositorios",
    ghStars: "Estrelas",
    ghForks: "Forks",
    ghLanguages: "Linguagens por repositorio",
    ghLastPush: "Ultimo push em",
  },
  en: {
    currentRole: "Current",

    exp0Title: "Senior Software Engineer",
    exp0Company: "The LEGO Group",
    exp0CompanyUrl: "https://www.lego.com",
    exp0Location: "Billund, Denmark",
    exp0Period: "Sep 2026 - Present",
    exp0Description:
      "PELM team, within Product Delivery Technology. Building the services behind the LEGO Development Process — consistency, traceability and automation across the domains involved in every product change.",
    exp0Resp1:
      "End-to-end ownership of features and services, from design through to running them in production (you build it, you run it)",
    exp0Resp2:
      "Designing scalable APIs and cloud-native distributed systems, with a focus on observability, reliability and security",
    exp0Resp3:
      "Integrating data across business domains using event-driven architecture and SQL/NoSQL persistence strategies",
    exp0Resp4:
      "Mentoring engineers and raising the team's standards for code, testing and CI/CD",
    welcome: "Welcome to my portfolio",
    about: "About Me",
    skills: "My Skills",
    seeAllRepos: "See All Repositories",
    seeAll: "See All",
    aboutServiceFrontend:
      "Creating modern and responsive interfaces with React, Next.js and Tailwind CSS.",
    aboutServiceBackend:
      "Building robust and scalable APIs with Node.js, Express and TypeScript.",
    aboutServiceDatabase: "Modeling and optimizing SQL and NoSQL databases.",
    aboutServiceFullWebApps:
      "Full-stack development of end-to-end web applications.",
    aboutIntro1:
      "Hello! I'm a Senior Software Engineer passionate about creating elegant and functional web solutions.",
    aboutIntro2:
      "Hi, I'm Vinicius. Currently working with Stencil and .NET Core at a financial company. One of my favorite things to do on my free time (besides playing the guitar) is to build new architectures in order to challenge myself with new development patterns. Besides, one of my hobbies includes learning new stacks, for instance, right now I'm quite interested in Swift / SwiftUI.",
    aboutIntro3:
      "For the past few years I've also been interested in learning new languages and cultures, especially the nordic ones. You can reach me at my e-mail, if you want to see my personal projects, check out projects section.",
    projects: "Recent Projects",
    exp1Title: "Senior Software Engineer",
    exp1Company: "Riverty",
    exp1CompanyUrl: "https://riverty.com",
    exp1Location: "Tallinn, Estonia",
    exp1Period: "2022 - 2026",
    exp1Description:
      "Leading frontend architecture for financial products using StencilJS Web Components and .NET Core microservices. Building the design system used across multiple teams.",
    exp1Resp1:
      "Architecting reusable Web Components with StencilJS for the company's financial platform",
    exp1Resp2:
      "Developing and maintaining .NET Core microservices with Kafka for event-driven processing",
    exp1Resp3:
      "Managing Azure infrastructure with Bicep and Kubernetes for production deployments",
    exp1Resp4:
      "Mentoring developers and conducting code reviews across cross-functional teams",
    exp2Title: "Software Engineer",
    exp2Company: "Arvato Financial Solutions Tech Center",
    exp2CompanyUrl: "https://arvato.com",
    exp2Location: "Tallinn, Estonia",
    exp2Period: "2022 - 2022",
    exp2Description:
      "Contributed to the migration of legacy systems to modern web technologies within the financial solutions division, which later became Riverty.",
    exp2Resp1:
      "Migrating legacy frontend applications to modern TypeScript-based Web Components",
    exp2Resp2: "Building Ionic hybrid mobile apps for internal financial tools",
    exp2Resp3:
      "Integrating frontend components with existing .NET Core backend services",
    exp2Resp4:
      "Collaborating with cross-border teams across Estonia and Germany",
    exp3Title: "Full Stack Developer",
    exp3Company: "MAGIT IT PARTNER",
    exp3Location: "Ribeirão Preto, Brazil",
    exp3Period: "2020 - 2022",
    exp3Description:
      "Full-stack development for enterprise clients, building Angular SPAs backed by .NET APIs and working across multiple database technologies.",
    exp3Resp1:
      "Building Angular SPAs and React Native mobile apps for enterprise clients",
    exp3Resp2:
      "Developing .NET Core REST APIs integrated with Oracle and SQL Server databases",
    exp3Resp3:
      "Implementing MongoDB for document-based storage in new microservices",
    exp3Resp4:
      "Delivering end-to-end features from database modeling to frontend deployment",
    exp4Title: "Full Stack Developer",
    exp4Company: "GooWe",
    exp4Location: "Ribeirão Preto, Brazil",
    exp4Period: "2019 - 2020",
    exp4Description:
      "Worked on a multi-platform product stack using .NET, Angular, and Flutter, exploring different frameworks to deliver mobile and web solutions.",
    exp4Resp1:
      "Developing web applications with Angular and .NET backend services",
    exp4Resp2: "Building cross-platform mobile features with Flutter",
    exp4Resp3:
      "Exploring Elixir for real-time backend features alongside the main .NET stack",
    exp4Resp4:
      "Managing SQL Server and MongoDB data layers for product features",
    exp5Title: "Full Stack Developer",
    exp5Company: "Kezz IT",
    exp5Location: "Ribeirão Preto, Brazil",
    exp5Period: "2019 - 2019",
    exp5Description:
      "Short-term engagement focused on building internal tools and client-facing applications with Angular and .NET.",
    exp5Resp1:
      "Developing internal tools and client-facing dashboards with Angular",
    exp5Resp2: "Building and maintaining .NET APIs with SQL Server",
    exp5Resp3:
      "Implementing responsive UI components following design specifications",
    exp6Title: "Full Stack Developer",
    exp6Company: "Onsoft Web",
    exp6Location: "Ribeirão Preto, Brazil",
    exp6Period: "2018 - 2019",
    exp6Description:
      "Early career role where I gained hands-on experience with .NET, Angular, and Xamarin for mobile development across multiple client projects.",
    exp6Resp1:
      "Building web applications with Angular and .NET for diverse client needs",
    exp6Resp2: "Developing mobile apps with Xamarin for iOS and Android",
    exp6Resp3: "Writing stored procedures and managing SQL Server databases",
    exp7Title: "Web Freelancer",
    exp7Company: "Freelance",
    exp7Location: "Ribeirão Preto, Brazil",
    exp7Period: "2018 - 2019",
    exp7Description:
      "Started my career as a freelancer building websites and small web apps for local businesses, learning the fundamentals of web development hands-on.",
    exp7Resp1:
      "Building responsive websites and landing pages for local businesses",
    exp7Resp2:
      "Developing small web applications with Ruby on Rails and Angular",
    exp7Resp3:
      "Managing client relationships, requirements gathering, and project delivery",
    skillCSharpName: "C#",
    skillCSharpCategory: "Languages",
    skillCSharpDescription:
      "Nine years in and it still feels like home. Most of what I have shipped runs on it — the payment flows at Riverty, the backends behind my own apps, the patterns I keep writing about on Medium. It is what I reach for when something actually has to hold up in production.",
    skillGoName: "Go",
    skillGoCategory: "Languages",
    skillGoDescription:
      "I picked up Go for the things C# makes heavy. Wrote GCLI so I would stop rebuilding the same project skeleton every time — it scaffolds a service with migrations and Docker already wired up. Small binaries, concurrency you can see, deploys that carry no runtime.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Languages",
    skillTypeScriptDescription:
      "The other half of my day, for about as long as C#. The shared component library at Riverty was TypeScript, and so is this site. I treat the type system as a design tool: when the types get awkward, usually the design is what is wrong.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Where I learned to build things meant to last years rather than sprints. Enterprise dashboards, internal portals, and a couple of AngularJS migrations nobody volunteered for. I also taught it — explaining change detection to a beginner is the fastest way to find out whether you actually understand it.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobile",
    skillIonicDescription:
      "How I got into mobile before going native. Cross-platform apps with Angular and Capacitor, back when two native codebases were not worth the cost. It left me with a feel for app store review and for the point where web tech stops being enough.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobile",
    skillSwiftUIDescription:
      "Where most of my curiosity goes lately. Tripfinity, Spark Tracker and the review flow in IdentityKit were all built here. Declarative UI clicked faster than I expected, though I keep finding the edges where UIKit is still the honest answer.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "At Riverty I built the component library the other teams consumed. Stencil compiles to plain web components, which meant the Angular apps and the hybrid apps could share the same buttons without anyone having to agree on a framework first.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Database",
    skillMongoDBDescription:
      "Used where the data genuinely was documents — catalogs with fields that vary, event logs that only ever get appended. Not as an escape from modeling. Learning when not to reach for it took me longer than learning the query language.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Database",
    skillSQLServerDescription:
      "The backbone of most of what I built in Brazil. Modeling, index tuning, and reading execution plans when a report suddenly started timing out. A lot of my instincts about data still come from those years.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Database",
    skillOracleDescription:
      "Inherited rather than chosen. PL/SQL and integrations with corporate ERPs inside financial systems. It taught me how to work within something you are not allowed to redesign, which turned out to be more useful than I expected.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Everything I build gets containerized, usually before it does anything useful. GCLI ships Dockerfiles by default. Mostly it buys the boring win: the thing behaves the same on my laptop and on the server.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Ran the financial platform services on it at Riverty — scaling, rolling deploys, and working out why a pod kept restarting. Enough to be useful and to be on call for it, though I would not claim it is where I am deepest.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Wrote the Azure infrastructure for my URL shortener in it — CosmosDB, App Service, networking, all reviewable in a pull request. At Riverty it was the standard. Infrastructure you can read beats infrastructure somebody clicked together.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Used alongside Bicep depending on where things had to run. Same idea, wider reach. Getting more of my attention now that AWS is on the horizon.",
    projectUrlShortenerTitle: "URL-Shortener",
    projectUrlShortenerDescription:
      "Platform for shortening URLs, capable of supporting a large volume of data, deployed on Azure.",
    projectUrlShortenerFeature1: "Short URL generation",
    projectUrlShortenerFeature2: "URL redirection",
    projectUrlShortenerFeature3: "Access statistics",
    projectUrlShortenerFeature4: "Observability",
    projectGcliTitle: "GCLI",
    projectGcliDescription:
      "CLI in Golang for creating Golang projects, already containing a robust and production-ready structure.",
    projectGcliFeature1: "Create Golang projects with multiple templates",
    projectGcliFeature2: "Simplified CRUD generation",
    projectGcliFeature3: "Migration server with Hot Reload",
    projectGcliFeature4: "Project Dockerization",
    projectGcliFeature5: "Production ready",
    projectMtgCardInventoryTitle: "MTG Card Inventory",
    projectMtgCardInventoryDescription:
      "App for managing Magic The Gathering card inventory and decks.",
    projectMtgCardInventoryFeature1:
      "Cataloged card listing with advanced filters",
    projectMtgCardInventoryFeature2: "Custom deck creation",
    projectMtgCardInventoryFeature3: "Remote database sync",
    projectGcliAdvancedTemplateTitle: "GCLI Advanced Template",
    projectGcliAdvancedTemplateDescription:
      "Advanced template for GCLI, including authentication, authorization, tests, and documentation.",
    projectGcliAdvancedTemplateFeature1: "Authentication and authorization",
    projectGcliAdvancedTemplateFeature2: "Unit and integration tests",
    projectGcliAdvancedTemplateFeature3: "Swagger documentation",
    projectGcliAdvancedTemplateFeature4: "Dockerization",
    projectPortfolioWebsiteTitle: "Portfolio Website",
    projectPortfolioWebsiteDescription:
      "Responsive portfolio website with smooth animations and modern design.",
    projectPortfolioWebsiteFeature1: "Smooth animations",
    projectPortfolioWebsiteFeature2: "Responsive design",
    projectPortfolioWebsiteFeature3: "Dark mode",
    projectPortfolioWebsiteFeature4: "Contact form",

    projectTravelAppTitle: "Travel App",
    projectTravelAppDescription:
      "Complete travel planning and management app with smart itinerary features and experience sharing capabilities.",
    projectTravelAppFeature1: "Smart itinerary planning",
    projectTravelAppFeature2: "Group sharing and collaboration",
    projectTravelAppFeature3: "Experience sharing platform",
    projectTravelAppFeature4: "Gamified travel challenges",
    projectTravelAppFeature5: "Offline mode",

    projectSparkTrackerTitle: "Spark Tracker",
    projectSparkTrackerDescription:
      "Advanced life counter for Magic: The Gathering with multiplayer support, detailed statistics and complete customization.",
    projectSparkTrackerFeature1: "Life counter for up to 6 players",
    projectSparkTrackerFeature2: "Commander damage tracking",
    projectSparkTrackerFeature3: "Counters and poison tracking",
    projectSparkTrackerFeature4: "Customizable themes and dark mode",
    projectSparkTrackerFeature5: "iPad support with optimized interface",

    projectCookbookProTitle: "Cookbook Pro",
    projectCookbookProDescription:
      "Complete platform for discovering, organizing and sharing culinary recipes with intelligent meal planning features.",
    projectCookbookProFeature1: "Recipe library with advanced search",
    projectCookbookProFeature2: "Weekly meal planner",
    projectCookbookProFeature3: "Automatic shopping lists",
    projectCookbookProFeature4: "Favorite recipe sharing",
    projectCookbookProFeature5: "Integrated nutrition calculator",
    projectCookbookProFeature6: "Apple Watch Integration",

    projectIdentityKitTitle: "IdentityKit SDK",
    projectIdentityKitDescription:
      "iOS SDK for identity verification (KYC) — document capture with edge detection and facial liveness verification. Modular architecture with 5 modules, 125 tests, zero third-party dependencies.",
    projectIdentityKitFeature1: "Document capture with Vision edge detection",
    projectIdentityKitFeature2: "Facial liveness verification with challenges",
    projectIdentityKitFeature3: "Retry with exponential backoff and circuit breaker",
    projectIdentityKitFeature4: "Secure storage via Keychain",
    projectIdentityKitFeature5: "Distribution via Swift Package Manager",

    contact: "Contact Me",
    viewWork: "View my work",
    contactMe: "Contact me",
    fullstackDev: "Senior Software Engineer",
    seeProjects: "See projects",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    message: "Message",
    phone: "Phone",
    location: "Location",
    letsChat: "Let's chat!",
    availableFor:
      "I'm available for freelance projects, job opportunities, or just to exchange ideas about web development.",
    recentProjects:
      "Explore some of my recent work, showcasing my skills in full-stack web development.",
    mainFeatures: "Main features:",
    seeMoreGithub: "See more on GitHub",
    buyMeACoffee: "Buy me a coffee",
    checkoutMyLinkedIn: "LinkedIn",
    fromYear: "0",
    untilYear: "Years",
    skillDetails: "Details",
    proficiencyLevel: "Experience Time",
    description: "Description",
    clickSkill: "Click on a skill to see more details",
    transformingIdeas:
      "Transforming ideas into exceptional digital experiences",
    frontendDev: "Frontend Development",
    backendDev: "Backend Development",
    database: "Database",
    fullWebApps: "Full Web Applications",
    yearsExperience: "years of experience",
    seniorAchievement1: "Technical leadership in large-scale projects",
    seniorAchievement2: "Architecture of scalable and resilient solutions",
    seniorAchievement3: "Mentoring developers and teams",
    keyAchievements: "Key Achievements",
    careerJourney: "Career Journey",
    professionalExperience: "Professional Experience",
    experienceDescription:
      "My professional journey includes work with innovative companies, leading challenging projects and delivering high-quality solutions.",
    showMore: "Show more details",
    showLess: "Show less",
    discussYourProject: "Let's discuss your project",
    responsibilities: "Responsibilities",
    expWebDevelopment: "Development of modern and responsive web applications",
    expTeamCollaboration:
      "Effective collaboration with multidisciplinary teams",
    expBestPractices: "Implementation of development best practices",
    expCodeReview: "Code review and mentoring of junior developers",
    // Project media translations
    viewDemo: "View Demo",
    watchVideo: "Watch Video",
    liveDemo: "Check it out",
    visitWebsite: "Visit Website",
    viewScreenshots: "View Screenshots",
    projectGallery: "Project Gallery",
    demoPreview: "Demo Preview",
    fullDemo: "Full Demo",
    openInNewTab: "Open in New Tab",
    viewOnGithub: "View on GitHub",
    techStack: "Tech Stack",
    projectDetails: "Project Details",
    closeModal: "Close",
    nextImage: "Next Image",
    previousImage: "Previous Image",
    imageOf: "Image {current} of {total}",

    locationValue: "Denmark",
    contactError: "Could not send. Reach me directly at:",
    now: "Now",
    nowSubtitle: "What I am building, learning and reading at the moment.",
    nowBuilding: "Building",
    nowBuildingBody: "Tripfinity — an iOS travel planner in SwiftUI on a .NET/PostgreSQL backend.",
    nowLearning: "Learning",
    nowLearningBody: "Swift Concurrency and offline-first architecture for mobile apps.",
    nowReading: "Reading",
    nowReadingBody: "Designing Data-Intensive Applications, by Martin Kleppmann.",
    writing: "Writing",
    seeAllOnMedium: "See all on Medium",
    writingFallback: "I write about .NET, Go and iOS development on Medium.",
    githubActivity: "GitHub activity",
    githubActivitySubtitle: "Real numbers, straight from the public GitHub API.",
    ghRepos: "Repositories",
    ghStars: "Stars",
    ghForks: "Forks",
    ghLanguages: "Languages by repository",
    ghLastPush: "Last push on",
  },
  ru: {
    currentRole: "Tekushchaya",

    exp0Title: "Starshiy inzhener-programmist",
    exp0Company: "The LEGO Group",
    exp0CompanyUrl: "https://www.lego.com",
    exp0Location: "Billund, Dania",
    exp0Period: "Sen 2026 - Nastoyashchee vremya",
    exp0Description:
      "Komanda PELM v Product Delivery Technology. Razrabotka servisov dlya protsessa razrabotki produktov LEGO — soglasovannost, prozrachnost i avtomatizatsiya mezhdu domenami.",
    exp0Resp1:
      "Polnaya otvetstvennost za funktsii i servisy — ot proektirovaniya do raboty v produktive (you build it, you run it)",
    exp0Resp2:
      "Proektirovanie masshtabiruemykh API i oblachnykh raspredelennykh sistem s fokusom na nablyudaemost, nadezhnost i bezopasnost",
    exp0Resp3:
      "Integratsiya dannykh mezhdu biznes-domenami cherez sobytiynuyu arkhitekturu i strategii khraneniya SQL/NoSQL",
    exp0Resp4:
      "Nastavnichestvo inzhenerov i povyshenie standartov koda, testirovaniya i CI/CD v komande",
    welcome: "Добро пожаловать в мое портфолио",
    about: "Обо мне",
    seeAllRepos: "Посмотреть все репозитории",
    skills: "Мои навыки",
    seeAll: "Посмотреть все",
    projects: "Недавние проекты",
    contact: "Связаться со мной",
    viewWork: "Посмотреть мои работы",
    contactMe: "Связаться со мной",
    fullstackDev: "Старший инженер-программист",
    seeProjects: "Посмотреть проекты",
    sendMessage: "Отправить сообщение",
    name: "Имя",
    email: "Электронная почта",
    message: "Сообщение",
    phone: "Телефон",
    location: "Местоположение",
    letsChat: "Давайте пообщаемся!",
    availableFor:
      "Я доступен для фриланс-проектов, предложений работы или просто для обмена идеями о веб-разработке.",
    recentProjects:
      "Ознакомьтесь с некоторыми из моих последних работ, демонстрирующих мои навыки в full-stack веб-разработке.",
    mainFeatures: "Основные функции:",
    seeMoreGithub: "Смотреть больше на GitHub",
    buyMeACoffee: "Купить мне кофе",
    checkoutMyLinkedIn: "LinkedIn",
    aboutServiceFrontend:
      "Создание современных и адаптивных интерфейсов с помощью React, Next.js и Tailwind CSS.",
    aboutServiceBackend:
      "Разработка надёжных и масштабируемых API с Node.js, Express и TypeScript.",
    aboutServiceDatabase: "Моделирование и оптимизация SQL и NoSQL баз данных.",
    aboutServiceFullWebApps:
      "Full-stack разработка веб-приложений от начала до конца.",
    aboutIntro1:
      "Привет! Я FullStack-разработчик, увлечённый созданием элегантных и функциональных веб-решений.",
    aboutIntro2:
      "Привет, я Винисиус. Сейчас работаю со Stencil и .NET Core в финансовой компании. В свободное время (кроме игры на гитаре) люблю строить новые архитектуры, чтобы бросать себе вызов новыми паттернами разработки. Также мне нравится изучать новые стеки — например, сейчас интересуюсь Golang.",
    aboutIntro3:
      "В последние годы я также интересуюсь изучением новых языков и культур, особенно северных. Связаться со мной можно по e-mail, а если хотите увидеть мои личные проекты — смотрите раздел проектов.",
    fromYear: "0",
    untilYear: "Лет",
    skillDetails: "Детали",
    proficiencyLevel: "Опыт работы",
    description: "Описание",
    clickSkill: "Нажмите на навык, чтобы увидеть подробности",
    transformingIdeas: "Превращаю идеи в исключительный цифровой опыт",
    frontendDev: "Фронтенд-разработка",
    backendDev: "Бэкенд-разработка",
    database: "Базы данных",
    fullWebApps: "Полные веб-приложения",
    yearsExperience: "лет опыта",
    seniorAchievement1: "Техническое руководство в крупномасштабных проектах",
    seniorAchievement2: "Архитектура масштабируемых и отказоустойчивых решений",
    seniorAchievement3: "Наставничество разработчиков и команд",
    careerJourney: "Карьерный путь",
    professionalExperience: "Профессиональный опыт",
    experienceDescription:
      "Мой профессиональный путь включает работу с инновационными компаниями, руководство сложными проектами и предоставление высококачественных решений.",
    keyAchievements: "Ключевые достижения",
    showMore: "Показать подробности",
    showLess: "Свернуть",
    discussYourProject: "Давайте обсудим ваш проект",
    responsibilities: "Обязанности",
    expWebDevelopment: "Разработка современных и адаптивных веб-приложений",
    expTeamCollaboration:
      "Эффективное сотрудничество с мультидисциплинарными командами",
    expBestPractices: "Внедрение лучших практик разработки",
    expCodeReview: "Ревью кода и наставничество младших разработчиков",
    // Experience
    exp1Title: "Старший инженер-программист",
    exp1Company: "Riverty",
    exp1CompanyUrl: "https://riverty.com",
    exp1Location: "Таллин, Эстония",
    exp1Period: "2022 - 2026",
    exp1Description:
      "Руководство фронтенд-архитектурой финансовых продуктов с использованием Web Components на StencilJS и микросервисов .NET Core. Создание дизайн-системы, используемой несколькими командами.",
    exp1Resp1:
      "Проектирование переиспользуемых Web Components на StencilJS для финансовой платформы компании",
    exp1Resp2:
      "Разработка и поддержка микросервисов .NET Core с Kafka для event-driven обработки",
    exp1Resp3:
      "Управление инфраструктурой Azure с Bicep и Kubernetes для продакшн-деплоев",
    exp1Resp4:
      "Наставничество разработчиков и проведение код-ревью в кросс-функциональных командах",
    exp2Title: "Инженер-программист",
    exp2Company: "Arvato Financial Solutions Tech Center",
    exp2CompanyUrl: "https://arvato.com",
    exp2Location: "Таллин, Эстония",
    exp2Period: "2022 - 2022",
    exp2Description:
      "Участие в миграции устаревших систем на современные веб-технологии в подразделении финансовых решений, которое впоследствии стало Riverty.",
    exp2Resp1:
      "Миграция устаревших фронтенд-приложений на современные Web Components на TypeScript",
    exp2Resp2:
      "Разработка гибридных мобильных приложений на Ionic для внутренних финансовых инструментов",
    exp2Resp3:
      "Интеграция фронтенд-компонентов с существующими бэкенд-сервисами на .NET Core",
    exp2Resp4: "Сотрудничество с международными командами в Эстонии и Германии",
    exp3Title: "Full Stack разработчик",
    exp3Company: "MAGIT IT PARTNER",
    exp3Location: "Рибейран-Прету, Бразилия",
    exp3Period: "2020 - 2022",
    exp3Description:
      "Full-stack разработка для корпоративных клиентов: SPA на Angular с API на .NET и работа с несколькими технологиями баз данных.",
    exp3Resp1:
      "Создание SPA на Angular и мобильных приложений на React Native для корпоративных клиентов",
    exp3Resp2:
      "Разработка REST API на .NET Core с интеграцией Oracle и SQL Server",
    exp3Resp3:
      "Внедрение MongoDB для документного хранения в новых микросервисах",
    exp3Resp4:
      "Доставка функциональности от моделирования БД до деплоя фронтенда",
    exp4Title: "Full Stack разработчик",
    exp4Company: "GooWe",
    exp4Location: "Рибейран-Прету, Бразилия",
    exp4Period: "2019 - 2020",
    exp4Description:
      "Работа с мультиплатформенным стеком на .NET, Angular и Flutter, исследование различных фреймворков для мобильных и веб-решений.",
    exp4Resp1:
      "Разработка веб-приложений на Angular с бэкенд-сервисами на .NET",
    exp4Resp2: "Создание кроссплатформенных мобильных функций на Flutter",
    exp4Resp3:
      "Исследование Elixir для real-time функций бэкенда параллельно с основным стеком .NET",
    exp4Resp4:
      "Управление слоями данных SQL Server и MongoDB для функций продукта",
    exp5Title: "Full Stack разработчик",
    exp5Company: "Kezz IT",
    exp5Location: "Рибейран-Прету, Бразилия",
    exp5Period: "2019 - 2019",
    exp5Description:
      "Краткосрочный проект по созданию внутренних инструментов и клиентских приложений на Angular и .NET.",
    exp5Resp1:
      "Разработка внутренних инструментов и клиентских дашбордов на Angular",
    exp5Resp2: "Создание и поддержка API на .NET с SQL Server",
    exp5Resp3: "Реализация адаптивных UI-компонентов по дизайн-спецификациям",
    exp6Title: "Full Stack разработчик",
    exp6Company: "Onsoft Web",
    exp6Location: "Рибейран-Прету, Бразилия",
    exp6Period: "2018 - 2019",
    exp6Description:
      "Начало карьеры, где я получил практический опыт работы с .NET, Angular и Xamarin для мобильной разработки в различных клиентских проектах.",
    exp6Resp1:
      "Создание веб-приложений на Angular и .NET для разнообразных клиентских задач",
    exp6Resp2: "Разработка мобильных приложений на Xamarin для iOS и Android",
    exp6Resp3: "Написание хранимых процедур и управление базами SQL Server",
    exp7Title: "Веб-фрилансер",
    exp7Company: "Фриланс",
    exp7Location: "Рибейран-Прету, Бразилия",
    exp7Period: "2018 - 2019",
    exp7Description:
      "Начал карьеру фрилансером, создавая сайты и небольшие веб-приложения для местного бизнеса, осваивая основы веб-разработки на практике.",
    exp7Resp1:
      "Создание адаптивных сайтов и лендинг-страниц для местного бизнеса",
    exp7Resp2: "Разработка небольших веб-приложений на Ruby on Rails и Angular",
    exp7Resp3:
      "Управление отношениями с клиентами, сбор требований и доставка проектов",
    // Skills
    skillCSharpName: "C#",
    skillCSharpCategory: "Языки",
    skillCSharpDescription:
      "Девять лет спустя это всё ещё язык, на котором мне комфортнее всего. Почти всё, что я вывел в продакшн, работает на нём — платёжные потоки в Riverty, бэкенды моих приложений, паттерны, о которых я пишу на Medium. Беру его, когда система действительно должна выдержать нагрузку.",
    skillGoName: "Go",
    skillGoCategory: "Языки",
    skillGoDescription:
      "Взял Go для того, что на C# получается тяжеловесно. Написал GCLI, чтобы не собирать один и тот же каркас проекта заново — он создаёт сервис с миграциями и Docker сразу из коробки. Маленькие бинарники, видимая конкурентность, деплой без рантайма.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Языки",
    skillTypeScriptDescription:
      "Вторая половина моего дня, почти столько же лет, сколько и C#. Библиотека компонентов в Riverty была на TypeScript, и этот сайт тоже. Отношусь к системе типов как к инструменту проектирования: если типы получаются неуклюжими, обычно проблема в самом дизайне.",
    skillAngularName: "Angular",
    skillAngularCategory: "Фронтенд",
    skillAngularDescription:
      "Здесь я научился строить то, что живёт годами, а не спринтами. Корпоративные панели, внутренние порталы и пара миграций с AngularJS, за которые никто не вызывался добровольцем. Ещё и преподавал — объяснить change detection новичку это самый быстрый способ понять, разбираешься ли ты сам.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Мобильные",
    skillIonicDescription:
      "Так я попал в мобильную разработку до перехода на нативную. Кроссплатформенные приложения на Angular и Capacitor, когда две нативные кодовые базы не окупались. Остались навык прохождения ревью в сторах и понимание, где веб-технологии перестают справляться.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Мобильные",
    skillSwiftUIDescription:
      "Туда сейчас уходит большая часть моего любопытства. Tripfinity, Spark Tracker и экран проверки в IdentityKit сделаны здесь. Декларативный UI зашёл быстрее, чем я ожидал, хотя я до сих пор нахожу места, где UIKit остаётся честным ответом.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Фронтенд",
    skillStencilJSDescription:
      "В Riverty я делал библиотеку компонентов, которой пользовались другие команды. Stencil компилируется в обычные веб-компоненты, поэтому Angular-приложения и гибридные могли использовать одни и те же кнопки, не договариваясь сначала о фреймворке.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Базы данных",
    skillMongoDBDescription:
      "Использовал там, где данные действительно были документами — каталоги с плавающими полями, журналы событий, которые только дополняются. Не как побег от моделирования. Понять, когда его брать не стоит, заняло больше времени, чем выучить язык запросов.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Базы данных",
    skillSQLServerDescription:
      "Основа почти всего, что я делал в Бразилии. Моделирование, настройка индексов и чтение планов выполнения, когда отчёт вдруг переставал укладываться в таймаут. Многие мои интуиции о данных родом из тех лет.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Базы данных",
    skillOracleDescription:
      "Достался по наследству, а не по выбору. PL/SQL и интеграции с корпоративными ERP внутри финансовых систем. Научил работать внутри того, что тебе не дают переделать — оказалось полезнее, чем я думал.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Всё, что я делаю, попадает в контейнер, обычно ещё до того, как начнёт приносить пользу. GCLI сразу отдаёт Dockerfile. По сути это скучная, но важная победа: оно ведёт себя одинаково на ноутбуке и на сервере.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Запускал на нём сервисы финансовой платформы в Riverty — масштабирование, постепенные выкатки и выяснение, почему под перезапускается сам. Достаточно, чтобы приносить пользу и дежурить, но не стану утверждать, что это моя самая сильная область.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "На нём описал инфраструктуру Azure для своего сокращателя ссылок — CosmosDB, App Service, сеть, всё это ревьюится в пул-реквесте. В Riverty это был стандарт. Инфраструктура, которую можно прочитать, лучше той, которую кто-то накликал.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Использовал вместе с Bicep в зависимости от того, где всё должно работать. Та же идея, но шире охват. Получает больше моего внимания теперь, когда на горизонте AWS.",
    // Projects
    projectUrlShortenerTitle: "URL-Shortener",
    projectUrlShortenerDescription:
      "Платформа для сокращения URL-адресов, способная обрабатывать большой объём данных, развёрнутая в Azure.",
    projectUrlShortenerFeature1: "Генерация коротких URL",
    projectUrlShortenerFeature2: "Перенаправление URL",
    projectUrlShortenerFeature3: "Статистика доступа",
    projectUrlShortenerFeature4: "Наблюдаемость",
    projectGcliTitle: "GCLI",
    projectGcliDescription:
      "CLI на Golang для создания проектов на Golang с надёжной структурой, готовой к продакшну.",
    projectGcliFeature1: "Создание проектов на Golang с несколькими шаблонами",
    projectGcliFeature2: "Упрощённая генерация CRUD",
    projectGcliFeature3: "Сервер миграций с горячей перезагрузкой",
    projectGcliFeature4: "Докеризация проекта",
    projectGcliFeature5: "Готовность к продакшну",
    projectMtgCardInventoryTitle: "MTG Card Inventory",
    projectMtgCardInventoryDescription:
      "Приложение для управления инвентарём и колодами карт Magic: The Gathering.",
    projectMtgCardInventoryFeature1: "Каталог карт с расширенными фильтрами",
    projectMtgCardInventoryFeature2: "Создание пользовательских колод",
    projectMtgCardInventoryFeature3: "Синхронизация с удалённой базой данных",
    projectGcliAdvancedTemplateTitle: "GCLI Advanced Template",
    projectGcliAdvancedTemplateDescription:
      "Расширенный шаблон для GCLI, включающий аутентификацию, авторизацию, тесты и документацию.",
    projectGcliAdvancedTemplateFeature1: "Аутентификация и авторизация",
    projectGcliAdvancedTemplateFeature2: "Юнит- и интеграционные тесты",
    projectGcliAdvancedTemplateFeature3: "Документация Swagger",
    projectGcliAdvancedTemplateFeature4: "Докеризация",
    projectPortfolioWebsiteTitle: "Portfolio Website",
    projectPortfolioWebsiteDescription:
      "Адаптивный сайт-портфолио с плавными анимациями и современным дизайном.",
    projectPortfolioWebsiteFeature1: "Плавные анимации",
    projectPortfolioWebsiteFeature2: "Адаптивный дизайн",
    projectPortfolioWebsiteFeature3: "Тёмная тема",
    projectPortfolioWebsiteFeature4: "Форма обратной связи",
    projectTravelAppTitle: "Travel App",
    projectTravelAppDescription:
      "Полноценное приложение для планирования и управления путешествиями с интеллектуальным построением маршрутов и обменом впечатлениями.",
    projectTravelAppFeature1: "Интеллектуальное планирование маршрутов",
    projectTravelAppFeature2: "Групповой обмен и совместная работа",
    projectTravelAppFeature3: "Платформа обмена впечатлениями",
    projectTravelAppFeature4: "Геймифицированные тревел-челленджи",
    projectTravelAppFeature5: "Офлайн-режим",
    projectSparkTrackerTitle: "Spark Tracker",
    projectSparkTrackerDescription:
      "Продвинутый счётчик жизней для Magic: The Gathering с поддержкой мультиплеера, подробной статистикой и полной настройкой.",
    projectSparkTrackerFeature1: "Счётчик жизней для до 6 игроков",
    projectSparkTrackerFeature2: "Отслеживание урона командира",
    projectSparkTrackerFeature3: "Отслеживание жетонов и отравления",
    projectSparkTrackerFeature4: "Настраиваемые темы и тёмный режим",
    projectSparkTrackerFeature5:
      "Поддержка iPad с оптимизированным интерфейсом",
    projectCookbookProTitle: "Cookbook Pro",
    projectCookbookProDescription:
      "Полноценная платформа для поиска, организации и обмена кулинарными рецептами с интеллектуальным планированием питания.",
    projectCookbookProFeature1: "Библиотека рецептов с расширенным поиском",
    projectCookbookProFeature2: "Планировщик питания на неделю",
    projectCookbookProFeature3: "Автоматический список покупок",
    projectCookbookProFeature4: "Обмен любимыми рецептами",
    projectCookbookProFeature5: "Встроенный калькулятор питательной ценности",
    projectCookbookProFeature6: "Интеграция с Apple Watch",

    projectIdentityKitTitle: "IdentityKit SDK",
    projectIdentityKitDescription:
      "iOS SDK для проверки личности (KYC) — захват документов с определением границ и проверка лица через liveness. Модульная архитектура с 5 модулями, 125 тестами, без сторонних зависимостей.",
    projectIdentityKitFeature1: "Захват документов с определением границ через Vision",
    projectIdentityKitFeature2: "Проверка лица с liveness-вызовами",
    projectIdentityKitFeature3: "Повтор с экспоненциальным откатом и circuit breaker",
    projectIdentityKitFeature4: "Безопасное хранение через Keychain",
    projectIdentityKitFeature5: "Распространение через Swift Package Manager",

    // Project media translations
    viewDemo: "Посмотреть демо",
    watchVideo: "Смотреть видео",
    liveDemo: "Живое демо",
    visitWebsite: "Посетить сайт",
    viewScreenshots: "Посмотреть скриншоты",
    projectGallery: "Галерея проекта",
    demoPreview: "Превью демо",
    fullDemo: "Полное демо",
    openInNewTab: "Открыть в новой вкладке",
    viewOnGithub: "Посмотреть на GitHub",
    techStack: "Технологический стек",
    projectDetails: "Детали проекта",
    closeModal: "Закрыть",
    nextImage: "Следующее изображение",
    previousImage: "Предыдущее изображение",
    imageOf: "Изображение {current} из {total}",

    locationValue: "Dania",
    contactError: "Ne udalos otpravit. Napishite mne napryamuyu:",
    now: "Seychas",
    nowSubtitle: "Nad chem ya rabotayu, chto izuchayu i chitayu sechas.",
    nowBuilding: "Razrabatyvayu",
    nowBuildingBody: "Tripfinity — planirovshchik puteshestviy dlya iOS na SwiftUI s backend .NET/PostgreSQL.",
    nowLearning: "Izuchayu",
    nowLearningBody: "Swift Concurrency i offline-first arkhitekturu dlya mobilnykh prilozheniy.",
    nowReading: "Chitayu",
    nowReadingBody: "Designing Data-Intensive Applications, Martin Kleppmann.",
    writing: "Pishu",
    seeAllOnMedium: "Smotret vse na Medium",
    writingFallback: "Ya pishu o .NET, Go i razrabotke pod iOS na Medium.",
    githubActivity: "Aktivnost na GitHub",
    githubActivitySubtitle: "Realnye dannye iz publichnogo API GitHub.",
    ghRepos: "Repozitorii",
    ghStars: "Zvezdy",
    ghForks: "Forki",
    ghLanguages: "Yazyki po repozitoriyam",
    ghLastPush: "Posledniy push",
  },
  et: {
    currentRole: "Praegune",

    exp0Title: "Vanem tarkvarainsener",
    exp0Company: "The LEGO Group",
    exp0CompanyUrl: "https://www.lego.com",
    exp0Location: "Billund, Taani",
    exp0Period: "Sept 2026 - Praegu",
    exp0Description:
      "PELM tiim Product Delivery Technology all. Ehitan teenuseid LEGO tootearendusprotsessi taga — jarjepidevus, jalgitavus ja automatiseerimine domeenide vahel.",
    exp0Resp1:
      "Taielik omanikustaatus funktsioonide ja teenuste ule, disainist kuni tootmises haldamiseni (you build it, you run it)",
    exp0Resp2:
      "Skaleeritavate APIde ja pilvepohiste hajussusteemide disain, keskendudes jalgitavusele, usaldusvaarsusele ja turvalisusele",
    exp0Resp3:
      "Andmete integreerimine ariidomeenide vahel sundmusepohise arhitektuuri ja SQL/NoSQL strateegiatega",
    exp0Resp4:
      "Inseneride mentorlus ning tiimi koodi-, testimis- ja CI/CD standardite tostmine",
    welcome: "Tere tulemast minu portfooliosse",
    about: "Minust",
    skills: "Minu oskused",
    seeAllRepos: "Vaata kõiki repositooriume",
    projects: "Viimased projektid",
    seeAll: "Vaata kõiki",
    contact: "Võta ühendust",
    viewWork: "Vaata minu tööd",
    contactMe: "Võta minuga ühendust",
    fullstackDev: "Vanemtarkvarainsener",
    seeProjects: "Vaata projekte",
    sendMessage: "Saada sõnum",
    name: "Nimi",
    email: "E-post",
    message: "Sõnum",
    phone: "Telefon",
    location: "Asukoht",
    letsChat: "Räägime!",
    availableFor:
      "Olen saadaval vabakutseliste projektide, tööpakkumiste jaoks või lihtsalt veebiarenduse ideede vahetamiseks.",
    recentProjects:
      "Tutvu mõnede minu viimaste töödega, mis näitavad minu oskusi full-stack veebiarenduses.",
    mainFeatures: "Peamised funktsioonid:",
    seeMoreGithub: "Vaata rohkem GitHubis",
    buyMeACoffee: "Osta mulle kohv",
    checkoutMyLinkedIn: "LinkedIn",
    fromYear: "0",
    aboutServiceFrontend:
      "Kaasaegsete ja responsiivste liideste loomine Reacti, Next.js-i ja Tailwind CSS-iga.",
    aboutServiceBackend:
      "Tugevate ja skaleeritavate API-de loomine Node.js, Expressi ja TypeScriptiga.",
    aboutServiceDatabase:
      "SQL ja NoSQL andmebaaside modelleerimine ja optimeerimine.",
    aboutServiceFullWebApps:
      "Full-stack veebirakenduste arendamine algusest lõpuni.",
    aboutIntro1:
      "Tere! Olen FullStack-arendaja, kelle kirg on luua elegantseid ja funktsionaalseid veebilahendusi.",
    aboutIntro2:
      "Tere, mina olen Vinicius. Töötan praegu Stenciliga ja .NET Core'iga finantsettevõttes. Vabal ajal (peale kitarri mängimise) meeldib mulle ehitada uusi arhitektuure, et end proovile panna uute arendusmustritega. Lisaks on minu hobiks uute stackide õppimine — näiteks praegu huvitab mind Golang.",
    aboutIntro3:
      "Viimastel aastatel olen huvitunud ka uute keelte ja kultuuride õppimisest, eriti põhjamaistest. Võid minuga ühendust võtta e-posti teel. Kui tahad näha minu isiklikke projekte, vaata projektide sektsiooni.",
    untilYear: "Aastat",
    skillDetails: "Üksikasjad",
    proficiencyLevel: "Kogemuse aeg",
    description: "Kirjeldus",
    clickSkill: "Klõpsa oskusel, et näha rohkem üksikasju",
    transformingIdeas: "Muudan ideed erakordseteks digitaalseteks kogemusteks",
    frontendDev: "Frontendi arendus",
    backendDev: "Backendi arendus",
    database: "Andmebaasid",
    fullWebApps: "Täielikud veebirakendused",
    yearsExperience: "aastat kogemust",
    seniorAchievement1: "Tehniline juhtimine suuremahulistes projektides",
    seniorAchievement2:
      "Skaleeritavate ja vastupidavate lahenduste arhitektuur",
    seniorAchievement3: "Arendajate ja meeskondade juhendamine",
    keyAchievements: "Peamised saavutused",
    careerJourney: "Karjääritee",
    professionalExperience: "Töökogemus",
    experienceDescription:
      "Minu professionaalne teekond hõlmab tööd innovaatiliste ettevõtetega, keeruliste projektide juhtimist ja kvaliteetsete lahenduste pakkumist.",
    showMore: "Näita rohkem üksikasju",
    showLess: "Näita vähem",
    discussYourProject: "Arutame teie projekti",
    responsibilities: "Kohustused",
    expWebDevelopment:
      "Kaasaegsete ja responsiivste veebirakenduste arendamine",
    expTeamCollaboration: "Tõhus koostöö multidistsiplinaarsete meeskondadega",
    expBestPractices: "Arenduse parimate tavade rakendamine",
    expCodeReview: "Koodi ülevaatus ja nooremarendajate juhendamine",
    // Experience
    exp1Title: "Vanemtarkvarainsener",
    exp1Company: "Riverty",
    exp1CompanyUrl: "https://riverty.com",
    exp1Location: "Tallinn, Eesti",
    exp1Period: "2022 - 2026",
    exp1Description:
      "Frontendi arhitektuuri juhtimine finantstoodete jaoks StencilJS veebikomponentide ja .NET Core mikroteenustega. Mitme meeskonna poolt kasutatava disainisüsteemi loomine.",
    exp1Resp1:
      "Taaskasutatavate veebikomponentide projekteerimine StencilJS-iga ettevõtte finantsplatvormi jaoks",
    exp1Resp2:
      ".NET Core mikroteenuste arendamine ja haldamine Kafkaga event-driven töötluseks",
    exp1Resp3:
      "Azure taristu haldamine Bicepi ja Kubernetesega tootmisjuurutuste jaoks",
    exp1Resp4:
      "Arendajate juhendamine ja koodiülevaatuste läbiviimine krossfunktsionaalsetes meeskondades",
    exp2Title: "Tarkvarainsener",
    exp2Company: "Arvato Financial Solutions Tech Center",
    exp2CompanyUrl: "https://arvato.com",
    exp2Location: "Tallinn, Eesti",
    exp2Period: "2022 - 2022",
    exp2Description:
      "Panus pärandsüsteemide migreerimisse kaasaegsetele veebitehnoloogiatele finantslahenduste divisjonis, millest hiljem sai Riverty.",
    exp2Resp1:
      "Pärand frontendi rakenduste migreerimine kaasaegsetele TypeScript-põhistele veebikomponentidele",
    exp2Resp2:
      "Hübriidsete mobiilirakenduste arendamine Ionicuga sisemiste finantstööriistade jaoks",
    exp2Resp3:
      "Frontendi komponentide integreerimine olemasolevate .NET Core backendi teenustega",
    exp2Resp4: "Koostöö rahvusvaheliste meeskondadega Eestis ja Saksamaal",
    exp3Title: "Full Stack arendaja",
    exp3Company: "MAGIT IT PARTNER",
    exp3Location: "Ribeirão Preto, Brasiilia",
    exp3Period: "2020 - 2022",
    exp3Description:
      "Full-stack arendus ettevõtteklientidele: Angular SPA-d .NET API-dega ja töö mitme andmebaasitehnoloogiaga.",
    exp3Resp1:
      "Angular SPA-de ja React Native mobiilirakenduste loomine ettevõtteklientidele",
    exp3Resp2:
      ".NET Core REST API-de arendamine Oracle'i ja SQL Serveri integratsiooniga",
    exp3Resp3:
      "MongoDB juurutamine dokumendipõhiseks salvestuseks uutes mikroteenustes",
    exp3Resp4:
      "Funktsionaalsuste tarnimine andmebaasi modelleerimisest frontendi juurutuseni",
    exp4Title: "Full Stack arendaja",
    exp4Company: "GooWe",
    exp4Location: "Ribeirão Preto, Brasiilia",
    exp4Period: "2019 - 2020",
    exp4Description:
      "Töö mitmeplatvormlise stackiga .NET, Angulari ja Flutteriga, erinevate raamistike uurimine mobiilsete ja veebilahenduste tarnimiseks.",
    exp4Resp1:
      "Veebirakenduste arendamine Angulari ja .NET backendi teenustega",
    exp4Resp2: "Platvormideüleste mobiilsete funktsioonide loomine Flutteriga",
    exp4Resp3:
      "Elixiri uurimine reaalajas backendi funktsioonide jaoks paralleelselt .NET peamise stackiga",
    exp4Resp4:
      "SQL Serveri ja MongoDB andmekihtide haldamine tootefunktsioonide jaoks",
    exp5Title: "Full Stack arendaja",
    exp5Company: "Kezz IT",
    exp5Location: "Ribeirão Preto, Brasiilia",
    exp5Period: "2019 - 2019",
    exp5Description:
      "Lühiajaline projekt sisemiste tööriistade ja kliendirakenduste loomiseks Angulari ja .NET-iga.",
    exp5Resp1:
      "Sisemiste tööriistade ja kliendi juhtpaneelide arendamine Angulariga",
    exp5Resp2: ".NET API-de loomine ja haldamine SQL Serveriga",
    exp5Resp3:
      "Responsiivste UI komponentide rakendamine disainispetsifikatsioonide järgi",
    exp6Title: "Full Stack arendaja",
    exp6Company: "Onsoft Web",
    exp6Location: "Ribeirão Preto, Brasiilia",
    exp6Period: "2018 - 2019",
    exp6Description:
      "Karjääri algus, kus omandasin praktilise kogemuse .NET-i, Angulari ja Xamariniga mobiiliarenduses mitmetes kliendiprojektides.",
    exp6Resp1:
      "Veebirakenduste loomine Angulari ja .NET-iga mitmekesiste kliendivajaduste jaoks",
    exp6Resp2: "Mobiilirakenduste arendamine Xamariniga iOS-ile ja Androidile",
    exp6Resp3:
      "Salvestatud protseduuride kirjutamine ja SQL Serveri andmebaaside haldamine",
    exp7Title: "Veebi vabakutseline",
    exp7Company: "Vabakutseline",
    exp7Location: "Ribeirão Preto, Brasiilia",
    exp7Period: "2018 - 2019",
    exp7Description:
      "Alustasin karjääri vabakutselisena, luues veebisaite ja väikeseid veebirakendusi kohalikele ettevõtetele, õppides veebiarenduse aluseid praktikas.",
    exp7Resp1:
      "Responsiivste veebisaitide ja maandumislehtede loomine kohalikele ettevõtetele",
    exp7Resp2:
      "Väikeste veebirakenduste arendamine Ruby on Railsi ja Angulariga",
    exp7Resp3:
      "Kliendisuhete haldamine, nõuete kogumine ja projektide tarnimine",
    // Skills
    skillCSharpName: "C#",
    skillCSharpCategory: "Keeled",
    skillCSharpDescription:
      "Üheksa aastat hiljem tundub see endiselt koduna. Peaaegu kõik, mis olen tootmisse viinud, töötab sellel — maksevood Rivertys, minu enda rakenduste backendid, mustrid, millest Mediumis kirjutan. Selle poole pöördun, kui asi peab päriselt vastu pidama.",
    skillGoName: "Go",
    skillGoCategory: "Keeled",
    skillGoDescription:
      "Võtsin Go kasutusele selle jaoks, mis C#-s liiga raskeks läheb. Kirjutasin GCLI, et mitte iga kord sama projekti skeletti uuesti ehitada — see loob teenuse, kus migratsioonid ja Docker on juba ühendatud. Väikesed binaarid, nähtav samaaegsus, deploy ilma runtime'ita.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Keeled",
    skillTypeScriptDescription:
      "Minu päeva teine pool, peaaegu sama kaua kui C#. Riverty jagatud komponenditeek oli TypeScriptis, nagu ka see sait. Kasutan tüübisüsteemi disainivahendina: kui tüübid lähevad kohmakaks, on tavaliselt viga disainis endas.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Siin õppisin ehitama asju, mis peavad vastu aastaid, mitte sprinte. Ettevõtte töölauad, sisemised portaalid ja paar AngularJS migratsiooni, mida keegi vabatahtlikult ette ei võtnud. Ka õpetasin seda — change detectioni algajale selgitamine on kiireim viis teada saada, kas sa ise aru saad.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobiil",
    skillIonicDescription:
      "Nii jõudsin mobiiliarendusse enne natiivsele üleminekut. Platvormiülesed rakendused Angulari ja Capacitoriga, ajal mil kaks natiivset koodibaasi end ära ei tasunud. Jäi oskus app store'i ülevaatust läbida ja arusaam, kus veebitehnoloogia enam ei piisa.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobiil",
    skillSwiftUIDescription:
      "Sinna läheb viimasel ajal suurem osa mu uudishimust. Tripfinity, Spark Tracker ja IdentityKiti ülevaatusvoog on kõik siin tehtud. Deklaratiivne UI klappis kiiremini kui ootasin, kuigi leian ikka kohti, kus UIKit on aus vastus.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "Rivertys ehitasin komponenditeegi, mida teised tiimid kasutasid. Stencil kompileerib tavalisteks veebikomponentideks, nii said Angulari ja hübriidrakendused kasutada samu nuppe, ilma et keegi peaks enne raamistikus kokku leppima.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Andmebaasid",
    skillMongoDBDescription:
      "Kasutasin seal, kus andmed olid päriselt dokumendid — kataloogid muutuvate väljadega, sündmuselogid, mida ainult juurde kirjutatakse. Mitte modelleerimise eest põgenemiseks. Aru saada, millal seda mitte võtta, võttis kauem kui päringukeele õppimine.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Andmebaasid",
    skillSQLServerDescription:
      "Selgroog peaaegu kõigele, mida Brasiilias ehitasin. Modelleerimine, indeksite häälestamine ja täitmisplaanide lugemine, kui mõni aruanne järsku aegus. Suur osa mu andmetaju pärineb neist aastatest.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Andmebaasid",
    skillOracleDescription:
      "Päritud, mitte valitud. PL/SQL ja integratsioonid ettevõtte ERPidega finantssüsteemide sees. Õpetas töötama millegi sees, mida sul ümber kujundada ei lubata — osutus kasulikumaks kui arvasin.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Kõik, mida ehitan, satub konteinerisse, tavaliselt enne kui see midagi kasulikku teeb. GCLI väljastab Dockerfile'i vaikimisi. Sisuliselt on see igav, aga oluline võit: asi käitub sülearvutis ja serveris ühtemoodi.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Jooksutasin sellel Riverty finantsplatvormi teenuseid — skaleerimine, järkjärgulised deploy'd ja väljaselgitamine, miks üks pod end pidevalt taaskäivitas. Piisavalt, et kasulik olla ja valves seista, aga ei väida, et see oleks mu kõige sügavam ala.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Kirjutasin sellega oma URL-lühendaja Azure infrastruktuuri — CosmosDB, App Service, võrk, kõik pull requestis üle vaadatav. Rivertys oli see standard. Infrastruktuur, mida saab lugeda, on parem kui see, mille keegi kokku klikkis.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Kasutasin Bicepi kõrval sõltuvalt sellest, kus asi pidi jooksma. Sama mõte, laiem ulatus. Saab nüüd rohkem tähelepanu, kui AWS on silmapiiril.",
    // Projects
    projectUrlShortenerTitle: "URL-Shortener",
    projectUrlShortenerDescription:
      "URL-ide lühendamise platvorm, mis suudab töödelda suurt andmemahtu, juurutatud Azure'is.",
    projectUrlShortenerFeature1: "Lühikeste URL-ide genereerimine",
    projectUrlShortenerFeature2: "URL-ide ümbersuunamine",
    projectUrlShortenerFeature3: "Juurdepääsu statistika",
    projectUrlShortenerFeature4: "Jälgitavus",
    projectGcliTitle: "GCLI",
    projectGcliDescription:
      "CLI Golangis Golangi projektide loomiseks, sisaldab juba tugevat ja tootmisvalmis struktuuri.",
    projectGcliFeature1: "Golangi projektide loomine mitme malliga",
    projectGcliFeature2: "Lihtsustatud CRUD genereerimine",
    projectGcliFeature3: "Migratsiooniserveriga kuumlaadimine",
    projectGcliFeature4: "Projekti dokeriseermine",
    projectGcliFeature5: "Tootmisvalmidus",
    projectMtgCardInventoryTitle: "MTG Card Inventory",
    projectMtgCardInventoryDescription:
      "Rakendus Magic: The Gathering kaartide inventari ja pakkide haldamiseks.",
    projectMtgCardInventoryFeature1:
      "Kataloogitud kaartide loend täiustatud filtritega",
    projectMtgCardInventoryFeature2: "Kohandatud pakkide loomine",
    projectMtgCardInventoryFeature3: "Kaugandmebaasi sünkroniseerimine",
    projectGcliAdvancedTemplateTitle: "GCLI Advanced Template",
    projectGcliAdvancedTemplateDescription:
      "Täiustatud mall GCLI jaoks, sisaldab autentimist, autoriseerimist, teste ja dokumentatsiooni.",
    projectGcliAdvancedTemplateFeature1: "Autentimine ja autoriseerimine",
    projectGcliAdvancedTemplateFeature2: "Ühik- ja integratsioonitestid",
    projectGcliAdvancedTemplateFeature3: "Swaggeri dokumentatsioon",
    projectGcliAdvancedTemplateFeature4: "Dokeriseermine",
    projectPortfolioWebsiteTitle: "Portfolio Website",
    projectPortfolioWebsiteDescription:
      "Responsiivne portfoolio veebisait sujuvate animatsioonide ja kaasaegse disainiga.",
    projectPortfolioWebsiteFeature1: "Sujuvad animatsioonid",
    projectPortfolioWebsiteFeature2: "Responsiivne disain",
    projectPortfolioWebsiteFeature3: "Tume režiim",
    projectPortfolioWebsiteFeature4: "Kontaktivorm",
    projectTravelAppTitle: "Travel App",
    projectTravelAppDescription:
      "Täielik reisiplaneerimise ja -haldamise rakendus nutikate marsruudi funktsioonide ja kogemuste jagamise võimalustega.",
    projectTravelAppFeature1: "Nutikas marsruudi planeerimine",
    projectTravelAppFeature2: "Grupi jagamine ja koostöö",
    projectTravelAppFeature3: "Kogemuste jagamise platvorm",
    projectTravelAppFeature4: "Mängustatud reiside väljakutsed",
    projectTravelAppFeature5: "Võrguühenduseta režiim",
    projectSparkTrackerTitle: "Spark Tracker",
    projectSparkTrackerDescription:
      "Täiustatud eluloendur Magic: The Gatheringu jaoks mitmikmängija toega, üksikasjaliku statistika ja täieliku kohandamisega.",
    projectSparkTrackerFeature1: "Eluloendur kuni 6 mängijale",
    projectSparkTrackerFeature2: "Komandöri kahjustuse jälgimine",
    projectSparkTrackerFeature3: "Loendurite ja mürgituse jälgimine",
    projectSparkTrackerFeature4: "Kohandatavad teemad ja tume režiim",
    projectSparkTrackerFeature5: "iPadi tugi optimeeritud liidesega",
    projectCookbookProTitle: "Cookbook Pro",
    projectCookbookProDescription:
      "Täielik platvorm kulinaarsete retseptide avastamiseks, korraldamiseks ja jagamiseks nutika toidukorra planeerimisega.",
    projectCookbookProFeature1: "Retseptide kogu täiustatud otsinguga",
    projectCookbookProFeature2: "Nädala toidukorra planeerija",
    projectCookbookProFeature3: "Automaatne ostunimekiri",
    projectCookbookProFeature4: "Lemmikrtseptide jagamine",
    projectCookbookProFeature5: "Integreeritud toitumiskalkulaator",
    projectCookbookProFeature6: "Apple Watchi integratsioon",

    projectIdentityKitTitle: "IdentityKit SDK",
    projectIdentityKitDescription:
      "iOS SDK identiteedi kinnitamiseks (KYC) — dokumendipilt servade tuvastamisega ja näo liveness-kontroll. Modulaarne arhitektuur 5 mooduliga, 125 testi, null kolmanda osapoole sõltuvust.",
    projectIdentityKitFeature1: "Dokumendipilt Vision servade tuvastamisega",
    projectIdentityKitFeature2: "Näo liveness-kontroll väljakutsetega",
    projectIdentityKitFeature3: "Kordus eksponentsiaalse viivitusega ja circuit breaker",
    projectIdentityKitFeature4: "Turvaline salvestus Keychaini kaudu",
    projectIdentityKitFeature5: "Levitamine Swift Package Manageri kaudu",

    // Project media translations
    viewDemo: "Vaata demot",
    watchVideo: "Vaata videot",
    liveDemo: "Reaalajas demo",
    visitWebsite: "Külasta veebisaiti",
    viewScreenshots: "Vaata ekraanipilte",
    projectGallery: "Projekti galerii",
    demoPreview: "Demo eelvaade",
    fullDemo: "Täielik demo",
    openInNewTab: "Ava uues sakis",
    viewOnGithub: "Vaata GitHubis",
    techStack: "Tehnoloogia virn",
    projectDetails: "Projekti üksikasjad",
    closeModal: "Sulge",
    nextImage: "Järgmine pilt",
    previousImage: "Eelmine pilt",
    imageOf: "Pilt {current} / {total}",

    locationValue: "Taani",
    contactError: "Saatmine ebaonnestus. Kirjuta mulle otse:",
    now: "Praegu",
    nowSubtitle: "Millega ma praegu tegelen, mida opin ja loen.",
    nowBuilding: "Ehitan",
    nowBuildingBody: "Tripfinity — iOS reisiplaneerija SwiftUI-s .NET/PostgreSQL backendiga.",
    nowLearning: "Opin",
    nowLearningBody: "Swift Concurrency ja offline-first arhitektuur mobiilirakendustele.",
    nowReading: "Loen",
    nowReadingBody: "Designing Data-Intensive Applications, Martin Kleppmann.",
    writing: "Kirjutan",
    seeAllOnMedium: "Vaata koiki Mediumis",
    writingFallback: "Kirjutan Mediumis .NET-ist, Go-st ja iOS arendusest.",
    githubActivity: "GitHubi aktiivsus",
    githubActivitySubtitle: "Paris numbrid otse GitHubi avalikust APIst.",
    ghRepos: "Repositooriumid",
    ghStars: "Tahed",
    ghForks: "Forgid",
    ghLanguages: "Keeled repositooriumite kaupa",
    ghLastPush: "Viimane push",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
