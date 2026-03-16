"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Lock,
  Eye,
  EyeOff,
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  Calendar,
  FileText,
  Upload,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  LogOut,
  Home,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = "quintal2024";

const mockCandidaturas = [
  { id: 1, nome: "Carlos Eduardo", curso: "Administração", instagram: "@carlosedu", semestre: "2024.2", status: "pendente", date: "2024-07-10" },
  { id: 2, nome: "Ana Lima", curso: "Ciências Econômicas", instagram: "@analima", semestre: "2024.2", status: "aprovado", date: "2024-07-08" },
  { id: 3, nome: "Bruno Martins", curso: "TI", instagram: "@brunomartins", semestre: "2025.1", status: "pendente", date: "2024-07-12" },
  { id: 4, nome: "Isabela Torres", curso: "Engenharia de Produção", instagram: "@isabela", semestre: "2024.2", status: "rejeitado", date: "2024-07-05" },
  { id: 5, nome: "Felipe Costa", curso: "Administração", instagram: "@felipecosta", semestre: "2025.1", status: "pendente", date: "2024-07-15" },
];

const mockFotos = [
  { id: 1, title: "Churrasco Julho", category: "churrascos", image: "https://picsum.photos/seed/admin1/300/200", date: "2024-07-20" },
  { id: 2, title: "Festa Neon", category: "festas", image: "https://picsum.photos/seed/admin2/300/200", date: "2024-07-17" },
  { id: 3, title: "Viagem Bonito", category: "viagens", image: "https://picsum.photos/seed/admin3/300/200", date: "2024-07-15" },
  { id: 4, title: "Aniversário Carol", category: "aniversarios", image: "https://picsum.photos/seed/admin4/300/200", date: "2024-07-05" },
  { id: 5, title: "Reunião Alumni SP", category: "social", image: "https://picsum.photos/seed/admin5/300/200", date: "2024-09-07" },
  { id: 6, title: "Quintal 14 Anos", category: "festas", image: "https://picsum.photos/seed/admin6/300/200", date: "2024-03-15" },
];

type TabType = "dashboard" | "fotos" | "alumni" | "eventos" | "candidaturas";

