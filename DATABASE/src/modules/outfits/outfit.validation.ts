import { z } from "zod";

export const createOutfitSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(10).max(1000),
    style: z.string().trim().min(2).max(80),
    coverImage: z.string().url().optional(),
    productIds: z.array(z.string().min(1)).min(1),
  }),
});

export const updateOutfitSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().trim().min(2).max(120).optional(),
    description: z.string().trim().min(10).max(1000).optional(),
    style: z.string().trim().min(2).max(80).optional(),
    coverImage: z.string().url().optional(),
    productIds: z.array(z.string().min(1)).min(1).optional(),
  }),
});

export const outfitIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const outfitSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});
