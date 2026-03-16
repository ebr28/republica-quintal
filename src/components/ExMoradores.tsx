"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Briefcase, GraduationCap, Calendar, Instagram, ExternalLink } from "lucide-react";
import { alumni } from "@/data/alumni";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

function AlumniCard({ person, index }: { person: (typeof alumni)[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
      className="relative h-72 cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-card group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Country flag area */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium text-white flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {person.country}
            </div>

            {/* Years */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white">
              <Calendar className="w-3 h-3" />
              {person.yearIn} – {person.yearOut}
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{person.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              {person.course}
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1 font-medium">
              <Briefcase className="w-3 h-3" />
              {person.job} · {person.company}
            </p>
          </div>

          {/* Hover hint */}
          <div className="absolute bottom-2 right-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Clique para detalhes
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #6C13AB 0%, #0DD621 100%)",
          }}
        >
          <div>
            <h3 className="font-black text-white text-lg mb-1">{person.name}</h3>
            <div className="flex items-center gap-1 text-green-200 text-xs mb-4">
              <MapPin className="w-3 h-3" />
              {person.city}, {person.state} – {person.country}
            </div>
            <p className="text-white/90 text-xs leading-relaxed italic">&ldquo;{person.bio}&rdquo;</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <GraduationCap className="w-4 h-4" />
              {person.course} ({person.yearIn}–{person.yearOut})
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Briefcase className="w-4 h-4" />
              {person.job} @ {person.company}
            </div>
            {person.instagram && (
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Instagram className="w-4 h-4" />
                {person.instagram}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExMoradores() {
  const [filter, setFilter] = useState<"all" | string>("all");

  const courses = [...new Set(alumni.map((a) => a.course))];

  const filteredAlumni =
    filter === "all" ? alumni : alumni.filter((a) => a.course === filter);

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
        <h2 className="section-title gradient-text">Ex-Moradores</h2>
        <p className="section-subtitle">
          A família Quintal que saiu para conquistar o mundo. Cada história é única, mas todas
          começaram no mesmo quintal.
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        <button
          onClick={() => setFilter("all")}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            filter === "all"
              ? "text-white"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400"
          )}
          style={filter === "all" ? { background: "linear-gradient(135deg, #6C13AB, #0DD621)" } : {}}
        >
          Todos
        </button>
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => setFilter(course)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              filter === course
                ? "text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400"
            )}
            style={filter === course ? { background: "linear-gradient(135deg, #6C13AB, #0DD621)" } : {}}
          >
            {course}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filteredAlumni.map((person, index) => (
            <AlumniCard key={person.id} person={person} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          E você? Quer fazer parte dessa história?
        </p>
        <a href="#formulario" className="btn-primary">
          Candidatar-se agora
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
