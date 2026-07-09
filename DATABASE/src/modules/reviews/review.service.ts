import { Role } from "@prisma/client";
import { ApiError } from "../../utils/api-error.js";
import { ReviewRepository } from "./review.repository.js";
import type {
  CreateReviewDto,
  UpdateReviewDto,
} from "./review.types.js";

export class ReviewService {
  private repository = new ReviewRepository();

  async create(
    userId: string,
    data: CreateReviewDto
  ) {
    const product = await this.repository.findProductById(data.productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    const existing = await this.repository.findByUserAndProduct(
      userId,
      data.productId
    );

    if (existing) {
      throw new ApiError(409, "You have already reviewed this product.");
    }

    return this.repository.create(userId, data);
  }

  async getProductReviews(productId: string) {
    const product = await this.repository.findProductById(productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    return this.repository.findByProduct(productId);
  }

  async getMyReviews(userId: string) {
    return this.repository.findByUser(userId);
  }

  async update(
    id: string,
    userId: string,
    data: UpdateReviewDto
  ) {
    const review = await this.repository.findById(id);

    if (!review || review.userId !== userId) {
      throw new ApiError(404, "Review not found.");
    }

    return this.repository.update(id, data);
  }

  async delete(
    id: string,
    userId: string,
    role: Role
  ) {
    const review = await this.repository.findById(id);

    if (!review) {
      throw new ApiError(404, "Review not found.");
    }

    if (review.userId !== userId && role !== Role.ADMIN) {
      throw new ApiError(403, "You can only delete your own reviews.");
    }

    await this.repository.delete(id);
  }
}
