"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Star, Users, MapPin } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5 ? "#6C13AB" : "#0DD621",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f0020 0%, #1a0035 25%, #001a00 75%, #0f0020 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(108,19,171,0.6) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(13,214,33,0.4) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(108,19,171,0.4) 0%, transparent 70%)" }}
      />

      {/* Particles */}
      {mounted && <FloatingParticles />}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#0DD621",
          }}
        >
          <MapPin className="w-4 h-4" />
          UNICAMP Limeira – FCA
          <Star className="w-4 h-4 fill-current" />
          <span className="text-white">Desde 2010</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
        >
          República{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6C13AB, #0DD621)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Quintal
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-300">
            UNICAMP Limeira
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
        >
          Mais que uma república,{" "}
          <span className="font-semibold" style={{ color: "#0DD621" }}>
            uma família.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-12"
        >
          14 anos formando profissionais, construindo amizades e criando histórias inesquecíveis
          em Limeira. Venha fazer parte desta comunidade incrível.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => scrollToSection("formulario")}
            className="group relative px-8 py-4 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #6C13AB, #0DD621)",
              boxShadow: "0 0 30px rgba(108,19,171,0.5)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Quero morar na Quintal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => scrollToSection("historia")}
            className="px-8 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105"
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            Conheça a história
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "80+", label: "Ex-moradores" },
            { value: "14", label: "Anos de história" },
            { value: "8", label: "Países com alumni" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute left-4 sm:left-8 top-1/3 hidden md:flex flex-col gap-3"
      >
        {[
          { icon: "🏆", text: "Top República" },
          { icon: "🤝", text: "Networking" },
          { icon: "🎉", text: "Vida Social" },
        ].map((badge, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            <span>{badge.icon}</span>
            <span>{badge.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute right-4 sm:right-8 top-1/3 hidden md:flex flex-col gap-3"
      >
        {[
          { icon: Users, text: "15 moradores" },
        ].map((item, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
            style={{
              background: "rgba(108,19,171,0.3)",
              border: "1px solid rgba(108,19,171,0.5)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => scrollToSection("historia")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
