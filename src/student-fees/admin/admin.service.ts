import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStudentFeeRepository } from '../repositories/admin.repository';
import { I18nService } from 'nestjs-i18n';
import { AdminCreateStudentFeeInput } from '../dto/admin/admin-create-student-fees.input';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminGetStudentFeeInput } from '../dto/admin/admin-get-student-fees.input';
import { AdminGetStudentFeeEntity } from '../entities/admin/admin-get-student-fee.entity';
import { AdminGetStudentFeeResponse } from '../response/admin/admin-get-student-fees.response';
import { AdminListStudentFeeInput } from '../dto/admin/admin-list-student-fees.input';
import { AdminListStudentFeeEntity } from '../entities/admin/admin-list-student-fee.entity';
import { AdminListStudentFeeResponse } from '../response/admin/admin-list-student-fees.response';
import { AdminDeleteStudentFeeInput } from '../dto/admin/admin-delete-student-fees.input';
import { AdminUpdateStudentFeesInput } from '../dto/admin/admin-update-student-fee.input';

@Injectable()
export class AdminStudentFeeService {
  constructor(
    private readonly adminStudentFeesRepository: AdminStudentFeeRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin will create here student fees records
   * @param adminCreateStudentFeeInput
   */
  async adminCreateStudentFee(
    adminCreateStudentFee: AdminCreateStudentFeeInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentFeesRepository.adminCreateStudentFees(
      adminCreateStudentFee,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-fees.STUDENT_FEES_CREATED_SUCCESSFULLY',
    );
    return response;
  }

  /**
   * @description Admin get student fees by studentId and view all detail of fees and other
   * @param adminGetStudentFeesInput
   * @returns
   */
  async adminGetStudentFee(
    adminGetStudentFeeInput: AdminGetStudentFeeInput,
  ): Promise<AdminGetStudentFeeEntity> {
    const studentFees =
      await this.adminStudentFeesRepository.adminGetStudentFees(
        adminGetStudentFeeInput,
      );

    if (!studentFees)
      throw new NotFoundException(
        this.i18n.t('student-fees.STUDENT_FEES_NOT_FOUND'),
      );

    return AdminGetStudentFeeResponse.decode({ studentFees: studentFees });
  }

  /**
   * @description Admin List all  student fees
   * @param adminListStudentFeesInput
   * @returns
   */
  async adminListStudentFees(
    adminListStudentFeesInput: AdminListStudentFeeInput,
  ): Promise<AdminListStudentFeeEntity> {
    const [studentFees, count] =
      await this.adminStudentFeesRepository.adminListStudentFees(
        adminListStudentFeesInput,
      );

    if (!studentFees.length) {
      throw new NotFoundException(
        this.i18n.t('student-fees.STUDENT_FEES_NOT_FOUND'),
      );
    }
    return AdminListStudentFeeResponse.decode({
      studentFees: studentFees,
      count: count,
    });
  }
  /**
   * @description Admin will update here student fees records
   * @param adminUpdateStudentFeeInput
   */
  async adminUpdateStudentFee(
    adminUpdateStudentFeeInput: AdminUpdateStudentFeesInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentFeesRepository.adminUpdateStudentFees(
      adminUpdateStudentFeeInput,
    );
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-fees.STUDENT_FEES_UPDATED_SUCCESSFULLY',
    );
    return response;
  }

  /**
   * @description Admin will DeleteStudentFees record by its id
   * @param adminDeleteStudentFeesInput
   */
  async adminDeleteStudentFees(
    adminDeleteStudentFeesInput: AdminDeleteStudentFeeInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentFeesRepository.adminDeleteStudentFees(
      adminDeleteStudentFeesInput,
    );

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-fees.STUDENT_FEES_DELETED_SUCCESSFULLY',
    );
    return response;
  }
}
