import { useState, useEffect } from 'react';
import { translations } from '../i18n/translations.js';

export default function MobileMenu({ navMain, navMore, nav, pathname }) {
  // compat: old prop `nav` was full list, new props are split
  const main = navMain || nav || [];
  const more = navMore || [];
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
    const handler = (e) => setLang(e.detail);
    window.addEventListener('lang-change', handler);
    return () => window.removeEventListener('lang-change', handler);
  }, []);

  const t = (key, fallback) => {
    const keys = key.split('.');
    let val = translations[lang] || translations.es;
    for (const k of keys) { if (val && k in val) val = val[k]; else return fallback; }
    return typeof val === 'string' ? val : fallback;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#2C2C2E] bg-[#1a1a1a] text-[#A1A1AA] hover:text-white"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#2C2C2E] bg-[#111113] p-2 shadow-xl max-h-[70vh] overflow-auto">
          <nav className="flex flex-col">
            {main.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm ${pathname.startsWith(item.href) ? 'bg-[#2C2C2E] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]'}`}
              >
                {t(item.key, item.fallback)}
              </a>
            ))}
            {more.length > 0 && (
              <>
                <p className="mt-3 px-3 py-1 text-[10px] font-mono tracking-widest text-[#7FA6A0] uppercase">{t('nav.more','Más')} — {t('nav.soon','Próximamente')}</p>
                {more.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${pathname.startsWith(item.href) ? 'bg-[#2C2C2E] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a] opacity-80'}`}
                  >
                    <span>{t(item.key, item.fallback)}</span>
                    <span className="rounded-full bg-[#DF2531]/10 border border-[#DF2531]/20 px-1.5 py-0.5 text-[9px] text-[#DF2531]">{t('nav.soon','Próximamente')}</span>
                  </a>
                ))}
                <a
                  href="/curriculum"
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${pathname.startsWith('/curriculum') ? 'bg-[#2C2C2E] text-white' : 'text-white hover:bg-[#1a1a1a]'}`}
                >
                  <span>{t('nav.curriculum','Curriculum')}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7FA6A0]"></span>
                </a>
              </>
            )}
            <hr className="my-2 border-[#2C2C2E]" />
            <a href="/search" className="rounded-md px-3 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]">{t('nav.search','Buscar')}</a>
            <a href="/about" className="rounded-md px-3 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]">{t('nav.about','Sobre mí')}</a>
          </nav>
        </div>
      )}
    </div>
  );
}
