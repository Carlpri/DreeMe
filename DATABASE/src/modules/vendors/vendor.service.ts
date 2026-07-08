import { ApiError } from "../../utils/api-error.js";
import { VendorRepository } from "./vendor.repository.js";
import type {
  CreateVendorDto,
  UpdateVendorDto,
} from "./vendor.types.js";

export class VendorService {
  private repository = new VendorRepository();

  async create(
    userId: string,
    data: CreateVendorDto
  ) {
    const existingVendor =
      await this.repository.findByUserId(userId);

    if (existingVendor) {
      throw new ApiError(
        409,
        "You already have a vendor profile."
      );
    }

    return this.repository.create(userId, data);
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    const vendor = await this.repository.findById(id);

    if (!vendor) {
      throw new ApiError(404, "Vendor not found.");
    }

    return vendor;
  }

  async update(
    id: string,
    data: UpdateVendorDto
  ) {
    const vendor = await this.repository.findById(id);

    if (!vendor) {
      throw new ApiError(404, "Vendor not found.");
    }

    return this.repository.update(id, data);
  }

  async delete(id: string) {
    const vendor = await this.repository.findById(id);

    if (!vendor) {
      throw new ApiError(404, "Vendor not found.");
    }

    await this.repository.delete(id);
  }
}