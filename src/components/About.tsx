import React from 'react';
import { motion } from 'motion/react';
import { Brain, Code, Rocket, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Agentic AI",
    description: "Dive deep into the world of autonomous AI agents. Learn how to build systems that think and act."
  },
  {
    icon: Code,
    title: "Machine Learning",
    description: "From basics to advanced models. Understand the math and the code behind modern AI."
  },
  {
    icon: Github,
    title: "GitHub Mastery",
    description: "Master version control and open-source collaboration. The essential tool for every developer."
  },
  {
    icon: Rocket,
    title: "Hands-on Experience",
    description: "Don't just watch—build. Real-world projects that you can add to your portfolio instantly."
  }
];

import { Github } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              The Future of Tech is <span className="text-neon-cyan">Agentic</span>.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              RAGE 2K26 isn't just another workshop. It's a high-intensity learning experience designed by Team ScriptInk to bridge the gap between college curriculum and industry standards. 
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Beginner Friendly</h4>
                  <p className="text-gray-500 text-sm">No prior experience required. We start from zero.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-neon-purple/10 text-neon-purple">
                  <Rocket size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Industry Relevant</h4>
                  <p className="text-gray-500 text-sm">Learn tools and techniques used by top tech companies.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 border-white/5 hover:border-neon-cyan/30 transition-all"
              >
                <feature.icon className="text-neon-cyan mb-4" size={28} />
                <h3 className="font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
