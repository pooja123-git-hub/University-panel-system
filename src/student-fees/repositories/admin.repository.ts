import {
  
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/database/student.entity';
import { Repository } from 'typeorm';
import { StudentFees } from '../database/student-fee.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { I18nService } from 'nestjs-i18n';
import { AdminCreateStudentFeeInput } from '../dto/admin/admin-create-student-fees.input';
import { AppDataSource } from 'app-data-source';
import { AdminGetStudentFeeInput } from '../dto/admin/admin-get-student-fees.input';
import { AdminListStudentFeeInput } from '../dto/admin/admin-list-student-fees.input';
import { AdminDeleteStudentFeeInput } from '../dto/admin/admin-delete-student-fees.input';
import { AdminUpdateStudentFeesInput } from '../dto/admin/admin-update-student-fee.input';

@Injectable()
export class AdminStudentFeeRepository {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(StudentFees)
    private studentFeeRepository: Repository<StudentFees>,
    @InjectRepository(FeesStructure)
    private feesRepository: Repository<FeesStructure>,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin will create here student fees records
   * @param adminCreateStudentFeeInput
   */
  async adminCreateStudentFees(
    adminCreateStudentFeeInput: AdminCreateStudentFeeInput,
  ): Promise<void> {
    // 1.Check student existence
    const student = await this.studentRepository.findOne({
      where: { id: adminCreateStudentFeeInput.student_id },
      relations: { course: true },
    });
    if (!student)
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));

    // 2.Check Fees existence
    const fees = await this.feesRepository.findOne({
      where: { id: adminCreateStudentFeeInput.fee_id },
      relations: { course: true },
    });
    if (!fees) throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));

    // 3.Check student is linked with coures for fee structure
    if (student.course.id !== fees.course.id) {
      throw new BadRequestException(this.i18n.t('fees.COURSE_NOT_MATCH'));
    }

    // 4.Check amout paid should not be exceed with total fee
    if (adminCreateStudentFeeInput.amount_paid > fees.total_fee) {
      throw new BadRequestException(
        this.i18n.t('student-fees.FEES_CAN_NOT_BE_EXCEED'),
      );
    }

    // 5.Check pending fees
    const due_amount = fees.total_fee - adminCreateStudentFeeInput.amount_paid;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Create student-fees Record
      const studentFees = new StudentFees();
      studentFees.amount_paid = adminCreateStudentFeeInput.amount_paid;
      studentFees.due_amount = due_amount;
      studentFees.payment_status = adminCreateStudentFeeInput.payment_status;
      studentFees.student = student;
      studentFees.feeStructure = fees;
      studentFees.payment_date = new Date();

      await queryRunner.manager.save(StudentFees, studentFees);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description Admin get student fees by studentId and view all detail of fees and other
   * @param adminGetStudentFeesInput
   * @returns
   */
  async adminGetStudentFees(
    adminGetStudentFeesInput: AdminGetStudentFeeInput,
  ): Promise<StudentFees | null> {
    const query = await this.studentFeeRepository
      .createQueryBuilder('student_fees')
      .leftJoinAndSelect('student_fees.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student_fees.feeStructure', 'feeStructure')
      .where('student.id=:studentId', {
        studentId: adminGetStudentFeesInput.studentId,
      })
      .andWhere('student_fees.id=:stFeeId', {
        stFeeId: adminGetStudentFeesInput.studentFeesId,
      });

    const result = await query.getOne();
    console.log(result);

    return result;
  }
  /**
   * @description Admin List all  student fees
   * @param adminListStudentFeesInput
   * @returns
   */
  async adminListStudentFees(
    adminListStudentFeesInput: AdminListStudentFeeInput,
  ): Promise<[StudentFees[], number]> {
    const query = await this.studentFeeRepository
      .createQueryBuilder('student_fees')
      .leftJoinAndSelect('student_fees.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student_fees.feeStructure', 'feeStructure');

    if (adminListStudentFeesInput?.search) {
      query.andWhere('LOWER(user.name) LIKE :search', {
        search: `%${adminListStudentFeesInput.search.toLowerCase()}%`,
      });
    }
    if (adminListStudentFeesInput.pagination) {
      query
        .take(adminListStudentFeesInput.take)
        .skip(adminListStudentFeesInput.skip);
    }

    const result = await query.getManyAndCount();
    console.log(result);

    return result;
  }

  /**
   * @description Admin will update here student fees records
   * @param adminUpdateStudentFeeInput
   */
  async adminUpdateStudentFees(
    adminUpdateStudentFeeInput: AdminUpdateStudentFeesInput,
  ): Promise<void> {
    // 1. Check student fee record
    const studentFee = await this.studentFeeRepository.findOne({
      where: { id: adminUpdateStudentFeeInput.studentFeesId },
      relations: {
        student: {
          course: true,
        },
        feeStructure: {
          course: true,
        },
      },
    });

    if (!studentFee) {
      throw new NotFoundException(
        this.i18n.t('student-fees.STUDENT_FEES_NOT_FOUND'),
      );
    }

    // 2. Check fee structure
    const fees = await this.feesRepository.findOne({
      where: {
        id: adminUpdateStudentFeeInput.fee_id,
      },
      relations: {
        course: true,
      },
    });

    if (!fees) {
      throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
    }

    // 3. Check course match
    if (studentFee.student.course.id !== fees.course.id) {
      throw new BadRequestException(this.i18n.t('fees.COURSE_NOT_MATCH'));
    }

    // 4. Check amount
    if (adminUpdateStudentFeeInput.amount_paid > fees.total_fee) {
      throw new BadRequestException(
        this.i18n.t('student-fees.FEES_CAN_NOT_BE_EXCEED'),
      );
    }

    // 5. Calculate due amount
    const dueAmount = fees.total_fee - adminUpdateStudentFeeInput.amount_paid;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      studentFee.amount_paid = adminUpdateStudentFeeInput.amount_paid;
      studentFee.due_amount = dueAmount;
      studentFee.payment_status = adminUpdateStudentFeeInput.payment_status;
      studentFee.feeStructure = fees;
      studentFee.payment_date = new Date();

      await queryRunner.manager.save(StudentFees, studentFee);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new BadRequestException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }
  /**
   * @description Admin will DeleteStudentFees record by its id
   * @param adminDeleteStudentFeesInput
   */
  async adminDeleteStudentFees(
    adminDeleteStudentFeesInput: AdminDeleteStudentFeeInput,
  ) {
    const studentFee = await this.studentFeeRepository.findOne({
      where: { id: adminDeleteStudentFeesInput.studnetFeesId },
    });
    if (!studentFee) {
      throw new NotFoundException(
        this.i18n.t('student-fees.STUDENT_FEES_NOT_FOUND'),
      );
    }
    await this.studentFeeRepository.softDelete(
      adminDeleteStudentFeesInput.studnetFeesId,
    );
  }
}
