
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Assalomu alaykum! Men mehnatni muhofaza qilish bo'yicha professional maslahatchiman. Sizga qanday yordam bera olaman?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await geminiService.sendMessage(input, history);
      
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        sources: response.sources
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: 'err',
        role: 'model',
        text: "Kechirasiz, xizmatda vaqtinchalik uzilish yuz berdi. Iltimos, bir ozdan so'ng qaytadan urinib ko'ring.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 glass sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white leading-none">Mehnat AI</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Online</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 bg-gray-50/50 dark:bg-black/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`group flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[90%] md:max-w-[75%]`}>
              <div className={`px-5 py-4 rounded-3xl shadow-sm relative transition-all duration-200 ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 rounded-tl-none border border-black/5 dark:border-white/5'
              }`}>
                <p className="whitespace-pre-wrap leading-[1.6] text-[15px] md:text-[16px] font-normal tracking-tight">{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
                    <p className="text-[9px] uppercase tracking-widest font-bold mb-3 opacity-40">Tizim asoslangan manbalar:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.map((s, idx) => (
                        <a 
                          key={idx} 
                          href={s.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors font-medium border border-black/5 dark:border-white/5"
                        >
                          {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] mt-2 px-1 font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl rounded-tl-none p-5 flex gap-1.5 border border-black/5 dark:border-white/5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-4 md:p-8 glass transition-all">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3 bg-gray-100 dark:bg-zinc-900 rounded-[2rem] p-3 px-6 border border-black/5 dark:border-white/10 focus-within:ring-4 ring-blue-500/10 transition-all">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Maslahatchidan so'rang..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 py-2 resize-none max-h-32 text-[16px]"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-full transition-all flex-shrink-0 mb-0.5 ${
                input.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-gray-300 dark:bg-zinc-800 text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center gap-4 text-[11px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
            <span>Sanoat Xavfsizligi</span>
            <div className="w-1 h-1 bg-gray-300 dark:bg-zinc-800 rounded-full"></div>
            <span>Davlat Standartlari</span>
            <div className="w-1 h-1 bg-gray-300 dark:bg-zinc-800 rounded-full"></div>
            <span>Lex.uz Grounding</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;
