import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Upload,
  Users,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Plus,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- FAQ Data ---
const faqData = [
  {
    question: "How will my views increase with Ralph Xpert?",
    answer:
      "By exporting contacts as a VCF file and sharing it, you allow many people to save your number at once. When they view your WhatsApp status, you get more views, which helps build your audience.",
  },
  {
    question: "Is my WhatsApp account safe?",
    answer:
      "Yes, your account is 100% secure. This service does not require access to your WhatsApp account or any personal information. It only works with the contacts you choose to upload and export.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, the core features of collecting contacts and exporting them as a VCF file are completely free to use. We believe in helping you grow your community without barriers.",
  },
  {
    question: "Does this work in all countries?",
    answer:
      "Absolutely. As long as your smartphone or device can import a standard .vcf contact file, our service will work for you, no matter where you are in the world.",
  },
];

export default function Home() {
  const [count, setCount] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchCount() {
      try {
        const res = await fetch("/api/contacts/count");
        const json = await res.json();
        if (mounted && json?.count !== undefined) setCount(json.count);
      } catch {}
    }
    fetchCount();
    const t = setInterval(fetchCount, 5000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const testimonials = [
    { name: "Aisha", role: "Product Designer", result: "Got the VCF instantly.", rating: 5 },
    { name: "Mhuoeka", role: "Software Engineer", result: "Thanks Ralph! With your vcf I'm able to build a WhatsApp audience.", rating: 5 },
    { name: "Zainab", role: "Marketer", result: "The community is buzzing!", rating: 4 },
    { name: "Joseph", role: "Business Owner", result: "My WhatsApp views has significantly increased. All thanks to Ralph VCF.", rating: 5 },
  ];

  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold"
          >
            Welcome to <span className="text-accent">Ralph Xpert VCF</span>
          </motion.h1>
          <p className="text-sm text-gray-300 mt-4">
            Collect contacts quickly, export as .vcf or PDF, and share with your community. Admins can manage everything from the dashboard.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card rounded-2xl p-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Total Contacts</div>
              <div className="text-xl font-semibold mt-2">{count}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Export</div>
              <div className="text-xl font-semibold mt-2">VCF / PDF</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Theme</div>
              <div className="text-xl font-semibold mt-2">Dark • Green</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* UPLOAD BUTTON */}
      <div className="mt-6">
        <Link
          href="/upload"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Upload size={18} /> Upload
        </Link>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {testimonials.map((t) => (
            <motion.div whileHover={{ y: -6 }} key={t.name} className="card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-300">{t.role}</div>
                </div>
                <div className="inline-flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm">{t.result}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONTACT BUTTON SECTION */}
      <div className="mt-20">
        <div className="bg-green-600 text-center py-10 rounded-2xl shadow">
          <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Phone /> Contact Ralph Xpert
          </h2>
          <p className="text-gray-100 mt-3 max-w-2xl mx-auto">
            Do you have a question, a project, or simply want to chat? Our team is here to support you in your digital growth.
          </p>
        </div>

        <div className="card mt-8 p-8 rounded-2xl text-center">
          <h3 className="text-xl font-semibold flex justify-center items-center gap-2 text-green-400">
            <MessageCircle /> Contact us directly
          </h3>
          <p className="text-gray-300 mb-6">
            Click the button below to contact our team.
          </p>

          <Link
            href="/contact"
            className="bg-green-600 w-full py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 inline-block"
          >
            📞 Contacter nous
          </Link>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="card mt-16 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <button
                onClick={() => handleFaqToggle(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-semibold text-lg text-white">{faq.question}</span>
                {openFaqIndex === index ? (
                  <Minus className="text-green-400" />
                ) : (
                  <Plus className="text-green-400" />
                )}
              </button>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-800 rounded-lg text-gray-300">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#161B22] to-[#21262D] border-t border-[#30363D] mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-[#2FD771] font-bold text-xl mb-4">RALPH XPERT PROGRAMME</h2>
              <p className="text-[#C9D1D9] text-sm">
                La plateforme de référence pour développer votre réseau WhatsApp et maximiser l'impact de vos statuts.
              </p>
            </div>

            <div>
              <h3 className="text-[#2FD771] font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-[#C9D1D9] text-sm">
                <li>Boost de contacts</li>
                <li>Vues de statut</li>
                <li>Analytics avancées</li>
                <li>Formation premium</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#2FD771] font-bold mb-4">Contact & Support</h3>
              <div className="space-y-2 text-[#C9D1D9] text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:elogekenguer@gmail.com" className="hover:text-[#2FD771]">
                    elogekenguer@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+18494597173" className="hover:text-[#2FD771]">
                    +1 849 459 7173
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <a
                    href="https://wa.me/18494597173"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2FD771]"
                  >
                    WhatsApp 24/7 Disponible
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#30363D] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[#7D8590] text-sm">
            <span>© 2025 RALPH XPERT PROGRAMME. Tous droits réservés.</span>
            <span>
              Créé par <strong>Mr RALPH</strong>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
        }
