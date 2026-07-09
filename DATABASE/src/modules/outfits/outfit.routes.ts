import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { OutfitController } from "./outfit.controller.js";
import {
  createOutfitSchema,
  outfitIdParamSchema,
  outfitSlugParamSchema,
  updateOutfitSchema,
} from "./outfit.validation.js";

const router = Router();

const controller = new OutfitController();

router.get(
  "/",
  controller.getOutfits
);

router.get(
  "/slug/:slug",
  validate(outfitSlugParamSchema),
  controller.getOutfit
);

router.use(authenticate);

router.post(
  "/",
  validate(createOutfitSchema),
  controller.createOutfit
);

router.get(
  "/my",
  controller.getMyOutfits
);

router.get(
  "/saved",
  controller.getSavedOutfits
);

router.patch(
  "/:id",
  validate(updateOutfitSchema),
  controller.updateOutfit
);

router.delete(
  "/:id",
  validate(outfitIdParamSchema),
  controller.deleteOutfit
);

router.post(
  "/:id/save",
  validate(outfitIdParamSchema),
  controller.saveOutfit
);

router.delete(
  "/:id/save",
  validate(outfitIdParamSchema),
  controller.unsaveOutfit
);

export default router;
