import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Trash2, Download, ShieldCheck, LogOut, Loader2 } from 'lucide-react';

export default function AdminView() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, 'rageRegistrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistrations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection as requested
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      await deleteDoc(doc(db, 'rageRegistrations', id));
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'USN', 'Year', 'Branch', 'Other Branch', 'Referral', 'Message', 'Date'];
    const rows = registrations.map(r => [
      r.name, r.email, r.phone, r.usn, r.year, r.branch, r.otherBranch || '', r.referralCode || '', r.message || '', 
      r.createdAt?.toDate().toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rage_registrations.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.form 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          className="glass-card p-8 w-full max-w-md text-center"
        >
          <ShieldCheck className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-neon-cyan"
          />
          <button 
            type="submit"
            className="w-full py-3 bg-neon-cyan text-cyber-black font-bold rounded-xl hover:bg-neon-cyan/80 transition-all"
          >
            Login
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold neon-glow">Registrations</h1>
            <p className="text-gray-400">Total: {registrations.length}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              <Download size={18} /> Export CSV
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-medium text-gray-400">Name</th>
                <th className="p-4 text-sm font-medium text-gray-400">Contact</th>
                <th className="p-4 text-sm font-medium text-gray-400">USN</th>
                <th className="p-4 text-sm font-medium text-gray-400">Year/Branch</th>
                <th className="p-4 text-sm font-medium text-gray-400">Date</th>
                <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Loader2 className="animate-spin mx-auto text-neon-cyan" />
                  </td>
                </tr>
              ) : registrations.map((reg) => (
                <tr key={reg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{reg.name}</div>
                    <div className="text-xs text-gray-500">{reg.email}</div>
                  </td>
                  <td className="p-4 text-sm">{reg.phone}</td>
                  <td className="p-4 text-sm font-mono">{reg.usn}</td>
                  <td className="p-4 text-sm">
                    {reg.year} - {reg.branch === 'Other' ? reg.otherBranch : reg.branch}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {reg.createdAt?.toDate().toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDelete(reg.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
