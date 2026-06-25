import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../database/student.entity';
import { Repository } from 'typeorm';
import { GetStudentInput } from '../dto/get-student.input';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  /**
   * @description get student profile
   * @param getStudentInput
   * @returns
   */
  async getStudent(getStudentInput: GetStudentInput): Promise<Student | null> {
    const query = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student.semester', 'semester')
      .where('student.id=:studentId', {
        studentId: getStudentInput.studentId,
      });

    const result = await query.getOne();

    return result;
  }
}
