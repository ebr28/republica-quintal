"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Heart, MessageCircle, ExternalLink, Instagram } from "lucide-react";
import clsx from "clsx";

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  hashtags: string[];
}

const mockPosts: Post[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/ig1/400/400",
    likes: 234,
    comments: 18,
    caption: "Mais um churrasco lendário na Quintal! 🔥 Quando a família se reúne, a picanha fica melhor.",
    hashtags: ["#RepublicaQuintal", "#UNICAMP", "#ChurrascoQuintal"],
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/ig2/400/400",
    likes: 189,
    comments: 24,
    caption: "Sexta-feira de estudos vira domingo de viagem. É assim que funciona a Quintal! ✈️",
    hashtags: ["#QuintalViaja", "#FCA", "#VidaDeRepublica"],
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/ig3/400/400",
    likes: 312,
    comments: 45,
    caption: "14 anos de história, de amizades e de quintal cheio. Obrigado a todos que fizeram parte disso! 💜",
    hashtags: ["#14AnosQuintal", "#Aniversario", "#Familia"],
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/ig4/400/400",
    likes: 156,
    comments: 12,
    caption: "Tarde de domingo no quintal. Hammock, livro e boa companhia. A vida universitária pode ser assim! 🌿",
    hashtags: ["#QuintalRelax", "#UNICAMPLimeira"],
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/ig5/400/400",
    likes: 445,
    comments: 67,
    caption: "Halloween mais assustador da história da Quintal! Fantasias incríveis e muita diversão. 👻",
    hashtags: ["#HalloweenQuintal", "#Festa", "#RecordQueNaoSeMora"],
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/ig6/400/400",
    likes: 278,
    comments: 31,
    caption: "Alumni que virou referência no mercado financeiro. Orgulho de dizer que começou aqui! 🏆",
    hashtags: ["#AlumniQuintal", "#Orgulho", "#Networking"],
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/ig7/400/400",
    likes: 198,
    comments: 22,
    caption: "Sala de estudos em modo turbo antes da prova. A Quintal apoia sua jornada acadêmica! 📚",
    hashtags: ["#Estudando", "#UNICAMP", "#VaiQueEntra"],
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/ig8/400/400",
    likes: 367,
    comments: 52,
    caption: "Viagem de fim de semana com a galera. Lembranças assim não têm preço! 🌊",
    hashtags: ["#Viagem", "#GaleraQuintal", "#Memorias"],
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/ig9/400/400",
    likes: 521,
    comments: 89,
    caption: "Calouros 2024.2 chegando com tudo! Bem-vindos à família Quintal. Muitas histórias por vir! 🎉",
    hashtags: ["#Calouros2024", "#BemVindos", "#FamiliaQuintal"],
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: (index % 9) * 0.06 }}
      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={post.image}
        alt={post.caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 p-3"
      >
        <div className="flex items-center gap-6 text-white">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="flex items-center gap-2 font-bold text-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={clsx("w-6 h-6", liked ? "fill-red-500 text-red-500" : "fill-white")}
            />
            <span>{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <div className="flex items-center gap-2 font-bold text-lg">
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>{post.comments}</span>
          </div>
        </div>

        <p className="text-white text-xs text-center leading-tight line-clamp-3">
          {post.caption}
        </p>

        <div className="flex flex-wrap justify-center gap-1">
          {post.hashtags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-blue-300 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InstagramFeed() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

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
        <h2 className="section-title gradient-text">@republicaquintal</h2>
        <p className="section-subtitle">
          Acompanhe o dia a dia da Quintal no Instagram. Momentos reais, histórias verdadeiras.
        </p>

        {/* Instagram profile link */}
        <a
          href="https://instagram.com/republicaquintal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg mb-8"
          style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
        >
          <Instagram className="w-4 h-4" />
          Seguir no Instagram
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
        {mockPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* API notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <span>💡</span>
          <span>
            Feed mockado para demonstração. Integração real via{" "}
            <a
              href="https://developers.facebook.com/docs/instagram-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              Instagram Basic Display API
            </a>{" "}
            disponível.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
