
import React, { useState } from 'react';
import { POPULAR_LAWS } from '../constants';

const DocsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = POPULAR_LAWS.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Normativ-huquqiy hujjatlar</h1>
          <p className="text-gray-500">Mehnatni muhofaza qilish sohasidagi asosiy qonun va qarorlar to'plami.</p>
        </header>

        <div className="mb-8 flex gap-4">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-black/5 px-4 py-2 flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Hujjatlarni qidirish..." 
              className="bg-transparent border-none focus:ring-0 w-full text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {doc.category}
                </span>
                <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{doc.title}</h3>
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                Hujjatni ko'rish 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">To'liq ro'yxatni ko'rishni xohlaysizmi?</h2>
            <p className="text-blue-100 mb-6 max-w-lg">Vazirlar Mahkamasi va Bandlik vazirligi tomonidan tasdiqlangan barcha normativ hujjatlar rasmiy davlat portallarida mavjud.</p>
            <a 
              href="https://gov.uz/oz/bv/sections/mehnatni-muhofaza-qilish-sohasiga-oid-normativ-huquqiy-hujjatlar" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors"
            >
              Gov.uz portaliga o'tish
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default DocsTab;
