import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { FavouriteService } from "./favourite.service.js";

const favouriteService = new FavouriteService();

export class FavouriteController {
  getFavourites = asyncHandler(async (req, res) => {
    const favourites = await favouriteService.getAll(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Favourite products retrieved successfully.",
      favourites
    );
  });

  addFavourite = asyncHandler(async (req, res) => {
    const favourite = await favouriteService.add(
      req.user.userId,
      req.body
    );

    ApiResponse.success(
      res,
      200,
      "Product added to favourites successfully.",
      favourite
    );
  });

  removeFavourite = asyncHandler(async (req, res) => {
    await favouriteService.remove(
      req.user.userId,
      req.params.productId as string
    );

    ApiResponse.success(
      res,
      200,
      "Product removed from favourites successfully.",
      null
    );
  });

  clearFavourites = asyncHandler(async (req, res) => {
    await favouriteService.clear(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Favourite products cleared successfully.",
      null
    );
  });
}
