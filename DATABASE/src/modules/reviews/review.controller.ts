import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ReviewService } from "./review.service.js";

const reviewService = new ReviewService();

export class ReviewController {
  createReview = asyncHandler(async (req, res) => {
    const review = await reviewService.create(
      req.user.userId,
      req.body
    );

    ApiResponse.success(
      res,
      201,
      "Review created successfully.",
      review
    );
  });

  getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getProductReviews(
      req.params.productId as string
    );

    ApiResponse.success(
      res,
      200,
      "Product reviews retrieved successfully.",
      reviews
    );
  });

  getMyReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getMyReviews(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Reviews retrieved successfully.",
      reviews
    );
  });

  updateReview = asyncHandler(async (req, res) => {
    const review = await reviewService.update(
      req.params.id as string,
      req.user.userId,
      req.body
    );

    ApiResponse.success(
      res,
      200,
      "Review updated successfully.",
      review
    );
  });

  deleteReview = asyncHandler(async (req, res) => {
    await reviewService.delete(
      req.params.id as string,
      req.user.userId,
      req.user.role
    );

    ApiResponse.success(
      res,
      200,
      "Review deleted successfully.",
      null
    );
  });
}
