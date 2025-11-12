import { ProductDto } from './product.dto';

export const enum AdjustmentMode {
  FIXED = 'fixed',
  DYNAMIC = 'dynamic',
}

export const enum IncrementMode {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export const enum BasedOn {
  GLOBAL = 'global',
}

export interface CreatePricingProfileDto {
  id: string;
  supplierId: string;
  profileName: string;
  description?: string;
}

export interface PricingProfileDto extends CreatePricingProfileDto {
  productSelected: ProductDto[];
  basedOn: BasedOn;
  adjustmentMode: AdjustmentMode;
  incrementMode: IncrementMode;
}
