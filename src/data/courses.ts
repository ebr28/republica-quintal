export interface CourseData {
  id: number;
  name: string;
  shortName: string;
  count: number;
  percentage: number;
  color: string;
  alumni: number;
}

export const coursesData: CourseData[] = [
  {
    id: 1,
    name: "Administração",
    shortName: "ADM",
    count: 32,
    percentage: 40,
    color: "#6C13AB",
    alumni: 28,
  },
  {
    id: 2,
    name: "Ciências Econômicas",
    shortName: "ECO",
    count: 24,
    percentage: 30,
    color: "#0DD621",
    alumni: 22,
  },
  {
    id: 3,
    name: "Tecnologia da Informação",
    shortName: "TI",
    count: 16,
    percentage: 20,
    color: "#3b82f6",
    alumni: 14,
  },
  {
    id: 4,
    name: "Engenharia de Produção",
    shortName: "ENG",
    count: 8,
    percentage: 10,
    color: "#f59e0b",
    alumni: 7,
  },
];

export const statsData = [
  { label: "Moradores Totais", value: "80+", icon: "👥" },
  { label: "Anos de História", value: "14", icon: "📅" },
  { label: "Países com Alumni", value: "8", icon: "🌍" },
  { label: "Startups Fundadas", value: "3", icon: "🚀" },
  { label: "Taxa de Empregabilidade", value: "97%", icon: "💼" },
  { label: "Satisfação dos Moradores", value: "4.9★", icon: "⭐" },
];
