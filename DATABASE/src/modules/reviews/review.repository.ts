import { Prisma, ProductStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";
import type {
  CreateReviewDto,
  UpdateReviewDto,
} from "./review.types.js";

const reviewInclude = {
  user: {
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  },
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
} as const;

export class ReviewRepository {
  async findProductById(productId: string) {
    return prisma.product.findFirst({
      where: {
        id: productId,
        status: {
          not: ProductStatus.ARCHIVED,
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.review.findUnique({
      where: { id },
      include: reviewInclude,
    });
  }

  async findByUserAndProduct(
    userId: string,
    productId: string
  ) {
    return prisma.review.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async findByProduct(productId: string) {
    return prisma.review.findMany({
      where: {
        productId,
        product: {
          status: {
            not: ProductStatus.ARCHIVED,
          },
        },
      },
      include: reviewInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.review.findMany({
      where: {
        userId,
      },
      include: reviewInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(
    userId: string,
    data: CreateReviewDto
  ) {
    return prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          userId,
          productId: data.productId,
          rating: data.rating,
          comment: data.comment,
        },
        include: reviewInclude,
      });

      await this.refreshProductRating(tx, data.productId);

      return review;
    });
  }

  async update(
    id: string,
    data: UpdateReviewDto
  ) {
    return prisma.$transaction(async (tx) => {
      const review = await tx.review.update({
        where: { id },
        data,
        include: reviewInclude,
      });

      await this.refreshProductRating(tx, review.productId);

      return review;
    });
  }

  async delete(id: string) {
    return prisma.$transaction(async (tx) => {
      const review = await tx.review.delete({
        where: { id },
      });

      await this.refreshProductRating(tx, review.productId);

      return review;
    });
  }

  private async refreshProductRating(
    tx: Prisma.TransactionClient,
    productId: string
  ) {
    const aggregate = await tx.review.aggregate({
      where: { productId },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        averageRating: aggregate._avg.rating ?? 0,
        reviewCount: aggregate._count.rating,
      },
    });
  }
}
