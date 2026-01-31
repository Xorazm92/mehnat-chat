
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import DocsTab from './components/DocsTab';
import TelegramTab from './components/TelegramTab';
import SettingsTab from './components/SettingsTab';
import BottomNav from './components/BottomNav';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CHAT: return <ChatWindow />;
      case AppTab.DOCS: return <DocsTab />;
      case AppTab.TELEGRAM: return <TelegramTab />;
      case AppTab.SETTINGS: return <SettingsTab isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default: return <ChatWindow />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
