import { GoogleGenAI } from "@google/genai";

function toSingleWord(text) {
  const cleaned = String(text || "").trim().replace(/\s+/g, " ");
  const first = cleaned.split(" ")[0] || "";
  return first.replace(/[^a-zA-Z0-9_-]/g, "");
}

export async function askGeminiSingleWord(question) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Unavailable";

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Answer with exactly ONE WORD only. No punctuation.\nQuestion: ${question}`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  const one = toSingleWord(resp?.text);
  return one || "Unknown";
}
//optional use ker sakte ha

