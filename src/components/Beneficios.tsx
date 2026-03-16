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
    title: "Networking Profissional",
    description:
      "Construa conexões com futuros líderes de mercado. Nossos alumni estão no Itaú, McKinsey, Google, Nubank e muito mais. Uma conversa no jantar pode abrir portas para sua carreira.",
    color: "from-purple-600 to-purple-400",
    lightBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    stat: "80+ alumni",
    statLabel: "networking ativo",
  },
  {
    icon: Heart,
    title: "Amizades para a Vida",
    description:
      "As amizades que você faz em uma república são diferentes. Compartilhar o dia a dia cria laços que nenhum ambiente de trabalho consegue reproduzir. São laços para toda a vida.",
    color: "from-pink-600 to-rose-400",
    lightBg: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    stat: "97%",
    statLabel: "mantêm amizades",
  },
  {
    icon: PartyPopper,
    title: "Vida Social Vibrante",
    description:
      "Churrascos mensais, festas temáticas, viagens coletivas, noites de filme, torneios de FIFA e muito mais. A vida social na Quintal é incomparável – never a dull moment.",
    color: "from-yellow-500 to-orange-400",
    lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    stat: "4+ eventos",
    statLabel: "por mês",
  },
  {
    icon: DollarSign,
    title: "Divisão de Custos",
    description:
      "Moradia de qualidade por um custo muito mais acessível. Dividir aluguel, contas e mantimentos significa que você tem mais dinheiro para investir em experiências, cursos e lazer.",
    color: "from-green-600 to-green-400",
    lightBg: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    stat: "40%",
    statLabel: "de economia média",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Pessoal",
    description:
      "Viver com pessoas de cursos e origens diferentes expande sua visão de mundo. Aprenda a negociar, colaborar, liderar e resolver conflitos – habilidades que o mercado valoriza.",
    color: "from-blue-600 to-cyan-400",
    lightBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    stat: "3 cursos",
    statLabel: "diferentes convivendo",
  },
  {
    icon: MapPin,
    title: "Localização Privilegiada",
    description:
      "A Quintal fica a poucos minutos da UNICAMP Limeira e do centro da cidade. Acesso fácil à FCA, restaurantes, farmácias e todo o necessário para sua rotina universitária.",
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
          Mais do que um lugar para dormir – é um ambiente que acelera seu desenvolvimento
          profissional, pessoal e social durante a faculdade.
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
            Pronto para fazer parte da família?
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Vagas limitadas para o próximo semestre. Inscreva-se agora!
          </p>
          <a href="#formulario" className="btn-primary text-base px-8 py-4">
            Quero morar na Quintal! 🏡
          </a>
        </div>
      </motion.div>
    </div>
  );
}
