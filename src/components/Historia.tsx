"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineEvents } from "@/data/timeline";

const narrativeBlocks = [
  {
    label: "Como começou",
    title: "Uma casa alugada e uma ideia simples.",
    body: "Em 2014, um grupo de estudantes da FCA UNICAMP Limeira dividiu um endereço, bateu o martelo num nome e criou algo que ninguém esperava que durasse tanto. A Quintal não surgiu de um planejamento estratégico — surgiu de gente que queria morar bem, pagar menos e estar perto de quem vale a pena.",
    accent: "#6C13AB",
  },
  {
    label: "A identidade",
    title: "Morar aqui é vestir a camisa.",
    body: "Cada morador que entrou trouxe algo diferente — um curso novo, uma cidade diferente, uma forma de ver o mundo. E foi exatamente isso que fez a Quintal crescer. Aqui não tem hierarquia de quem chegou antes. Você entra, e a casa é sua.",
    accent: "#0DD621",
  },
  {
    label: "O legado",
    title: "Quem passa, deixa uma marca.",
    body: "A Quintal continua viva porque cada turma herda o que a anterior construiu e adiciona o próprio capítulo. O network que você faz aqui não some quando você se forma — ele fica. A galera espalhou pelo Brasil e pelo mundo, mas o grupo continua ativo.",
    accent: "#6C13AB",
  },
];

function NarrativeBlock({ block, index }: { block: typeof narrativeBlocks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-6 border-l-2"
      style={{ borderColor: block.accent }}
    >
      <span
        className="text-xs font-bold uppercase tracking-widest mb-2 block"
        style={{ color: block.accent }}
      >
        {block.label}
      </span>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {block.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base max-w-lg">
        {block.body}
      </p>
    </motion.div>
  );
}

function TimelineDot({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
          style={{
            background: event.highlight ? "#6C13AB" : "transparent",
            border: event.highlight ? "none" : "2px solid #374151",
          }}
        >
          {event.highlight ? (
            <span>{event.icon}</span>
          ) : (
            <span className="text-gray-500 text-xs font-bold">{event.year.toString().slice(2)}</span>
          )}
        </div>
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-gray-400">{event.year}</span>
          {event.highlight && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "#6C13AB" }}
            >
              marco
            </span>
          )}
        </div>
        <p className="font-semibold text-gray-900 dark:text-white text-sm">{event.title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed max-w-xs">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Historia() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div>
      {/* Opening */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Nossa História
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
          A Quintal não foi construída em um dia.{" "}
          <span style={{ color: "#6C13AB" }}>Foi construída em cada morador que passou por ela.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
          11 anos. Incontáveis histórias. Uma identidade que continua sendo escrita.
        </p>
      </motion.div>

      {/* Two column: narrative + timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left: narrative blocks */}
        <div className="space-y-10">
          {narrativeBlocks.map((block, i) => (
            <NarrativeBlock key={block.label} block={block} index={i} />
          ))}
        </div>

        {/* Right: timeline */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Os marcos
          </p>
          <div className="relative">
            <div
              className="absolute left-[17px] top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, #6C13AB, #0DD621)" }}
            />
            <div>
              {timelineEvents.map((event, i) => (
                <TimelineDot key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            Quer escrever o próximo capítulo?
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            A história continua. E o próximo morador vai deixar a sua marca também.
          </p>
        </div>
        <a
          href="#formulario"
          className="btn-primary whitespace-nowrap flex-shrink-0"
        >
          Quero fazer parte
        </a>
      </motion.div>
    </div>
  );
}
