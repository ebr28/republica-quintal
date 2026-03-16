"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineEvents } from "@/data/timeline";
import Image from "next/image";
import clsx from "clsx";

const typeColors = {
  founding: "from-purple-600 to-purple-400",
  milestone: "from-green-500 to-green-300",
  social: "from-blue-500 to-blue-300",
  achievement: "from-yellow-500 to-yellow-300",
  expansion: "from-pink-500 to-pink-300",
};

const typeBgColors = {
  founding: "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
  milestone: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800",
  social: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
  achievement: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
  expansion: "bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800",
};

function TimelineCard({ event, index }: { event: (typeof timelineEvents)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex items-center gap-4 sm:gap-8",
        isEven ? "flex-row" : "flex-row-reverse sm:flex-row"
      )}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className={clsx(
          "flex-1 max-w-md",
          isEven ? "sm:text-right sm:ml-auto sm:mr-0" : "sm:text-left"
        )}
      >
        <div
          className={clsx(
            "group rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer",
            typeBgColors[event.type],
            "bg-white dark:bg-gray-800",
            "border-gray-200 dark:border-gray-700"
          )}
        >
          {/* Image */}
          {event.image && (
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Header */}
          <div className={clsx("flex items-center gap-3 mb-3", isEven ? "sm:flex-row-reverse" : "")}>
            <span className="text-2xl">{event.icon}</span>
            <div className={isEven ? "sm:text-right" : ""}>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {event.month} {event.year}
              </span>
              {event.highlight && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-green-500 text-white">
                  Destaque
                </span>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="relative z-10 flex-shrink-0"
      >
        <div
          className={clsx(
            "w-14 h-14 rounded-full flex items-center justify-center text-xl font-black text-white shadow-lg",
            `bg-gradient-to-br ${typeColors[event.type]}`
          )}
        >
          {event.icon}
        </div>
        {/* Year bubble */}
        <div
          className={clsx(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full",
            "bg-gray-900 dark:bg-white text-white dark:text-gray-900",
            "text-xs font-bold whitespace-nowrap shadow-lg"
          )}
        >
          {event.year}
        </div>
      </motion.div>

      {/* Spacer for even layout */}
      <div className="flex-1 max-w-md hidden sm:block" />
    </div>
  );
}

export default function Historia() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="section-title gradient-text">Nossa História</h2>
        <p className="section-subtitle">
          14 anos de memórias, conquistas e amizades que definiram gerações de universitários
          em Limeira.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden sm:block">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, #6C13AB, #0DD621)",
            }}
          />
        </div>

        {/* Mobile line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 sm:hidden">
          <div
            className="w-full h-full"
            style={{ background: "linear-gradient(to bottom, #6C13AB, #0DD621)" }}
          />
        </div>

        <div className="space-y-16 sm:space-y-20">
          {timelineEvents.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
