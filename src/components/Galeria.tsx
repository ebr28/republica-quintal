"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Heart, MessageCircle, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, type GalleryCategory } from "@/data/gallery";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

const categories: { value: GalleryCategory; label: string; emoji: string }[] = [
  { value: "todos", label: "Todos", emoji: "📸" },
  { value: "festas", label: "Festas", emoji: "🎉" },
  { value: "churrascos", label: "Churrascos", emoji: "🔥" },
  { value: "viagens", label: "Viagens", emoji: "✈️" },
  { value: "aniversarios", label: "Aniversários", emoji: "🎂" },
];

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
      className="masonry-item group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative" style={{ aspectRatio: `${item.width}/${item.height}` }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-gray-300 text-xs line-clamp-2 mb-3">{item.description}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="flex items-center gap-1 text-white text-xs"
              >
                <Heart
                  className={clsx("w-4 h-4", liked ? "fill-red-500 text-red-500" : "")}
                />
                <span>{liked ? item.likes + 1 : item.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-white text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>{Math.floor(item.likes / 5)}</span>
              </div>
              <span className="text-gray-300 text-xs ml-auto">{item.year}</span>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
          {categories.find((c) => c.value === item.category)?.emoji}{" "}
          {categories.find((c) => c.value === item.category)?.label}
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof galleryItems;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl max-h-[80vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full" style={{ maxHeight: "75vh" }}>
          <Image
            src={item.image}
            alt={item.title}
            width={item.width}
            height={item.height}
            className="object-contain w-full max-h-[70vh] rounded-2xl"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-white font-bold text-lg">{item.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{item.description}</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {item.likes}
            </span>
            <span>{item.year}</span>
            <span>{currentIndex + 1} / {items.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Galeria() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
  }, [filteredItems.length]);

  const nextItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
  }, [filteredItems.length]);

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
        <h2 className="section-title gradient-text">Galeria da Quintal</h2>
        <p className="section-subtitle">
          Momentos que contam nossa história. Festas épicas, viagens memoráveis e um quintal
          cheio de alegria.
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={clsx(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300",
              activeCategory === cat.value
                ? "text-white shadow-glow-purple scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400"
            )}
            style={
              activeCategory === cat.value
                ? { background: "linear-gradient(135deg, #6C13AB, #0DD621)" }
                : {}
            }
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Gallery grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="masonry-grid"
        >
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
