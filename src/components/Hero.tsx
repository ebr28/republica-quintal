"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-gray-950 flex flex-col lg:flex-row">

      {/* LEFT — text content */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-24 lg:py-0 lg:w-1/2 z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6"
        >
          UNICAMP Limeira · Desde 2014
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight"
        >
          República{" "}
          <span style={{ color: "#6C13AB" }}>Quintal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl text-gray-400 font-light mb-3"
        >
          Mais que uma república, uma família.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-gray-500 text-sm max-w-sm mb-10"
        >
          Um lar que forma caráter, cria memórias e vira família pra vida toda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 mb-14"
        >
          <button
            onClick={() => scrollToSection("formulario")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-opacity duration-200 hover:opacity-90"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-10"
        >
          {[
            { value: "80+", label: "Ex-moradores" },
            { value: "11", label: "Anos" },
            { value: "8", label: "Países" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — full photo */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="lg:w-1/2 relative flex items-center justify-center p-6 lg:p-10"
      >
        <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/hero-main.jpg"
            alt="República Quintal - Galera reunida"
            width={900}
            height={1100}
            className="w-full h-auto"
            priority
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection("historia")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors"
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
