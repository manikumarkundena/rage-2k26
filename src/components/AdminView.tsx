import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Trash2, Download, ShieldCheck, LogOut, Loader2 } from 'lucide-react';

export default function AdminView() {
  const [registrations, setRegistrations] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA (FIXED)
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = onSnapshot(
      collection(db, 'rageRegistrations'),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("DATA:", data); // debug

        setRegistrations(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  // 🔐 LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (window.confirm('Delete this registration?')) {
      await deleteDoc(doc(db, 'rageRegistrations', id));
    }
  };

  // 📥 EXPORT CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'USN', 'Year', 'Branch'];

    const rows = registrations.map(r => [
      r.name,
      r.email,
      r.phone,
      r.usn,
      r.year,
      r.branch
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "rage_registrations.csv";
    link.click();
  };

  // 🔐 LOGIN UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          className="glass-card p-8 w-full max-w-md text-center"
        >
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Admin Access</h2>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <button className="w-full py-3 bg-cyan-400 text-black font-bold rounded-xl">
            Login
          </button>
        </motion.form>
      </div>
    );
  }

  // 📊 ADMIN DASHBOARD
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Registrations</h1>
            <p>Total: {registrations.length}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={exportToCSV} className="btn">
              <Download size={16}/> Export
            </button>

            <button onClick={() => setIsAuthenticated(false)} className="btn">
              <LogOut size={16}/> Logout
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="glass overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>USN</th>
                <th>Year</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    No registrations yet
                  </td>
                </tr>
              ) : (
                registrations.map((r) => (
                  <tr key={r.id} className="border-b border-white/10">
                    <td className="p-3">{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.phone}</td>
                    <td>{r.usn}</td>
                    <td>{r.year}</td>
                    <td>{r.branch}</td>
                    <td>
                      <button onClick={() => handleDelete(r.id)}>
                        <Trash2 size={16}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}