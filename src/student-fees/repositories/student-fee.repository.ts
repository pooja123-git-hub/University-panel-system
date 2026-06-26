import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentFees } from '../database/student-fee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';

@Injectable()
export class StudentFeesRepository {
  constructor(
    @InjectRepository(StudentFees)
    private studentFeeRepository: Repository<StudentFees>,
  ) {}

  /**
   * @description Student can get student own  by studentId and view all detail of fees and other
   * @param getStudentFeesInput
   * @returns
   */
  async getStudentFees(
    user:User
  ): Promise<StudentFees | null> {
    const query = await this.studentFeeRepository
      .createQueryBuilder('student_fees')
      .leftJoinAndSelect('student_fees.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student_fees.feeStructure', 'feeStructure')
      .where('user.id=:studentId', {
        studentId: user.id,
      })
   

    const result = await query.getOne();
    console.log(result);

    return result;
  }
}
