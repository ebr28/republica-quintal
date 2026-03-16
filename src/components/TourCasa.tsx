"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import clsx from "clsx";

const rooms = [
  {
    id: 1,
    label: "Fachada",
    chip: "exterior",
    description: "A entrada da Quintal com o quintal espaçoso que deu nome à república.",
    image: "https://picsum.photos/seed/casa1/1200/700",
    chipColor: "bg-green-500",
  },
  {
    id: 2,
    label: "Quartos",
    chip: "quartos",
    description: "Quartos individuais e duplos, todos mobiliados e bem ventilados.",
    image: "https://picsum.photos/seed/casa2/1200/700",
    chipColor: "bg-purple-600",
  },
  {
    id: 3,
    label: "Sala de Estar",
    chip: "sala",
    description: "A sala espaçosa onde rolam as melhores conversas e sessões de filme.",
    image: "https://picsum.photos/seed/casa3/1200/700",
    chipColor: "bg-blue-500",
  },
  {
    id: 4,
    label: "Cozinha",
    chip: "cozinha",
    description: "Cozinha completa e equipada. Aqui nasce a culinária coletiva da Quintal.",
    image: "https://picsum.photos/seed/casa4/1200/700",
    chipColor: "bg-orange-500",
  },
  {
    id: 5,
    label: "Área Externa",
    chip: "área externa",
    description: "O famoso quintal com churrasqueira, área de lazer e muito verde.",
    image: "https://picsum.photos/seed/casa5/1200/700",
    chipColor: "bg-green-500",
  },
  {
    id: 6,
    label: "Sala de Estudos",
    chip: "estudos",
    description: "Ambiente calmo e equipado para focar nos estudos e projetos.",
    image: "https://picsum.photos/seed/casa6/1200/700",
    chipColor: "bg-yellow-500",
  },
  {
    id: 7,
    label: "Banheiros",
    chip: "banheiros",
    description: "Banheiros modernos e limpos para garantir conforto no dia a dia.",
    image: "https://picsum.photos/seed/casa7/1200/700",
    chipColor: "bg-teal-500",
  },
];

const chipColors: Record<string, string> = {
  quartos: "bg-purple-600 text-white",
  sala: "bg-blue-500 text-white",
  cozinha: "bg-orange-500 text-white",
  "área externa": "bg-green-500 text-white",
  exterior: "bg-green-600 text-white",
  estudos: "bg-yellow-500 text-white",
  banheiros: "bg-teal-500 text-white",
};

export default function TourCasa() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + rooms.length) % rooms.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % rooms.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const current = rooms[currentIndex];

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="section-title gradient-text">Tour pela Casa</h2>
        <p className="section-subtitle">
          Conheça cada cantinho da Quintal. Uma casa feita para criar memórias e proporcionar
          o melhor ambiente universitário.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Main carousel */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
          <div className="relative aspect-video">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.label}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Room chip */}
            <div className="absolute top-5 left-5">
              <motion.span
                key={current.chip}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider",
                  chipColors[current.chip] ?? "bg-gray-700 text-white"
                )}
              >
                {current.chip}
              </motion.span>
            </div>

            {/* Controls */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Prev/Next */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Info bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-bold text-xl mb-1">{current.label}</h3>
                  <p className="text-gray-300 text-sm">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : `${((currentIndex + 1) / rooms.length) * 100}%` }}
                transition={{ duration: isPlaying ? 4 : 0.3, ease: "linear" }}
                className="h-full"
                style={{ background: "linear-gradient(90deg, #6C13AB, #0DD621)" }}
              />
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 justify-center flex-wrap">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={clsx(
                "relative w-20 h-14 rounded-xl overflow-hidden transition-all duration-200 flex-shrink-0",
                currentIndex === i
                  ? "ring-2 ring-purple-600 ring-offset-2 dark:ring-offset-gray-950 scale-105"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={room.image}
                alt={room.label}
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                <span className="text-white text-xs font-medium leading-tight line-clamp-1">
                  {room.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {rooms.length} · {current.label}
        </div>
      </div>
    </div>
  );
}
