import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/shared/dto/product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get(':supplierId')
    getAllProductsBySupplierId(@Param('supplierId') supplierId: string): ProductDto[] {
        return this.productService.getAllProductsBySupplierId(supplierId);
    }
}
