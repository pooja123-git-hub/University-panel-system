import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterResolver } from './semester.resolver';

@Module({
  providers: [SemesterResolver, SemesterService],
})
export class SemesterModule {}
