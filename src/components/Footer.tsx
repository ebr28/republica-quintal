"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, Home, ArrowUp, Heart } from "lucide-react";

const navSections = [
  { href: "#historia", label: "Nossa História" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#galeria", label: "Galeria" },
  { href: "#tour", label: "Tour pela Casa" },
  { href: "#ex-moradores", label: "Ex-Moradores" },
  { href: "#mapa", label: "Quintal pelo Mundo" },
  { href: "#ranking", label: "Distribuição Cursos" },
  { href: "#agenda", label: "Agenda" },
  { href: "#instagram", label: "Instagram" },
  { href: "#formulario", label: "Candidatura" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/republicaquintal",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/5519999999999",
    label: "WhatsApp",
    color: "hover:text-green-500",
  },
  {
    icon: Mail,
    href: "mailto:contato@republicaquintal.com.br",
    label: "E-mail",
    color: "hover:text-purple-400",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToSection = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #6C13AB, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #0DD621, transparent)" }}
        />
      </div>

      <div className="relative z-10">
        {/* Top gradient line */}
        <div
          className="w-full h-1"
          style={{ background: "linear-gradient(90deg, #6C13AB, #0DD621)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}>
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base leading-tight">República Quintal</p>
                  <p className="text-xs text-gray-500">UNICAMP Limeira</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 text-gray-500">
                Mais que uma república, uma família. Formando profissionais e criando memórias
                desde 2010 na UNICAMP Limeira.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 ${social.color} transition-all duration-200 hover:scale-110`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation col 1 */}
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                Navegação
              </h3>
              <ul className="space-y-2.5">
                {navSections.slice(0, 6).map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation col 2 */}
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                Mais
              </h3>
              <ul className="space-y-2.5">
                {navSections.slice(6).map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact brief */}
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                Contato
              </h3>
              <div className="space-y-3 text-sm text-gray-500">
                <div>
                  <p className="text-gray-400 font-medium">Endereço</p>
                  <p>Rua das Repúblicas, 123</p>
                  <p>Jardim Universitário</p>
                  <p>Limeira – SP</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">E-mail</p>
                  <a
                    href="mailto:contato@republicaquintal.com.br"
                    className="hover:text-white transition-colors text-xs"
                  >
                    contato@republicaquintal.com.br
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/5519999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors text-xs"
                  >
                    +55 (19) 99999-9999
                  </a>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToSection("#formulario")}
                className="mt-5 w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
              >
                Quero Morar na Quintal
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600 flex items-center gap-1">
              © {new Date().getFullYear()} República Quintal · UNICAMP Limeira.
              Feito com{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
              {" "}pelos moradores.
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Next.js 14 · TypeScript · TailwindCSS</span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
