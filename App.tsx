
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import DocsTab from './components/DocsTab';
import TelegramTab from './components/TelegramTab';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CHAT:
        return <ChatWindow />;
      case AppTab.DOCS:
        return <DocsTab />;
      case AppTab.TELEGRAM:
        return <TelegramTab />;
      case AppTab.SETTINGS:
        return (
          <div className="p-8 h-full bg-white">
            <h1 className="text-2xl font-bold mb-6">Sozlamalar</h1>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Interfeys</h3>
                <div className="flex items-center justify-between">
                  <span>Tungi rejim</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Til</h3>
                <select className="w-full p-3 rounded-xl border border-black/5 bg-white">
                  <option>O'zbekcha</option>
                  <option>Русский</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return <ChatWindow />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile-first Sidebar logic implicitly handled by Sidebar component's CSS */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
