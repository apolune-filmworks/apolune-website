import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    subtitle: z.string().default(""),
    cardNote: z.string().optional().default(""),
    library: z.boolean().default(true),
    order: z.number().optional().default(0),
    
    // Explicitly providing defaults or fallback strings prevents "Required" errors entirely
    status: z.string().optional().default(""),
    year: z.string().optional().default(""),
    logline: z.string().optional().default(""),
    description: z.string().optional().default(""),
    
    cover: z.string().optional().default(""),
    coverAlt: z.string().optional().default(""),
    libraryCover: z.string().optional().default(""),
    libraryCoverAlt: z.string().optional().default(""),
    showcase: z.string().optional().default(""),
    showcaseAlt: z.string().optional().default(""),
    
    videoEmbed: z.string().optional().default(""),
    additionalVideos: z.array(z.object({ title: z.string(), url: z.string().url() })).optional().default([]),
    gallery: z.array(z.string()).optional().default([]),
    pdfAttachment: z.string().optional().default(""),
    pdfLabel: z.string().optional().default("VIEW THE LOOKBOOK"),
    webpageUrl: z.string().url().optional().or(z.literal("")).default(""),
    
    overview: z.string().optional().default(""),
    challenge: z.string().optional().default(""),
    role: z.string().optional().default(""),
    timeline: z.string().optional().default(""),
  }),
});

export const collections = { projects };
