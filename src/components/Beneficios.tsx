"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Network,
  Heart,
  PartyPopper,
  DollarSign,
  TrendingUp,
  MapPin,
} from "lucide-react";

const benefits = [
  {
    icon: Network,
    title: "Seu network mora com você",
    description:
      "A galera que você vai jantar hoje pode abrir uma porta amanhã. Aqui você não vai a um evento de networking — você vive com ele. São 80+ ex-moradores espalhados pelo mercado e prontos pra te ajudar.",
    color: "from-purple-600 to-purple-400",
    lightBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    stat: "80+",
    statLabel: "ex-moradores conectados",
  },
  {
    icon: Heart,
    title: "Amizades de verdade",
    description:
      "Não é aquela amizade de sala de aula. Quando você mora junto, divide as contas, os perrengues e as melhores noites da vida — os laços que ficam são pra sempre.",
    color: "from-pink-600 to-rose-400",
    lightBg: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    stat: "97%",
    statLabel: "mantêm contato pós-faculdade",
  },
  {
    icon: PartyPopper,
    title: "Sempre tem algo rolando",
    description:
      "Churrasco, festa temática, viagem de fim de semana, noite de jogo, FIFA no sofá. A Quintal nunca para — e você vai lembrar de tudo isso daqui a 10 anos com um sorriso na cara.",
    color: "from-yellow-500 to-orange-400",
    lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    stat: "4+",
    statLabel: "eventos por mês",
  },
  {
    icon: DollarSign,
    title: "Seu bolso agradece",
    description:
      "Dividir aluguel, luz, água e mercado com a galera faz uma diferença enorme. Você mora bem, gasta menos e ainda sobra pra curtir a vida universitária como ela merece.",
    color: "from-green-600 to-green-400",
    lightBg: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    stat: "~40%",
    statLabel: "de economia na moradia",
  },
  {
    icon: TrendingUp,
    title: "Você cresce sem perceber",
    description:
      "Conviver com pessoas de cursos e origens diferentes te abre a cabeça de um jeito que nenhuma aula consegue. Você aprende a se virar, a ceder, a liderar — e sai daqui uma versão melhor.",
    color: "from-blue-600 to-cyan-400",
    lightBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    stat: "3+",
    statLabel: "cursos diferentes na casa",
  },
  {
    icon: MapPin,
    title: "Pertinho de tudo",
    description:
      "A Quintal fica a poucos minutos da UNICAMP Limeira. Chega fácil na FCA, no bandejão, nos bares da cidade. Menos tempo no trânsito, mais tempo curtindo.",
    color: "from-teal-600 to-teal-400",
    lightBg: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    stat: "5 min",
    statLabel: "da UNICAMP",
  },
];

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.12,
        ease: "easeOut",
      }}
      className={`group relative rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-default overflow-hidden`}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${benefit.color}`}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${benefit.lightBg} transition-all duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-7 h-7 ${benefit.iconColor}`} />
      </div>

      {/* Stat badge */}
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className={`text-2xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}
        >
          {benefit.stat}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{benefit.statLabel}</span>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-green-500 transition-all duration-300">
        {benefit.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {benefit.description}
      </p>

      {/* Bottom gradient line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.div>
  );
}

export default function Beneficios() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="section-title gradient-text">Por que morar na Quintal?</h2>
        <p className="section-subtitle">
          Mais do que dividir aluguel — é acordar todo dia cercado de gente boa,
          crescer junto e sair daqui com amigos de verdade e conexões que valem ouro.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-16"
      >
        <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 border border-purple-200 dark:border-purple-800">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Faz parte do seu time?
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            As vagas são poucas e a galera é selecionada. Manda sua candidatura e a gente bate um papo.
          </p>
          <a href="#formulario" className="btn-primary text-base px-8 py-4">
            Quero fazer parte
          </a>
        </div>
      </motion.div>
    </div>
  );
}
