import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { pricingProfiles } from 'src/shared/sample-data/sample-data';
import {
  AdjustmentMode,
  CreatePricingProfileDto,
  IncrementMode,
  PricingProfileDto,
} from 'src/shared/dto/pricing-profile.dto';
import { ProductDto } from 'src/shared/dto/product.dto';

@Injectable()
export class PricingProfileService {
  //Calculate new price based on pricing profile data
  calculateNewPrice(pricingData: PricingProfileDto): ProductDto[] {
    const {
      basedOn,
      adjustmentMode,
      incrementMode,
      productSelected,
      adjustmentValue,
    } = pricingData;
    if (
      !basedOn ||
      productSelected.length === 0 ||
      !adjustmentMode ||
      !incrementMode ||
      !adjustmentValue
    ) {
      throw new BadRequestException(
        '[PricingProfileService.calculateNewPrice]: Invalid pricing data',
      );
    }

    const calculatedPriceProfile = <ProductDto[]>[];

    productSelected.forEach((product) => {
      const { globalWholesalePrice } = product;
      let newPrice = globalWholesalePrice;
      const value = adjustmentValue;

      if (adjustmentMode === AdjustmentMode.FIXED) {
        if (incrementMode === IncrementMode.INCREASE) {
          newPrice += value;
        } else {
          newPrice -= value;
        }
      } else if (adjustmentMode === AdjustmentMode.DYNAMIC) {
        if (incrementMode === IncrementMode.INCREASE) {
          newPrice += (newPrice * value) / 100;
        } else {
          newPrice -= (newPrice * value) / 100;
        }
      }

      if (newPrice < 0) {
        throw new Error(
          '[PricingProfileService.calculateNewPrice]: Calculated price cannot be negative',
        );
      }

      calculatedPriceProfile.push({
        ...product,
        newPrice: parseFloat(newPrice.toFixed(2)),
      });
    });

    return calculatedPriceProfile;
  }

  //Get pricing profiles by supplier ID
  getPricingProfilesbySupplierId(
    supplierId: string,
  ): CreatePricingProfileDto[] {
    if (!supplierId) {
      throw new BadRequestException(
        '[PricingProfileService.getPricingProfilesbySupplierId]: Supplier ID must be provided',
      );
    }

    const supplierProfiles = (
      pricingProfiles as CreatePricingProfileDto[]
    ).filter((profile) => profile.supplierId === supplierId);

    if (supplierProfiles.length === 0) {
      throw new NotFoundException(
        `[PricingProfileService.getPricingProfilesbySupplierId]: No pricing profiles found for supplier ID: ${supplierId}`,
      );
    }

    return supplierProfiles;
  }

  //Create a new pricing profile
  createPricingProfile(data: PricingProfileDto): CreatePricingProfileDto {
    const { supplierId, profileName, description } = data;
    if (!supplierId || !profileName) {
      throw new BadRequestException(
        '[PricingProfileService.createPricingProfile]: Supplier ID and Profile name must be provided',
      );
    }
    const newProfile: CreatePricingProfileDto = {
      id: (
        (pricingProfiles as CreatePricingProfileDto[]).length + 1
      ).toString(),
      supplierId,
      profileName,
      description,
    };

    (pricingProfiles as CreatePricingProfileDto[]).push(newProfile);
    return newProfile;
  }

  //Update an existing pricing profile
  updatePricingProfile(
    id: string,
    data: PricingProfileDto,
  ): CreatePricingProfileDto {
    const { supplierId, profileName, description } = data;
    const profileIndex = (
      pricingProfiles as CreatePricingProfileDto[]
    ).findIndex((profile) => profile.id === id);

    if (profileIndex === -1) {
      throw new NotFoundException(
        `[PricingProfileService.updatePricingProfile]: Pricing profile with ID: ${id} not found`,
      );
    }

    const updatedProfile: CreatePricingProfileDto = {
      id,
      supplierId,
      profileName,
      description,
    };

    (pricingProfiles as CreatePricingProfileDto[])[profileIndex] =
      updatedProfile;
    return updatedProfile;
  }
}
