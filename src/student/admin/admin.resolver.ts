import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { Student } from '../database/student.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminStudentService } from './admin.service';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateStudentInput } from '../dto/admin/admin-create-student.input';
import { AdminGetStudentEntity } from '../entities/admin/admin-get-student.entity';
import { AdminGetStudentInput } from '../dto/admin/admin-get-student.input';
import { AdminListStudentEntity } from '../entities/admin/admin-list-student.entity';
import { AdminListStudentInput } from '../dto/admin/admin-list-student.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Student)
export class AdminStudentResolver {
  constructor(private readonly adminStudentService: AdminStudentService) {}

  // 1.AdminCreateStudent
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateStudent',
    description: 'Create student by admin',
  })
  async adminCreateStudent(
    @Args('admin_create_fees_input')
    adminCreateStudentInput: AdminCreateStudentInput,
  ) {
    return this.adminStudentService.adminCreateStudent(adminCreateStudentInput);
  }

  // 2.AdminGetStudent
  @Query(() => AdminGetStudentEntity, {
    name: 'adminGetStudent',
    description: ' admin  get the student detail.',
  })
  async adminGetSubject(
    @Args('admin_get_subject_input') adminGetStudentInput: AdminGetStudentInput,
  ): Promise<AdminGetStudentEntity> {
    return this.adminStudentService.adminGetStudent(adminGetStudentInput);
  }

  // 3.AdminListStudent
  @Query(() => AdminListStudentEntity, {
    name: 'adminListStudent',
    description: ' admin  list the student detail.',
  })
  async adminListSubject(
    @Args('admin_get_subject_input')
    adminListStudentInput: AdminListStudentInput,
  ): Promise<AdminListStudentEntity> {
    return this.adminStudentService.adminListStudent(adminListStudentInput);
  }
}
