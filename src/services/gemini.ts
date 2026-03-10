import { GoogleGenAI } from "@google/genai";

export async function chatWithAI(message: string, history: { role: string, parts: { text: string }[] }[]) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.error("GEMINI_API_KEY is not configured properly");
      return "Maaf, asisten AI belum dikonfigurasi dengan benar (API Key kosong).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Filter history to ensure it's in the correct format and doesn't have empty parts
    // Also ensure it alternates correctly if possible, but at least remove invalid entries
    const validHistory = history.filter(msg => 
      (msg.role === "user" || msg.role === "model") && 
      msg.parts && msg.parts.length > 0 && msg.parts[0].text.trim() !== ""
    );

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...validHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "Anda adalah asisten AI untuk website Ikatan Pelajar Muhammadiyah (IPM) Kebumen. Anda ramah, informatif, dan membantu pelajar. Gunakan Bahasa Indonesia yang sopan dan sesekali gunakan istilah khas IPM seperti 'Nuun Wal Qolami Wamaa Yasthuruun' atau 'Salam Pena'. Berikan informasi tentang IPM Kebumen jika ditanya. IPM Kebumen adalah organisasi pelajar di bawah naungan Muhammadiyah di Kabupaten Kebumen. Fokus pada pemberdayaan pelajar dan nilai-nilai keislaman yang berkemajuan.",
        temperature: 0.7,
      }
    });

    if (!response.text) {
      return "Maaf, saya tidak menerima respon yang valid dari server AI.";
    }

    return response.text;
  } catch (error) {
    console.error("Error in chatWithAI:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba lagi nanti.";
  }
}
