import { ApiError } from "../../utils/api-error.js";
import { FavouriteRepository } from "./favourite.repository.js";
import type { AddFavouriteDto } from "./favourite.types.js";

export class FavouriteService {
  private repository = new FavouriteRepository();

  async getAll(userId: string) {
    return this.repository.findAllByUser(userId);
  }

  async add(
    userId: string,
    data: AddFavouriteDto
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
      throw new ApiError(
        409,
        "Product already exists in favourites.");
      
    }

    return this.repository.create(userId, data.productId);
  }

  async remove(
    userId: string,
    productId: string
  ) {
    const favourite = await this.repository.findByUserAndProduct(
      userId,
      productId
    );

    if (!favourite) {
      throw new ApiError(404, "Favourite product not found.");
    }

    await this.repository.deleteByUserAndProduct(userId, productId);
  }

  async clear(userId: string) {
    await this.repository.clearByUser(userId);
  }
}
