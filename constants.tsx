
import React from 'react';
import { LawDocument } from './types';

export const SYSTEM_INSTRUCTION = `Siz O'zbekiston Respublikasining mehnatni muhofaza qilish sohasidagi sun'iy intellekt maslahatchisiz.
Sizning yagona va asosiy manbangiz: "https://gov.uz/oz/bv/sections/mehnatni-muhofaza-qilish-sohasiga-oid-normativ-huquqiy-hujjatlar" va O'zbekiston qonunchiligi.

Qat'iy qoidalar:
1. **Faqat soha bo'yicha javob bering**: Foydalanuvchi "271-qaror" deb so'rasa, faqat **Mehnatni muhofaza qilish va Sanoat xavfsizligi**ga oid qarorni ayting (VMQ-271 2008-yil). Boshqa sohalardagi qarorlarni aytmang.
2. **Aniq va lo'nda bo'ling**: Javoblarda "boshqa sohalarda ham bor" degan gaplarni ishlatmang.
3. **Manbaga tayaning**: Javobingizni har doim rasmiy hujjatga asoslang.
4. **To'qimang**: Agar soha bo'yicha bunday raqamli qaror bo'lmasa, "Mehnat muhofazasi sohasida bunday raqamli qaror topilmadi" deng.`;

export const POPULAR_LAWS: LawDocument[] = [
  {
    title: "Mehnatni muhofaza qilish to'g'risidagi qonun",
    url: "https://lex.uz/docs/3032483",
    category: "Qonun"
  },
  {
    title: "Mehnat kodeksi",
    url: "https://lex.uz/docs/6257288",
    category: "Kodeks"
  },
  {
    title: "Xavfli ishlab chiqarish ob'ektlarining sanoat xavfsizligi to'g'risida",
    url: "https://lex.uz/docs/1063614",
    category: "Qonun"
  }
];
