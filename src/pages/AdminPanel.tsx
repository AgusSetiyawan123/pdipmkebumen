import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { News, Stats, StatItem } from "../types";
import { fetchNews, fetchStats, postNews, postStat, deleteNews, deleteStat } from "../services/api";
import { Plus, Trash2, Newspaper, BarChart2, LogOut, Save, X, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [news, setNews] = useState<News[]>([]);
  const [stats, setStats] = useState<Stats>({ cabang: [], ranting: [] });
  const [activeTab, setActiveTab] = useState<"news" | "stats">("news");
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isAddingStat, setIsAddingStat] = useState(false);
  
  // News Form State
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    author: "Admin PD IPM Kebumen",
    image_url: ""
  });

  // Stat Form State
  const [statForm, setStatForm] = useState({
    type: "cabang" as "cabang" | "ranting",
    name: "",
    location: ""
  });

  const loadData = async () => {
    const [newsData, statsData] = await Promise.all([fetchNews(), fetchStats()]);
    setNews(newsData);
    setStats(statsData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ipmkebumen") {
      setIsAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ipm-dark flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <img src="https://ipmkotabatik.vercel.app/image/1703988886251.png" alt="Logo" className="w-16 h-auto mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-1">Masukkan password untuk mengelola konten.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-green font-medium"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full py-5 bg-ipm-green text-white font-black rounded-2xl hover:bg-ipm-dark transition-all tracking-widest text-sm shadow-xl shadow-ipm-green/20">
              Masuk ke Panel
            </button>
            <Link to="/" className="block text-center text-xs font-bold text-gray-400 hover:text-ipm-green transition-colors tracking-widest">
              Kembali ke Beranda
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    await postNews(newsForm);
    setNewsForm({ title: "", content: "", author: "Admin PD IPM Kebumen", image_url: "" });
    setIsAddingNews(false);
    loadData();
  };

  const handleAddStat = async (e: React.FormEvent) => {
    e.preventDefault();
    await postStat(statForm);
    setStatForm({ type: "cabang", name: "", location: "" });
    setIsAddingStat(false);
    loadData();
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm("Hapus berita ini?")) {
      await deleteNews(id);
      loadData();
    }
  };

  const handleDeleteStat = async (id: number) => {
    if (confirm("Hapus data ini?")) {
      await deleteStat(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ipm-dark text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="https://ipmkotabatik.vercel.app/image/1703988886251.png" alt="Logo" className="w-8 h-auto" />
            <span className="font-black text-lg tracking-tighter">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("news")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === "news" ? "bg-ipm-green text-white" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Newspaper size={18} /> Kelola Berita
          </button>
          <button 
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === "stats" ? "bg-ipm-green text-white" : "text-gray-400 hover:bg-white/5"}`}
          >
            <BarChart2 size={18} /> Kelola Cabang/Ranting
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 font-bold text-sm transition-all">
            <LayoutDashboard size={18} /> Lihat Website
          </Link>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all mt-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {activeTab === "news" ? "Manajemen Berita" : "Manajemen Cabang & Ranting"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Kelola konten website PD IPM Kebumen dengan mudah.</p>
          </div>
          
          <button 
            onClick={() => activeTab === "news" ? setIsAddingNews(true) : setIsAddingStat(true)}
            className="flex items-center gap-2 bg-ipm-green text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all tracking-widest text-xs"
          >
            <Plus size={18} /> Tambah Data Baru
          </button>
        </header>

        {activeTab === "news" ? (
          <div className="grid gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={item.image_url || "https://picsum.photos/seed/news/200/200"} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-1">{item.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] font-bold text-ipm-green tracking-widest bg-ipm-green/5 px-2 py-1 rounded-md">{item.author}</span>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteNews(item.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Cabang */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-2">
                <div className="w-2 h-6 bg-ipm-green rounded-full"></div> Pimpinan Cabang
              </h2>
              <div className="space-y-4">
                {stats.cabang.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteStat(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranting */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-2">
                <div className="w-2 h-6 bg-ipm-yellow rounded-full"></div> Pimpinan Ranting
              </h2>
              <div className="space-y-4">
                {stats.ranting.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteStat(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add News Modal */}
      {isAddingNews && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ipm-dark/80 backdrop-blur-sm" onClick={() => setIsAddingNews(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 bg-ipm-green text-white flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Tambah Berita Baru</h3>
              <button onClick={() => setIsAddingNews(false)} className="p-2 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddNews} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Judul Berita</label>
                <input 
                  required
                  type="text" 
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-green font-medium"
                  placeholder="Masukkan judul berita..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Konten Berita</label>
                <textarea 
                  required
                  rows={4}
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-green font-medium resize-none"
                  placeholder="Tulis isi berita di sini..."
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Penulis</label>
                  <input 
                    required
                    type="text" 
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-green font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">URL Gambar (Opsional)</label>
                  <input 
                    type="url" 
                    value={newsForm.image_url}
                    onChange={(e) => setNewsForm({...newsForm, image_url: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-green font-medium"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-ipm-green text-white font-black rounded-2xl hover:bg-ipm-dark transition-all tracking-widest text-sm shadow-xl shadow-ipm-green/20">
                Simpan Berita
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Stat Modal */}
      {isAddingStat && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ipm-dark/80 backdrop-blur-sm" onClick={() => setIsAddingStat(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 bg-ipm-yellow text-white flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight">Tambah Cabang/Ranting</h3>
              <button onClick={() => setIsAddingStat(false)} className="p-2 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddStat} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Tingkatan</label>
                <select 
                  value={statForm.type}
                  onChange={(e) => setStatForm({...statForm, type: e.target.value as "cabang" | "ranting"})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-yellow font-medium"
                >
                  <option value="cabang">Pimpinan Cabang (PC)</option>
                  <option value="ranting">Pimpinan Ranting (PR)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Nama Organisasi</label>
                <input 
                  required
                  type="text" 
                  value={statForm.name}
                  onChange={(e) => setStatForm({...statForm, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-yellow font-medium"
                  placeholder="Contoh: PC IPM Kebumen"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2">Lokasi/Kecamatan</label>
                <input 
                  required
                  type="text" 
                  value={statForm.location}
                  onChange={(e) => setStatForm({...statForm, location: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-ipm-yellow font-medium"
                  placeholder="Contoh: Kebumen"
                />
              </div>
              <button type="submit" className="w-full py-5 bg-ipm-yellow text-white font-black rounded-2xl hover:bg-ipm-dark transition-all tracking-widest text-sm shadow-xl shadow-ipm-yellow/20">
                Simpan Data
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
