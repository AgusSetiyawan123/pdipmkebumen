import { motion } from "motion/react";
import { Megaphone } from "lucide-react";

export default function BreakingNews({ news }: { news: string[] }) {
  if (news.length === 0) return null;

  return (
    <div className="bg-gray-100 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-ipm-green text-white px-4 py-2 flex items-center gap-2 shrink-0 z-10 font-bold text-sm">
          <Megaphone size={16} />
          <span className="whitespace-nowrap">Info Terkini</span>
        </div>
        <div className="relative flex-grow h-10 overflow-hidden flex items-center">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-12 whitespace-nowrap text-sm font-medium text-gray-700"
          >
            {news.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-ipm-yellow rounded-full"></span>
                {item}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {news.map((item, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-ipm-yellow rounded-full"></span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
