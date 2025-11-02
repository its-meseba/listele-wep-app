"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import VoiceAIFounderModal from "./voice-ai-founder-modal";
import { Mic } from "lucide-react";
import { isPaymentEnabled } from "~/lib/config";

export default function Hero() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const paymentEnabled = isPaymentEnabled();

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-950 dark:to-black">
        {/* Animated background elements */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D8FF00] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#D8FF00] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000" />
          <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-[#D8FF00] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-500" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-6 py-20">
          <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8"
              >
              {/* Social proof badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
              >
                <span className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D8FF00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D8FF00]"></span>
                  </span>
                  1,000+ founders already building
                  </span>
              </motion.div>

              <h1 className="text-white font-bold text-5xl md:text-6xl xl:text-8xl leading-tight tracking-tight">
                Get your first <span className="text-[#D8FF00] inline-block hover:scale-105 transition-transform">100 users</span>
                <br />
                <span className="text-white/90">before you build.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                AI builds your waitlist page in 60 seconds. 
                <br className="hidden sm:block" />
                <span className="text-[#D8FF00] font-semibold">Start collecting leads today—no code, no hassle.</span>
              </p>

              {/* CTA Section with urgency */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 space-y-6"
              >
                {/* Primary CTA with attention-grabbing design */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={paymentEnabled ? "/onboarding" : "/dashboard"} className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="group relative w-full sm:w-auto bg-[#D8FF00] hover:bg-[#B8E000] text-black font-bold text-xl px-12 py-6 shadow-2xl hover:shadow-[#D8FF00]/50 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative flex items-center gap-2">
                        🚀 Create Your Waitlist Free
                  </span>
                    </Button>
                  </Link>
                  
                  {paymentEnabled && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsVoiceModalOpen(true)}
                      className="w-full sm:w-auto group border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-[#D8FF00] font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300"
                    >
                      <Mic className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Try Voice Mode
                    </Button>
                  )}
                </div>

                {/* Trust indicators with icons */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#D8FF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-medium">Free forever plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#D8FF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-medium">No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#D8FF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-medium">Live in 60 seconds</span>
                  </div>
                </div>
              </motion.div>

              {/* Urgency/scarcity element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 inline-block"
              >
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D8FF00]/20 to-transparent border border-[#D8FF00]/30 backdrop-blur-sm">
                  <p className="text-[#D8FF00] text-sm font-semibold flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    Limited time: Get Pro features free for 30 days
                  </p>
            </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {paymentEnabled && (
        <VoiceAIFounderModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      )}
    </>
  );
} 