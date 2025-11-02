"use client";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowTo() {
  return (
    <section id="nasil-calisir" className="py-20 sm:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-6 text-black dark:text-white"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto text-lg text-gray-900 dark:text-gray-300 mb-12 sm:mb-16"
        >
          Three simple steps to build your waitlist, measure real demand, and launch with confidence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-200 dark:bg-slate-700 -translate-y-1/2" />
          
          <div className="relative p-8 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 z-10 hover:shadow-lg hover:border-[#D8FF00] dark:hover:border-[#D8FF00] transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#D8FF00] text-black rounded-full font-bold text-2xl mr-4">
                1
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Describe Your Idea</h3>
            </div>
            <p className="text-gray-900 dark:text-gray-300">
              Type or speak; AI drafts the page copy, benefits, and sections. Your idea becomes a professional landing page in minutes.
            </p>
          </div>
          <div className="relative p-8 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 z-10 hover:shadow-lg hover:border-[#D8FF00] dark:hover:border-[#D8FF00] transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#D8FF00] text-black rounded-full font-bold text-2xl mr-4">
                2
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Launch in Minutes</h3>
            </div>
            <p className="text-gray-900 dark:text-gray-300">
              Customize design, add images (Pro) or promo video (Pro). Your waitlist page is ready to go live instantly.
            </p>
          </div>
          <div className="relative p-8 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 z-10 hover:shadow-lg hover:border-[#D8FF00] dark:hover:border-[#D8FF00] transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#D8FF00] text-black rounded-full font-bold text-2xl mr-4">
                3
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Collect & Learn</h3>
            </div>
            <p className="text-gray-900 dark:text-gray-300">
              Capture leads, tag interest, view intent analytics, and export. Measure real demand and build your audience.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Link href="/onboarding">
            <Button size="lg" className="bg-[#D8FF00] hover:bg-[#B8E000] text-black font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
              Create Your Waitlist
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 