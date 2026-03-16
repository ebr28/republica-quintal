"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { events, eventTypeConfig, type EventType } from "@/data/events";
import clsx from "clsx";

function EventCard({ event, index }: { event: (typeof events)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const config = eventTypeConfig[event.type];

  const date = new Date(event.date + "T00:00:00");
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("pt-BR", { month: "short" }).toUpperCase().replace(".", "");
  const weekday = date.toLocaleString("pt-BR", { weekday: "short" }).replace(".", "");

  const progressPct =
    event.capacity && event.enrolled
      ? Math.min((event.enrolled / event.capacity) * 100, 100)
      : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex"
    >
      {/* Date badge */}
      <div
        className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-4 relative"
        style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
      >
        <span className="text-white/80 text-xs font-medium uppercase">{weekday}</span>
        <span className="text-white font-black text-3xl leading-none">{day}</span>
        <span className="text-white/80 text-xs font-medium uppercase">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={clsx(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
              config.bgColor,
              config.color
            )}
          >
            {config.label}
          </span>
          {!event.isOpen && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              Fechado
            </span>
          )}
          {event.isOpen && event.capacity && event.enrolled && event.enrolled >= event.capacity && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              Esgotado
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base leading-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.capacity && event.enrolled !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{event.enrolled}/{event.capacity} inscritos</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {progressPct !== null && (
          <div className="mt-3">
            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={inView ? { width: `${progressPct}%` } : {}}
                transition={{ duration: 0.8, delay: 0.3 + (index % 5) * 0.08 }}
                className="h-full rounded-full"
                style={{
                  background:
                    progressPct >= 90
                      ? "#ef4444"
                      : progressPct >= 70
                      ? "#f59e0b"
                      : "linear-gradient(90deg, #6C13AB, #0DD621)",
                }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {progressPct >= 90 ? "🔥 Quase esgotado!" : `${Math.round(progressPct)}% preenchido`}
            </div>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      </div>
    </motion.div>
  );
}

const filterTypes: { value: EventType | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "social", label: "Social" },
  { value: "academico", label: "Acadêmico" },
  { value: "cultural", label: "Cultural" },
  { value: "esportivo", label: "Esportivo" },
  { value: "viagem", label: "Viagem" },
  { value: "aniversario", label: "Aniversário" },
];

export default function Agenda() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="section-title gradient-text">Agenda de Eventos</h2>
        <p className="section-subtitle">
          Nunca falta programa na Quintal. Confira os próximos eventos e marque seu calendário!
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {filterTypes.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              filter === f.value
                ? "text-white scale-105"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400"
            )}
            style={
              filter === f.value
                ? { background: "linear-gradient(135deg, #6C13AB, #0DD621)" }
                : {}
            }
          >
            {filter === f.value && f.value !== "all" && eventTypeConfig[f.value as EventType] ? "" : ""}
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Calendar className="w-4 h-4" />
          <span>Quer participar? </span>
          <a
            href="#formulario"
            className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            Candidate-se para morar na Quintal
          </a>
        </div>
      </motion.div>
    </div>
  );
}
