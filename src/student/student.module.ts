import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { AdminStudentResolver } from './admin/admin.resolver';
import { AdminStudentService } from './admin/admin.service';
import { AdminStudentRepository } from './repositories/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Student } from './database/student.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Course } from 'src/course/database/course.entity';
import { Status } from 'src/status/database/status.entity';
import { Role } from 'src/role/database/role.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { StudentResolver } from './student.resolver';
import { StudentRepository } from './repositories/student.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student, Semester, Course, Status, Role]),
    AuthModule,
  ],
  providers: [
    AdminStudentResolver,
    AdminStudentService,
    AdminStudentRepository,
    StudentResolver,
    StudentService,
    StudentRepository,
  ],
  exports: [AuthModule],
})
export class StudentModule {}
