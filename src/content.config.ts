import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional().default(false),
  heroImage: z.string().optional(),
});

const writeupSchema = baseSchema.extend({
  platform: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']).optional(),
  os: z.string().optional(),
});

// Use glob per collection with explicit base
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: baseSchema,
});
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: baseSchema,
});
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: baseSchema,
});
const linux = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/linux' }),
  schema: baseSchema,
});
const writeups = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writeups' }),
  schema: writeupSchema,
});
const games = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/games' }),
  schema: baseSchema,
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: baseSchema,
});

export const collections = { articles, guides, research, linux, writeups, games, projects };
