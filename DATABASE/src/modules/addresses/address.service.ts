import { ApiError } from "../../utils/api-error.js";
import { AddressRepository } from "./address.repository.js";
import type {
  CreateAddressDto,
  UpdateAddressDto,
} from "./address.types.js";

export class AddressService {
  private repository = new AddressRepository();

  async create(userId: string, data: CreateAddressDto) {
    const count = await this.repository.countByUser(userId);
    const isDefault = data.isDefault ?? count === 0;

    if (isDefault) {
      await this.repository.setAllNonDefaultForUser(userId);
    }

    return this.repository.create(userId, {
      ...data,
      isDefault,
    });
  }

  async getAll(userId: string) {
    return this.repository.findAllByUser(userId);
  }

  async getById(userId: string, id: string) {
    const address = await this.repository.findById(id);

    if (!address || address.userId !== userId) {
      throw new ApiError(404, "Address not found.");
    }

    return address;
  }

  async getDefault(userId: string) {
    const address = await this.repository.findDefaultByUser(userId);

    if (!address) {
      throw new ApiError(404, "No default address found.");
    }

    return address;
  }

  async update(userId: string, id: string, data: UpdateAddressDto) {
    const address = await this.repository.findById(id);

    if (!address || address.userId !== userId) {
      throw new ApiError(404, "Address not found.");
    }

    if (data.isDefault) {
      await this.repository.setAllNonDefaultForUser(userId);
    }

    return this.repository.update(id, data as unknown as Record<string, unknown>);
  }

  async delete(userId: string, id: string) {
    const address = await this.repository.findById(id);

    if (!address || address.userId !== userId) {
      throw new ApiError(404, "Address not found.");
    }

    await this.repository.delete(id);

    if (address.isDefault) {
      const remaining = await this.repository.findAllByUser(userId);

      if (remaining.length > 0) {
        const newDefault = remaining[0];
        await this.repository.update(newDefault.id, {
          isDefault: true,
        });
      }
    }
  }
}
