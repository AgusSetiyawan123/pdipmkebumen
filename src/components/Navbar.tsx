import { motion, AnimatePresence } from "motion/react";
import { Menu, X, PenTool as Pen, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "#" },
    { name: "Profil", href: "#about" },
    { name: "Bidang", href: "#divisions" },
    { name: "Berita", href: "#news" },
    { name: "Tracking", href: "#tracking" },
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-ipm-dark text-white py-2 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-ipm-yellow" />
              <span>ipmkebumen@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-ipm-yellow" />
              <span>+62 813 2805 3461</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/ipm.kebumen/?hl=id" target="_blank" rel="noopener noreferrer" className="hover:text-ipm-yellow transition-colors"><Instagram size={14} /></a>
            <a href="#" className="hover:text-ipm-yellow transition-colors"><Facebook size={14} /></a>
            <a href="#" className="hover:text-ipm-yellow transition-colors"><Twitter size={14} /></a>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-ipm-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <img 
                src="https://ipmkotabatik.vercel.app/image/1703988886251.png" 
                alt="Logo IPM" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-black text-xl leading-none text-ipm-green tracking-tighter">
                  PD IPM <span className="text-ipm-yellow">Kebumen</span>
                </span>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-1">
                  Pelajar Berdaya Nyata
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-ipm-green font-bold text-sm transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/6281328053461" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-ipm-green text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-ipm-dark transition-all shadow-md inline-block"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-800 hover:text-ipm-green font-bold text-lg"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="https://wa.me/6281328053461" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-ipm-green text-white px-5 py-4 rounded-xl font-bold mt-4 inline-block text-center"
                >
                  Hubungi Kami
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
