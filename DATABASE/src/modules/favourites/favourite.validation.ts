import { z } from "zod";

export const addFavouriteSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
  }),
});

export const favouriteProductParamSchema = z.object({
  params: z.object({
    productId: z.string().min(1),
  }),
});
