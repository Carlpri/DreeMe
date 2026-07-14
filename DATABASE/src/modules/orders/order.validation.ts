import { z } from "zod";
import { OrderStatus, PaymentStatus } from "@prisma/client";

const orderStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
]);

const paymentStatusSchema = z.enum([
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
]);

export const createOrderSchema = z.object({
  body: z.object({
    addressId: z.string().min(1),
    couponCode: z.string().trim().max(50).optional(),
    notes: z.string().trim().max(500).optional(),
  }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: orderStatusSchema,
  }),
});

export const updatePaymentStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    paymentStatus: paymentStatusSchema,
  }),
});

export const cancelOrderSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
