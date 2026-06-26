import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentFeesRepository } from './repositories/student-fee.repository';
import { I18nService } from 'nestjs-i18n';
import { GetsStudentFeeEntity } from './entities/get-student-fee.entity';
import { GetStudentFeesResponse } from './response/get-student.fees.response';
import { User } from 'src/user/database/user.entity';

@Injectable()
export class StudentFeesService {
  constructor(
    private readonly studentFeeRepoistory: StudentFeesRepository,
    private readonly i18n: I18nService,
  ) {}
  /**
   * @description Student can get student own  fees detail
   * @param getStudentFeesInput
   * @returns
   */
  async getStudentFee(
    user:User
  ): Promise<GetsStudentFeeEntity> {
    const studentFees =
      await this.studentFeeRepoistory.getStudentFees(user);

    if (!studentFees)
      throw new NotFoundException(
        this.i18n.t('student-fees.STUDENT_FEES_NOT_FOUND'),
      );

    return GetStudentFeesResponse.decode({ studentFees: studentFees });
  }
}
