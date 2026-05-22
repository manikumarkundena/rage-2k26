import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Users, Mail, Phone, GraduationCap, Building2, Send, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const registrationSchema = z.object({
  name: z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .regex(/^[A-Za-z.\s]+$/, 'Only alphabets are allowed'),
  email: z.string().email('Invalid email address'),
  phone: z
  .string()
  .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  usn: z.string().min(5, 'Invalid USN'),
  year: z.enum(['1st', '2nd', '3rd', '4th']),
  branch: z.string().min(1, 'Please select a branch'),
  otherBranch: z.string().optional(),
  referralCode: z.string().optional(),
  message: z.string().max(500, 'Message too long').optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const branches = [
  'CSE', 'CSE (AI & ML)', 'AI & Data Science', 'ISE', 'ECE', 'EEE', 
  'Mechanical', 'Civil', 'Chemical', 'Biotech', 'Other'
];

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const selectedBranch = watch('branch');

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'rageRegistrations'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setUserName(data.name);
      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f3ff', '#0066ff', '#bc13fe']
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center max-w-md mx-auto mt-20"
      >
        <CheckCircle2 className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-white">Welcome to RAGE, {userName}!</h2>
        <p className="text-gray-400 mb-8">Your registration was successful. Get ready for an epic tech journey.</p>
        <a 
          href="https://chat.whatsapp.com/Ft0rDLbXTpy4Z0kR01svb4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all gap-2 shadow-[0_0_20px_rgba(22,163,74,0.3)]"
        >
          Join WhatsApp Group
        </a>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-gray-500 hover:text-white transition-colors"
        >
          Register another person
        </button>
      </motion.div>
    );
  }

  return (
    <section id="register" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black mb-4 neon-glow text-white uppercase tracking-tighter">Secure Your Spot</h2>
          <p className="text-gray-400 font-medium">Join the elite circle of developers at RAGE 2K26.</p>
          <p className="text-neon-cyan/60 text-[10px] uppercase tracking-[0.2em] mt-2">Takes less than 30 seconds</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <Users size={14} className="text-neon-cyan" /> Full Name
              </label>
              <input 
                {...register('name')}
                className="input-field"
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <Mail size={14} className="text-neon-cyan" /> Email Address
              </label>
              <input 
                {...register('email')}
                className="input-field"
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <Phone size={14} className="text-neon-cyan" /> Phone Number
              </label>
              <input 
  {...register('phone')}
  type="tel"
  inputMode="numeric"
  maxLength={10}
  className="input-field"
  placeholder="Enter 10-digit phone number"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  }}
/>
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone.message}</p>}
            </div>

            {/* USN */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <GraduationCap size={14} className="text-neon-cyan" /> USN
              </label>
              <input 
                {...register('usn')}
                className="input-field"
                placeholder="Enter USN"
              />
              {errors.usn && <p className="text-red-500 text-xs mt-1 font-bold">{errors.usn.message}</p>}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <Building2 size={14} className="text-neon-cyan" /> Year
              </label>
              <select 
                {...register('year')}
                className="input-field appearance-none"
              >
                <option value="" className="bg-cyber-black">Select year</option>
                <option value="1st" className="bg-cyber-black">1st Year</option>
                <option value="2nd" className="bg-cyber-black">2nd Year</option>
                <option value="3rd" className="bg-cyber-black">3rd Year</option>
                <option value="4th" className="bg-cyber-black">4th Year</option>
              </select>
              {errors.year && <p className="text-red-500 text-xs mt-1 font-bold">{errors.year.message}</p>}
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <Code2 size={14} className="text-neon-cyan" /> Branch
              </label>
              <select 
                {...register('branch')}
                className="input-field appearance-none"
              >
                <option value="" className="bg-cyber-black">Select branch</option>
                {branches.map(b => (
                  <option key={b} value={b} className="bg-cyber-black">{b}</option>
                ))}
              </select>
              {errors.branch && <p className="text-red-500 text-xs mt-1 font-bold">{errors.branch.message}</p>}
            </div>
          </div>

          {/* Dynamic Other Branch Field */}
          <AnimatePresence>
            {selectedBranch === 'Other' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Specify Branch</label>
                <input 
                  {...register('otherBranch')}
                  className="input-field"
                  placeholder="Enter your branch"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Referral Code */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Referral Code (Optional)</label>
            <input 
              {...register('referralCode')}
              className="input-field"
              placeholder="Enter referral code (optional)"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Message (Optional)</label>
            <textarea 
              {...register('message')}
              rows={3}
              className="input-field resize-none"
              placeholder="Write your message (optional)"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-neon-cyan text-cyber-black font-black rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Send size={18} /> Complete Registration
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
