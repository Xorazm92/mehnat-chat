
import React from 'react';

const TelegramTab: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full bg-white dark:bg-black overflow-y-auto transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-[#0088cc] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Telegram Bot</h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400">Cho'ntagingizdagi aqlli maslahatchi.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-[3rem] p-10 border border-black/5 dark:border-white/5 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bot bilan muloqotni boshlash</h3>
              <p className="text-gray-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">Telegram ilovasida xavfsizlik va mehnat muhofazasi bo'yicha tezkor yordam oling. Botimiz barcha turdagi fayllarni va ovozli xabarlarni tahlil qila oladi.</p>
              <a href="https://t.me/MehnatMuhofazasiAIBot" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-12 py-5 bg-[#0088cc] text-white rounded-full font-bold flex items-center justify-center gap-4 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.18z" /></svg>
                @MehnatMuhofazasiAIBot
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Ovozli yordam', desc: 'Xabarlarni ovozli yo\'llang', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
              { title: 'PDF Tahlil', desc: 'Hujjatlarni yuboring', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { title: '24/7 Xizmat', desc: 'Doimo aloqadamiz', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={item.icon} /></svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramTab;
