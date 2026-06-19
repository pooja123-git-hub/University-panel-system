import { Test, TestingModule } from '@nestjs/testing';
import { FeeResolver } from './fee.resolver';
import { FeeService } from './fee.service';

describe('FeeResolver', () => {
  let resolver: FeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeResolver, FeeService],
    }).compile();

    resolver = module.get<FeeResolver>(FeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
