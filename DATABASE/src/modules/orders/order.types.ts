export interface CreateOrderDto {
  addressId: string;
  couponCode?: string;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
}

export interface UpdatePaymentStatusDto {
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
}
