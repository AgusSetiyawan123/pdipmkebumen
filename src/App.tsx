import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import BreakingNews from "./components/BreakingNews";
import Hero from "./components/Hero";
import PrayerTimes from "./components/PrayerTimes";
import Divisions from "./components/Divisions";
import StatsSection from "./components/StatsSection";
import NewsSection from "./components/NewsSection";
import ChatBot from "./components/ChatBot";
import AdminPanel from "./pages/AdminPanel";
import { News, Stats } from "./types";
import { fetchNews, fetchStats } from "./services/api";
import { motion } from "motion/react";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send, ChevronRight } from "lucide-react";

function HomePage({ news, stats, loadData }: { news: News[], stats: Stats, loadData: () => void }) {
  return (
    <div className="min-h-screen bg-white selection:bg-ipm-green/20 selection:text-ipm-green">
      <Navbar />
      <BreakingNews news={news.map(n => n.title)} />
      
      <main>
        <Hero />
        
        <PrayerTimes />

        <Divisions />
        
        <StatsSection stats={stats} onRefresh={loadData} />
        
        <NewsSection news={news} onRefresh={loadData} />

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                  Mengenal Lebih Dekat <br />
                  <span className="text-ipm-green underline decoration-ipm-yellow decoration-4 underline-offset-8">PD IPM Kebumen</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-600">
                  <p>
                    Ikatan Pelajar Muhammadiyah (IPM) adalah organisasi otonom Muhammadiyah yang merupakan gerakan Islam, dakwah amar ma'ruf nahi munkar di kalangan pelajar, berakidah Islam, dan bersumber pada Al-Qur'an dan As-Sunnah.
                  </p>
                  <p>
                    Pimpinan Daerah IPM Kebumen berkomitmen untuk menjadi rumah bagi seluruh pelajar di Kebumen untuk belajar, berkarya, dan berkolaborasi demi kemajuan bangsa dan agama.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="p-6 bg-ipm-green/5 rounded-3xl border border-ipm-green/10">
                    <h4 className="font-bold text-ipm-green mb-2">Visi</h4>
                    <p className="text-sm text-gray-600">Terwujudnya pelajar muslim yang berilmu, berakhlak mulia, dan terampil.</p>
                  </div>
                  <div className="p-6 bg-ipm-yellow/5 rounded-3xl border border-ipm-yellow/10">
                    <h4 className="font-bold text-ipm-yellow mb-2">Misi</h4>
                    <p className="text-sm text-gray-600">Mengupayakan penguatan intelektualitas dan spiritualitas pelajar.</p>
                  </div>
                </div>
              </motion.div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/kebumen/800/800" 
                  alt="IPM Kebumen Team" 
                  className="rounded-[3rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-[250px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-ipm-green rounded-2xl flex items-center justify-center text-white">
                      <Heart fill="currentColor" />
                    </div>
                    <span className="font-bold text-gray-900">Amanah & Ikhlas</span>
                  </div>
                  <p className="text-sm text-gray-500 italic">"Pelajar Berdaya Nyata"</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ipm-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://ipmkotabatik.vercel.app/image/1703988886251.png" 
                  alt="Logo IPM" 
                  className="h-16 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-black text-2xl leading-none text-white tracking-tighter">
                    PD IPM <span className="text-ipm-yellow">Kebumen</span>
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-1">
                    Pelajar Berdaya Nyata
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Pimpinan Daerah Ikatan Pelajar Muhammadiyah Kebumen adalah organisasi otonom Muhammadiyah yang bergerak di kalangan pelajar.
              </p>
              <div className="flex gap-4">
                <SocialIcon href="https://www.instagram.com/ipm.kebumen/?hl=id" icon={<Instagram size={18} />} />
                <SocialIcon href="#" icon={<Facebook size={18} />} />
                <SocialIcon href="#" icon={<Twitter size={18} />} />
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-lg mb-8 border-b-2 border-ipm-green inline-block pb-1 tracking-tight">Tautan Utama</h4>
              <ul className="space-y-4 text-gray-400 text-sm font-bold">
                <li><a href="#" className="hover:text-ipm-yellow transition-colors flex items-center gap-2"><ChevronRight size={14} /> Beranda</a></li>
                <li><a href="#about" className="hover:text-ipm-yellow transition-colors flex items-center gap-2"><ChevronRight size={14} /> Profil Organisasi</a></li>
                <li><a href="#divisions" className="hover:text-ipm-yellow transition-colors flex items-center gap-2"><ChevronRight size={14} /> Bidang Strategis</a></li>
                <li><a href="#news" className="hover:text-ipm-yellow transition-colors flex items-center gap-2"><ChevronRight size={14} /> Berita & Informasi</a></li>
                <li><a href="#tracking" className="hover:text-ipm-yellow transition-colors flex items-center gap-2"><ChevronRight size={14} /> Tracking Cabang</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 border-b-2 border-ipm-green inline-block pb-1 tracking-tight">Hubungi Kami</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-ipm-green mt-1 shrink-0" />
                  <span>Jl. Indrakila No.38A, Indrakila, Kebumen, Kec. Kebumen, Kabupaten Kebumen, Jawa Tengah 54317</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-ipm-green shrink-0" />
                  <span>ipmkebumen@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-ipm-green shrink-0" />
                  <span>+62 813 2805 3461</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-8 border-b-2 border-ipm-green inline-block pb-1 tracking-tight">Lokasi Kami</h4>
              <div className="rounded-xl overflow-hidden h-48 bg-gray-800 border border-gray-700">
                {/* Map Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-600 flex-col gap-2">
                  <MapPin size={32} />
                  <span className="text-[10px] font-bold tracking-widest">Google Maps PD IPM Kebumen</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs font-bold tracking-widest">
              © {new Date().getFullYear()} PD IPM Kebumen. All Rights Reserved.
            </p>
            <Link to="/admin" className="text-gray-600 hover:text-ipm-green text-[10px] font-bold tracking-widest transition-colors">
              Admin Panel
            </Link>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

export default function App() {
  const [news, setNews] = useState<News[]>([]);
  const [stats, setStats] = useState<Stats>({ cabang: [], ranting: [] });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [newsData, statsData] = await Promise.all([
        fetchNews(),
        fetchStats()
      ]);
      setNews(newsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-ipm-green/20 border-t-ipm-green rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xs text-ipm-green">IPM</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage news={news} stats={stats} loadData={loadData} />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-ipm-green hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
