import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from 'src/shared/dto/product.dto';
import { products } from '../shared/sample-data/sample-data';

@Injectable()
export class ProductService {
  getAllProductsBySupplierId(supplierId: string): ProductDto[] {
    if (!supplierId) {
      throw new BadRequestException(
        '[ProductService.getAllProductsBySupplierId]: Supplier ID must be provided',
      );
    }

    const supplierProducts = products.filter(
      (product) => product.supplierId == supplierId,
    );

    if (supplierProducts.length === 0) {
      throw new NotFoundException(
        `[ProductService.getAllProductsBySupplierId]: No products found for supplier ID: ${supplierId}`,
      );
    }
    return supplierProducts;
  }
}
