import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Subject } from '../database/subject.entity';
import { AdminSubjectService } from './admin.service';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateSubjectInput } from '../dto/admin/admin-create-subject.input';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { UseGuards } from '@nestjs/common';
import { AdminGetSubjectEntity } from '../entities/admin/admin-get-subject.entity';
import { AdminGetSubjectInput } from '../dto/admin/admin-get-subject-input';
import { AdminListSubjectEntity } from '../entities/admin/admin-list-subject.entity';
import { AdminListSubjectInput } from '../dto/admin/admin-list-subject.input';
import { AdminDeleteSubjectInput } from '../dto/admin/admin-delete-subject.input';
import { AdminUpdateCourseInput } from 'src/course/dto/admin/admin-update-course.input';
import { AdminUpdateSubjectInput } from '../dto/admin/admin-update-subject.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Subject)
export class AdminSubjectResolver {
  constructor(private readonly adminSubjectService: AdminSubjectService) {}

  //  1.AdminCreateSubject
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateSubject',
    description: 'Create subject by admin',
  })
  async adminCreateCourse(
    @Args('admin_create_subject_input')
    adminCreateSubjectInput: AdminCreateSubjectInput,
  ) {
    return this.adminSubjectService.adminCreateSubject(adminCreateSubjectInput);
  }

  // 2.AdminGetSubject
  @Query(() => AdminGetSubjectEntity, {
    name: 'adminGetSubject',
    description: 'admin get the subject.',
  })
  async adminGetSubject(
    @Args('admin_get_subject_input') adminGetSubjectInput: AdminGetSubjectInput,
  ): Promise<AdminGetSubjectEntity> {
    return this.adminSubjectService.adminGetSubject(adminGetSubjectInput);
  }

  // 3.AdminUpdateSubject
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateSubject',
    description: 'update Subject by admin',
  })
  async adminUpdateCourse(
    @Args('admin_update_subject_input')
    adminUpdateSubjectInput: AdminUpdateSubjectInput,
  ) {
    return this.adminSubjectService.adminUpdateSubject(adminUpdateSubjectInput);
  }

  //   4.AdminListSubject
  @Query(() => AdminListSubjectEntity, {
    name: 'adminListSubject',
    description: 'admin list the subject.',
  })
  async adminListSubject(
    @Args('admin_list_subject_input')
    adminListSubjectInput: AdminListSubjectInput,
  ): Promise<AdminListSubjectEntity> {
    return this.adminSubjectService.adminListSubject(adminListSubjectInput);
  }

  //   5.AdminDeletedSubject
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteSubject',
    description: 'Delete subject by admin',
  })
  async adminDeleteSubject(
    @Args('admin_delete_course_input')
    adminDeleteSubjectInput: AdminDeleteSubjectInput,
  ) {
    return this.adminSubjectService.adminDeleteSubject(adminDeleteSubjectInput);
  }
}
