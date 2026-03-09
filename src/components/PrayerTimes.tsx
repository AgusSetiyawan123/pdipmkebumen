import { motion } from "motion/react";
import { Clock, MapPin, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
  icon: string;
}

export default function PrayerTimes() {
  const [times, setTimes] = useState<PrayerTime[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/1413/${year}/${month}/${day}`);
        const data = await res.json();
        
        if (data.status) {
          const jadwal = data.data.jadwal;
          setDate(jadwal.tanggal);
          setTimes([
            { name: "Imsak", time: jadwal.imsak, icon: "🌙" },
            { name: "Subuh", time: jadwal.subuh, icon: "🌅" },
            { name: "Dzuhur", time: jadwal.dzuhur, icon: "☀️" },
            { name: "Ashar", time: jadwal.ashar, icon: "🌤️" },
            { name: "Maghrib", time: jadwal.maghrib, icon: "🌇" },
            { name: "Isya", time: jadwal.isya, icon: "🌃" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch prayer times", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-ipm-green rounded-xl flex items-center justify-center shadow-md">
                <Clock className="text-white w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Jadwal Sholat</h3>
                <p className="text-ipm-green font-bold text-xs tracking-widest">Kebumen & Sekitarnya</p>
                <p className="text-gray-400 text-[10px] mt-1">{date}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full lg:w-auto">
              {times.map((p, i) => (
                <div
                  key={p.name}
                  className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm hover:border-ipm-green transition-all"
                >
                  <div className="text-xs font-bold text-gray-400 mb-1">{p.name}</div>
                  <div className="text-lg font-black text-ipm-green">{p.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
