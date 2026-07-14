import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { OrderService } from "./order.service.js";

const orderService = new OrderService();

export class OrderController {
  checkout = asyncHandler(async (req, res) => {
    const order = await orderService.checkout(req.user.userId, req.body);

    ApiResponse.success(
      res,
      201,
      "Order placed successfully.",
      order
    );
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getMyOrders(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Orders retrieved successfully.",
      orders
    );
  });

  getOrder = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(
      req.user.userId,
      req.params.id as string,
      req.user.role
    );

    ApiResponse.success(
      res,
      200,
      "Order retrieved successfully.",
      order
    );
  });

  cancelOrder = asyncHandler(async (req, res) => {
    const order = await orderService.cancelOrder(
      req.user.userId,
      req.params.id as string,
      req.user.role
    );

    ApiResponse.success(
      res,
      200,
      "Order cancelled successfully.",
      order
    );
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getAllOrders();

    ApiResponse.success(
      res,
      200,
      "Orders retrieved successfully.",
      orders
    );
  });

  updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await orderService.updateOrderStatus(
      req.params.id as string,
      req.body.status
    );

    ApiResponse.success(
      res,
      200,
      "Order status updated successfully.",
      order
    );
  });

  updatePaymentStatus = asyncHandler(async (req, res) => {
    const order = await orderService.updatePaymentStatus(
      req.params.id as string,
      req.body.paymentStatus
    );

    ApiResponse.success(
      res,
      200,
      "Payment status updated successfully.",
      order
    );
  });

  getVendorOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getVendorOrders(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Vendor orders retrieved successfully.",
      orders
    );
  });
}
