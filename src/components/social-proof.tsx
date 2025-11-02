"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SocialProof() {
  // User count is now static per design
  const userCount = "1,000";

  const testimonials = [
    {
      name: "Sarah K.",
      title: "Founder, Tech Startup",
      quote:
        "I launched in a weekend and got 250 signups. First100 made it so easy to validate my idea before building.",
    },
    {
      name: "Marcus L.",
      title: "Product Manager",
      quote:
        "The voice-to-project feature saved me hours. I described my idea, and First100 generated everything I needed.",
    },
    {
      name: "Elena R.",
      title: "Solo Founder",
      quote:
        "No code needed, no design skills required. I created my waitlist page in minutes and collected my first 100 users in a week.",
    },
  ];
  
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
            Trusted by <span className="text-[#D8FF00]">1,000+</span> Entrepreneurs
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-900 dark:text-gray-300 mt-4">
            See what founders are saying about First100.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 hover:shadow-xl hover:border-[#D8FF00] dark:hover:border-[#D8FF00] transition-all duration-300"
            >
              <p className="text-lg mb-6 font-serif italic text-gray-900 dark:text-gray-200">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#D8FF00] text-black font-semibold flex items-center justify-center">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-black dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 