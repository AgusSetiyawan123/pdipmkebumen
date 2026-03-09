import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Pelajar Berdaya Nyata",
    subtitle: "Pimpinan Daerah IPM Kebumen",
    description: "Mewujudkan generasi pelajar yang mandiri, kreatif, dan memberikan kontribusi nyata bagi masyarakat Kebumen.",
    image: "https://picsum.photos/seed/ipm-pelajar-1/1920/1080",
    accent: "text-ipm-green"
  },
  {
    id: 2,
    title: "Inovasi & Kreativitas Pelajar",
    subtitle: "Pelajar Berdaya Nyata",
    description: "Mengembangkan potensi minat dan bakat pelajar IPM melalui berbagai program inovatif dan karya nyata.",
    image: "https://picsum.photos/seed/ipm-pelajar-2/1920/1080",
    accent: "text-ipm-yellow"
  },
  {
    id: 3,
    title: "Dakwah & Pengabdian Masyarakat",
    subtitle: "Pelajar Berdaya Nyata",
    description: "Menebar kebermanfaatan dan nilai-nilai keislaman di kalangan pelajar untuk Kebumen yang lebih berkemajuan.",
    image: "https://picsum.photos/seed/ipm-pelajar-3/1920/1080",
    accent: "text-ipm-green"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-ipm-yellow font-black text-lg lg:text-xl mb-4 tracking-[0.2em]">
              {slides[current].subtitle}
            </h2>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tight">
              {slides[current].title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <button className="bg-ipm-green text-white px-8 py-3.5 rounded-lg font-black text-sm hover:bg-ipm-dark transition-all shadow-xl flex items-center gap-2">
                Baca Selengkapnya <ArrowRight size={18} />
              </button>
              <button className="bg-white text-gray-900 px-8 py-3.5 rounded-lg font-black text-sm hover:bg-gray-100 transition-all shadow-xl">
                Profil Kami
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 transition-all rounded-full ${current === i ? "w-10 bg-ipm-yellow" : "w-3 bg-white/50"}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hidden md:block">
        <ChevronLeft size={30} />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hidden md:block">
        <ChevronRight size={30} />
      </button>
    </section>
  );
}
