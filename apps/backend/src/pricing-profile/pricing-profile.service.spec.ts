import { Test, TestingModule } from '@nestjs/testing';
import { PricingProfileService } from './pricing-profile.service';

describe('PricingProfileService', () => {
  let service: PricingProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingProfileService],
    }).compile();

    service = module.get<PricingProfileService>(PricingProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
