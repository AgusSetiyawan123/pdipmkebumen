import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book, Users, Palette, Shield, Heart, Lightbulb, GraduationCap, Globe, X, User, ChevronRight } from "lucide-react";

interface Division {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  structure: {
    ketua: string;
    sekretaris: string;
    anggota: string[];
  };
}

const divisions: Division[] = [
  {
    id: "perkaderan",
    name: "Bidang Perkaderan",
    description: "Jantung organisasi yang fokus pada pembinaan dan pengembangan kualitas kader IPM.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    structure: {
      ketua: "Ahmad Fauzi",
      sekretaris: "Siti Aminah",
      anggota: ["Rizky Ramadhan", "Dewi Lestari", "Budi Santoso"]
    }
  },
  {
    id: "kdi",
    name: "Bidang KDI",
    description: "Kajian Dakwah Islam. Menggerakkan dakwah kreatif dan mencerahkan di kalangan pelajar.",
    icon: <Book className="w-8 h-8" />,
    color: "bg-ipm-green",
    lightColor: "bg-green-50",
    structure: {
      ketua: "Muhammad Ikhsan",
      sekretaris: "Nurul Hidayah",
      anggota: ["Faisal Anwar", "Laila Majnun", "Zaki Mubarok"]
    }
  },
  {
    id: "pip",
    name: "Bidang PIP",
    description: "Pengkajian Ilmu Pengetahuan. Pusat literasi, riset, dan pengembangan intelektual pelajar.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "bg-ipm-yellow",
    lightColor: "bg-yellow-50",
    structure: {
      ketua: "Hendra Wijaya",
      sekretaris: "Putri Rahayu",
      anggota: ["Aditya Pratama", "Siska Amelia", "Rian Hidayat"]
    }
  },
  {
    id: "asbo",
    name: "Bidang ASBO",
    description: "Apresiasi Seni Budaya dan Olahraga. Wadah ekspresi minat dan bakat pelajar Kebumen.",
    icon: <Palette className="w-8 h-8" />,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    structure: {
      ketua: "Guntur Saputra",
      sekretaris: "Maya Indah",
      anggota: ["Bagas Kurniawan", "Intan Permata", "Doni Setiawan"]
    }
  },
  {
    id: "advokasi",
    name: "Bidang Advokasi",
    description: "Pendampingan dan pembelaan hak-hak pelajar serta kebijakan publik yang pro-pelajar.",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    structure: {
      ketua: "Farhan Hakim",
      sekretaris: "Anisa Fitri",
      anggota: ["Eko Prasetyo", "Yuni Kartika", "Agus Salim"]
    }
  },
  {
    id: "ipmawati",
    name: "Bidang Ipmawati",
    description: "Fokus pada pemberdayaan potensi dan isu-isu strategis pelajar perempuan.",
    icon: <Heart className="w-8 h-8" />,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    structure: {
      ketua: "Siti Fatimah",
      sekretaris: "Rina Marlina",
      anggota: ["Hana Pertiwi", "Dina Safitri", "Mega Utami"]
    }
  },
  {
    id: "kreativitas",
    name: "Bidang KPP",
    description: "Kreativitas dan Pengembangan Potensi. Mendorong kemandirian ekonomi dan skill baru.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    structure: {
      ketua: "Rizky Pratama",
      sekretaris: "Indah Sari",
      anggota: ["Taufik Hidayat", "Bella Shofie", "Aris Munandar"]
    }
  },
  {
    id: "lingkungan",
    name: "Bidang Lingkungan",
    description: "Aksi nyata pelestarian lingkungan dan edukasi ekologi bagi generasi muda.",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    structure: {
      ketua: "Wildan Firdaus",
      sekretaris: "Nabila Az-Zahra",
      anggota: ["Galang Rambu", "Citra Kirana", "Fajar Sadboy"]
    }
  }
];

export default function Divisions() {
  const [selectedDiv, setSelectedDiv] = useState<Division | null>(null);

  return (
    <section id="divisions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 border-b-2 border-gray-100 pb-4">
          <div className="w-2 h-10 bg-ipm-yellow rounded-full"></div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Bidang <span className="text-ipm-green">Strategis</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedDiv(div)}
              className="group p-6 rounded-xl border border-gray-200 hover:border-ipm-green hover:shadow-xl transition-all duration-300 bg-gray-50/50 cursor-pointer"
            >
              <div className={`w-14 h-14 ${div.color} text-white rounded-lg flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {div.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-ipm-green transition-colors tracking-tight">
                {div.name}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {div.description}
              </p>
              <div className="mt-4 flex items-center text-[10px] font-bold text-ipm-green tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Lihat Struktur <ChevronRight size={12} className="ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Struktur */}
      <AnimatePresence>
        {selectedDiv && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDiv(null)}
              className="absolute inset-0 bg-ipm-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className={`p-8 ${selectedDiv.color} text-white relative`}>
                <button 
                  onClick={() => setSelectedDiv(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  {selectedDiv.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight">{selectedDiv.name}</h3>
                <p className="text-white/80 text-sm mt-2">{selectedDiv.description}</p>
              </div>

              <div className="p-8">
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 tracking-widest block mb-2">Ketua Bidang</span>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ipm-green/10 rounded-lg flex items-center justify-center text-ipm-green">
                          <User size={16} />
                        </div>
                        <span className="font-bold text-gray-900">{selectedDiv.structure.ketua}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 tracking-widest block mb-2">Sekretaris Bidang</span>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ipm-yellow/10 rounded-lg flex items-center justify-center text-ipm-yellow">
                          <User size={16} />
                        </div>
                        <span className="font-bold text-gray-900">{selectedDiv.structure.sekretaris}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest block mb-4">Anggota Bidang</span>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedDiv.structure.anggota.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                          <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                            <User size={12} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedDiv(null)}
                  className="w-full mt-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-ipm-green transition-colors tracking-widest text-xs"
                >
                  Tutup Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
