import { Module } from '@nestjs/common';
import { PricingProfileController } from './pricing-profile.controller';
import { PricingProfileService } from './pricing-profile.service';

@Module({
  controllers: [PricingProfileController],
  providers: [PricingProfileService],
})
export class PricingProfileModule {}
