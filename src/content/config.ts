import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    lang: z.enum(['zh', 'en', 'ja', 'hi']),
    tags: z.array(z.string()).default([]),
    image: z.string().default('/images/kailash-golden.jpg'),
  }),
});

const codex = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'geography',    // 地理
      'religion',     // 宗教意义
      'history',      // 历史
      'figures',      // 人物
      'myths',        // 神话传说
      'nature',       // 自然生态
      'pilgrimage',   // 朝圣实践
    ]),
    categoryZh: z.string(),
    lang: z.enum(['zh', 'en', 'ja', 'hi']),
    order: z.number().default(0),
    image: z.string().default('/images/kailash-golden.jpg'),
  }),
});

export const collections = { blog, codex };
