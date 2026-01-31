
import React from 'react';

const TelegramTab: React.FC = () => {
  return (
    <div className="p-8 h-full bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Telegram Bot Integratsiyasi</h1>
          <p className="text-gray-500 text-lg">Mehnat AI doimo yoningizda – hatto Telegram'da ham!</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-black/5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
              Botni faollashtirish
            </h3>
            <p className="text-gray-600 mb-6">Telegram ilovasida qidiruv tugmasini bosing va @MehnatMuhofazasiAIBot deb yozing yoki quyidagi tugmani bosing.</p>
            <button className="w-full bg-[#0088cc] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#0088cc]/20 hover:bg-[#0077b5] transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.18z"/></svg>
              Telegramda ochish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Imkoniyatlar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">✅ Matnli savol-javob</li>
                <li className="flex items-center gap-2">✅ Ovozli xabarlarni tushunish</li>
                <li className="flex items-center gap-2">✅ PDF hujjatlarni tahlil qilish</li>
                <li className="flex items-center gap-2">✅ 24/7 yordam</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Korxonalar uchun</h4>
              <p className="text-sm text-gray-600 mb-4">Botni xodimlar o'rtasida tarqatish uchun maxsus QR-koddan foydalaning.</p>
              <button className="text-blue-600 text-sm font-bold hover:underline">QR-kodni yuklab olish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramTab;
