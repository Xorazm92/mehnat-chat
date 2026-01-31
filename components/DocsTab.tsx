
import React, { useState } from 'react';
import { POPULAR_LAWS } from '../constants';

const DocsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = POPULAR_LAWS.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12 h-full overflow-y-auto bg-gray-50 dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Hujjatlar Kutubxonasi</h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400">Mehnat xavfsizligiga oid barcha amaldagi qonunlar.</p>
        </header>

        <div className="mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Hujjat nomi yoki turini yozing..." 
            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-black/5 dark:border-white/10 focus:ring-4 ring-blue-500/10 transition-all text-gray-800 dark:text-white shadow-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
                  {doc.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {doc.title}
              </h3>
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Hujjatni o'qish
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          ))}
        </div>

        {/* Footer Banner */}
        <div className="mt-16 bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tighter">Yangi o'zgarishlardan xabardor bo'ling</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl">O'zbekiston Respublikasi Bandlik va mehnat munosabatlari vazirligi portali orqali eng so'nggi normativ hujjatlarni kuzatib boring.</p>
            <a 
              href="https://gov.uz/oz/bv/sections/mehnatni-muhofaza-qilish-sohasiga-oid-normativ-huquqiy-hujjatlar" 
              target="_blank" 
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Gov.uz saytiga o'tish
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -mb-20 -mr-20"></div>
        </div>
      </div>
    </div>
  );
};

export default DocsTab;
