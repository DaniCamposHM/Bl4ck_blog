#!/usr/bin/env node
// Sincroniza badges públicos desde Credly a src/data/credlyBadges.json
// Uso: node scripts/sync-credly.mjs [username]  — default: daniel-campos-dalence
import { writeFile } from 'node:fs/promises';

const username = process.argv[2] || 'daniel-campos-dalence';
const url = `https://www.credly.com/users/${username}/badges.json`;

console.log(`Fetching ${url} ...`);
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
const json = await res.json();

const badges = (json.data || [])
  .filter(b => b.public && b.state === 'accepted')
  .map(b => ({
    id: b.id,
    name: b.badge_template.name,
    issuer: b.badge_template.issuer?.entities?.[0]?.entity?.name || b.issuer?.entities?.[0]?.entity?.name || 'Credly',
    issuerUrl: b.badge_template.issuer?.entities?.[0]?.entity?.vanity_url || b.badge_template.url || undefined,
    image: b.image_url,
    publicUrl: `https://www.credly.com/badges/${b.id}/public_url`,
    issuedAt: b.issued_at_date || b.issued_at?.slice(0,10),
    description: b.badge_template.description?.slice(0,160) || '',
    level: b.badge_template.level || undefined,
  }));

console.log(`Found ${badges.length} public badges:`);
for (const b of badges) console.log(` - ${b.name} (${b.issuer}) -> ${b.publicUrl}`);

await writeFile('src/data/credlyBadges.json', JSON.stringify(badges, null, 2) + '\n', 'utf8');
console.log(`\nWrote src/data/credlyBadges.json`);
