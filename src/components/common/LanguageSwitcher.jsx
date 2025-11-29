// src/components/common/LanguageSwitcher.jsx
import { useState, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');

  const languages = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語 (Japan)', flag: '🇯🇵' },
    { code: 'ko', label: '한국어 (Korea)', flag: '🇰🇷' },
    { code: 'zh-CN', label: '中文 (China)', flag: '🇨🇳' },
  ];

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(row => row.trim().startsWith('googtrans='));
    if (langCookie) {
      const langCode = langCookie.split('=')[1].split('/').pop();
      setCurrentLang(langCode);
    }
  }, []);

  const changeLanguage = (langCode) => {
    document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    setCurrentLang(langCode);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 px-3 py-2 rounded-lg bg-white md:bg-transparent border md:border-none border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 font-medium text-sm"
      >
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          {/* PERBAIKAN 1: Hapus 'hidden md:inline' agar muncul di mobile */}
          <span>
            {languages.find(l => l.code === currentLang)?.label || 'Bahasa'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          {/* PERBAIKAN 2: Tambahkan max-h-60 dan overflow-y-auto untuk scrolling */}
          <div className="absolute right-0 left-0 md:left-auto mt-2 w-full md:w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto custom-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                  currentLang === lang.code ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  {lang.label}
                </div>
                {currentLang === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}