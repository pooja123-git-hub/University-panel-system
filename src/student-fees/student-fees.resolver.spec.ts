import { Test, TestingModule } from '@nestjs/testing';
import { StudentFeesResolver } from './student-fees.resolver';
import { StudentFeesService } from './student-fees.service';

describe('StudentFeesResolver', () => {
  let resolver: StudentFeesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentFeesResolver, StudentFeesService],
    }).compile();

    resolver = module.get<StudentFeesResolver>(StudentFeesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
