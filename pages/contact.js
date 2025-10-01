"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageCircle, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

const subjects = [
  { value: "support", label: "Support technique" },
  { value: "inscription", label: "Problème d'inscription" },
  { value: "partenariat", label: "Partenariat" },
  { value: "suggestion", label: "Suggestion d'amélioration" },
  { value: "autre", label: "Autre" },
]

const faqs = [
  {
    question: "📩 Quel est le délai de réponse ?",
    answer:
      "Nous répondons généralement sous 24h en jours ouvrés. Pour les urgences, contactez-nous directement par WhatsApp.",
  },
  {
    question: "💰 Les consultations sont-elles gratuites ?",
    answer: "Oui, toutes nos consultations initiales sont gratuites et sans engagement.",
  },
  {
    question: "🚨 Comment signaler un problème urgent ?",
    answer: "Pour les problèmes urgents, contactez-nous directement via WhatsApp au +1 849 459 7173.",
  },
  {
    question: "🌍 Travaillez-vous avec des clients internationaux ?",
    answer: "Oui, nous travaillons avec des clients du monde entier. Nos services sont disponibles 24/7.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", content: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
      setMessage({ type: "error", content: "Veuillez remplir tous les champs requis." })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await apiClient.saveMessage(
        formData.nom,
        formData.email,
        formData.telephone,
        formData.sujet,
        formData.message
      )

      if (response.success) {
        setMessage({
          type: "success",
          content: "✅ Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.",
        })

        const currentFormData = { ...formData }
        setFormData({ nom: "", email: "", telephone: "", sujet: "", message: "" })

        setTimeout(() => {
          if (confirm("Voulez-vous également envoyer ce message via WhatsApp pour une réponse plus rapide ?")) {
            const whatsappMessage = `Bonjour Ralph Xpert,\n\nNom: ${currentFormData.nom}\nEmail: ${currentFormData.email}\nSujet: ${currentFormData.sujet}\n\nMessage: ${currentFormData.message}`
            const whatsappUrl = `https://wa.me/18494597173?text=${encodeURIComponent(whatsappMessage)}`
            window.open(whatsappUrl, "_blank")
          }
        }, 2000)
      } else {
        setMessage({ type: "error", content: response.error || "Une erreur est survenue. Veuillez réessayer." })
      }
    } catch (err) {
      setMessage({ type: "error", content: "Une erreur est survenue. Veuillez réessayer." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#2FD771] hover:text-[#26C65A] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-[#2FD771] to-[#26C65A] text-[#0D1117] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">📞 Contactez Ralph Xpert</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Vous avez une question, un projet ou souhaitez simplement discuter ? Notre équipe est là pour vous
            accompagner dans votre croissance digitale.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="text-[#2FD771] text-xl">💬 Envoyez-nous un message</CardTitle>
              <p className="text-[#C9D1D9]">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
            </CardHeader>
            <CardContent>
              {message.content && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    message.type === "success"
                      ? "bg-gradient-to-r from-[#2FD771] to-[#26C65A] text-[#0D1117]"
                      : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  }`}
                >
                  {message.content}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Nom complet *" value={formData.nom} onChange={(val) => setFormData({ ...formData, nom: val })} />
                <InputField label="Email *" type="email" value={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} />
                <InputField label="Téléphone" type="tel" value={formData.telephone} onChange={(val) => setFormData({ ...formData, telephone: val })} />
                <SelectField label="Sujet *" value={formData.sujet} onChange={(val) => setFormData({ ...formData, sujet: val })} options={subjects} />
                <Textarea
                  placeholder="Décrivez votre demande en détail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#21262D] border-[#30363D] text-white min-h-[120px]"
                  required
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2FD771] to-[#26C65A] text-[#0D1117] hover:opacity-90 font-bold"
                >
                  {isSubmitting ? "⏳ Envoi en cours..." : "📤 Envoyer le message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="text-[#2FD771] text-xl">📍 Nos coordonnées</CardTitle>
              <p className="text-[#C9D1D9]">Plusieurs moyens de nous joindre selon vos préférences.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContactInfo icon={Mail} title="Email" info="elogekenguer@gmail.com" sub="Réponse sous 24h" />
              <ContactInfo icon={Phone} title="Téléphone" info="+1 849 459 7173" sub="Lun-Ven 9h-18h" />
              <ContactInfo icon={MessageCircle} title="WhatsApp" info="+1 849 459 7173" sub="24/7 Disponible" />
              <ContactInfo icon={Clock} title="Horaires" info="9h - 18h" sub="Du lundi au vendredi" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* FAQ */}
        <FAQSection faqs={faqs} />
      </div>
    </div>
  )
}

// --- Helper Components

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-[#2FD771] font-semibold mb-2">{label}</label>
    <Input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#21262D] border-[#30363D] text-white"
      required={label.includes("*")}
    />
  </div>
)

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-[#2FD771] font-semibold mb-2">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-[#21262D] border-[#30363D] text-white">
        <SelectValue placeholder="Choisissez un sujet" />
      </SelectTrigger>
      <SelectContent className="bg-[#21262D] border-[#30363D]">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-white">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

const ContactInfo = ({ icon: Icon, title, info, sub }) => (
  <div className="flex items-center gap-4 p-4 bg-[#21262D] rounded-lg border-l-4 border-[#2FD771] hover:transform hover:translateX-1 transition-all">
    <Icon className="w-6 h-6 text-[#2FD771]" />
    <div>
      <h3 className="text-[#2FD771] font-semibold">{title}</h3>
      <p className="text-white">{info}</p>
      <small className="text-[#7D8590]">{sub}</small>
    </div>
  </div>
)

const QuickActions = () => (
  <Card className="bg-[#161B22] border-[#30363D] mt-8 max-w-4xl mx-auto">
    <CardHeader>
      <CardTitle className="text-[#2FD771] text-xl text-center">🚀 Actions rapides</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://wa.me/18494597173"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#21262D] to-[#30363D] hover:from-[#2FD771] hover:to-[#26C65A] hover:text-[#0D1117] text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          💬 WhatsApp Direct
        </a>
        <a
          href="tel:+18494597173"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#21262D] to-[#30363D] hover:from-[#2FD771] hover:to-[#26C65A] hover:text-[#0D1117] text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          📞 Appeler maintenant
        </a>
        <a
          href="mailto:elogekenguer@gmail.com"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#21262D] to-[#30363D] hover:from-[#2FD771] hover:to-[#26C65A] hover:text-[#0D1117] text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          📧 Envoyer un email
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#21262D] to-[#30363D] hover:from-[#2FD771] hover:to-[#26C65A] hover:text-[#0D1117] text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          🏠 Retour à l'accueil
        </Link>
      </div>
    </CardContent>
  </Card>
)

const FAQSection = ({ faqs }) => (
  <Card className="bg-[#161B22] border-[#30363D] mt-8 max-w-4xl mx-auto">
    <CardHeader>
      <CardTitle className="text-[#2FD771] text-xl text-center">❓ Questions fréquentes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#30363D] pb-4">
            <h3 className="text-[#2FD771] font-semibold mb-2">{faq.question}</h3>
            <p className="text-[#C9D1D9]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
