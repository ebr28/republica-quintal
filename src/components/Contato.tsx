"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Instagram, MessageCircle, Clock, ExternalLink } from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@republicaquintal.com.br",
    href: "mailto:contato@republicaquintal.com.br",
    description: "Respondemos em até 24h úteis",
    color: "from-purple-600 to-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+55 (19) 99999-9999",
    href: "https://wa.me/5519999999999?text=Olá!%20Tenho%20interesse%20em%20morar%20na%20República%20Quintal.",
    description: "Resposta imediata • Seg–Sex 9h–22h",
    color: "from-green-600 to-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    isExternal: true,
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@republicaquintal",
    href: "https://instagram.com/republicaquintal",
    description: "DMs abertas! Nos siga para acompanhar o dia a dia",
    color: "from-pink-600 to-orange-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    isExternal: true,
  },
];

export default function Contato() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mapRef, mapInView] = useInView({ triggerOnce: true });

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title gradient-text">Entre em Contato</h2>
        <p className="section-subtitle">
          Tem dúvidas? Quer visitar a república? Bata um papo com a gente!
          Somos bem responder rápido.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {contactCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.isExternal ? "_blank" : undefined}
              rel={card.isExternal ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${card.bg} transition-all duration-300 group-hover:scale-110`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 flex items-center gap-2">
                {card.title}
                {card.isExternal && <ExternalLink className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </h3>

              <p
                className={`font-semibold text-sm mb-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
              >
                {card.value}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>

              {/* Hover line */}
              <div
                className={`mt-4 h-0.5 bg-gradient-to-r ${card.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full`}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Address + Hours */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Address card */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, x: -30 }}
          animate={mapInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-card"
        >
          {/* Map embed placeholder */}
          <div
            className="w-full h-48 flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a0428 0%, #0a1a0a 100%)" }}
          >
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                {[50,100,150,250,300,350].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
                ))}
                {[50,150].map(y => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
                ))}
                {/* Simple road shapes */}
                <path d="M 0,80 L 400,80" stroke="rgba(255,255,255,0.15)" strokeWidth="6"/>
                <path d="M 0,120 L 400,120" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
                <path d="M 150,0 L 150,200" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
                <path d="M 260,0 L 260,200" stroke="rgba(255,255,255,0.15)" strokeWidth="6"/>
              </svg>
            </div>
            {/* Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}>
                  🏡
                </div>
              </motion.div>
              <div className="mt-2 px-3 py-1 rounded-full bg-white text-gray-900 text-xs font-bold shadow-lg">
                República Quintal
              </div>
            </div>
            <div className="absolute inset-0 flex items-end justify-end p-3">
              <a
                href="https://maps.google.com/?q=UNICAMP+Limeira+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors"
              >
                Abrir no Maps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Address info */}
          <div className="p-5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Endereço</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rua das Repúblicas, 123 · Jardim Universitário<br />
                  Limeira – SP · CEP 13480-000
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  A 5 min da UNICAMP Limeira (FCA) a pé
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hours and info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={mapInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Hours */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-gray-900 dark:text-white">Horário de Visitas</h3>
            </div>
            <div className="space-y-2">
              {[
                { day: "Segunda – Sexta", time: "18h – 21h" },
                { day: "Sábados", time: "10h – 20h" },
                { day: "Domingos", time: "14h – 19h" },
              ].map((h) => (
                <div key={h.day} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{h.day}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{h.time}</span>
                </div>
              ))}
              <p className="text-xs text-gray-400 mt-3">
                * Agende com antecedência via WhatsApp
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Links Úteis</h3>
            <div className="space-y-2">
              {[
                { label: "UNICAMP Limeira – FCA", href: "https://www.fca.unicamp.br" },
                { label: "DAE – UNICAMP", href: "https://www.dae.unicamp.br" },
                { label: "Moradia Universitária UNICAMP", href: "https://www.moradia.unicamp.br" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/5519999999999?text=Olá!%20Tenho%20interesse%20em%20morar%20na%20República%20Quintal%20da%20UNICAMP%20Limeira."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base shadow-xl"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp agora
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
