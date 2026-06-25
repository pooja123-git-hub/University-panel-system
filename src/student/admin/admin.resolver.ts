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
import { AdminDeleteStudentInput } from '../dto/admin/admin-delete-student.input';
import { AdminUpdateStudentInput } from '../dto/admin/admin-update-student.input';

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
    @Args('admin_create_student_input')
    adminCreateStudentInput: AdminCreateStudentInput,
  ) {
    return this.adminStudentService.adminCreateStudent(adminCreateStudentInput);
  }

  // 2.AdminGetStudent
  @Query(() => AdminGetStudentEntity, {
    name: 'adminGetStudent',
    description: ' admin  get the student detail.',
  })
  async adminGetStudent(
    @Args('admin_get_student_input') adminGetStudentInput: AdminGetStudentInput,
  ): Promise<AdminGetStudentEntity> {
    return this.adminStudentService.adminGetStudent(adminGetStudentInput);
  }

  // 3.AdminListStudent
  @Query(() => AdminListStudentEntity, {
    name: 'adminListStudent',
    description: ' admin  list the student detail.',
  })
  async adminListStudent(
    @Args('admin_list_student_input')
    adminListStudentInput: AdminListStudentInput,
  ): Promise<AdminListStudentEntity> {
    return this.adminStudentService.adminListStudent(adminListStudentInput);
  }

  // 4.AdminUpdateStudent
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateStudent',
    description: 'update student by admin',
  })
  async adminUpdateStudent(
    @Args('admin_update_student_input')
    adminUpdateStudentInput: AdminUpdateStudentInput,
  ) {
    return this.adminStudentService.adminUpdateStudent(adminUpdateStudentInput);
  }

  // 5.AdminDeleteStudent
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteStudent',
    description: 'Delete student by admin',
  })
  async adminDeleteStudent(
    @Args('admin_delete_student_input')
    adminDeleteStudentInput: AdminDeleteStudentInput,
  ) {
    return this.adminStudentService.adminDeleteStudent(adminDeleteStudentInput);
  }
}
