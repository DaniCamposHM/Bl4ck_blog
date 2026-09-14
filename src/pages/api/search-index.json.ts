import { getCollection } from 'astro:content';

export async function GET() {
  const collections = ['articles', 'guides', 'research', 'linux', 'writeups', 'games', 'projects'] as const;

  const all = await Promise.all(collections.map((c) => getCollection(c as any)));

  const index = all
    .flat()
    .filter((p) => !p.data.draft)
    .map((p) => ({
      slug: p.id.replace(/\.mdx?$/, ''),
      collection: p.collection,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      tags: p.data.tags ?? [],
    }))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
