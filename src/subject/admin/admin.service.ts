import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminSubjectRepository } from '../repositories/admin.repository';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateSubjectInput } from '../dto/admin/admin-create-subject.input';
import { I18nService } from 'nestjs-i18n';
import { AdminGetSubjectInput } from '../dto/admin/admin-get-subject-input';
import { AdminGetCourseEntity } from 'src/course/entities/admin/admin-get-course.entity';
import { AdminGetCourseResponse } from 'src/course/response/admin/admin-get-course.response';
import { AdminGetSubjectResponse } from '../response/admin/admin-get-subject.response';
import { AdminGetSubjectEntity } from '../entities/admin/admin-get-subject.entity';
import { AdminListSubjectInput } from '../dto/admin/admin-list-subject.input';
import { AdminListSubjectEntity } from '../entities/admin/admin-list-subject.entity';
import { AdminListCourseResponse } from 'src/course/response/admin/admin-list-course.response';
import { AdminListSubjectResponse } from '../response/admin/admin-list-subject.response';
import { AdminDeleteSubjectInput } from '../dto/admin/admin-delete-subject.input';
import { AdminUpdateSubjectInput } from '../dto/admin/admin-update-subject.input';

@Injectable()
export class AdminSubjectService {
  constructor(
    private readonly adminSubjectRepository: AdminSubjectRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Created subject with valid course and semester
   * @param adminCreateSubjectInput
   * @returns
   */
  async adminCreateSubject(
    adminCreateSubjectInput: AdminCreateSubjectInput,
  ): Promise<BooleanMessage> {
    const subject = await this.adminSubjectRepository.adminCreateSubject(
      adminCreateSubjectInput,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('subject.SUBJECT_CREATED_SUCESSFULLY');
    return response;
  }

  /**
   * @description Admin can get subject detail with id
   * @param adminGetSubjectInput
   * @returns
   */
  async adminGetSubject(
    adminGetSubjectInput: AdminGetSubjectInput,
  ): Promise<AdminGetSubjectEntity> {
    const subject =
      await this.adminSubjectRepository.adminGetSubject(adminGetSubjectInput);
    if (!subject)
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));

    return AdminGetSubjectResponse.decode({ subject: subject });
  }
  /**
   * @description Admin Update Subject
   * @param adminUpdateSubjectInput
   * @returns
   */
  async adminUpdateSubject(
    adminUpdateSubjectInput: AdminUpdateSubjectInput,
  ): Promise<BooleanMessage> {
    await this.adminSubjectRepository.adminUpdateSubject(
      adminUpdateSubjectInput,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('subject.SUBJECT_UPDATED_SUCESSFULLY');
    return response;
  }

  /**
   * @description Admin can get subject detail with id
   * @param adminListSubjectInput
   * @returns
   */
  async adminListSubject(
    adminListSubjectInput: AdminListSubjectInput,
  ): Promise<AdminListSubjectEntity> {
    const [subject, count] = await this.adminSubjectRepository.adminListSubject(
      adminListSubjectInput,
    );
    if (!subject.length)
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));

    return AdminListSubjectResponse.decode({ subject: subject, count: count });
  }

  /**
   * @description Admin can delte subject detail with id
   * @param adminDeleteSubjectInput
   * @returns
   */
  async adminDeleteSubject(
    adminDeleteSubjectInput: AdminDeleteSubjectInput,
  ): Promise<BooleanMessage> {
    const subject = await this.adminSubjectRepository.adminDeleteSubject(
      adminDeleteSubjectInput,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('subject.SUBJECT_DELETED_SUCCESSFULLY');

    return response;
  }
}
