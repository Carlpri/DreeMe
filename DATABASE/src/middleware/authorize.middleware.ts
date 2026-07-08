import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { ApiError } from "../utils/api-error.js";

export function authorize(...roles: Role[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized."));
    }

    console.log("User role:", req.user.role);
    console.log("Allowed Roles:",roles);

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "You do not have permission to access this resource."
        )
      );
    }

    next();
  };
}