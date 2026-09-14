import { useEffect, useState } from 'react';
import { translations } from '../i18n/translations.js';

function applyTranslations(lang) {
  const dict = translations[lang] || translations.es;
  document.documentElement.lang = lang;
  // text
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let val = dict;
    for (const k of keys) {
      if (val && k in val) val = val[k];
      else { val = null; break; }
    }
    if (typeof val === 'string') {
      // support {year} placeholder
      if (val.includes('{year}')) val = val.replace('{year}', new Date().getFullYear());
      el.textContent = val;
    }
  });
  // placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let val = dict;
    for (const k of keys) {
      if (val && k in val) val = val[k];
      else { val = null; break; }
    }
    if (typeof val === 'string') el.placeholder = val;
  });
  // dispatch event for React components that need it
  window.dispatchEvent(new CustomEvent('lang-change', { detail: lang }));
}

export default function LanguageToggle() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
    applyTranslations(saved);
    const handler = (e) => {
      if (e.key === 'lang' && e.newValue) {
        setLang(e.newValue);
        applyTranslations(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    const custom = (e) => {
      setLang(e.detail);
    };
    window.addEventListener('lang-change', custom);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('lang-change', custom);
    };
  }, []);

  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', next);
    setLang(next);
    applyTranslations(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2C2C2E] bg-[#111113] px-2.5 py-1.5 text-xs font-mono font-bold tracking-widest text-white hover:border-[#7FA6A0]/40 hover:text-[#7FA6A0] transition-colors"
      title={lang === 'es' ? 'Cambiar a English' : 'Switch to Español'}
    >
      <span className={lang === 'es' ? 'text-[#7FA6A0]' : 'text-[#A1A1AA]'}>ES</span>
      <span className="text-[#2C2C2E]">/</span>
      <span className={lang === 'en' ? 'text-[#7FA6A0]' : 'text-[#A1A1AA]'}>EN</span>
    </button>
  );
}

// also export for non-React usage
export { applyTranslations };
