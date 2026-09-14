import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const all = await Promise.all([
    getCollection('articles'),
    getCollection('guides'),
    getCollection('research'),
    getCollection('writeups'),
    getCollection('linux'),
    getCollection('games'),
    getCollection('projects'),
  ]);

  const posts = all
    .flat()
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'BL4CKJACKHM',
    description: 'Blog de cybersecurity — investigacion, guias y writeups.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.collection}/${post.id.replace(/\.mdx?$/, '')}/`,
      categories: post.data.tags,
    })),
  });
}
