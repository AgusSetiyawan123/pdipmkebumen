import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, Minimize2, Maximize2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../services/gemini";
import Markdown from "react-markdown";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const initialMessage = { role: "model", parts: [{ text: "Assalamu'alaikum! Saya asisten AI IPM Kebumen. Ada yang bisa saya bantu hari ini?" }] };
  const [messages, setMessages] = useState<{ role: string, parts: { text: string }[] }[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    
    // Add user message to UI
    const newUserMessage = { role: "user", parts: [{ text: userMessage }] };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Send history to AI
      const aiResponse = await chatWithAI(userMessage, messages);
      setMessages(prev => [...prev, { role: "model", parts: [{ text: aiResponse }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi nanti." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ${
              isMinimized ? "h-16 w-72" : "h-[600px] w-[420px] max-w-[95vw]"
            }`}
          >
            {/* Header */}
            <div className="bg-ipm-green p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Asisten IPM Kebumen</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] opacity-80 tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!isMinimized && (
                  <button 
                    onClick={clearChat} 
                    title="Hapus Percakapan"
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-ipm-green text-white rounded-tr-none' 
                          : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                      }`}>
                        <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-white prose-a:text-ipm-green">
                          <Markdown>{msg.parts[0].text}</Markdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                        <span className="w-1.5 h-1.5 bg-ipm-green rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-ipm-green rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-ipm-green rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2 shrink-0">
                  <input
                    type="text"
                    placeholder="Tanyakan sesuatu..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ipm-green outline-none text-sm transition-all"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="bg-ipm-green text-white p-3 rounded-xl hover:bg-ipm-dark transition-all shadow-lg shadow-ipm-green/20 disabled:opacity-50 disabled:shadow-none"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-ipm-green text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-ipm-green/40 hover:bg-ipm-dark transition-all relative group"
        >
          <MessageSquare size={28} />
          <span className="absolute -top-2 -right-2 bg-ipm-yellow text-gray-900 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white">
            AI
          </span>
          <div className="absolute right-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Butuh bantuan? Tanya AI kami!
          </div>
        </motion.button>
      )}
    </div>
  );
}
