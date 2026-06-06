import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    lang: z.enum(['zh', 'en']),
    tags: z.array(z.string()).default([]),
    image: z.string().default('/images/kailash-golden.jpg'),
  }),
});

export const collections = { blog };
