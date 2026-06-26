import { UseGuards } from '@nestjs/common';
import {  Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { Student } from './database/student.entity';
import { GetStudentEntity } from './entities/get-student.entity';
import { StudentService } from './student.service';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/database/user.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  //   1.GetStudentProfile
  @Query(() => GetStudentEntity, {
    name: 'getStudent',
    description: 'get the student detail.',
  })
  async getStudent(@CurrentUser() user: User): Promise<GetStudentEntity> {
    return this.studentService.getStudent(user);
  }
}
