"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

      {/* Single subtle purple glow — top left */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#6C13AB" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest uppercase text-gray-500 mb-8"
        >
          UNICAMP Limeira · Desde 2014
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          República{" "}
          <span style={{ color: "#6C13AB" }}>Quintal</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl sm:text-2xl text-gray-400 mb-4 font-light"
        >
          Mais que uma república, uma família.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-gray-500 text-base max-w-xl mx-auto mb-12"
        >
          11 anos formando profissionais e construindo amizades em Limeira.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-20"
        >
          <button
            onClick={() => scrollToSection("formulario")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:opacity-90"
            style={{ background: "#6C13AB" }}
          >
            Quero morar na Quintal
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("historia")}
            className="px-6 py-3 rounded-lg font-semibold text-sm text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
          >
            Conheça a história
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-12"
        >
          {[
            { value: "80+", label: "Ex-moradores" },
            { value: "11", label: "Anos" },
            { value: "8", label: "Países" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => scrollToSection("historia")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
