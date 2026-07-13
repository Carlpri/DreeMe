import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { OutfitService } from "./outfit.service.js";

const outfitService = new OutfitService();

export class OutfitController {
  createOutfit = asyncHandler(async (req, res) => {
    const outfit = await outfitService.create(
      req.user.userId,
      req.body
    );

    ApiResponse.success(
      res,
      201,
      "Outfit created successfully.",
      outfit
    );
  });

  

  getOutfits = asyncHandler(async (_req, res) => {
    const outfits = await outfitService.getAll();

    ApiResponse.success(
      res,
      200,
      "Outfits retrieved successfully.",
      outfits
    );
  });

  getMyOutfits = asyncHandler(async (req, res) => {
    const outfits = await outfitService.getMine(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Outfits retrieved successfully.",
      outfits
    );
  });

  getSavedOutfits = asyncHandler(async (req, res) => {
    const outfits = await outfitService.getSaved(req.user.userId);

    ApiResponse.success(
      res,
      200,
      "Saved outfits retrieved successfully.",
      outfits
    );
  });

  getOutfit = asyncHandler(async (req, res) => {
    const outfit = await outfitService.getBySlug(
      req.params.slug as string
    );

    ApiResponse.success(
      res,
      200,
      "Outfit retrieved successfully.",
      outfit
    );
  });

  updateOutfit = asyncHandler(async (req, res) => {
    const outfit = await outfitService.update(
      req.params.id as string,
      req.user.userId,
      req.user.role,
      req.body
    );

    ApiResponse.success(
      res,
      200,
      "Outfit updated successfully.",
      outfit
    );
  });

  deleteOutfit = asyncHandler(async (req, res) => {
    await outfitService.delete(
      req.params.id as string,
      req.user.userId,
      req.user.role
    );

    ApiResponse.success(
      res,
      200,
      "Outfit deleted successfully.",
      null
    );
  });

  saveOutfit = asyncHandler(async (req, res) => {
    const saved = await outfitService.save(
      req.user.userId,
      req.params.id as string
    );

    ApiResponse.success(
      res,
      200,
      "Outfit saved successfully.",
      saved
    );
  });

  unsaveOutfit = asyncHandler(async (req, res) => {
    await outfitService.unsave(
      req.user.userId,
      req.params.id as string
    );

    ApiResponse.success(
      res,
      200,
      "Outfit removed from saved outfits successfully.",
      null
    );
  });
}
