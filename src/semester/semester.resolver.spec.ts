import { Test, TestingModule } from '@nestjs/testing';
import { SemesterResolver } from './semester.resolver';
import { SemesterService } from './semester.service';

describe('SemesterResolver', () => {
  let resolver: SemesterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemesterResolver, SemesterService],
    }).compile();

    resolver = module.get<SemesterResolver>(SemesterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
