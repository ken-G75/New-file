"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Mail, Shield, LogOut, BarChart3, TrendingUp, Download } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [form, setForm] = useState({ username: "", password: "" })
  const [messages, setMessages] = useState([])
  const [contacts, setContacts] = useState([])

  // 🔄 Ranmase done nan localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]")
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]")
    setMessages(storedMessages)
    setContacts(storedContacts)
  }, [isAuthenticated]) // rechargé après login

  const stats = {
    totalMessages: messages.length,
    totalContacts: contacts.length,
    newMessages: messages.length > 0 ? 1 : 0,
    readRate: messages.length > 0 ? "80%" : "0%",
  }

  // Export VCF
  const exportVCF = () => {
    let vcfData = ""
    contacts.forEach(c => {
      vcfData += `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL:${c.phone}\nEND:VCARD\n`
    })
    const blob = new Blob([vcfData], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contacts.vcf"
    a.click()
  }

  // Export CSV
  const exportCSV = () => {
    const headers = ["Nom", "Email", "Sujet", "Message"]
    const rows = messages.map(m => [m.name, m.email, m.subject, m.message])
    const csv = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "messages.csv"
    a.click()
  }

  // Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (form.username === "admin" && form.password === "kerventz2000") {
      setIsAuthenticated(true)
    } else {
      alert("❌ Identifiants incorrects")
    }
  }

  const handleLogout = () => setIsAuthenticated(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
        <Card className="w-full max-w-md bg-[#161B22] border border-[#30363D] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-[#2FD771] text-2xl font-bold">
              🛡️ Accès Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Nom d'utilisateur"
                className="bg-[#21262D] border-[#30363D] text-white"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Mot de passe"
                className="bg-[#21262D] border-[#30363D] text-white"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2FD771] to-[#26C65A] text-[#0D1117] font-bold"
              >
                <Shield className="w-4 h-4 mr-2" /> Connexion
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2FD771] flex items-center gap-2">
          <Shield className="w-5 h-5" /> Ralph Xpert - Admin
        </h1>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
          <LogOut className="w-4 h-4 mr-2" /> Déconnexion
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-[#161B22] border border-[#30363D] p-2 rounded-lg">
          <TabsTrigger value="overview"><BarChart3 className="w-4 h-4 mr-2" />Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="messages"><Mail className="w-4 h-4 mr-2" />Messages</TabsTrigger>
          <TabsTrigger value="contacts"><Users className="w-4 h-4 mr-2" />Contacts</TabsTrigger>
          <TabsTrigger value="analytics"><TrendingUp className="w-4 h-4 mr-2" />Analytics</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Messages", value: stats.totalMessages, icon: Mail },
            { label: "Nouveaux Messages", value: stats.newMessages, icon: Mail },
            { label: "Total Contacts", value: stats.totalContacts, icon: Users },
            { label: "Taux de Lecture", value: stats.readRate, icon: TrendingUp },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-[#2FD771]" />
                <div>
                  <p className="text-sm text-[#7D8590]">{item.label}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        {/* Messages */}
        <TabsContent value="messages" className="mt-6 space-y-4">
          <Button onClick={exportCSV} className="bg-[#2FD771] text-[#0D1117] font-bold">
            <Download className="w-4 h-4 mr-2" /> Exporter en CSV
          </Button>
          <Card className="bg-[#161B22] border border-[#30363D]">
            <CardHeader><CardTitle>📧 Liste des Messages</CardTitle></CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <p className="text-gray-400">Aucun message pour le moment</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className="p-3 border-b border-[#30363D]">
                    <p><b>Nom:</b> {m.name}</p>
                    <p><b>Email:</b> {m.email}</p>
                    <p><b>Sujet:</b> {m.subject}</p>
                    <p><b>Message:</b> {m.message}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="mt-6 space-y-4">
          <Button onClick={exportVCF} className="bg-[#2FD771] text-[#0D1117] font-bold">
            <Download className="w-4 h-4 mr-2" /> Télécharger VCF
          </Button>
          <Card className="bg-[#161B22] border border-[#30363D]">
            <CardHeader><CardTitle>📞 Liste des Contacts</CardTitle></CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-gray-400">Aucun contact pour le moment</p>
              ) : (
                contacts.map((c, i) => (
                  <div key={i} className="p-3 border-b border-[#30363D]">
                    <p><b>Nom:</b> {c.name}</p>
                    <p><b>Téléphone:</b> {c.phone}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-6">
          <Card className="bg-[#161B22] border border-[#30363D]">
            <CardHeader><CardTitle>📊 Analytics</CardTitle></CardHeader>
            <CardContent>Bientôt disponible...</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
    }
