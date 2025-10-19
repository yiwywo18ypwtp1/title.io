import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { text, titleLength = "medium" } = req.body;

    const getWordLimit = (lengthType: string) => {
        switch (lengthType) {
            case "short": return "очень короткие, 4-5 слова максимум, до 40 символов";
            case "medium": return "средней длины, 6-9 слов, до 80 символов";
            case "long": return "развернутые, 9-12 слов, до 120 символов";
            default: return "";
        }
    }

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    if (text.trim().length < 100) {
        return res.status(400).json({ error: "Text must be at least 100 characters" });
    }

    const prompt = `
        Придумай 3 заголовка к этому тексту. 
        Требования:
        - Максимально подходящие по смыслу
        - Длина: ${getWordLimit(titleLength)}
        - Верни результат строго в формате JSON массива
        - Никаких комментариев, без пояснений — просто массив: ["заголовок 1", "заголовок 2", "заголовок 3"]

        Текст: ${text}
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ result: response.choices[0].message.content });
}