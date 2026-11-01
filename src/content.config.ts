import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Título para <title> (más corto que el H1, máximo ~45 caracteres) */
    seoTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    image: z.string().default("/og-image.jpg"),
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog };
