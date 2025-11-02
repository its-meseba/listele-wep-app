"use client";

import {
    Code,
    Zap,
    Gauge,
    Database,
    Globe,
    Wallet,
  } from "lucide-react";
  import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Features() {
  const features = [
    {
      icon: <Code size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "AI Page Generator",
      description:
        "Benefit-driven copy and sections. AI drafts your page copy, benefits, and sections automatically.",
    },
    {
      icon: <Zap size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "Voice-to-Project (beta)",
      description:
        "Create a page by talking. Describe your idea verbally; AI generates the complete landing page structure.",
    },
    {
      icon: <Gauge size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "Media Support (Pro)",
      description:
        "Upload images & a teaser video. Customize your waitlist page with professional visuals and promotional content.",
    },
    {
      icon: <Database size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "Lead Capture",
      description:
        "Built-in forms, consent, and export (CSV). Capture leads with GDPR-compliant forms and export your list anytime.",
    },
    {
      icon: <Globe size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "Intent Analytics",
      description:
        "Click heat, interest tags, conversion. Measure real demand with detailed analytics and user behavior insights.",
    },
    {
      icon: <Wallet size={32} className="text-black dark:text-[#D8FF00]"/>,
      title: "Custom Domain",
      description:
        "Use your domain from day one. Connect your own domain immediately and build your brand from the start.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">Everything You Need</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-900 dark:text-gray-300 mt-4">
            All the tools you need to build and grow your waitlist. Speed, data, and community—all in your control.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 hover:shadow-lg hover:border-[#D8FF00] dark:hover:border-[#D8FF00] transition-all duration-300"
            >
              <div className="p-4 inline-block bg-gray-100 dark:bg-slate-800 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
              <p className="text-gray-900 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 