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
    welcome: "Bem-vindo ao meu portfolio",
    about: "Sobre Mim",
    skills: "Minhas Habilidades",
    seeAllRepos: "Ver todos os repositórios",
    projects: "Projetos Recentes",
    exp1Title: "Engenheiro de Software Sênior",
    exp1Company: "Riverty",
    exp1CompanyUrl: "https://riverty.com",
    exp1Location: "Tallinn, Estônia",
    exp1Period: "2022 - Presente",
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
      "Minha linguagem principal para backend. De microserviços event-driven com Kafka a um URL shortener na Azure com CosmosDB — na Riverty eu arquiteto sistemas financeiros que processam pagamentos reais diariamente.",
    skillGoName: "Go",
    skillGoCategory: "Linguagens",
    skillGoDescription:
      "Criei o GCLI, uma ferramenta CLI open-source com 32 stars que gera projetos Go prontos para produção com múltiplos templates, geração de CRUD e hot-reload de migrations. Além disso, explorei gRPC, fundamentos de blockchain, redes neurais e até uma lib de mapeamento struct-to-struct — tudo em Go.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Linguagens",
    skillTypeScriptDescription:
      "De Web Components enterprise na plataforma fintech da Riverty até este portfólio com Next.js, TypeScript é minha ferramenta diária para qualquer coisa frontend. Também construí conversores de moeda com RxJS, ferramentas de aprendizado de estoniano e cursos completos de Angular para iniciantes.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Passei anos construindo SPAs complexas com Angular em ambientes enterprise. Integrei Web Components, ensinei Angular através de cursos completos para iniciantes (com backends CRUD completos) e usei como base para apps mobile híbridos com Ionic.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobile",
    skillIonicDescription:
      "Usei Ionic com Angular e Capacitor para entregar apps mobile cross-platform antes de migrar para desenvolvimento nativo com SwiftUI. Me deu uma base sólida em padrões de UX mobile, publicação em app stores e ponte entre tecnologias web e recursos nativos do dispositivo.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobile",
    skillSwiftUIDescription:
      "Onde vai a maior parte da minha energia criativa atualmente. Já entreguei o Spark Tracker (contador de vida para MTG com suporte a iPad), um Travel App com itinerários inteligentes, Cookbook Pro com integração ao Apple Watch e um MTG Card Inventory — todos nativos em SwiftUI com Swift Data e backends .NET.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "Na Riverty, construo os Web Components que alimentam os produtos financeiros da empresa. O Stencil me permite criar componentes de UI reutilizáveis e agnósticos de framework que são entregues como web components padrão — usados por múltiplos times e aplicações em produção.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Banco de Dados",
    skillMongoDBDescription:
      "Usei MongoDB para armazenamento flexível baseado em documentos em projetos onde schemas relacionais seriam excessivos. Confortável com pipelines de agregação, estratégias de indexação e combinando com backends Go ou .NET para prototipagem rápida e workloads de produção.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Banco de Dados",
    skillSQLServerDescription:
      "Trabalhei extensivamente com SQL Server em várias empresas no Brasil, escrevendo queries otimizadas, stored procedures e gerenciando migrações de dados. Foi a base da maioria dos projetos enterprise em que trabalhei no início da minha carreira.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Banco de Dados",
    skillOracleDescription:
      "Experiência prática com bancos Oracle em ambientes enterprise, trabalhando com PL/SQL para automação, operações com grandes volumes de dados e integração com backends .NET para sistemas financeiros legados.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Todo projeto que construo é containerizado. Dos templates do GCLI que já vêm com Dockerfiles prontos, ao URL shortener na Azure, até ambientes de desenvolvimento local — Docker faz parte do meu fluxo padrão para deploys consistentes e reproduzíveis.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Trabalho com K8s para orquestrar serviços containerizados em produção na Riverty. Lido com escalabilidade de pods, rolling deployments e configurações de service mesh na arquitetura de microserviços da plataforma financeira.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Usei Bicep para definir e implantar a infraestrutura Azure do projeto URL Shortener — CosmosDB, App Services e rede, tudo como código. Na Riverty, é o padrão para provisionar e gerenciar recursos cloud entre ambientes.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Familiarizado com Terraform para provisionamento de infraestrutura multi-cloud e gerenciamento de estado. Uso junto com Bicep dependendo da estratégia cloud do projeto, me dando flexibilidade entre Azure, AWS e setups híbridos.",
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
  },
  en: {
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
    exp1Period: "2022 - Present",
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
      "My go-to for backend work. From event-driven microservices with Kafka to a URL shortener on Azure with CosmosDB — at Riverty I architect financial systems that process real payments daily.",
    skillGoName: "Go",
    skillGoCategory: "Languages",
    skillGoDescription:
      "Built GCLI, an open-source CLI tool with 32 stars that scaffolds production-ready Go projects with multiple templates, CRUD generation, and hot-reload migrations. Beyond that, I've explored gRPC, blockchain fundamentals, neural networks, and even a struct-to-struct mapper library — all in Go.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Languages",
    skillTypeScriptDescription:
      "From building enterprise Web Components at Riverty's fintech platform to crafting this portfolio with Next.js, TypeScript is my daily driver for anything frontend. I've also built RxJS-based currency converters, Estonian language learning tools, and full Angular courses for beginners.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Spent years building complex SPAs with Angular in enterprise environments. I've integrated Web Components, taught Angular through complete courses for beginners (with full CRUD backends), and used it as the foundation for hybrid mobile apps with Ionic.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobile",
    skillIonicDescription:
      "Used Ionic with Angular and Capacitor to ship cross-platform mobile apps before transitioning to native SwiftUI development. Gave me a solid understanding of mobile UX patterns, app store publishing, and bridging web technologies with native device capabilities.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobile",
    skillSwiftUIDescription:
      "Currently where most of my creative energy goes. I've shipped Spark Tracker (an MTG life counter with iPad support), a Travel App with smart itineraries, Cookbook Pro with Apple Watch integration, and an MTG Card Inventory — all native SwiftUI with Swift Data and .NET backends.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "At Riverty, I build the Web Components that power the company's financial products. Stencil lets me create framework-agnostic, reusable UI components that ship as standard web components — used across multiple teams and applications in production.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Database",
    skillMongoDBDescription:
      "Used MongoDB for flexible, document-based storage in several projects where relational schemas would be overkill. Comfortable with aggregation pipelines, indexing strategies, and pairing it with Go or .NET backends for rapid prototyping and production workloads.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Database",
    skillSQLServerDescription:
      "Worked extensively with SQL Server across multiple companies in Brazil, writing optimized queries, stored procedures, and handling data migrations. It was the backbone of most enterprise projects I worked on early in my career.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Database",
    skillOracleDescription:
      "Hands-on experience with Oracle databases in enterprise settings, working with PL/SQL for automation, handling large-scale data operations, and integrating with .NET backends for legacy financial systems.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Every project I build gets containerized. From the GCLI templates that ship with Dockerfiles out of the box, to the URL shortener on Azure, to local development environments — Docker is part of my standard workflow for consistent, reproducible deployments.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Working with K8s for orchestrating containerized services in production at Riverty. Handling pod scaling, rolling deployments, and service mesh configurations for the financial platform's microservices architecture.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Used Bicep to define and deploy the Azure infrastructure for the URL Shortener project — CosmosDB, App Services, and networking, all as code. At Riverty, it's the standard for provisioning and managing cloud resources across environments.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Familiar with Terraform for multi-cloud infrastructure provisioning and state management. Used alongside Bicep depending on the project's cloud strategy, giving me flexibility across Azure, AWS, and hybrid setups.",
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
  },
  ru: {
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
    exp1Period: "2022 - Настоящее время",
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
      "Мой основной язык для бэкенда. От event-driven микросервисов с Kafka до сокращателя URL в Azure с CosmosDB — в Riverty проектирую финансовые системы, обрабатывающие реальные платежи ежедневно.",
    skillGoName: "Go",
    skillGoCategory: "Языки",
    skillGoDescription:
      "Создал GCLI — open-source CLI с 32 звёздами, который генерирует production-ready Go-проекты с несколькими шаблонами, генерацией CRUD и hot-reload миграций. Помимо этого, исследовал gRPC, основы блокчейна, нейронные сети и даже библиотеку маппинга struct-to-struct — всё на Go.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Языки",
    skillTypeScriptDescription:
      "От корпоративных Web Components на финтех-платформе Riverty до этого портфолио на Next.js — TypeScript мой ежедневный инструмент для всего фронтенда. Также создавал конвертеры валют на RxJS, инструменты для изучения эстонского и полные курсы Angular для новичков.",
    skillAngularName: "Angular",
    skillAngularCategory: "Фронтенд",
    skillAngularDescription:
      "Годами строил сложные SPA на Angular в корпоративных средах. Интегрировал Web Components, преподавал Angular через полные курсы для новичков (с CRUD-бэкендами) и использовал как основу для гибридных мобильных приложений с Ionic.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Мобильные",
    skillIonicDescription:
      "Использовал Ionic с Angular и Capacitor для выпуска кроссплатформенных мобильных приложений, прежде чем перейти на нативную разработку SwiftUI. Это дало мне прочную базу в паттернах мобильного UX, публикации в магазинах приложений и связи веб-технологий с нативными возможностями устройств.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Мобильные",
    skillSwiftUIDescription:
      "Сюда сейчас уходит большая часть моей творческой энергии. Выпустил Spark Tracker (счётчик жизней для MTG с поддержкой iPad), Travel App с умными маршрутами, Cookbook Pro с интеграцией Apple Watch и MTG Card Inventory — все нативные SwiftUI с Swift Data и бэкендами на .NET.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Фронтенд",
    skillStencilJSDescription:
      "В Riverty создаю Web Components, на которых работают финансовые продукты компании. Stencil позволяет создавать переиспользуемые, фреймворк-агностичные UI-компоненты, которые поставляются как стандартные веб-компоненты — используются несколькими командами и приложениями в продакшне.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Базы данных",
    skillMongoDBDescription:
      "Использовал MongoDB для гибкого документного хранения в проектах, где реляционные схемы были бы избыточны. Уверенно работаю с пайплайнами агрегации, стратегиями индексирования и комбинирую с бэкендами на Go или .NET для быстрого прототипирования и продакшн-нагрузок.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Базы данных",
    skillSQLServerDescription:
      "Плотно работал с SQL Server в нескольких компаниях в Бразилии, писал оптимизированные запросы, хранимые процедуры и управлял миграциями данных. Это была основа большинства корпоративных проектов в начале моей карьеры.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Базы данных",
    skillOracleDescription:
      "Практический опыт работы с Oracle в корпоративных средах: PL/SQL для автоматизации, операции с большими объёмами данных и интеграция с бэкендами на .NET для устаревших финансовых систем.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Каждый мой проект контейнеризирован. От шаблонов GCLI, которые идут с Dockerfile из коробки, до URL-сокращателя в Azure и локальных сред разработки — Docker является частью моего стандартного рабочего процесса для консистентных и воспроизводимых деплоев.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Работаю с K8s для оркестрации контейнеризированных сервисов в продакшне Riverty. Управляю масштабированием подов, rolling-деплоями и конфигурациями service mesh в микросервисной архитектуре финансовой платформы.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Использовал Bicep для описания и развёртывания Azure-инфраструктуры проекта URL Shortener — CosmosDB, App Services и сеть, всё как код. В Riverty это стандарт для провизионирования и управления облачными ресурсами между средами.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Знаком с Terraform для провизионирования мультиоблачной инфраструктуры и управления состоянием. Использую наряду с Bicep в зависимости от облачной стратегии проекта, что даёт гибкость между Azure, AWS и гибридными конфигурациями.",
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
  },
  et: {
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
    exp1Period: "2022 - Praegu",
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
      "Minu peamine keel backendi tööks. Event-driven mikroteenustest Kafkaga kuni URL-i lühendajani Azure'is CosmosDB-ga — Rivertys projekteerin finantssüsteeme, mis töötlevad reaalseid makseid iga päev.",
    skillGoName: "Go",
    skillGoCategory: "Keeled",
    skillGoDescription:
      "Lõin GCLI — avatud lähtekoodiga CLI 32 tähega, mis genereerib tootmisvalmis Go projekte mitme malliga, CRUD genereerimise ja hot-reload migratsioonidega. Lisaks olen uurinud gRPC-d, plokiahela aluseid, närvivõrke ja isegi struct-to-struct mappimise teeki — kõik Go-s.",
    skillTypeScriptName: "TypeScript",
    skillTypeScriptCategory: "Keeled",
    skillTypeScriptDescription:
      "Riverty fintech-platvormi ettevõtte veebikomponentidest kuni selle portfoolioni Next.js-iga — TypeScript on minu igapäevane tööriist kõigeks, mis puudutab frontendi. Olen ehitanud ka RxJS-põhiseid valuutakonvertereid, eesti keele õppimise tööriistu ja täielikke Angulari kursusi algajatele.",
    skillAngularName: "Angular",
    skillAngularCategory: "Frontend",
    skillAngularDescription:
      "Aastaid ehitasin keerulisi SPA-sid Angulariga ettevõttekeskkondades. Integreerisin veebikomponente, õpetasin Angulari täielike kursuste kaudu algajatele (koos CRUD backendidega) ja kasutasin seda alusena hübriidsetele mobiilirakendustele Ionicuga.",
    skillIonicName: "Ionic",
    skillIonicCategory: "Mobiil",
    skillIonicDescription:
      "Kasutasin Ionicut Angulari ja Capacitoriga platvormideüleste mobiilirakenduste tarnimiseks enne natiivse SwiftUI arenduse juurde üleminekut. See andis mulle tugeva aluse mobiilse UX mustrites, äpipoodides avaldamises ja veebitehnoloogiate sidumises seadme natiivsete võimalustega.",
    skillSwiftUIName: "SwiftUI",
    skillSwiftUICategory: "Mobiil",
    skillSwiftUIDescription:
      "Siia läheb praegu suurem osa minu loomingulisest energiast. Olen tarninud Spark Trackeri (MTG eluloendur iPadi toega), Travel Appi nutikate marsruutidega, Cookbook Pro Apple Watchi integratsiooniga ja MTG Card Inventory — kõik natiivne SwiftUI koos Swift Data ja .NET backendidega.",
    skillStencilJSName: "StencilJS",
    skillStencilJSCategory: "Frontend",
    skillStencilJSDescription:
      "Rivertys ehitan veebikomponente, mis toidavad ettevõtte finantstooteid. Stencil võimaldab mul luua raamistiku-agnostilisi, taaskasutatavaid UI komponente, mis tarnitakse standardsete veebikomponentidena — kasutusel mitme meeskonna ja rakenduse poolt tootmises.",
    skillMongoDBName: "MongoDB",
    skillMongoDBCategory: "Andmebaasid",
    skillMongoDBDescription:
      "Kasutasin MongoDB-d paindlikuks dokumendipõhiseks salvestuseks projektides, kus relatsioonilised skeemid oleksid üleliigsed. Tunnen end hästi agregatsioonitorustikega, indekseerimisstrateegiate ja Go või .NET backendidega sidumisega kiireks prototüüpimiseks ja tootmiskoormusteks.",
    skillSQLServerName: "SQLServer",
    skillSQLServerCategory: "Andmebaasid",
    skillSQLServerDescription:
      "Töötasin ulatuslikult SQL Serveriga mitmes ettevõttes Brasiilias, kirjutades optimeeritud päringuid, salvestatud protseduure ja hallates andmemigratsioone. See oli enamiku ettevõtteprojektide alustala minu karjääri alguses.",
    skillOracleName: "Oracle",
    skillOracleCategory: "Andmebaasid",
    skillOracleDescription:
      "Praktiline kogemus Oracle'i andmebaasidega ettevõttekeskkondades: PL/SQL automatiseerimiseks, suuremahulised andmeoperatsioonid ja integratsioon .NET backendidega pärandsüsteemide jaoks.",
    skillDockerName: "Docker",
    skillDockerCategory: "DevOps",
    skillDockerDescription:
      "Iga minu projekt on konteineriseeritud. GCLI mallidest, millega tulevad Dockerfile'id kaasa, kuni URL-i lühendajani Azure'is ja kohalike arenduskeskkondadeni — Docker on osa minu standardsest töövoost järjepidevate ja reprodutseeritavate juurutuste jaoks.",
    skillKubernetesName: "Kubernetes",
    skillKubernetesCategory: "DevOps",
    skillKubernetesDescription:
      "Töötan K8s-iga konteineriseeritud teenuste orkestreerimiseks tootmises Rivertys. Haldan podide skaleerimist, rolling-juurutusi ja service mesh konfiguratsioone finantsplatvormi mikroteenuste arhitektuuris.",
    skillBicepName: "Bicep",
    skillBicepCategory: "DevOps",
    skillBicepDescription:
      "Kasutasin Bicepit URL Shortener projekti Azure taristu defineerimiseks ja juurutamiseks — CosmosDB, App Services ja võrgustik, kõik koodina. Rivertys on see standard pilvressursside ettevalmistamiseks ja haldamiseks keskkondade vahel.",
    skillTerraformName: "Terraform",
    skillTerraformCategory: "DevOps",
    skillTerraformDescription:
      "Tuttav Terraformiga mitme pilve taristu ettevalmistamiseks ja olekuhalduseks. Kasutan koos Bicepiga olenevalt projekti pilvestrateegiast, mis annab paindlikkuse Azure'i, AWS-i ja hübriidseadistuste vahel.",
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
