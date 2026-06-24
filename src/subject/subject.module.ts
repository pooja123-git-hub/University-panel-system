import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { AdminSubjectResolver } from './admin/admin.resolver';
import { AdminSubjectService } from './admin/admin.service';
import { AdminSubjectRepository } from './repositories/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Subject } from './database/subject.entity';
import { Role } from 'src/role/database/role.entity';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Semester, Subject, Role])],
  providers: [
    SubjectResolver,
    SubjectService,
    SubjectRepository,
    AdminSubjectResolver,
    AdminSubjectService,
    AdminSubjectRepository,
  ],
})
export class SubjectModule {}