const statusColors: Record<string, string> = {
  pendente: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  aprovado: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  rejeitado: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Senha incorreta. Tente novamente.");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #6C13AB, #0DD621)" }} />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
              >
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white">Painel Admin</h1>
              <p className="text-gray-400 text-sm mt-1">República Quintal · UNICAMP Limeira</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Senha de Acesso</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Digite a senha..."
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-6">
              Hint: a senha é{" "}
              <button
                onClick={() => setPassword(ADMIN_PASSWORD)}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                quintal2024
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: "Candidaturas Pendentes", value: "3", icon: FileText, color: "from-yellow-600 to-yellow-400", change: "+2 esta semana" },
    { label: "Total de Fotos", value: "20", icon: ImageIcon, color: "from-blue-600 to-blue-400", change: "+3 este mês" },
    { label: "Ex-Moradores", value: "80+", icon: Users, color: "from-purple-600 to-purple-400", change: "+1 formou" },
    { label: "Eventos no Mês", value: "4", icon: Calendar, color: "from-green-600 to-green-400", change: "2 abertos" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400 text-sm">Visão geral da República Quintal</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-2xl p-5 border border-gray-700"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 bg-gradient-to-br ${stat.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent candidaturas */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h3 className="font-bold text-white">Candidaturas Recentes</h3>
          <span className="text-xs text-gray-400">3 pendentes</span>
        </div>
        <div className="divide-y divide-gray-700">
          {mockCandidaturas.slice(0, 3).map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-white text-sm">{c.nome}</p>
                <p className="text-xs text-gray-400">{c.curso} · {c.semestre}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FotosPanel() {
  const [fotos, setFotos] = useState(mockFotos);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Fotos</h2>
          <p className="text-gray-400 text-sm">{fotos.length} fotos na galeria</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Upload zone */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 rounded-2xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors p-8 text-center cursor-pointer"
          >
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-sm mb-2">Arraste fotos aqui ou clique para selecionar</p>
            <p className="text-xs text-gray-600">JPG, PNG, WEBP · Máx 10MB por foto</p>
            <input type="file" multiple accept="image/*" className="hidden" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Título</label>
                <input
                  type="text"
                  placeholder="Nome da foto"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Categoria</label>
                <select className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-xs focus:outline-none focus:border-purple-500">
                  <option value="festas">Festas</option>
                  <option value="churrascos">Churrascos</option>
                  <option value="viagens">Viagens</option>
                  <option value="aniversarios">Aniversários</option>
                </select>
              </div>
            </div>
            <button
              className="mt-3 px-4 py-2 rounded-lg text-white text-xs font-medium"
              style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
              onClick={() => setShowUpload(false)}
            >
              Confirmar Upload
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photos grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {fotos.map((foto, i) => (
          <motion.div
            key={foto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
          >
            <div className="relative aspect-video">
              <Image src={foto.image} alt={foto.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="font-medium text-white text-sm truncate">{foto.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500 capitalize">{foto.category}</span>
                <span className="text-xs text-gray-500">{foto.date}</span>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg bg-gray-900/80 text-gray-300 hover:text-white">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setFotos(fotos.filter((f) => f.id !== foto.id))}
                className="p-1.5 rounded-lg bg-red-900/80 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Add new */}
        <button
          onClick={() => setShowUpload(true)}
          className="aspect-video rounded-xl border-2 border-dashed border-gray-700 hover:border-purple-500 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-purple-400 transition-all"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">Adicionar</span>
        </button>
      </div>
    </div>
  );
}

function AlumniPanel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Alumni</h2>
          <p className="text-gray-400 text-sm">Gerenciar ex-moradores</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm"
          style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
        >
          <Plus className="w-4 h-4" />
          Adicionar Alumni
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 p-5"
          >
            <h3 className="font-bold text-white mb-4">Novo Alumni</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Nome Completo", "Curso", "Ano de Entrada", "Ano de Saída", "Cargo Atual", "Empresa", "Cidade", "País"].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-400 mb-1">{field}</label>
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-xs text-gray-400 mb-1">Bio</label>
              <textarea
                rows={3}
                placeholder="Breve depoimento do alumni..."
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-xl text-white text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
                onClick={() => setShowForm(false)}
              >
                Salvar Alumni
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-gray-400 text-sm border border-gray-600 hover:border-gray-400"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alumni list */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar alumni..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          {["Lucas Mendonça", "Fernanda Costa", "Rafael Alves", "Juliana Pereira", "Thiago Rodrigues"].map((name, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <Image src={`https://picsum.photos/seed/alumni${i + 1}/200/200`} alt={name} width={36} height={36} className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{name}</p>
                  <p className="text-xs text-gray-400">Alumni · {2010 + i * 2}–{2014 + i * 2}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventosPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Eventos</h2>
          <p className="text-gray-400 text-sm">Gerenciar agenda da república</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm"
          style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
        >
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      {/* New event form */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5">
        <h3 className="font-bold text-white mb-4">Criar Novo Evento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Título do Evento", placeholder: "Ex: Churrasco de Agosto" },
            { label: "Data", placeholder: "YYYY-MM-DD", type: "date" },
            { label: "Horário", placeholder: "18:00", type: "time" },
            { label: "Local", placeholder: "Quintal da República" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
              <input
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Tipo</label>
            <select className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500">
              <option value="social">Social</option>
              <option value="academico">Acadêmico</option>
              <option value="cultural">Cultural</option>
              <option value="esportivo">Esportivo</option>
              <option value="viagem">Viagem</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Capacidade</label>
            <input
              type="number"
              placeholder="Número máximo de pessoas"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs text-gray-400 mb-1">Descrição</label>
          <textarea
            rows={3}
            placeholder="Descreva o evento..."
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
        <button
          className="mt-4 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
        >
          Criar Evento
        </button>
      </div>

      {/* Upcoming events list */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-bold text-white">Próximos Eventos</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {["Churrasco Mensal – Julho", "Workshop: Mercado Financeiro", "Torneio de Futevôlei", "Noite de Cinema"].map((ev, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
                >
                  {20 + i}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{ev}</p>
                  <p className="text-xs text-gray-400">Julho 2024</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CandidaturasPanel() {
  const [candidaturas, setCandidaturas] = useState(mockCandidaturas);

  const updateStatus = (id: number, status: string) => {
    setCandidaturas(c => c.map(cand => cand.id === id ? { ...cand, status } : cand));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Candidaturas</h2>
        <p className="text-gray-400 text-sm">{candidaturas.filter(c => c.status === "pendente").length} pendentes de avaliação</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pendentes", count: candidaturas.filter(c => c.status === "pendente").length, color: "from-yellow-600 to-yellow-400" },
          { label: "Aprovadas", count: candidaturas.filter(c => c.status === "aprovado").length, color: "from-green-600 to-green-400" },
          { label: "Rejeitadas", count: candidaturas.filter(c => c.status === "rejeitado").length, color: "from-red-600 to-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800 rounded-2xl p-4 border border-gray-700 text-center">
            <div className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.count}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {candidaturas.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{c.nome}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{c.curso}</span>
                  <span>·</span>
                  <span>{c.instagram}</span>
                  <span>·</span>
                  <span>Ingresso: {c.semestre}</span>
                  <span>·</span>
                  <span>{c.date}</span>
                </div>
              </div>

              {c.status === "pendente" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateStatus(c.id, "aprovado")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-green-700 hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Aprovar
                  </button>
                  <button
                    onClick={() => updateStatus(c.id, "rejeitado")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-700 hover:bg-red-900/30 transition-colors"
                  >
                    Rejeitar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const tabs: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "fotos", label: "Fotos", icon: ImageIcon },
  { id: "alumni", label: "Alumni", icon: Users },
  { id: "eventos", label: "Eventos", icon: Calendar },
  { id: "candidaturas", label: "Candidaturas", icon: FileText },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "fotos": return <FotosPanel />;
      case "alumni": return <AlumniPanel />;
      case "eventos": return <EventosPanel />;
      case "candidaturas": return <CandidaturasPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
        {/* Logo */}
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}>
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">República Quintal</p>
              <p className="text-xs text-gray-500">Painel Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                }`}
                style={activeTab === tab.id ? { background: "linear-gradient(135deg, rgba(108,19,171,0.4), rgba(13,214,33,0.2))", border: "1px solid rgba(108,19,171,0.4)" } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === "candidaturas" && (
                  <span className="ml-auto bg-yellow-500 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-all"
          >
            <Home className="w-4 h-4" />
            Ver site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-gray-800 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-gray-600">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-white font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden bg-gray-900 border-b border-gray-800 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
