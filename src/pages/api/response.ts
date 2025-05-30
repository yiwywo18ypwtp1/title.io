import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ result: response.choices[0].message.content });
}