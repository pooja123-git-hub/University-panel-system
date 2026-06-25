import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStudentRepository } from '../repositories/admin.repository';
import { I18nService } from 'nestjs-i18n';
import { AdminCreateStudentInput } from '../dto/admin/admin-create-student.input';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminGetStudentInput } from '../dto/admin/admin-get-student.input';
import { AdminGetStudentEntity } from '../entities/admin/admin-get-student.entity';
import { AdminGetStudentResponse } from '../response/admin/admin-get-student.response';
import { AdminListStudentInput } from '../dto/admin/admin-list-student.input';
import { AdminListStudentEntity } from '../entities/admin/admin-list-student.entity';
import { AdminListStudentResponse } from '../response/admin/admin-list-student.response';

@Injectable()
export class AdminStudentService {
  constructor(
    private readonly adminStudentRepository: AdminStudentRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin will create new Student
   * @param adminCreateStudentInput
   */
  async adminCreateStudent(
    adminCreateStudentInput: AdminCreateStudentInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentRepository.adminCreateStudent(
      adminCreateStudentInput,
    );

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('student.STUDENT_CREATED_SUCCESSFULLY');
    return response;
  }

  /**
   * @description Admin will get student by id
   * @param adminGetStudentInput
   * @returns Student
   */
  async adminGetStudent(
    adminGetStudentInput: AdminGetStudentInput,
  ): Promise<AdminGetStudentEntity> {
    const student =
      await this.adminStudentRepository.adminGetStudent(adminGetStudentInput);

    if (!student) {
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));
    }
    return AdminGetStudentResponse.decode({ student: student });
  }

  /**
   * @description Admin will list the all student by pagination or search
   * @param adminListStudentInput
   * @returns Student
   */

  async adminListStudent(
    adminListStudentInput: AdminListStudentInput,
  ): Promise<AdminListStudentEntity> {
    const [student, count] = await this.adminStudentRepository.adminListStudent(
      adminListStudentInput,
    );

    if (!student.length) {
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));
    }
    return AdminListStudentResponse.decode({ student: student, count: count });
  }
}
