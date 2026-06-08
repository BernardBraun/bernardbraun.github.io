export const locales = ["pt-BR", "en-US"] as const;
export type Locale = (typeof locales)[number];

export type TranslationTree = {
  metaTitle: string;
  headerName: string;
  nav: {
    home: string;
    experiences: string;
    projects: string;
    contact: string;
  };
  bio: {
    greeting: string;
    paragraphs: string[];
  };
  experiences: { pageTitle: string; contentNote?: string };
  projects: { pageTitle: string; techLabel: string };
  contact: {
    modalTitle: string;
    modalLead: string;
    email: string;
    phone: string;
    copyEmail: string;
    copyPhone: string;
    copied: string;
    close: string;
  };
};

export const translations: Record<Locale, TranslationTree> = {
  "pt-BR": {
    metaTitle: "Bernard Braun — Desenvolvedor Frontend",
    headerName: "Bernard Braun da Silva — Desenvolvedor Frontend",
    nav: {
      home: "Sobre",
      experiences: "Experiências",
      projects: "Projetos",
      contact: "Contato",
    },
    bio: {
      greeting: "Olá! Que bom te ver por aqui!",
      paragraphs: [
        "Me chamo Bernard, tenho {{age}} anos.",
        "Atualmente atuo como desenvolvedor front-end na Wipro no ecossistema HP (programa myHP), com React e TypeScript. Somando Grupo Villela, Philips e Wipro, totalizo {{yearsTotalDev}} anos em desenvolvimento de software; destes, {{yearsFrontend}} anos com foco em frontend em produto global, além de integração e stack com Java, C# e Angular.",
        "Tenho também cerca de {{yearsInfraTI}} anos de experiência em TI com ênfase em infraestrutura e operações — suporte a usuários, servidores Windows, redes e ambientes corporativos — antes de concentrar a carreira em desenvolvimento.",
        "Iniciei na área de TI como um hobby quando tinha 14 anos, ajudando os amigos a montar os PCs nas lan houses (quando a turma se reunia para jogar em rede), mas decidi tornar isso profissional em 2013, quando iniciei meu técnico em informática.",
        "Após concluir o técnico e percorrer uma longa jornada, iniciei minha graduação em Gestão da Tecnologia da Informação em 2016 e finalizei em 2018.",
        "Em 2020, com a pandemia, estava desempregado e com minha esposa grávida, e decidi iniciar minha transição de carreira para desenvolvimento — com muito incentivo dela e também querendo dar um futuro melhor para o nosso pequeno.",
        "Depois de muitos estudos, possuo especializações em C#, Java, HTML, CSS, JavaScript, TypeScript, ES6, Bootstrap, frameworks React (JS e Native), versionamento com Git e GitHub, e conhecimento em PostgreSQL e Microsoft SQL Server.",
        "Também tenho bases sólidas nas principais ferramentas de editoração gráfica: Adobe Illustrator, Photoshop, Lightroom e CorelDRAW.",
        "Possuo certificação em Scrum, nível Fundamentals.",
        "Te convido a visitar minhas redes, explorar minhas experiências e projetos e entrar em contato.",
      ],
    },
    experiences: {
      pageTitle: "Resumo profissional",
    },
    projects: {
      pageTitle: "Alguns projetos",
      techLabel: "Tecnologias utilizadas",
    },
    contact: {
      modalTitle: "Contato",
      modalLead: "Fique à vontade para copiar e-mail ou telefone.",
      email: "bernard.sbraun@gmail.com",
      phone: "+55 51 99369-0479",
      copyEmail: "Copiar e-mail",
      copyPhone: "Copiar telefone",
      copied: "Copiado!",
      close: "Fechar",
    },
  },
  "en-US": {
    metaTitle: "Bernard Braun — Frontend Developer",
    headerName: "Bernard Braun da Silva — Frontend Developer",
    nav: {
      home: "About",
      experiences: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    bio: {
      greeting: "Hi! Glad you stopped by.",
      paragraphs: [
        "My name is Bernard and I am {{age}} years old.",
        "I currently work as a front-end developer at Wipro on the HP ecosystem (myHP), using React and TypeScript. Across Grupo Villela, Philips, and Wipro, that adds up to {{yearsTotalDev}} years building software, including {{yearsFrontend}} years focused on global front-end delivery, plus integration work with Java, C#, and Angular.",
        "I also have roughly {{yearsInfraTI}} years in IT with an infrastructure and operations focus—user support, Windows servers, networking, and corporate environments—before shifting fully into development.",
        "I got into IT as a hobby at age 14, helping friends build PCs for LAN parties, but I decided to go professional in 2013 when I started my computer technician program.",
        "After finishing the technician course and a long journey, I began my bachelor’s in IT Management in 2016 and completed it in 2018.",
        "In 2020, during the pandemic, I was unemployed and my wife was pregnant. I decided to pivot into software development—with her strong support and the goal of building a better future for our child.",
        "After intensive study, I have solid skills in C#, Java, HTML, CSS, JavaScript, TypeScript, ES6, Bootstrap, React (web and React Native), Git and GitHub, plus PostgreSQL and Microsoft SQL Server.",
        "I also have a strong foundation in graphic tools such as Adobe Illustrator, Photoshop, Lightroom, and CorelDRAW.",
        "I hold a Scrum Fundamentals certification.",
        "Feel free to visit my social profiles, explore my experience and projects, and reach out.",
      ],
    },
    experiences: {
      pageTitle: "Professional summary",
    },
    projects: {
      pageTitle: "Selected projects",
      techLabel: "Tech stack",
    },
    contact: {
      modalTitle: "Contact",
      modalLead: "You can copy my email or phone below.",
      email: "bernard.sbraun@gmail.com",
      phone: "+55 51 99369-0479",
      copyEmail: "Copy email",
      copyPhone: "Copy phone",
      copied: "Copied!",
      close: "Close",
    },
  },
};
