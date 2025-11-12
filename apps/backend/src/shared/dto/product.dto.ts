export interface ProductDto {
  supplierId: string;
  title: string;
  skuCode: string;
  brand: string;
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  globalWholesalePrice: number;
  newPrice?: number;
  adjustmentValue?: number;
}
