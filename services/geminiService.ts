
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

export async function getStylingAdvice(userPrompt: string, chatHistory: any[]) {
  // Initialize inside the function to ensure the most up-to-date environment key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const productList = PRODUCTS.map(p => `${p.name} (${p.category}): ${p.description}`).join('\n');
  
  const systemInstruction = `
    You are the "BrandBear Personal Stylist", an expert in premium classic fashion and modern streetwear.
    Your brand colors are Black, White, and Purple.
    You only recommend products from the BrandBear collection listed below:
    ${productList}
    
    Guidelines:
    - Be sophisticated yet trendy.
    - If a user wants "Classic", suggest velvet blazers, silk shirts, or wool trousers.
    - If a user wants "Streetwear", suggest oversized hoodies, cargo joggers, or graphic tees.
    - Always try to coordinate outfits with our signature colors (Black, White, Purple).
    - Use Indian Rupee (₹) when mentioning prices.
    - Keep responses concise and engaging.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...chatHistory.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble accessing my style guide right now. However, I can still tell you that our Midnight Velvet Blazer is a crowd favorite!";
  }
}
