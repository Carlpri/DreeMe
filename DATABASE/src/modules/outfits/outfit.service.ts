import { Role } from "@prisma/client";
import slugify from "slugify";
import { ApiError } from "../../utils/api-error.js";
import { OutfitRepository } from "./outfit.repository.js";
import type {
  CreateOutfitDto,
  UpdateOutfitDto,
} from "./outfit.types.js";

export class OutfitService {
  private repository = new OutfitRepository();

  async create(
    creatorId: string,
    data: CreateOutfitDto
  ) {
    await this.ensureProductsExist(data.productIds);

    const slug = await this.createUniqueSlug(data.title);

    return this.repository.create(creatorId, slug, {
      ...data,
      productIds: this.uniqueProductIds(data.productIds),
    });
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getMine(userId: string) {
    return this.repository.findByCreator(userId);
  }

  async getSaved(userId: string) {
    return this.repository.findSavedByUser(userId);
  }

  async getBySlug(slug: string) {
    const outfit = await this.repository.findBySlug(slug);

    if (!outfit) {
      throw new ApiError(404, "Outfit not found.");
    }

    return outfit;
  }

  async update(
    id: string,
    userId: string,
    role: Role,
    data: UpdateOutfitDto
  ) {
    const outfit = await this.repository.findById(id);

    if (!outfit) {
      throw new ApiError(404, "Outfit not found.");
    }

    this.ensureCanManageOutfit(outfit.creatorId, userId, role);

    if (data.productIds) {
      await this.ensureProductsExist(data.productIds);
    }

    const updateData: UpdateOutfitDto & {
      slug?: string;
    } = {
      ...data,
      productIds: data.productIds
        ? this.uniqueProductIds(data.productIds)
        : undefined,
    };

    if (data.title && data.title !== outfit.title) {
      updateData.slug = await this.createUniqueSlug(data.title, id);
    }

    return this.repository.update(id, updateData);
  }

  async delete(
    id: string,
    userId: string,
    role: Role
  ) {
    const outfit = await this.repository.findById(id);

    if (!outfit) {
      throw new ApiError(404, "Outfit not found.");
    }

    this.ensureCanManageOutfit(outfit.creatorId, userId, role);

    await this.repository.delete(id);
  }

  async save(
    userId: string,
    outfitId: string
  ) {
    const outfit = await this.repository.findById(outfitId);

    if (!outfit) {
      throw new ApiError(404, "Outfit not found.");
    }

    const existing = await this.repository.findSaved(userId, outfitId);

    if (existing) {
      return existing;
    }

    return this.repository.save(userId, outfitId);
  }

  async unsave(
    userId: string,
    outfitId: string
  ) {
    const existing = await this.repository.findSaved(userId, outfitId);

    if (!existing) {
      throw new ApiError(404, "Saved outfit not found.");
    }

    await this.repository.unsave(userId, outfitId);
  }

  private async ensureProductsExist(productIds: string[]) {
    const uniqueIds = this.uniqueProductIds(productIds);
    const products = await this.repository.findProductsByIds(uniqueIds);

    if (products.length !== uniqueIds.length) {
      throw new ApiError(400, "One or more products are invalid.");
    }
  }

  private uniqueProductIds(productIds: string[]) {
    return [...new Set(productIds)];
  }

  private ensureCanManageOutfit(
    creatorId: string,
    userId: string,
    role: Role
  ) {
    if (role === Role.ADMIN || creatorId === userId) {
      return;
    }

    throw new ApiError(403, "You can only manage your own outfits.");
  }

  private async createUniqueSlug(
    title: string,
    currentOutfitId?: string
  ) {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.repository.findBySlug(slug);

      if (!existing || existing.id === currentOutfitId) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }
  }
}
