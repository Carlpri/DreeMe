import { z } from "zod";

export const createAddressSchema = z.object({
  body: z.object({
    fullName: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(10).max(20),
    county: z.string().trim().min(2).max(100),
    city: z.string().trim().min(2).max(100),
    area: z.string().trim().min(2).max(100),
    street: z.string().trim().min(2).max(200),
    building: z.string().trim().max(100).optional(),
    postalCode: z.string().trim().max(20).optional(),
    landmark: z.string().trim().max(200).optional(),
    latitude: z.number().finite().optional(),
    longitude: z.number().finite().optional(),
    label: z.string().trim().max(50).optional(),
    isDefault: z.boolean().optional(),
  }),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    fullName: z.string().trim().min(2).max(120).optional(),
    phone: z.string().trim().min(10).max(20).optional(),
    county: z.string().trim().min(2).max(100).optional(),
    city: z.string().trim().min(2).max(100).optional(),
    area: z.string().trim().min(2).max(100).optional(),
    street: z.string().trim().min(2).max(200).optional(),
    building: z.string().trim().max(100).optional().nullable(),
    postalCode: z.string().trim().max(20).optional().nullable(),
    landmark: z.string().trim().max(200).optional().nullable(),
    latitude: z.number().finite().optional().nullable(),
    longitude: z.number().finite().optional().nullable(),
    label: z.string().trim().max(50).optional().nullable(),
    isDefault: z.boolean().optional(),
  }),
});

export const addressIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
