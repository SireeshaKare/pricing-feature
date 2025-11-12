import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/shared/dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':supplierId')
  @ApiHeader({
    name: 'get-products-by-supplier',
    description: 'Get all products by supplier ID',
  })
  getAllProductsBySupplierId(
    @Param('supplierId') supplierId: string,
  ): ProductDto[] {
    return this.productService.getAllProductsBySupplierId(supplierId);
  }
}
