import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Course } from '../database/course.entity';
import { AdminCourseService } from './admin.service';
import { UseGuards } from '@nestjs/common';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { AtGuard } from 'src/auth/guards/at.guard';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateCourseInput } from '../dto/admin/admin-create-course.input';
import { AdminGetCourseEntity } from '../entities/admin/admin-get-course.entity';
import { AdminGetCourseInput } from '../dto/admin/admin-get-course.input';
import { AdminListCourseEntity } from '../entities/admin/admin-list-course.entity';
import { AdminListCourseInput } from '../dto/admin/admin-list-course.input';
import { AdminDeleteCourseInput } from '../dto/admin/admin-delete-course.input';
import { AdminUpdateCourseInput } from '../dto/admin/admin-update-course.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Course)
export class AdminCourseResolver {
  constructor(private readonly adminCourseService: AdminCourseService) {}

  // 1.AdminCreateCourse
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateCourse',
    description: 'Create course by admin',
  })
  async adminCreateCourse(
    @Args('create_course_input') adminCreateCourseInput: AdminCreateCourseInput,
  ) {
    return this.adminCourseService.adminCreateCourse(adminCreateCourseInput);
  }

  // 2.AdminGetCourse
  @Query(() => AdminGetCourseEntity, {
    name: 'adminGetCourse',
    description: 'admin get the Course.',
  })
  async adminGetCourse(
    @Args('admin_get_course_input') adminGetCourseInput: AdminGetCourseInput,
  ): Promise<AdminGetCourseEntity> {
    return this.adminCourseService.adminGetCourse(adminGetCourseInput);
  }

  // 3.AdminListCourse
  @Query(() => AdminListCourseEntity, {
    name: 'adminListCourse',
    description: 'admin list the Course.',
  })
  async adminListCourse(
    @Args('admin_list_course_input') adminListCourseInput: AdminListCourseInput,
  ): Promise<AdminListCourseEntity> {
    return this.adminCourseService.adminListCourse(adminListCourseInput);
  }
  
  // 4.AdminUpdateCourse
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateCourse',
    description: 'update course by admin',
  })
  async adminUpdateCourse(
    @Args('update_course_input') adminUpdateCourseInput: AdminUpdateCourseInput,
  ) {
    return this.adminCourseService.adminUpdateCourse(adminUpdateCourseInput);
  }
  // 5.AdminDeleteCourse
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteCourse',
    description: 'Delete course by admin',
  })
  async adminDeleteCourse(
    @Args('delete_course_input') adminDeleteCourseInput: AdminDeleteCourseInput,
  ) {
    return this.adminCourseService.adminDeleteCourse(adminDeleteCourseInput);
  }
}
