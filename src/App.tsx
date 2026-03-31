import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Moon, Sun, Shield, ArrowUp } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import AdminView from './components/AdminView';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showAdmin) {
    return (
      <div className="dark">
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={() => setShowAdmin(false)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-all text-white"
          >
            Back to Site
          </button>
        </div>
        <AdminView />
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-cyber-black text-white selection:bg-neon-cyan/30 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-neon-cyan z-50 origin-left shadow-[0_0_10px_rgba(0,243,255,0.8)]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-cyber-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center font-black text-cyber-black shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              S
            </div>
            <span className="font-black tracking-tighter text-xl text-white">
              SCRIPT<span className="text-neon-cyan">INK</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <a href="#about" className="hover:text-neon-cyan transition-colors">About</a>
            <a href="#benefits" className="hover:text-neon-cyan transition-colors">Benefits</a>
            <a href="#register" className="hover:text-neon-cyan transition-colors">Register</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAdmin(true)}
              className="p-2 rounded-lg opacity-60 hover:opacity-100 hover:bg-white/5 text-gray-400 hover:text-neon-cyan transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] group relative"
              title="Admin Panel"
            >
              <Shield size={20} />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-cyber-black border border-white/10 rounded text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Admin Panel
              </span>
            </button>
            <a 
              href="#register"
              className="hidden sm:block px-6 py-2 bg-neon-cyan text-cyber-black font-black rounded-lg text-xs uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            >
              Join RAGE
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="benefits">
          <Benefits />
        </div>
        <RegistrationForm />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-cyber-black border border-neon-cyan/50 text-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all"
            title="Scroll to Top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Background Grid Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,243,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,243,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black opacity-60" />
      </div>
    </div>
  );
}
