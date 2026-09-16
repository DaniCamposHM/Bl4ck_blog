#!/usr/bin/env node
// Sincroniza perfil público TryHackMe a src/data/thmProfile.json (seguro, solo tu perfil)
// Uso: node scripts/sync-thm.mjs [username] [sharerId]
// - Intenta api/v2/badges/public-profile?userPublicId= (legacy numérico y hex sharerId)
// - Decodifica base64 HTML del iframe y extrae rank/streak/badges/rooms/level/avatar
// - Fallback a cache existente si 429/challenge (no bloquea build)
// Ver: https://github.com/umikoio/thm-iframe-parser + https://tryhackme.com/p/<username>

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const username = process.argv[2] || 'Danihm';
const sharerId = process.argv[3] || '648df5009e954d005f6d146e';
const outPath = 'src/data/thmProfile.json';

async function loadCache() {
  try {
    if (existsSync(outPath)) return JSON.parse(await readFile(outPath, 'utf8'));
  } catch {}
  return null;
}

async function fetchBadge(userPublicId) {
  const url = `https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${encodeURIComponent(userPublicId)}`;
  console.log(`Fetching ${url} ...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
    },
  });
  const text = await res.text();
  if (!res.ok) {
    console.log(`  -> HTTP ${res.status} (maybe challenge)`);
    // THM sometimes returns HTML challenge even with 200; detect
    if (text.includes('Vercel Security Checkpoint') || text.includes('challenge')) {
      throw new Error('Vercel challenge / blocked');
    }
    if (res.status === 404) throw new Error('Badge not found for this ID');
    throw new Error(`HTTP ${res.status}`);
  }
  // If challenge HTML without error status
  if (text.includes('Vercel Security Checkpoint') || text.includes('Please enable Cookies')) {
    throw new Error('Vercel challenge');
  }
  return text;
}

function parseBadgeHtml(html) {
  // THM does: document.write(window.atob("BASE64"))
  // Extract base64 string inside atob("...")
  const m = html.match(/atob\("([^"]+)"\)/);
  if (!m) {
    // Fallback: try to find thm-* spans directly in html
    console.log('  No atob found, trying direct parse');
    return parseDecoded(html);
  }
  const b64 = m[1];
  let decoded;
  try {
    decoded = Buffer.from(b64, 'base64').toString('utf8');
  } catch (e) {
    console.log('  base64 decode failed', e.message);
    return null;
  }
  return parseDecoded(decoded);
}

function parseDecoded(decoded) {
  // Look for patterns: class="thm_" etc. Use regex lenient
  // Observed keys: rank, streak, badges, completed rooms, level, avatar
  const get = (re) => {
    const mm = decoded.match(re);
    return mm ? mm[1].trim() : null;
  };
  // Common selectors from thm-iframe-parser.py
  // It parses with BeautifulSoup style but we use regex for zero-dep
  const rank = get(/Rank[^<]*<\/[^>]+>\s*<[^>]+>\s*([0-9,]+)/i) || get(/id="thm_rank"[^>]*>([^<]+)/i) || get(/thm-rank[^>]*>([^<]+)/i);
  const streak = get(/Streak[^<]*<\/[^>]+>\s*<[^>]+>\s*([^<]+)/i) || get(/thm_streak[^>]*>([^<]+)/i) || get(/Streak[^:]*:\s*([^<"\n]+)/i);
  const badges = get(/Badges[^<]*<\/[^>]+>\s*<[^>]+>\s*([0-9]+)/i) || get(/thm_badge[^>]*>([^<]+)/i);
  const completedRooms = get(/Completed\s*Rooms[^<]*<\/[^>]+>\s*<[^>]+>\s*([0-9]+)/i) || get(/thm_completed[^>]*>([^<]+)/i) || get(/Rooms\s*Completed[^:]*:\s*([0-9]+)/i);
  const level = get(/Level[^<]*<\/[^>]+>\s*<[^>]+>\s*(\[0x[0-9a-f]+\][^<]*)/i) || get(/\[0x[^\]]+\][^<]*/i);
  const avatar = get(/<img[^>]+src="([^"]+user-avatars[^"]+)"/i) || get(/ProfileImage["']?\s*:\s*["']([^"']+)/i);
  const username = get(/thm_nickname[^>]*>([^<]+)/i) || get(/Username[^<]*>([^<]+)/i);

  const toInt = (v) => (v ? parseInt(v.replace(/,/g, ''), 10) : null);
  return {
    rank: toInt(rank),
    streak: streak ? streak.trim() : null,
    badges: toInt(badges),
    completedRooms: toInt(completedRooms),
    level: level ? level.trim() : null,
    avatar: avatar || null,
    username: username || null,
    rawSnippet: decoded.slice(0, 400).replace(/\n/g, ' '),
  };
}

async function main() {
  const cache = await loadCache();
  console.log(`THM sync for username=${username} sharerId=${sharerId}`);

  // Try sharerId (hex) first, then try to discover numeric via profile if needed
  const candidates = [sharerId].filter(Boolean);
  // Also try reading numeric from cache if present
  if (cache?.userPublicId && !candidates.includes(cache.userPublicId)) candidates.push(cache.userPublicId);

  let parsed = null;
  let usedId = null;
  let lastErr = null;
  for (const cid of candidates) {
    try {
      const html = await fetchBadge(cid);
      const p = parseBadgeHtml(html);
      if (p && (p.rank || p.badges || p.completedRooms || p.streak)) {
        parsed = p;
        usedId = cid;
        console.log(`  Parsed from ${cid}:`, p);
        break;
      } else {
        console.log(`  Parsed but empty for ${cid}:`, p);
        // still consider success if we got decoded at all
        if (p) { parsed = p; usedId = cid; break; }
      }
    } catch (e) {
      lastErr = e;
      console.log(`  Failed ${cid}: ${e.message}`);
    }
  }

  if (!parsed) {
    console.log(`\nNo live data fetched (${lastErr?.message || 'no candidates'}). Keeping cache.`);
    if (cache) {
      console.log(`Cached stats:`, cache.stats);
      // update fetchedAt anyway
      cache.fetchedAt = new Date().toISOString().slice(0, 10);
      await writeFile(outPath, JSON.stringify(cache, null, 2) + '\n', 'utf8');
      console.log(`\nKept ${outPath} (fallback)`);
      return;
    } else {
      console.log(`No cache, writing placeholder`);
      const placeholder = {
        username,
        publicUrl: `https://tryhackme.com/p/${username}`,
        sharerId,
        badgeShareUrl: `https://tryhackme.com/${username}/badges/terminaled`,
        fetchedAt: new Date().toISOString().slice(0, 10),
        stats: { rank: null, streak: null, badges: 1, completedRooms: 1, level: null, avatar: null },
        note: 'Placeholder — run again when THM badge API accessible',
        badges: [{ name: 'Terminaled', slug: 'terminaled', url: `https://tryhackme.com/${username}/badges/terminaled`, publicUrl: `https://tryhackme.com/${username}/badges/terminaled?sharerId=${sharerId}`, issuer: 'TryHackMe' }],
      };
      await writeFile(outPath, JSON.stringify(placeholder, null, 2) + '\n', 'utf8');
      return;
    }
  }

  const out = {
    username: parsed.username || username,
    publicUrl: `https://tryhackme.com/p/${parsed.username || username}`,
    userPublicId: usedId,
    sharerId,
    badgeShareUrl: `https://tryhackme.com/${username}/badges/terminaled`,
    fetchedAt: new Date().toISOString().slice(0, 10),
    stats: {
      rank: parsed.rank ?? cache?.stats?.rank ?? null,
      streak: parsed.streak ?? cache?.stats?.streak ?? null,
      badges: parsed.badges ?? cache?.stats?.badges ?? 1,
      completedRooms: parsed.completedRooms ?? cache?.stats?.completedRooms ?? 1,
      level: parsed.level ?? cache?.stats?.level ?? null,
      avatar: parsed.avatar ?? cache?.stats?.avatar ?? null,
    },
    note: 'Sincronizado via scripts/sync-thm.mjs — si THM cambia HTML, revisa umikoio/thm-iframe-parser',
    badges: cache?.badges || [
      { name: 'Terminaled', slug: 'terminaled', url: `https://tryhackme.com/${username}/badges/terminaled`, publicUrl: `https://tryhackme.com/${username}/badges/terminaled?sharerId=${sharerId}`, issuer: 'TryHackMe' },
    ],
    debugSnippet: parsed.rawSnippet,
  };

  await writeFile(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`\nWrote ${outPath}`);
  console.log(out.stats);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
