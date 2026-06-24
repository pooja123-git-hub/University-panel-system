import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './repositories/course.repository';
import { GetCourseInput } from './dto/get-course.input';
import { GetsCoursesEntity } from './entities/get-course.entity';
import { AdminListCourseEntity } from './entities/admin/admin-list-course.entity';
import { ListCourseInput } from './dto/list-course.input';
import { GetsCourseResponse } from './response/get-course.response';
import { ListCourseResponse } from './response/list-course.response';
import { ListsCourseEntity } from './entities/list-course.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description getCourse
   * @param getCourseInput
   * @returns
   */
  async getCourse(getCourseInput: GetCourseInput): Promise<GetsCoursesEntity> {
    const course = await this.courseRepository.getCourse(getCourseInput);

    if (!course) {
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
    }
    return GetsCourseResponse.decode({ result: course });
  }

  /**
   * @description getCourse
   * @param adminListCourseInput
   * @returns
   */
  async listCourse(
    adminListCourseInput: ListCourseInput,
  ): Promise<ListsCourseEntity> {
    const [courses, count] =
      await this.courseRepository.listCourse(adminListCourseInput);

    if (!courses.length)
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
    return ListCourseResponse.decode({
      list_course: courses,
      count: count,
    });
  }
}
