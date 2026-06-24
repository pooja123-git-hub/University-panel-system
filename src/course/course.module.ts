import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { AdminCourseRepository } from './repositories/admin.repository';
import { AdminCourseService } from './admin/admin.service';
import { AdminCourseResolver } from './admin/admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Course } from './database/course.entity';
import { Status } from 'src/status/database/status.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Role } from 'src/role/database/role.entity';
import { CourseRepository } from './repositories/course.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Status, Semester, Role])],
  providers: [
    AdminCourseResolver,
    AdminCourseService,
    AdminCourseRepository,
    CourseResolver,
    CourseService,
    CourseRepository,
  ],
})
export class CourseModule {}
