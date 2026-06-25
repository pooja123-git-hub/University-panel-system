import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { Student } from './database/student.entity';
import { GetStudentEntity } from './entities/get-student.entity';
import { GetStudentInput } from './dto/get-student.input';
import { StudentService } from './student.service';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  //   1.GetStudentProfile
  @Query(() => GetStudentEntity, {
    name: 'getStudent',
    description: 'get the student detail.',
  })
  async getStudent(
    @Args('get_student_input') getStudentInput: GetStudentInput,
  ): Promise<GetStudentEntity> {
    return this.studentService.getStudent(getStudentInput);
  }
}
