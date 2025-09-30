import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import {
  Zap,
  Upload,
  Users,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Rocket,
  HelpCircle,
  MapPin,
  Plus, // Added Plus icon
  Minus, // Added Minus icon
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
  const [openFaqIndex, setOpenFaqIndex] = useState(null); // State for FAQ accordion

  // ✅ Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

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
    {
      name: "Aisha",
      role: "Product Designer",
      result: "Got the VCF instantly.",
      rating: 5,
    },
    {
      name: "Mhuoeka",
      role: "Software Engineer",
      result:
        "Thanks Ralph! With your vcf I'm able to build a WhatsApp audience.",
      rating: 5,
    },
    {
      name: "Zainab",
      role: "Marketer",
      result: "The community is buzzing!",
      rating: 4,
    },
    {
      name: "Joseph",
      role: "Business Owner",
      result:
        "My WhatsApp views has significantly increased. All thanks to Ralph VCF.",
      rating: 5,
    },
  ];

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus("❌ Failed to send. Try again.");
    }
  };

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
            Collect contacts quickly, export as .vcf or PDF, and share with your
            community. Admins can manage everything from the dashboard.
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

<div className="mt-6 flex gap-3">
            <Link href="/upload">
              <a className="inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-2xl shadow">
                <Upload size={16} /> Upload
              </a>
            </Link>
          </div>

      {/* TESTIMONIALS SECTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {testimonials.map((t) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={t.name}
              className="card rounded-2xl p-5"
            >
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

      {/* CONTACT SECTION */}
      <div className="mt-20">
        <div className="bg-green-600 text-center py-10 rounded-2xl shadow">
          <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Phone /> Contact Ralph Xpert
          </h2>
          <p className="text-gray-100 mt-3 max-w-2xl mx-auto">
            Do you have a question, a project, or simply want to chat? Our team
            is here to support you in your digital growth.
          </p>
        </div>

        <div className="card mt-8 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-green-400">
            <MessageCircle /> Send us a message
          </h3>
          <p className="text-gray-300 mb-6">
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form inputs are unchanged... */}
            <div>
              <label className="block mb-1 text-sm">Full name *</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Your full name" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-sm">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+509 1234 5678" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700" />
            </div>
            <div>
              <label className="block mb-1 text-sm">Subject *</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700" >
                <option value="">Choose a topic</option>
                <option>General Inquiry</option>
                <option>Project Discussion</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your request in detail..." rows="4" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700" ></textarea>
            </div>
            <button type="submit" className="bg-green-600 w-full py-3 rounded-xl font-semibold hover:bg-green-700 transition" >
              📩 Send message
            </button>
            {status && <p className="mt-2 text-sm text-gray-300">{status}</p>}
          </form>
        </div>
      </div>
      
      {/* This section is now obsolete and replaced by the FAQ component below, so it's removed */}
      {/* <div className="faq-section"> ... </div> */}

      {/* ================================================================== */}
      {/* ======================= NEW FAQ SECTION ========================== */}
      {/* ================================================================== */}

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
                <span className="font-semibold text-lg text-white">
                  {faq.question}
                </span>
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
                    <div className="p-4 bg-gray-800 rounded-lg text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* ================================================================== */}
      {/* ======================= NEW FOOTER SECTION ======================= */}
      {/* ================================================================== */}

      <footer className="mt-20 py-8 text-center text-gray-500 text-sm">
        <p>Copyright 2025© || Powered by Benfei Tech </p>
      </footer>

    </div> // This closes the main container div
  );
}
