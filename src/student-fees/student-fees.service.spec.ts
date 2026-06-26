import { Test, TestingModule } from '@nestjs/testing';
import { StudentFeesService } from './student-fees.service';

describe('StudentFeesService', () => {
  let service: StudentFeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentFeesService],
    }).compile();

    service = module.get<StudentFeesService>(StudentFeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
