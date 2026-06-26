import { Module } from '@nestjs/common';
import { StudentFeesService } from './student-fees.service';
import { StudentFeesResolver } from './student-fees.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentFees } from './database/student-fee.entity';
import { Student } from 'src/student/database/student.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { Role } from 'src/role/database/role.entity';
import { AdminStudentFeeService } from './admin/admin.service';
import { AdminStudentFeeResolver } from './admin/admin-resolver';
import { AdminStudentFeeRepository } from './repositories/admin.repository';
import { StudentFeesRepository } from './repositories/student-fee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentFees, Student, FeesStructure, Role]),
  ],
  providers: [
    AdminStudentFeeResolver,
    AdminStudentFeeService,
    AdminStudentFeeRepository,
    StudentFeesResolver,
    StudentFeesService,
    StudentFeesRepository,
  ],
})
export class StudentFeesModule {}
