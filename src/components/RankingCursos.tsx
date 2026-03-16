"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { coursesData, statsData } from "@/data/courses";

function AnimatedBar({
  course,
  index,
  inView,
}: {
  course: (typeof coursesData)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: course.color }}
          />
          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {course.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            ({course.shortName})
          </span>
        </div>
        <div className="flex items-center gap-3 text-right">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {course.count} moradores
          </span>
          <span
            className="text-lg font-black"
            style={{ color: course.color }}
          >
            {course.percentage}%
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div className="relative h-10 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        {/* Animated fill */}
        <motion.div
          initial={{ width: "0%" }}
          animate={inView ? { width: `${course.percentage}%` } : { width: "0%" }}
          transition={{
            duration: 1.2,
            delay: 0.3 + index * 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="absolute inset-y-0 left-0 rounded-xl flex items-center justify-end pr-3"
          style={{
            background: `linear-gradient(90deg, ${course.color}88, ${course.color})`,
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, delay: 1.2 + index * 0.15, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="text-white text-xs font-bold relative z-10">
            {course.percentage}%
          </span>
        </motion.div>
      </div>

      {/* Alumni detail */}
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <span>{course.alumni} alumni empregados</span>
        <span className="mx-1">·</span>
        <span
          className="font-medium"
          style={{ color: course.color }}
        >
          {Math.round((course.alumni / course.count) * 100)}% de aproveitamento
        </span>
      </div>
    </div>
  );
}

function StatCard({ stat, index, inView }: { stat: (typeof statsData)[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, type: "spring", stiffness: 200 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 text-center shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="text-2xl font-black gradient-text mb-1">{stat.value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

export default function RankingCursos() {
  const [chartRef, chartInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="section-title gradient-text">Distribuição por Cursos</h2>
        <p className="section-subtitle">
          A Quintal é lar de estudantes de diferentes áreas da FCA UNICAMP. Diversidade que
          enriquece cada conversa e cada projeto.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Chart */}
        <div ref={chartRef} className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">
            Moradores por Curso
          </h3>

          {coursesData.map((course, i) => (
            <AnimatedBar key={course.id} course={course} index={i} inView={chartInView} />
          ))}

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total de moradores históricos</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={chartInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="text-2xl font-black gradient-text"
            >
              80+
            </motion.span>
          </div>
        </div>

        {/* Donut / visual breakdown */}
        <div className="space-y-6">
          {/* Visual pie representation */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-card">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">
              Proporção Visual
            </h3>

            {/* Stacked bar */}
            <div className="relative h-14 rounded-2xl overflow-hidden flex mb-6">
              {coursesData.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ width: "0%" }}
                  animate={chartInView ? { width: `${course.percentage}%` } : { width: "0%" }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  className="flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: course.color }}
                >
                  <span className="text-white text-xs font-bold truncate px-1 relative z-10">
                    {course.percentage >= 15 ? course.shortName : ""}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
              {coursesData.map((course) => (
                <div key={course.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: course.color }} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{course.count} moradores</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={chartInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(108,19,171,0.1), rgba(13,214,33,0.1))", border: "1px solid rgba(108,19,171,0.3)" }}
          >
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">💡 Curiosidade</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A maioria dos moradores da Quintal são de <strong className="text-purple-600 dark:text-purple-400">Administração</strong>,
              mas a diversidade de cursos é o que torna as conversas tão ricas e únicas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats grid */}
      <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
        {statsData.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} inView={statsInView} />
        ))}
      </div>
    </div>
  );
}
