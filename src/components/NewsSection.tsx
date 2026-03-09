import { motion } from "motion/react";
import { Calendar, User, Image as ImageIcon, Plus, Send, X, ArrowRight } from "lucide-react";
import { News } from "../types";
import { useState } from "react";
import { postNews } from "../services/api";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Markdown from "react-markdown";

interface Props {
  news: News[];
  onRefresh: () => void;
}

export default function NewsSection({ news, onRefresh }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postNews(formData);
    setFormData({ title: '', content: '', author: '', image_url: '' });
    setIsUploading(false);
    onRefresh();
  };

  const latestNews = news.slice(0, 1)[0];
  const otherNews = news.slice(1, 7);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 border-b-2 border-gray-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-ipm-green rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              BERITA <span className="text-ipm-green">TERBARU</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsUploading(!isUploading)}
            className="flex items-center gap-2 bg-ipm-yellow text-gray-900 px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-md"
          >
            {isUploading ? <X size={18} /> : <Plus size={18} />} 
            {isUploading ? "BATAL" : "UPLOAD BERITA"}
          </button>
        </div>

        {isUploading && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-gray-50 p-8 rounded-2xl border border-gray-200"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-900">Buat Berita Baru</h3>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input 
                  type="text"
                  required
                  placeholder="Judul Berita"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
                />
                <input 
                  type="text"
                  required
                  placeholder="Penulis"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
                />
                <input 
                  type="url"
                  placeholder="URL Gambar"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none"
                />
              </div>
              <div className="flex flex-col">
                <textarea 
                  required
                  placeholder="Isi Berita..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="flex-grow w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ipm-green outline-none min-h-[150px]"
                />
                <button type="submit" className="mt-4 bg-ipm-green text-white px-6 py-3 rounded-lg font-bold hover:bg-ipm-dark transition-all">
                  PUBLIKASIKAN
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {news.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Belum ada berita.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Featured News */}
            <div className="lg:col-span-2">
              {latestNews && (
                <motion.article 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={latestNews.image_url || `https://picsum.photos/seed/${latestNews.id}/1200/800`} 
                    alt={latestNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4 text-ipm-yellow text-sm font-bold">
                      <span className="bg-ipm-green text-white px-3 py-1 rounded text-xs">UTAMA</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {format(new Date(latestNews.created_at), "dd MMMM yyyy", { locale: localeId })}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-ipm-yellow transition-colors">
                      {latestNews.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2 text-sm mb-6">
                      <Markdown>{latestNews.content}</Markdown>
                    </p>
                    <button className="flex items-center gap-2 text-white font-bold hover:text-ipm-yellow transition-colors">
                      BACA SELENGKAPNYA <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.article>
              )}
            </div>

            {/* Sidebar News */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold border-b-2 border-ipm-green inline-block mb-2">BERITA LAINNYA</h4>
              {otherNews.map((item) => (
                <div key={item.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={item.image_url || `https://picsum.photos/seed/${item.id}/200/200`} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-ipm-green uppercase">{format(new Date(item.created_at), "dd MMM yyyy", { locale: localeId })}</span>
                    <h5 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-ipm-green transition-colors leading-snug">
                      {item.title}
                    </h5>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                LIHAT SEMUA BERITA
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item, index }: { item: News, index: number }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image_url || `https://picsum.photos/seed/${item.id}/800/600`} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-ipm-yellow text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Kegiatan
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-ipm-green" />
            {format(new Date(item.created_at), "dd MMM yyyy", { locale: localeId })}
          </div>
          <div className="flex items-center gap-1.5">
            <User size={16} className="text-ipm-yellow" />
            {item.author}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-ipm-green transition-colors">
          {item.title}
        </h3>
        <div className="text-gray-600 line-clamp-3 mb-6 text-sm leading-relaxed">
          <Markdown>{item.content}</Markdown>
        </div>
        <div className="mt-auto">
          <button className="text-ipm-green font-bold text-sm flex items-center gap-2 group/btn">
            Baca Selengkapnya 
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
