import { Module } from '@nestjs/common';
import { PricingProfileModule } from './pricing-profile/pricing-profile.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PricingProfileModule, ProductModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
