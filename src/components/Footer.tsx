import React from 'react';
import { motion } from 'motion/react';
import { Globe, Instagram, Linkedin, Youtube, MapPin, Play, Send } from 'lucide-react';

const socials = [
  { icon: Globe, href: "https://scriptink.in", label: "Website" },
  { icon: Instagram, href: "https://instagram.com/scriptink_official", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/scriptink-official", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@ScriptInkOfficial", label: "YouTube" },
  { icon: Play, href: "https://play.google.com/store/apps/details?id=com.scriptink.official", label: "Play Store" },
  { icon: Send, href: "https://t.me/scriptink", label: "Telegram" },
  { icon: MapPin, href: "https://g.page/Scriptink", label: "Maps" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tighter mb-2 text-white">
              SCRIPT<span className="text-neon-cyan">INK</span>
            </h3>
            <p className="text-gray-500 text-sm">Built by Team ScriptInk</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.2 }}
                className="text-gray-500 hover:text-neon-cyan transition-all hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                title={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs">
              © 2026 ScriptInk. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
