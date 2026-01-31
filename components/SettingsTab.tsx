
import React from 'react';

interface SettingsTabProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto bg-gray-50 dark:bg-black transition-colors">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Sozlamalar</h1>
          <p className="text-gray-500 dark:text-zinc-400">Ilovani o'zingizga moslashtiring.</p>
        </header>

        <section className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5">
            <h3 className="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-6">Tizim Ko'rinishi</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                  {isDarkMode ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707" /></svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Tungi rejim</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500">Kuzga qulay interfeys</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5">
            <h3 className="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-6">Muloqot Tili</h3>
            <div className="grid grid-cols-1 gap-4">
              {['O\'zbekcha', 'Русский', 'English'].map((lang) => (
                <button 
                  key={lang}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    lang === 'O\'zbekcha' 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="font-semibold">{lang}</span>
                  {lang === 'O\'zbekcha' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-[0.2em] mb-2">Ishlab chiqaruvchi</p>
            <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">© 2024 Mehnat Muhofazasi AI. Barcha huquqlar himoyalangan.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsTab;
