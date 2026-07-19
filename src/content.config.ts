import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    price: z.number().nullable(), // null = free
    format: z.string(), // e.g. "XLSX", "DOCX — 3 pages"
    formatTag: z.string(), // short badge, e.g. "LIVE FORMULAS", "3 PAGES"
    category: z.string(), // slug of parent category
    differentiator: z.string(), // one-line "why this, not a static template"
    description: z.string(),
    whatsInside: z.array(z.string()),
    whoFor: z.string(),
    checkoutUrl: z.string(), // Payhip direct checkout link
    cardStyle: z.enum(['paper', 'dark']).default('paper'),
    heroTag: z.string(), // small badge shown on card, e.g. "BALANCES TO $0"
    featured: z.boolean().default(false), // shows in "Where to Start"
    order: z.number().default(0),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

const bundles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/bundles' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    price: z.number(),
    description: z.string(),
    productSlugs: z.array(z.string()), // slugs referencing products collection
    checkoutUrl: z.string(),
    featured: z.boolean().default(true),
  }),
});

export const collections = { products, categories, bundles };
