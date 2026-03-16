"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alumni, type Alumni } from "@/data/alumni";
import { X, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";

// World map projection (equirectangular)
// Maps lat/lng to SVG coordinates in a 1000x500 viewBox
function projectPoint(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

// SVG path for a simplified world map
const WORLD_MAP_PATH = `
M 150,120 L 155,118 L 162,120 L 168,124 L 172,128 L 170,134 L 164,138 L 156,138 L 148,134 L 144,128 Z
M 130,150 L 148,145 L 160,148 L 170,155 L 175,165 L 172,178 L 160,188 L 145,192 L 130,188 L 118,178 L 114,165 L 118,154 Z
M 440,60 L 460,55 L 480,58 L 495,65 L 502,75 L 498,88 L 482,95 L 462,97 L 444,92 L 432,82 L 430,70 Z
M 420,100 L 445,95 L 468,98 L 488,108 L 497,122 L 493,140 L 475,152 L 452,156 L 430,150 L 412,138 L 406,122 L 410,108 Z
M 380,115 L 408,112 L 435,116 L 455,125 L 462,138 L 456,153 L 440,162 L 418,165 L 396,160 L 376,148 L 368,134 L 370,120 Z
M 355,140 L 380,136 L 403,140 L 420,150 L 426,163 L 422,178 L 408,188 L 388,192 L 368,188 L 350,177 L 343,162 L 346,148 Z
M 330,165 L 356,161 L 378,166 L 394,177 L 400,192 L 396,208 L 382,220 L 362,224 L 342,218 L 325,207 L 318,190 L 320,176 Z
M 480,120 L 510,115 L 535,120 L 552,132 L 558,148 L 553,165 L 536,175 L 514,178 L 492,173 L 474,160 L 468,144 L 470,130 Z
M 510,160 L 540,155 L 565,160 L 582,173 L 588,190 L 582,208 L 565,220 L 542,224 L 520,219 L 503,206 L 497,188 L 500,173 Z
M 540,200 L 570,195 L 595,200 L 612,212 L 618,228 L 614,245 L 598,256 L 576,260 L 554,255 L 536,242 L 530,225 L 532,210 Z
M 460,170 L 488,165 L 512,170 L 528,182 L 534,198 L 530,215 L 514,226 L 492,230 L 470,225 L 452,212 L 446,195 L 448,180 Z
M 420,200 L 450,195 L 475,200 L 492,213 L 498,230 L 493,248 L 476,260 L 453,265 L 430,260 L 412,246 L 406,228 L 408,213 Z
M 450,240 L 478,234 L 502,240 L 518,254 L 524,272 L 520,292 L 504,304 L 482,309 L 460,304 L 442,290 L 436,272 L 438,256 Z
M 490,280 L 520,272 L 546,278 L 564,294 L 570,315 L 566,338 L 548,352 L 523,358 L 499,353 L 479,336 L 474,313 L 476,296 Z
M 680,140 L 705,136 L 725,142 L 740,154 L 745,170 L 741,188 L 727,200 L 708,204 L 688,199 L 672,186 L 667,170 L 669,155 Z
M 700,185 L 726,180 L 748,186 L 764,200 L 770,218 L 766,238 L 750,251 L 728,256 L 706,250 L 688,237 L 682,218 L 684,202 Z
M 730,225 L 758,219 L 782,226 L 798,241 L 804,261 L 800,283 L 783,297 L 760,302 L 736,296 L 718,281 L 712,260 L 715,243 Z
M 200,200 L 228,194 L 252,200 L 268,215 L 274,234 L 270,255 L 253,268 L 230,273 L 207,267 L 189,252 L 183,232 L 185,215 Z
M 220,250 L 248,244 L 272,250 L 288,266 L 294,286 L 290,308 L 273,322 L 250,327 L 226,320 L 208,305 L 202,284 L 204,267 Z
M 250,310 L 278,303 L 304,310 L 322,328 L 328,350 L 324,375 L 305,392 L 280,398 L 255,391 L 235,373 L 228,350 L 230,330 Z
M 160,240 L 188,234 L 212,240 L 228,256 L 234,276 L 230,298 L 213,312 L 189,318 L 165,311 L 146,295 L 140,273 L 142,255 Z
M 620,200 L 645,194 L 665,200 L 680,215 L 686,234 L 682,255 L 665,268 L 642,273 L 620,267 L 602,252 L 596,232 L 598,215 Z
M 640,250 L 666,243 L 688,250 L 704,266 L 710,287 L 705,310 L 688,325 L 664,331 L 640,324 L 621,308 L 615,287 L 617,268 Z
M 660,300 L 688,292 L 712,300 L 729,318 L 735,340 L 730,365 L 712,381 L 686,388 L 661,381 L 641,362 L 634,339 L 636,319 Z
M 580,300 L 608,292 L 632,300 L 649,318 L 655,340 L 650,365 L 632,381 L 606,388 L 581,381 L 561,362 L 554,339 L 556,319 Z
M 560,360 L 588,352 L 613,360 L 630,380 L 636,404 L 630,430 L 612,448 L 585,456 L 559,448 L 538,429 L 531,404 L 533,382 Z
M 780,280 L 808,272 L 832,280 L 849,298 L 855,320 L 850,345 L 832,361 L 806,368 L 780,361 L 760,342 L 753,319 L 755,299 Z
M 800,330 L 828,322 L 852,330 L 870,350 L 876,374 L 870,400 L 851,418 L 825,426 L 798,418 L 777,399 L 770,374 L 772,352 Z
M 820,390 L 848,380 L 874,390 L 892,412 L 898,438 L 892,467 L 872,487 L 844,496 L 818,487 L 796,466 L 789,438 L 792,414 Z
`;

export default function MapaExMoradores() {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [hoveredAlumni, setHoveredAlumni] = useState<number | null>(null);

  const handleMarkerClick = useCallback((person: Alumni) => {
    setSelectedAlumni(prev => prev?.id === person.id ? null : person);
  }, []);

  return (
    <div className="w-full">
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 dark:bg-gray-950 border border-gray-800 shadow-2xl">
        {/* Map container */}
        <div className="relative w-full" style={{ paddingBottom: "50%" }}>
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0d1525 50%, #0a0a1a 100%)" }}
            >
              {/* Ocean grid lines */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                </pattern>
                <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6C13AB" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#6C13AB" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="glow-green" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0DD621" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#0DD621" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="1000" height="500" fill="url(#grid)"/>

              {/* Equator and tropics */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,10"/>
              <line x1="0" y1="155" x2="1000" y2="155" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,8"/>
              <line x1="0" y1="345" x2="1000" y2="345" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,8"/>

              {/* Continents - simplified paths */}
              {/* North America */}
              <path
                d="M 165,80 L 240,65 L 290,70 L 310,85 L 300,105 L 265,120 L 230,130 L 200,125 L 175,110 L 160,95 Z
                   M 190,125 L 260,120 L 290,130 L 305,148 L 300,168 L 280,180 L 255,185 L 228,180 L 206,165 L 195,148 Z
                   M 210,178 L 270,172 L 298,183 L 312,202 L 306,225 L 285,238 L 260,242 L 235,238 L 215,225 L 204,205 Z
                   M 135,148 L 195,142 L 222,152 L 235,170 L 230,192 L 212,205 L 190,210 L 165,206 L 145,193 L 135,173 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* South America */}
              <path
                d="M 240,250 L 290,240 L 320,248 L 335,268 L 330,295 L 308,315 L 280,325 L 252,320 L 230,305 L 222,280 Z
                   M 248,315 L 296,308 L 325,318 L 340,340 L 336,368 L 315,388 L 285,398 L 256,392 L 230,374 L 220,348 Z
                   M 258,385 L 300,376 L 326,386 L 340,410 L 336,440 L 315,462 L 286,472 L 258,465 L 234,446 L 224,416 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* Europe */}
              <path
                d="M 460,60 L 510,52 L 545,58 L 562,72 L 555,90 L 535,100 L 508,104 L 480,99 L 458,85 L 450,70 Z
                   M 450,95 L 498,88 L 528,95 L 545,110 L 540,130 L 520,142 L 496,146 L 470,140 L 450,126 L 442,110 Z
                   M 465,138 L 510,132 L 538,140 L 554,156 L 550,178 L 530,192 L 506,197 L 480,191 L 458,176 L 450,158 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* Africa */}
              <path
                d="M 460,175 L 515,168 L 550,176 L 568,196 L 562,222 L 538,240 L 508,248 L 478,242 L 452,224 L 444,198 Z
                   M 452,238 L 510,230 L 548,240 L 565,262 L 560,292 L 536,312 L 505,322 L 474,315 L 448,295 L 440,265 Z
                   M 460,310 L 515,300 L 550,310 L 566,335 L 560,368 L 535,392 L 502,402 L 470,394 L 444,370 L 436,338 Z
                   M 475,388 L 520,378 L 548,388 L 562,415 L 556,448 L 530,472 L 496,483 L 464,474 L 438,450 L 430,415 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* Asia */}
              <path
                d="M 558,55 L 650,42 L 730,50 L 780,65 L 790,88 L 760,108 L 705,118 L 645,115 L 595,102 L 562,82 Z
                   M 560,105 L 640,95 L 710,102 L 758,120 L 768,145 L 740,168 L 685,180 L 625,176 L 575,160 L 552,138 Z
                   M 555,162 L 630,150 L 700,158 L 748,178 L 758,206 L 728,232 L 670,246 L 608,242 L 558,224 L 540,198 Z
                   M 700,165 L 770,155 L 830,162 L 870,182 L 878,210 L 848,238 L 785,252 L 718,248 L 665,228 L 648,202 Z
                   M 680,245 L 755,232 L 820,242 L 858,266 L 865,298 L 834,328 L 770,345 L 703,340 L 650,318 L 632,288 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* Australia */}
              <path
                d="M 750,310 L 810,298 L 856,308 L 880,332 L 882,368 L 858,400 L 815,418 L 766,415 L 725,394 L 710,362 L 715,330 Z"
                fill="#1a2a3a"
                stroke="#2a4a6a"
                strokeWidth="0.8"
              />

              {/* Greenland */}
              <path
                d="M 310,30 L 360,18 L 400,22 L 420,40 L 415,62 L 388,75 L 350,78 L 315,68 L 295,48 Z"
                fill="#162030"
                stroke="#2a4a6a"
                strokeWidth="0.5"
              />

              {/* Alumni markers */}
              {alumni.map((person) => {
                const { x, y } = projectPoint(person.lat, person.lng);
                const isHovered = hoveredAlumni === person.id;
                const isSelected = selectedAlumni?.id === person.id;

                return (
                  <g key={person.id}>
                    {/* Pulse ring */}
                    {(isHovered || isSelected) && (
                      <>
                        <circle cx={x} cy={y} r="20" fill="none" stroke="#6C13AB" strokeWidth="1.5" opacity="0.5">
                          <animate attributeName="r" values="12;24;12" dur="2s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx={x} cy={y} r="16" fill="none" stroke="#0DD621" strokeWidth="1" opacity="0.4">
                          <animate attributeName="r" values="16;28;16" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                        </circle>
                      </>
                    )}

                    {/* Marker dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered || isSelected ? 8 : 6}
                      fill={isSelected ? "#0DD621" : "#6C13AB"}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      style={{ filter: `drop-shadow(0 0 ${isHovered ? 8 : 4}px ${isSelected ? "#0DD621" : "#6C13AB"})` }}
                      onMouseEnter={() => setHoveredAlumni(person.id)}
                      onMouseLeave={() => setHoveredAlumni(null)}
                      onClick={() => handleMarkerClick(person)}
                    />

                    {/* Name label on hover */}
                    {isHovered && (
                      <text
                        x={x}
                        y={y - 12}
                        textAnchor="middle"
                        fill="white"
                        fontSize="8"
                        fontWeight="600"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
                      >
                        {person.name.split(" ")[0]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-600 shadow-glow-purple" />
            <span className="text-white text-xs">Alumni</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #0DD621" }} />
            <span className="text-white text-xs">Selecionado</span>
          </div>
        </div>
      </div>

      {/* Selected alumni card */}
      <AnimatePresence>
        {selectedAlumni && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-xl max-w-lg mx-auto"
          >
            <button
              onClick={() => setSelectedAlumni(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-600">
                <Image
                  src={selectedAlumni.avatar}
                  alt={selectedAlumni.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{selectedAlumni.name}</h3>
                <div className="flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {selectedAlumni.course} ({selectedAlumni.yearIn}–{selectedAlumni.yearOut})
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {selectedAlumni.job} @ {selectedAlumni.company}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedAlumni.city}, {selectedAlumni.country}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 italic leading-relaxed">
              &ldquo;{selectedAlumni.bio}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alumni list mini */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {alumni.map((person) => (
          <button
            key={person.id}
            onClick={() => handleMarkerClick(person)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
              selectedAlumni?.id === person.id
                ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400"
            }`}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <Image src={person.avatar} alt={person.name} fill className="object-cover" />
            </div>
            <span className="truncate">{person.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
