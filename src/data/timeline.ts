export interface TimelineEvent {
  id: number;
  year: number;
  month?: string;
  title: string;
  description: string;
  icon: string;
  type: "founding" | "milestone" | "social" | "achievement" | "expansion";
  image?: string;
  highlight?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: 2010,
    month: "Março",
    title: "A Quintal Nasce",
    description:
      "Quatro estudantes da FCA UNICAMP Limeira se reúnem em uma casa no centro da cidade e batizam a república de 'Quintal' – em homenagem ao quintal enorme que se tornaria o coração da casa.",
    icon: "🏡",
    type: "founding",
    image: "https://picsum.photos/seed/timeline1/600/400",
    highlight: true,
  },
  {
    id: 2,
    year: 2012,
    month: "Julho",
    title: "O Primeiro Churrasco Oficial",
    description:
      "Com 12 moradores e mais de 80 convidados, o primeiro churrasco oficial da Quintal vira lenda na UNICAMP Limeira. É criado o cargo de 'Churrasqueiro Chefe', cargo mais disputado da república até hoje.",
    icon: "🔥",
    type: "social",
    image: "https://picsum.photos/seed/timeline2/600/400",
  },
  {
    id: 3,
    year: 2013,
    month: "Novembro",
    title: "Primeiro Morador na Fortune 500",
    description:
      "Lucas Mendonça, morador da primeira turma, consegue estágio no Itaú Unibanco em São Paulo. Começa a tradição da Quintal de celebrar conquistas profissionais dos moradores.",
    icon: "🏆",
    type: "achievement",
    image: "https://picsum.photos/seed/timeline3/600/400",
  },
  {
    id: 4,
    year: 2015,
    month: "Junho",
    title: "Expansão: A Quintal 2.0",
    description:
      "A república muda para uma casa maior, com capacidade para 15 moradores, sala de estudos coletiva, área externa reformada e churrasqueira nova. Começa a fase dourada da Quintal.",
    icon: "🚀",
    type: "expansion",
    image: "https://picsum.photos/seed/timeline4/600/400",
    highlight: true,
  },
  {
    id: 5,
    year: 2017,
    month: "Outubro",
    title: "Viagem Internacional: Buenos Aires",
    description:
      "Pela primeira vez, a turma de moradores organiza uma viagem internacional coletiva. 10 quintalianos exploram Buenos Aires em uma semana inesquecível que virou referência para todas as turmas seguintes.",
    icon: "✈️",
    type: "social",
    image: "https://picsum.photos/seed/timeline5/600/400",
  },
  {
    id: 6,
    year: 2019,
    month: "Março",
    title: "Rede de Alumni Formalizada",
    description:
      "Com ex-moradores em mais de 8 países, a Quintal cria sua rede oficial de alumni. Grupo de WhatsApp, LinkedIn e encontros anuais passam a conectar gerações de quintalianos.",
    icon: "🌍",
    type: "milestone",
    image: "https://picsum.photos/seed/timeline6/600/400",
    highlight: true,
  },
  {
    id: 7,
    year: 2021,
    month: "Agosto",
    title: "Superando a Pandemia",
    description:
      "Após o desafio da pandemia, a Quintal renova seu processo seletivo, adota reuniões híbridas e implementa o programa de mentoria com ex-moradores para os calouros. A família fica ainda mais unida.",
    icon: "💪",
    type: "milestone",
    image: "https://picsum.photos/seed/timeline7/600/400",
  },
  {
    id: 8,
    year: 2024,
    month: "Março",
    title: "14 Anos de História",
    description:
      "A República Quintal celebra 14 anos com mais de 80 ex-moradores espalhados pelo mundo, 3 startups fundadas por quintalianos, e uma nova geração pronta para continuar o legado.",
    icon: "🎉",
    type: "achievement",
    image: "https://picsum.photos/seed/timeline8/600/400",
    highlight: true,
  },
];
