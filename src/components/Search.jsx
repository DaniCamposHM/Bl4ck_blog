import { useEffect, useState, useMemo } from 'react';
import { translations } from '../i18n/translations.js';

export default function Search() {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    fetch('/api/search-index.json')
      .then((r) => r.json())
      .then((data) => {
        setIndex(data);
        setLoaded(true);
      });
    const handler = (e) => setLang(e.detail);
    window.addEventListener('lang-change', handler);
    return () => window.removeEventListener('lang-change', handler);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }, [query]);

  const results = useMemo(() => {
    if (!query.trim()) return index;
    const q = query.toLowerCase();
    return index.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.collection.toLowerCase().includes(q)
    );
  }, [query, index]);

  const isDangerTag = (t) => ['cve','vuln','vulnerability','exploit','rce','critical'].some(k => t.toLowerCase().includes(k));
  const dict = translations[lang] || translations.es;
  const sp = dict.searchPage;

  return (
    <div>
      <div className="relative max-w-xl">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={sp.placeholder}
          className="w-full rounded-lg border border-[#2C2C2E] bg-[#111113] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-[#A1A1AA] outline-none"
        />
      </div>

      <p className="mt-4 text-xs text-[#A1A1AA]">
        {loaded ? `${results.length} ${results.length === 1 ? sp.results : sp.results_plural}${query ? ` ${sp.for} "${query}"` : ''}` : sp.loading}
      </p>

      <div className="mt-6 grid gap-3">
        {results.map((p) => (
          <a key={`${p.collection}/${p.slug}`} href={`/${p.collection}/${p.slug}`} className="rounded-xl border border-[#2C2C2E] bg-[#111113] p-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded bg-[#2C2C2E] px-2 py-0.5 font-mono text-[#7FA6A0] uppercase">{p.collection}</span>
              <span className="text-[#A1A1AA]">{new Date(p.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES')}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white">{p.title}</h3>
            <p className="mt-1 text-xs text-[#A1A1AA]">{p.description}</p>
            {p.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.slice(0,4).map((t) => (
                  <span key={t} className={`rounded-full border px-2 py-0.5 text-[10px] ${isDangerTag(t) ? 'border-[#DF2531]/30 bg-[#DF2531]/10 text-[#DF2531]' : 'border-[#2C2C2E] bg-[#2C2C2E] text-[#7FA6A0]'}`}>#{t}</span>
                ))}
              </div>
            )}
          </a>
        ))}
        {loaded && results.length === 0 && (
          <p className="rounded-xl border border-[#2C2C2E] bg-[#111113] p-8 text-center text-sm text-[#A1A1AA]">{sp.noResults}</p>
        )}
      </div>
    </div>
  );
}
