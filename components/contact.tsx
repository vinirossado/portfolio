"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Send, Github, Linkedin, Loader2, Check, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type Status = "idle" | "sending" | "ok" | "error"

// O site e `output: 'export'` (estatico), entao nao existe API route para
// receber o POST. Configure NEXT_PUBLIC_CONTACT_ENDPOINT (Formspree, Web3Forms,
// etc.) e o formulario envia de verdade. Sem isso, cai para mailto — que sempre
// funciona e nunca finge que enviou. O `alert()` anterior mentia: dizia
// "enviado com sucesso" depois de apenas um console.log.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
const EMAIL = "vinirossado@gmail.com"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px 15% 0px" })
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")

  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending") return

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Contato do portfolio — ${formState.name}`)
      const body = encodeURIComponent(`${formState.message}\n\n—\n${formState.name}\n${formState.email}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus("sending")
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("ok")
      setFormState({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full px-4 py-2 rounded-lg outline-none transition-all " +
    "bg-white dark:bg-slate-900 " +
    "border border-slate-300 dark:border-slate-700 " +
    "text-slate-800 dark:text-slate-100 " +
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " +
    "focus:ring-2 focus:ring-blue-300 focus:border-blue-500 " +
    "dark:focus:ring-orange-500/40 dark:focus:border-orange-500"

  const circleClass =
    "w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center " +
    "text-blue-600 dark:text-orange-500 transition-colors"

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("contact")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t("letsChat")}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">{t("availableFor")}</p>

            <div className="space-y-4">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
                <div className={`${circleClass} group-hover:bg-blue-600 dark:group-hover:bg-orange-600 group-hover:text-white`}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("email")}</h4>
                  <p className="text-slate-800 dark:text-slate-100">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className={circleClass}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("location")}</h4>
                  <p className="text-slate-800 dark:text-slate-100">{t("locationValue")}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com/vinirossado"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`${circleClass} hover:bg-blue-600 dark:hover:bg-orange-600 hover:text-white`}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/viniciusrossado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`${circleClass} hover:bg-blue-600 dark:hover:bg-orange-600 hover:text-white`}
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Vinicius Rossado"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your.email@exemplo.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-orange-500 dark:hover:bg-orange-600 disabled:opacity-60 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{t("sendMessage")}</span>
              </button>

              {status === "ok" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Check size={16} /> {t("contactSuccess")}
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle size={16} /> {t("contactError")}{" "}
                  <a href={`mailto:${EMAIL}`} className="underline">
                    {EMAIL}
                  </a>
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
