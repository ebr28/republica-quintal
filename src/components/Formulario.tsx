"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, CheckCircle, AlertCircle, User, Book, MapPin, Instagram, Phone, FileText, Calendar } from "lucide-react";
import clsx from "clsx";

interface FormData {
  nome: string;
  idade: string;
  curso: string;
  cidadeOrigem: string;
  instagram: string;
  telefone: string;
  descricao: string;
  semestre: string;
}

const inputClass = (hasError: boolean) =>
  clsx(
    "w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none",
    "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
    "placeholder-gray-400 dark:placeholder-gray-500",
    hasError
      ? "border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
  );

export default function Formulario() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate success (90% of time)
    if (Math.random() > 0.1) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title gradient-text">Quero Morar na Quintal</h2>
        <p className="section-subtitle">
          Preencha o formulário abaixo e nossa equipe entrará em contato. Vagas limitadas –
          não deixe para depois!
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
        >
          {/* Form header gradient */}
          <div
            className="h-2 w-full"
            style={{ background: "linear-gradient(90deg, #6C13AB, #0DD621)" }}
          />

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Candidatura Enviada! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Recebemos sua candidatura com sucesso! Nossa equipe vai analisar seu perfil
                    e entrar em contato em até 3 dias úteis.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-outline text-sm"
                  >
                    Enviar nova candidatura
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Ocorreu um erro. Por favor, tente novamente.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Row 1: Nome + Idade */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <User className="w-3.5 h-3.5 inline mr-1" />
                        Nome Completo *
                      </label>
                      <input
                        {...register("nome", {
                          required: "Nome é obrigatório",
                          minLength: { value: 3, message: "Nome muito curto" },
                        })}
                        placeholder="Seu nome completo"
                        className={inputClass(!!errors.nome)}
                      />
                      {errors.nome && (
                        <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 inline mr-1" />
                        Idade *
                      </label>
                      <input
                        {...register("idade", {
                          required: "Idade é obrigatória",
                          min: { value: 17, message: "Mínimo 17 anos" },
                          max: { value: 35, message: "Máximo 35 anos" },
                        })}
                        type="number"
                        placeholder="Sua idade"
                        className={inputClass(!!errors.idade)}
                      />
                      {errors.idade && (
                        <p className="text-red-500 text-xs mt-1">{errors.idade.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Curso + Semestre */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <Book className="w-3.5 h-3.5 inline mr-1" />
                        Curso *
                      </label>
                      <select
                        {...register("curso", { required: "Selecione um curso" })}
                        className={clsx(inputClass(!!errors.curso), "cursor-pointer")}
                      >
                        <option value="">Selecione o curso</option>
                        <option value="administracao">Administração</option>
                        <option value="ciencias-economicas">Ciências Econômicas</option>
                        <option value="ti">Tecnologia da Informação</option>
                        <option value="engenharia-producao">Engenharia de Produção</option>
                        <option value="outro">Outro</option>
                      </select>
                      {errors.curso && (
                        <p className="text-red-500 text-xs mt-1">{errors.curso.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Semestre de Ingresso *
                      </label>
                      <select
                        {...register("semestre", { required: "Selecione o semestre" })}
                        className={clsx(inputClass(!!errors.semestre), "cursor-pointer")}
                      >
                        <option value="">Selecione</option>
                        <option value="2024.2">2024.2 (Agosto)</option>
                        <option value="2025.1">2025.1 (Fevereiro)</option>
                        <option value="2025.2">2025.2 (Agosto)</option>
                      </select>
                      {errors.semestre && (
                        <p className="text-red-500 text-xs mt-1">{errors.semestre.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Cidade de Origem */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      Cidade de Origem *
                    </label>
                    <input
                      {...register("cidadeOrigem", { required: "Cidade é obrigatória" })}
                      placeholder="De onde você vem?"
                      className={inputClass(!!errors.cidadeOrigem)}
                    />
                    {errors.cidadeOrigem && (
                      <p className="text-red-500 text-xs mt-1">{errors.cidadeOrigem.message}</p>
                    )}
                  </div>

                  {/* Row 4: Instagram + Telefone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <Instagram className="w-3.5 h-3.5 inline mr-1" />
                        Instagram *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                        <input
                          {...register("instagram", {
                            required: "Instagram é obrigatório",
                            pattern: {
                              value: /^[a-zA-Z0-9._]+$/,
                              message: "Instagram inválido (sem @)",
                            },
                          })}
                          placeholder="seu.instagram"
                          className={clsx(inputClass(!!errors.instagram), "pl-8")}
                        />
                      </div>
                      {errors.instagram && (
                        <p className="text-red-500 text-xs mt-1">{errors.instagram.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <Phone className="w-3.5 h-3.5 inline mr-1" />
                        Telefone / WhatsApp *
                      </label>
                      <input
                        {...register("telefone", {
                          required: "Telefone é obrigatório",
                          pattern: {
                            value: /^[\d\s\-\(\)\+]{10,15}$/,
                            message: "Telefone inválido",
                          },
                        })}
                        placeholder="(19) 99999-9999"
                        className={inputClass(!!errors.telefone)}
                      />
                      {errors.telefone && (
                        <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 5: Descrição */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FileText className="w-3.5 h-3.5 inline mr-1" />
                      Sobre você *
                      <span className="font-normal text-gray-400 ml-1">(min. 50 caracteres)</span>
                    </label>
                    <textarea
                      {...register("descricao", {
                        required: "Descrição é obrigatória",
                        minLength: { value: 50, message: "Escreva pelo menos 50 caracteres" },
                        maxLength: { value: 500, message: "Máximo 500 caracteres" },
                      })}
                      rows={4}
                      placeholder="Fale um pouco sobre você: hobbies, o que espera da república, seus objetivos profissionais, como contribuiria para a Quintal..."
                      className={clsx(inputClass(!!errors.descricao), "resize-none")}
                    />
                    {errors.descricao && (
                      <p className="text-red-500 text-xs mt-1">{errors.descricao.message}</p>
                    )}
                  </div>

                  {/* Privacy notice */}
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    Ao enviar, você concorda com o uso dos seus dados para fins de seleção.
                    Seus dados não serão compartilhados com terceiros.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={clsx(
                      "w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300",
                      "flex items-center justify-center gap-3",
                      status === "loading"
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:scale-[1.02] hover:shadow-xl"
                    )}
                    style={{ background: "linear-gradient(135deg, #6C13AB, #0DD621)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Enviando candidatura...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Candidatura
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { emoji: "⚡", title: "Resposta rápida", desc: "Em até 3 dias úteis" },
            { emoji: "🔒", title: "100% seguro", desc: "Dados protegidos" },
            { emoji: "🤝", title: "Entrevista", desc: "Processo humanizado" },
          ].map((item) => (
            <div key={item.title} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
