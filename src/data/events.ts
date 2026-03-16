export type EventType = "social" | "cultural" | "academico" | "esportivo" | "viagem" | "aniversario";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: EventType;
  location: string;
  isOpen: boolean;
  capacity?: number;
  enrolled?: number;
  image?: string;
}

export const eventTypeConfig: Record<EventType, { label: string; color: string; bgColor: string }> = {
  social: {
    label: "Social",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  cultural: {
    label: "Cultural",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  academico: {
    label: "Acadêmico",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  esportivo: {
    label: "Esportivo",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  viagem: {
    label: "Viagem",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
  },
  aniversario: {
    label: "Aniversário",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
  },
};

export const events: Event[] = [
  {
    id: 1,
    title: "Processo Seletivo 2024.2",
    description:
      "Abertura das inscrições para novos moradores. Vagas limitadas para o segundo semestre. Preencha o formulário no site e aguarde o contato.",
    date: "2024-07-15",
    time: "10:00",
    type: "academico",
    location: "Online + República Quintal",
    isOpen: true,
    capacity: 4,
    enrolled: 2,
  },
  {
    id: 2,
    title: "Churrasco Mensal – Julho",
    description:
      "O tradicional churrascão da Quintal com direito a picanha, costela, frango marinado e muito mais. Convidados são bem-vindos!",
    date: "2024-07-20",
    time: "13:00",
    type: "social",
    location: "Quintal da República",
    isOpen: true,
    capacity: 60,
    enrolled: 38,
    image: "https://picsum.photos/seed/event1/600/400",
  },
  {
    id: 3,
    title: "Workshop: Como Entrar no Mercado Financeiro",
    description:
      "Alumni da Quintal que trabalham no setor financeiro compartilham dicas e experiências. Networking garantido após o evento.",
    date: "2024-07-25",
    time: "19:00",
    type: "academico",
    location: "Sala de Estudos – Quintal",
    isOpen: true,
    capacity: 20,
    enrolled: 15,
  },
  {
    id: 4,
    title: "Aniversário da Camila",
    description:
      "Celebrando os 22 anos da nossa Camila! Festa temática anos 90 com muita nostalgia, salgados e o bolo mais caprichado do ano.",
    date: "2024-08-03",
    time: "20:00",
    type: "aniversario",
    location: "República Quintal",
    isOpen: false,
    image: "https://picsum.photos/seed/event2/600/400",
  },
  {
    id: 5,
    title: "Torneio de Futevôlei",
    description:
      "Campeonato interno de futevôlei com premiação para os campeões. Duplas já estão se formando, não fique de fora!",
    date: "2024-08-10",
    time: "09:00",
    type: "esportivo",
    location: "Quadra Municipal de Limeira",
    isOpen: true,
    capacity: 16,
    enrolled: 12,
  },
  {
    id: 6,
    title: "Noite de Cinema – Ciclo Sci-Fi",
    description:
      "Sessão especial de filmes de ficção científica no quintal com telão, pipoca e debate pós-filme. Desta vez: Interstellar.",
    date: "2024-08-17",
    time: "20:00",
    type: "cultural",
    location: "Quintal da República",
    isOpen: true,
    capacity: 30,
    enrolled: 22,
  },
  {
    id: 7,
    title: "Viagem: Bonito/MS",
    description:
      "Fim de semana em Bonito! Mergulho nas águas cristalinas, trilhas ecológicas e muito contato com a natureza. Vagas quase esgotadas!",
    date: "2024-08-23",
    time: "06:00",
    type: "viagem",
    location: "Bonito, Mato Grosso do Sul",
    isOpen: true,
    capacity: 10,
    enrolled: 8,
    image: "https://picsum.photos/seed/event3/600/400",
  },
  {
    id: 8,
    title: "Jantar de Boas-Vindas – Calouros",
    description:
      "Recepção especial para os novos moradores do segundo semestre. Jantar preparado pelos veteranos, apresentações e muita integração.",
    date: "2024-08-05",
    time: "19:30",
    type: "social",
    location: "República Quintal",
    isOpen: false,
  },
  {
    id: 9,
    title: "Reunião de Alumni – São Paulo",
    description:
      "Encontro anual dos ex-moradores em São Paulo. Drinks, networking e muita saudade boa. Open para todos os alumni da Quintal.",
    date: "2024-09-07",
    time: "18:00",
    type: "social",
    location: "Vila Madalena, São Paulo – SP",
    isOpen: true,
    capacity: 80,
    enrolled: 43,
    image: "https://picsum.photos/seed/event4/600/400",
  },
  {
    id: 10,
    title: "Hackatona Interna: Startup Weekend",
    description:
      "48 horas para desenvolver uma ideia de negócio do zero. Times mistos, mentoria de alumni empreendedores e pitching final.",
    date: "2024-09-20",
    time: "18:00",
    type: "academico",
    location: "República Quintal + Online",
    isOpen: true,
    capacity: 15,
    enrolled: 9,
  },
];
