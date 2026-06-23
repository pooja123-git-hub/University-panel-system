import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './database/course.entity';
import { GetsCoursesEntity } from './entities/get-course.entity';
import { GetCourseInput } from './dto/get-course.input';
import { ListCourseInput } from './dto/list-course.input';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import { ListsCourseEntity } from './entities/list-course.entity';
import PermissionGuard from 'src/auth/guards/permission.guard';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  // 1.GetCourse
  @Query(() => GetsCoursesEntity, {
    name: 'getCourse',
    description: ' get the Course.',
  })
  async getCourse(
    @Args('get_course_input') getCourseInput: GetCourseInput,
  ): Promise<GetsCoursesEntity> {
    return this.courseService.getCourse(getCourseInput);
  }

  // 2.ListCourse
  @Query(() => ListsCourseEntity, {
    name: 'listCourse',
    description: ' list the Course.',
  })
  async listCourse(
    @Args('admin_list_course_input') listCourseInput: ListCourseInput,
  ): Promise<ListsCourseEntity> {
    return this.courseService.listCourse(listCourseInput);
  }
}
