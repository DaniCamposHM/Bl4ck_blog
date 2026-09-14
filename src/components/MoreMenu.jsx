import { useState, useEffect, useRef } from 'react';
import { translations } from '../i18n/translations.js';

export default function MoreMenu({ navMore, pathname }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const [currentPath, setCurrentPath] = useState(pathname || '/');
  const ref = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
    const handler = (e) => setLang(e.detail);
    window.addEventListener('lang-change', handler);

    const updatePath = () => setCurrentPath(window.location.pathname);
    document.addEventListener('astro:page-load', updatePath);
    document.addEventListener('astro:after-swap', updatePath);

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('lang-change', handler);
      document.removeEventListener('astro:page-load', updatePath);
      document.removeEventListener('astro:after-swap', updatePath);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = (key, fallback) => {
    const keys = key.split('.');
    let val = translations[lang] || translations.es;
    for (const k of keys) { if (val && k in val) val = val[k]; else return fallback; }
    return typeof val === 'string' ? val : fallback;
  };

  const isMoreActive = navMore.some(n => currentPath.startsWith(n.href)) || currentPath.startsWith('/curriculum');

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${isMoreActive ? 'bg-[#2C2C2E] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]'}`}
        aria-expanded={open}
      >
        <span>{t('nav.more', 'Más')}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-[#2C2C2E] bg-[#111113] p-2 shadow-xl z-50">
          {navMore.map((item) => {
            const active = currentPath.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${active ? 'bg-[#2C2C2E] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]'}`}
              >
                <span>{t(item.key, item.fallback)}</span>
                <span className="rounded-full bg-[#DF2531]/10 border border-[#DF2531]/20 px-2 py-0.5 text-[10px] font-medium text-[#DF2531]">{t('nav.soon', 'Próximamente')}</span>
              </a>
            );
          })}
          <hr className="my-2 border-[#2C2C2E]" />
          <a
            href="/curriculum"
            onClick={() => setOpen(false)}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${currentPath.startsWith('/curriculum') ? 'bg-[#2C2C2E] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            <span>{t('nav.curriculum', 'Curriculum')}</span>
            <span className="rounded-full bg-[#DF2531]/10 border border-[#DF2531]/20 px-2 py-0.5 text-[10px] text-[#DF2531]">{t('nav.soon', 'Próximamente')}</span>
          </a>
        </div>
      )}
    </div>
  );
}
