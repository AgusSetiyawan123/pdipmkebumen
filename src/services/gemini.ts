import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithAI(message: string, history: { role: string, parts: { text: string }[] }[]) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "Anda adalah asisten AI untuk website Ikatan Pelajar Muhammadiyah (IPM) Kebumen. Anda ramah, informatif, dan membantu pelajar. Gunakan Bahasa Indonesia yang sopan dan sesekali gunakan istilah khas IPM seperti 'Nuun Wal Qolami Wamaa Yasthuruun' atau 'Salam Pena'. Berikan informasi tentang IPM Kebumen jika ditanya. IPM Kebumen adalah organisasi pelajar di bawah naungan Muhammadiyah di Kabupaten Kebumen.",
    }
  });

  const response = await model;
  return response.text || "Maaf, saya sedang mengalami kendala teknis.";
}
