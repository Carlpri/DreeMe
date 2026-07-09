import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { FavouriteController } from "./favourite.controller.js";
import {
  addFavouriteSchema,
  favouriteProductParamSchema,
} from "./favourite.validation.js";

const router = Router();

const controller = new FavouriteController();

router.use(authenticate);

router.get(
  "/",
  controller.getFavourites
);

router.post(
  "/",
  validate(addFavouriteSchema),
  controller.addFavourite
);

router.delete(
  "/:productId",
  validate(favouriteProductParamSchema),
  controller.removeFavourite
);

router.delete(
  "/",
  controller.clearFavourites
);

export default router;
