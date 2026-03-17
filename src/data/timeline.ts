export interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: 2014,
    title: "A Quintal nasce",
    description: "Um grupo de estudantes da FCA UNICAMP Limeira aluga uma casa, bota um nome e começa a escrever a história.",
    icon: "🏡",
    highlight: true,
  },
  {
    id: 2,
    year: 2016,
    title: "O primeiro churrasco lendário",
    description: "80+ convidados, fumaça nos olhos e muita história pra contar. A tradição do churrasco da Quintal estava criada.",
    icon: "🔥",
  },
  {
    id: 3,
    year: 2018,
    title: "A casa fica maior",
    description: "Mais moradores, mais quarto, mais bagunça. A Quintal cresceu — e o quintal continuou sendo o coração da casa.",
    icon: "🚀",
    highlight: true,
  },
  {
    id: 4,
    year: 2020,
    title: "A galera se espalha pelo mundo",
    description: "Ex-moradores em outros estados, outros países. A rede de quintalianos começa a virar algo de verdade.",
    icon: "🌍",
  },
  {
    id: 5,
    year: 2022,
    title: "De volta com tudo",
    description: "Pós-pandemia, a casa renova a energia. Nova turma, novas histórias, mesmo espírito de sempre.",
    icon: "💪",
    highlight: true,
  },
  {
    id: 6,
    year: 2025,
    title: "11 anos e contando",
    description: "80+ ex-moradores, incontáveis memórias e uma nova geração pronta pra escrever o próximo capítulo.",
    icon: "🎉",
    highlight: true,
  },
];
