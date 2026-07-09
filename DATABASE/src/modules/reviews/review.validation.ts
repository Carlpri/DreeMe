import { z } from "zod";

const ratingSchema = z
  .number()
  .min(1)
  .max(5)
  .refine(
    value => value * 2 === Math.floor(value * 2),
    {
      message: "Rating must be in 0.5 increments.",
    }
  );

export const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    rating: ratingSchema,
    comment: z.string().trim().max(1000).optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    rating: ratingSchema,
    comment: z.string().trim().max(1000).optional(),
  }),
});

export const reviewIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    productId: z.string().min(1),
  }),
});