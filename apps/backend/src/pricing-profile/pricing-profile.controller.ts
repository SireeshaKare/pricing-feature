import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PricingProfileService } from './pricing-profile.service';
import type { PricingProfileDto } from '../shared/dto/pricing-profile.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Pricing Profile')
@Controller('pricing-profile')
export class PricingProfileController {
  constructor(private pricingProfileService: PricingProfileService) {}

  @Post('calculate-prices')
  @ApiHeader({
    name: 'calculated-prices',
    description: 'Calculate new prices based on pricing profile',
  })
  getCalculatedPrices(@Body() pricingData: PricingProfileDto) {
    return this.pricingProfileService.calculateNewPrice(pricingData);
  }

  @Get('supplier/:supplierId')
  @ApiHeader({
    name: 'get-pricing-profiles',
    description: 'Get pricing profiles by supplier ID',
  })
  getPricingProfilesbySupplierId(@Param('supplierId') supplierId: string) {
    return this.pricingProfileService.getPricingProfilesbySupplierId(
      supplierId,
    );
  }

  @Post('create-profile')
  @ApiHeader({
    name: 'create-pricing-profile',
    description: 'Create a new pricing profile',
  })
  createProfile(@Body() pricingData: PricingProfileDto) {
    return this.pricingProfileService.createPricingProfile(pricingData);
  }

  @Put('update-profile/:id')
  @ApiHeader({
    name: 'update-pricing-profile',
    description: 'Update an existing pricing profile',
  })
  updateProfile(@Param('id') id: string, @Body() data: PricingProfileDto) {
    return this.pricingProfileService.updatePricingProfile(id, data);
  }
}
