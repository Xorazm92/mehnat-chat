
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

const SYSTEM_INSTRUCTION = `Siz O'zbekiston Respublikasining mehnatni muhofaza qilish sohasidagi sun'iy intellekt maslahatchisiz.
Sizning yagona va asosiy manbangiz: "https://gov.uz/oz/bv/sections/mehnatni-muhofaza-qilish-sohasiga-oid-normativ-huquqiy-hujjatlar" va O'zbekiston qonunchiligi.

Qat'iy qoidalar:
1. **Faqat soha bo'yicha javob bering**: Foydalanuvchi "271-qaror" yoki "60-qaror" desa, faqat va faqat **Mehnatni muhofaza qilish va Sanoat xavfsizligi**ga oid qarorni izlang. Boshqa sohalardagi (ta'lim, qishloq xo'jaligi va h.k.) shu raqamli qarorlarni umuman tilga olmang.
2. **Aniq va lo'nda bo'ling**: Agar qaror soha bo'yicha bo'lsa, uning to'liq nomi, sanasi va mazmunini ayting.
3. **Manbaga tayaning**: Javobingizni har doim rasmiy hujjatga asoslang.
4. **To'qimang**: Agar soha bo'yicha bunday raqamli qaror bo'lmasa, "Mehnat muhofazasi sohasida bunday raqamli qaror topilmadi" deng.

Misollar:
- "271 qaror" -> Faqat VMQ-271 "Xavfli ishlab chiqarish obyektlarining sanoat xavfsizligi to'g'risida" (2008).
- "286 qaror" -> Faqat VMQ-286 "Mehnatni muhofaza qilish bo'yicha me'yoriy hujjatlarni tasdiqlash to'g'risida" (2005).
- "60 qaror" -> Faqat VMQ-60 "Mehnatni muhofaza qilishga doir me'yoriy hujjatlarni qayta ko'rib chiqish..." (2000).`;

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
                tools: [{ googleSearch: {} }], // Enable Google Search for bot too
            },
        });

        let replyText = response.text || "Kechirasiz, javob topa olmadim.";

        // Extract sources if available
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map((chunk: any) => chunk.web?.uri)
            ?.filter((uri: string) => uri) || [];

        // Append sources to the text
        if (sources.length > 0) {
            replyText += "\n\n📚 **Manbalar:**\n";
            // Unique sources only, max 3
            [...new Set(sources)].slice(0, 3).forEach((uri: unknown) => {
                replyText += `- [Manba](${uri})\n`;
            });
        }

        // Telegram message length limit is 4096. Split if necessary or send as markdown.
        try {
            await ctx.reply(replyText, { parse_mode: 'Markdown', link_preview_options: { is_disabled: true } });
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
