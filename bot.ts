
import { Telegraf } from 'telegraf';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { message } from 'telegraf/filters';

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!BOT_TOKEN) {
    console.error("Xatolik: TELEGRAM_BOT_TOKEN topilmadi .env faylida!");
    process.exit(1);
}

if (!GEMINI_API_KEY) {
    console.error("Xatolik: GEMINI_API_KEY topilmadi .env faylida!");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `Siz O'zbekiston Respublikasining mehnatni muhofaza qilish sohasidagi mutaxassis-maslahatchisiz. 
Sizning asosiy bilim manbangiz: https://gov.uz/oz/bv/sections/mehnatni-muhofaza-qilish-sohasiga-oid-normativ-huquqiy-hujjatlar saytidagi hujjatlar.
Vazifalaringiz:
1. "Mehnatni muhofaza qilish to'g'risida"gi qonun, Mehnat kodeksi va sohaga oid boshqa normativ-huquqiy hujjatlar asosida javob bering.
2. Har doim aniq va rasmiy uslubda, ammo tushunarli tilda muloqot qiling.
3. Agar savol mehnat muhofazasi bilan bog'liq bo'lmasa, muloyimlik bilan sohaga oid savollar berishni so'rang.
4. Javoblaringizda imkon qadar aniq modda va bandlarni ko'rsating.`;

console.log("Mehnat Muxofazasi AI Boti ishga tushmoqda...");

bot.start((ctx) => {
    ctx.reply(`Assalomu alaykum, ${ctx.from.first_name}! 
Men mehnatni muhofaza qilish bo'yicha sun'iy intellekt maslahatchisiman.
Savollaringizni yozib qoldiring, men qonunchilik asosida javob beraman.`);
});

bot.help((ctx) => {
    ctx.reply("Menga mehnat xavfsizligi, jamoa shartnomalari, ish vaqti va dam olish vaqtlari bo'yicha savollar berishingiz mumkin.");
});

bot.on(message('text'), async (ctx) => {
    try {
        const userMessage = ctx.message.text;

        // Show typing status
        await ctx.sendChatAction('typing');

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: userMessage }]
                }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });

        const replyText = response.text || "Kechirasiz, javob topa olmadim.";

        // Telegram message length limit is 4096. Split if necessary or send as markdown.
        try {
            await ctx.reply(replyText, { parse_mode: 'Markdown' });
        } catch (markdownError) {
            console.error("Markdown Error, retrying as text:", markdownError);
            await ctx.reply(replyText); // Fallback to plain text
        }

    } catch (error) {
        console.error("Gemini Error Full:", JSON.stringify(error, null, 2));
        console.error("Gemini Error Message:", error);
        ctx.reply("Kechirasiz, xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.");
    }
});

bot.on(message('voice'), async (ctx) => {
    ctx.reply("Hozircha ovozli xabarlarni to'liq qo'llab-quvvatlay olmayman, lekin tez orada bu funksiya qo'shiladi!");
});

bot.launch(() => {
    console.log("Bot muvaffaqiyatli ishga tushdi!");
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
