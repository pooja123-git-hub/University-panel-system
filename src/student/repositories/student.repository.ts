import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../database/student.entity';
import { Repository } from 'typeorm';
import { GetStudentInput } from '../dto/get-student.input';
import { User } from 'src/user/database/user.entity';

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
  async getStudent(user: User): Promise<Student | null> {
    const query = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student.semester', 'semester')
      .where('user.id=:studentId', {
        studentId: user.id,
      });

    const result = await query.getOne();

    return result;
  }
}
