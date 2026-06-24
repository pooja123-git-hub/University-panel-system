import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminCourseRepository } from '../repositories/admin.repository';
import { AdminCreateCourseInput } from '../dto/admin/admin-create-course.input';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminGetCourseInput } from '../dto/admin/admin-get-course.input';
import { AdminGetCourseEntity } from '../entities/admin/admin-get-course.entity';
import { AdminGetCourseResponse } from '../response/admin/admin-get-course.response';
import { AdminListCourseInput } from '../dto/admin/admin-list-course.input';
import { AdminListCourseEntity } from '../entities/admin/admin-list-course.entity';
import { AdminListCourseResponse } from '../response/admin/admin-list-course.response';
import { AdminDeleteCourseInput } from '../dto/admin/admin-delete-course.input';
import { AdminUpdateCourseInput } from '../dto/admin/admin-update-course.input';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AdminCourseService {
  constructor(
    private readonly courseRepository: AdminCourseRepository,
    private readonly i18n: I18nService,
  ) {}
  /**
   * @description admin create course
   * @param adminCreateCourseInput
   * @returns
   */
  async adminCreateCourse(
    adminCreateCourseInput: AdminCreateCourseInput,
  ): Promise<BooleanMessage> {
    await this.courseRepository.adminCreateCourse(adminCreateCourseInput);
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('course.COURSE_CREATED_SUCCESSFULLY');
    return response;
  }

  /**
   * @description adminGetCourse
   * @param adminGetCourseInput
   * @returns
   */
  async adminGetCourse(
    adminGetCourseInput: AdminGetCourseInput,
  ): Promise<AdminGetCourseEntity> {
    const course =
      await this.courseRepository.adminGetCourse(adminGetCourseInput);

    if (!course) {
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
    }
    return AdminGetCourseResponse.decode({ result: course });
  }

  /**
   * @description adminListCourse
   * @param adminListCourseInput
   * @returns
   */
  async adminListCourse(
    adminListCourseInput: AdminListCourseInput,
  ): Promise<AdminListCourseEntity> {
    const [courses, count] =
      await this.courseRepository.adminListCourse(adminListCourseInput);

    if (!courses.length)
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));

    return AdminListCourseResponse.decode({
      list_course: courses,
      count: count,
    });
  }

  /**
   * @description Admin Update Course
   * @param adminUpdateCourseInput
   * @returns
   */
  async adminUpdateCourse(
    adminUpdateCourseInput: AdminUpdateCourseInput,
  ): Promise<BooleanMessage> {
    await this.courseRepository.adminUpdateCourse(adminUpdateCourseInput);
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('course.COURSE_UPDATED_SUCCESSFULLY');
    return response;
  }

  /**
   * @description Delete course by Admin
   * @param adminDeleteCourseInput
   * @returns
   */
  async adminDeleteCourse(
    adminDeleteCourseInput: AdminDeleteCourseInput,
  ): Promise<BooleanMessage> {
    const course = await this.courseRepository.adminDeleteCourse(
      adminDeleteCourseInput,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('course.COURSE_DELETED_SUCCESSFULLY');

    return response;
  }
}
