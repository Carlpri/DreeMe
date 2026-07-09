import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { ReviewController } from "./review.controller.js";
import {
  createReviewSchema,
  productIdParamSchema,
  reviewIdParamSchema,
  updateReviewSchema,
} from "./review.validation.js";

const router = Router();

const controller = new ReviewController();

router.get(
  "/products/:productId",
  validate(productIdParamSchema),
  controller.getProductReviews
);

router.use(authenticate);

router.post(
  "/",
  validate(createReviewSchema),
  controller.createReview
);

router.get(
  "/my",
  controller.getMyReviews
);

router.patch(
  "/:id",
  validate(updateReviewSchema),
  controller.updateReview
);

router.delete(
  "/:id",
  validate(reviewIdParamSchema),
  controller.deleteReview
);

export default router;
