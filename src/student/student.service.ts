import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './repositories/student.repository';
import { I18nService } from 'nestjs-i18n';
import { GetStudentInput } from './dto/get-student.input';
import { GetStudentEntity } from './entities/get-student.entity';
import { GetStudentResponse } from './response/get-student.response';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description get student profile
   * @param getStudentInput
   * @returns
   */
  async getStudent(
    getStudentInput: GetStudentInput,
  ): Promise<GetStudentEntity> {
    const student = await this.studentRepository.getStudent(getStudentInput);
    if (!student)
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));

    return GetStudentResponse.decode({ student: student });
  }
}
