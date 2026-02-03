import { GoogleGenAI, Type } from "@google/genai";
import { Quiz } from "../types";

export const generateQuiz = async (topic: string, count: number = 5): Promise<Quiz> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate a high-quality, engaging quiz about "${topic}". 
  The quiz should have exactly ${count} challenging multiple-choice questions. 
  Each question should have 4 options and a detailed explanation of the correct answer.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["id", "question", "options", "correctAnswerIndex", "explanation"]
            }
          }
        },
        required: ["title", "category", "questions"]
      }
    }
  });

  const quizData = JSON.parse(response.text);
  return quizData as Quiz;
};