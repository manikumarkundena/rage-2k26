import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, Zap, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: "Certification",
    description: "Get a verified participation certificate from Team ScriptInk.",
    color: "text-neon-cyan"
  },
  {
    icon: Calendar,
    title: "Attendance",
    description: "Official attendance included for all registered participants.",
    color: "text-neon-blue"
  },
  {
    icon: Zap,
    title: "Free Entry",
    description: "Zero registration fees. Pure learning, zero cost.",
    color: "text-neon-purple"
  },
  {
    icon: ShieldCheck,
    title: "Hands-on",
    description: "Industry-relevant skills through practical workshops.",
    color: "text-green-400"
  }
];

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-white/[0.02]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/10 transition-colors group"
            >
              <div className={`mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform ${benefit.color}`}>
                <benefit.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
