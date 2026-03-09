import { motion } from "motion/react";
import { MapPin, Plus, TrendingUp, Building2, School, Users } from "lucide-react";
import { Stats, StatItem } from "../types";
import { useState } from "react";
import { postStat } from "../services/api";

interface Props {
  stats: Stats;
  onRefresh: () => void;
}

export default function StatsSection({ stats, onRefresh }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ type: 'cabang', name: '', location: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postStat(formData as Omit<StatItem, "id">);
    setFormData({ type: 'cabang', name: '', location: '' });
    setIsAdding(false);
    onRefresh();
  };

  return (
    <section id="tracking" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Data <span className="text-ipm-green">Organisasi</span>
          </h2>
          <div className="w-20 h-1.5 bg-ipm-yellow mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Informasi persebaran Pimpinan Cabang dan Pimpinan Ranting Ikatan Pelajar Muhammadiyah di wilayah Kabupaten Kebumen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-ipm-green text-center">
            <div className="w-16 h-16 bg-ipm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="text-ipm-green w-8 h-8" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{stats.cabang.length}</div>
            <div className="text-sm font-bold text-gray-500 tracking-widest">Pimpinan Cabang</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-ipm-yellow text-center">
            <div className="w-16 h-16 bg-ipm-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <School className="text-ipm-yellow w-8 h-8" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{stats.ranting.length}</div>
            <div className="text-sm font-bold text-gray-500 tracking-widest">Pimpinan Ranting</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-blue-500 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-500 w-8 h-8" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{stats.cabang.length + stats.ranting.length}</div>
            <div className="text-sm font-bold text-gray-500 tracking-widest">Total Pimpinan</div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-ipm-green text-white px-8 py-3 rounded-lg font-bold hover:bg-ipm-dark transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={20} /> {isAdding ? "Batal Tambah" : "Tambah Data Pimpinan"}
          </button>
        </div>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 bg-white rounded-xl shadow-xl border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
              >
                <option value="cabang">Pimpinan Cabang (PC)</option>
                <option value="ranting">Pimpinan Ranting (PR)</option>
              </select>
              <input 
                type="text"
                required
                placeholder="Nama Pimpinan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
              />
              <input 
                type="text"
                placeholder="Lokasi/Kecamatan"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
              />
              <button type="submit" className="md:col-span-3 bg-ipm-yellow text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                Simpan Data
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${color} p-8 rounded-3xl border border-white/50 backdrop-blur-sm`}
    >
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <div className="text-4xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-bold text-gray-600 tracking-wider">{label}</div>
    </motion.div>
  );
}
