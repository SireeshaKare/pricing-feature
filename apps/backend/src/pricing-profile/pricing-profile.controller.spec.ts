import { Test, TestingModule } from '@nestjs/testing';
import { PricingProfileController } from './pricing-profile.controller';

describe('PricingProfileController', () => {
  let controller: PricingProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricingProfileController],
    }).compile();

    controller = module.get<PricingProfileController>(PricingProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
