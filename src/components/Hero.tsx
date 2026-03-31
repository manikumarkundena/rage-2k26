import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Github, Sparkles, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 dark:border-neon-cyan/30 light:border-blue-200 bg-neon-cyan/5 dark:bg-neon-cyan/5 light:bg-blue-50 text-neon-cyan dark:text-neon-cyan light:text-blue-700 text-sm font-medium"
        >
          <Sparkles size={14} />
          <span>Team ScriptInk Presents</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-blue dark:from-neon-cyan dark:via-white dark:to-neon-blue light:from-blue-600 light:via-blue-800 light:to-indigo-900 bg-clip-text text-transparent animate-gradient">
            RAGE 2K26
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl text-white mb-10 max-w-4xl mx-auto font-bold tracking-tight leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block"
          >
            Master the future of tech
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-neon-cyan font-black block mt-2"
          >
            Agentic AI • Machine Learning • GitHub
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#register"
              className="group relative px-10 py-5 bg-neon-cyan text-cyber-black font-black rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,243,255,0.6)] uppercase tracking-tighter text-sm animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a 
              href="#about"
              className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-black rounded-xl transition-all uppercase tracking-tighter text-sm"
            >
              Learn More
            </a>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-neon-cyan/80 text-xs font-black uppercase tracking-[0.2em] animate-pulse"
          >
            Limited seats. High demand. First come, first selected.
          </motion.p>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex justify-center gap-8 text-gray-500"
        >
          <div className="flex flex-col items-center gap-2">
            <Cpu size={24} />
            <span className="text-[10px] uppercase tracking-widest">AI/ML</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Github size={24} />
            <span className="text-[10px] uppercase tracking-widest">Open Source</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Terminal size={24} />
            <span className="text-[10px] uppercase tracking-widest">DevOps</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
