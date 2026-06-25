import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeResolver } from './fee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesStructure } from './database/fee.entity';
import { Course } from 'src/course/database/course.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Role } from 'src/role/database/role.entity';
import { AdminFeesResolver } from './admin/admin.resolver';
import { AdminFeesService } from './admin/admin.service';
import { AdminFeesRepository } from './repositories/admin.repository';
import { FeeRepository } from './repositories/fees.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeesStructure, Course, Subject, Semester, Role]),
  ],
  providers: [
    FeeResolver,
    FeeService,
    FeeRepository,
    AdminFeesResolver,
    AdminFeesService,
    AdminFeesRepository,
  ],
})
export class FeeModule {}
