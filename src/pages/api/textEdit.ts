import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { text, isGrammarCheck = false, isFormatCheck = false, strongKeepingStyle = false } = req.body;

    const normalized = text.replace(/([^\n])\n([^\n])/g, "$1\n\n$2");

    // const systemPrompt = `
    //     Ты — умный текстовый корректор.

    //     Исправь ${isGrammarCheck ? "грамматические," : ""
    //     } орфографические ошибки в тексте пользователя.${isFormatCheck
    //         ? " Также добавь недостающую пунктуацию (точки, заглавные буквы и т.д.)."
    //         : " Не исправляй пунктуацию, оформление предложений и не добавляй заглавные буквы, если их нет."
    //     }

    //     Правила:
    //     ${strongKeepingStyle
    //         ? `
    //             - Вообще ни в коем случае не изменяй смысл и стиль автора. Все разговорные и стилистические выражения оставь как есть.
    //             - Разговорные или эмоциональные слова вроде "ваще", "канешна", "чё", "шо", "типо", "щя" не считаются ошибками — оставляй их как есть, даже если они не соответствуют литературным нормам.
    //         `
    //         : "- Если встречаются слова вроде 'ваще', 'канешна', 'чё', 'шо', 'типо', 'щя' и все тому подобные — замени их на правильные литературные формы."
    //     }
    //     - Под \"ошибками\" понимаются только неправильные буквы, окончания и написания слов. 
    //     ${isFormatCheck ? "- Сделай предложения с правильной пунктуацией и заглавными буквами." : ""}
    //     - Не переписывай фразы, не добавляй и не убирай слова без необходимости.
    //     - Сохраняй все переносы строк и пустые абзацы.

    //     Верни ответ СТРОГО в формате JSON:
    //     {
    //         "outputText": "тот же текст, но с HTML-тегами <span> вокруг исправленных мест"
    //     }

    //     Проверь, что JSON синтаксически корректен перед отправкой.
    // `;

    const systemPrompt = `
        Ты — умный текстовый корректор. 
        Твоя задача: исправить ${isGrammarCheck ? "грамматические и орфографические" : "орфографические"} ошибки. 
        ${isFormatCheck
            ? "Добавь недостающую пунктуацию и заглавные буквы."
            : "Не меняй пунктуацию и регистр."
        }

        Правила:
        - ${strongKeepingStyle
            ? "Не изменяй стиль и смысла автора. Разговорные формы («ваще», «шо», «типо» и т.п.) оставляй как есть. Даже если это ошибки"
            : "Заменяй разговорные формы («ваще», «шо», «типо») на литературные."}
        - Исправляй только реальные ошибки (буквы, окончания, написание).
        - Не добавляй и не удаляй слова без причины.
        - Сохраняй все переносы строк.

        Формат ответа (валидный JSON):
        {
            "outputText": "Исправленный текст. Используй теги <span> только вокруг слов, где были исправления, а не вокруг каждой буквы."
        }
    `;

    try {
        const start = Date.now();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: normalized },
            ],
            temperature: 0,
        });
        console.log("⏱ OpenAI latency:", ((Date.now() - start) / 1000).toFixed(2), "s");

        const content = response.choices[0].message?.content || "";

        let parsed;
        try {
            parsed = JSON.parse(content);
        } catch (err) {
            parsed = { outputText: content };
        }

        // console.log(parsed);

        res.status(200).json({ result: parsed });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Failed to process text", details: String(error) });
    }
};