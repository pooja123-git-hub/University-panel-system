import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeesStructure } from '../database/fee.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { I18nService } from 'nestjs-i18n';
import { AdminCreateFeesInput } from '../dto/admin/admin-create-fees-input';
import { AdminUpdateFeesInput } from '../dto/admin/admin-update-fees.input';
import { AdminGetFeesInput } from '../dto/admin/admin-get-fees.input';
import { AdminListFeesInput } from '../dto/admin/admin-list-fees.input';
import { AdminDeleteFeesInput } from '../dto/admin/admin-delete-fees.input';

@Injectable()
export class AdminFeesRepository {
  constructor(
    @InjectRepository(FeesStructure)
    private feesRepository: Repository<FeesStructure>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin create fees structure for valid courses
   * @param adminCreateFeesInput
   * @returns
   */
  async adminCreateFees(
    adminCreateFeesInput: AdminCreateFeesInput,
  ): Promise<FeesStructure> {
    const course = await this.courseRepository.findOne({
      where: { id: adminCreateFeesInput.course_id },
    });
    if (!course)
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));

    const semester = await this.semesterRepository.findOne({
      where: { id: adminCreateFeesInput.semester_id },
      relations: { course: true },
    });
    if (!semester)
      throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));

    if (semester.course.id !== course.id) {
      throw new BadRequestException(
        this.i18n.t('semester.SEMESTER_NOT_LINKED'),
      );
    }
    // total fees
    const totalFee =
      adminCreateFeesInput.tuition_fees +
      adminCreateFeesInput.exam_fees +
      adminCreateFeesInput.library_fees +
      adminCreateFeesInput.other_fees;

    const fee = new FeesStructure();
    fee.tuition_fee = adminCreateFeesInput.tuition_fees;
    fee.exam_fee = adminCreateFeesInput.exam_fees;
    fee.library_fee = adminCreateFeesInput.library_fees;
    fee.other_fee = adminCreateFeesInput.other_fees;
    fee.course = course;
    fee.semester = semester;
    fee.total_fee = totalFee;

    await this.feesRepository.save(fee);
    return fee;
  }

  /**
   * @description Admin update fees structure for valid courses
   * @param adminUpdateFeesInput
   * @returns
   */
  async adminUpdateFees(
    adminUpdateFeesInput: AdminUpdateFeesInput,
  ): Promise<FeesStructure> {
    const existingFees = await this.feesRepository.findOne({
      where: { id: adminUpdateFeesInput.feesId },
    });

    if (!existingFees) {
      throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
    }
    const course = await this.courseRepository.findOne({
      where: { id: adminUpdateFeesInput.course_id },
    });
    if (!course)
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));

    const semester = await this.semesterRepository.findOne({
      where: { id: adminUpdateFeesInput.semester_id },
      relations: { course: true },
    });
    if (!semester)
      throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));

    if (semester.course.id !== course.id) {
      throw new BadRequestException(
        this.i18n.t('semester.SEMESTER_NOT_LINKED'),
      );
    }
    // total fees
    const totalFee =
      adminUpdateFeesInput.tuition_fees +
      adminUpdateFeesInput.exam_fees +
      adminUpdateFeesInput.library_fees +
      adminUpdateFeesInput.other_fees;

    existingFees.tuition_fee = adminUpdateFeesInput.tuition_fees;
    existingFees.exam_fee = adminUpdateFeesInput.exam_fees;
    existingFees.library_fee = adminUpdateFeesInput.library_fees;
    existingFees.other_fee = adminUpdateFeesInput.other_fees;
    existingFees.course = course;
    existingFees.semester = semester;
    existingFees.total_fee = totalFee;

    await this.feesRepository.save(existingFees);
    return existingFees;
  }

  /**
   * @description Get fees detail by id
   * @param adminGetFeesInput
   * @returns
   */
  async adminGetFees(
    adminGetFeesInput: AdminGetFeesInput,
  ): Promise<FeesStructure | null> {
    const query = await this.feesRepository
      .createQueryBuilder('fees')
      .select([
        'fees.id',
        'fees.tuition_fee',
        'fees.exam_fee',
        'fees.library_fee',
        'fees.other_fee',
        'fees.total_fee',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('fees.course', 'course')
      .leftJoin('fees.semester', 'semester')
      .where('fees.id=:feeId', { feeId: adminGetFeesInput.feesId });

    const result = await query.getOne();
    return result;
  }

  /**
   * @description list fees details
   * @param adminListFeesInput
   * @returns
   */
  async adminListFees(
    adminListFeesInput: AdminListFeesInput,
  ): Promise<[FeesStructure[], number]> {
    const query = await this.feesRepository
      .createQueryBuilder('fees')
      .select([
        'fees.id',
        'fees.tuition_fee',
        'fees.exam_fee',
        'fees.library_fee',
        'fees.other_fee',
        'fees.total_fee',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('fees.course', 'course')
      .leftJoin('fees.semester', 'semester');

    if (adminListFeesInput.pagination) {
      query.take(adminListFeesInput.take).skip(adminListFeesInput.skip);
    }

    const result = await query.getManyAndCount();
    return result;
  }

  /**
   * @description admin delete fees
   * @param adminDeleteFeesInput
   * @returns
   */
  async adminDeleteFees(adminDeleteFeesInput: AdminDeleteFeesInput) {
    const fees = await this.feesRepository.findOne({
      where: { id: adminDeleteFeesInput.feesId },
    });
    if (!fees) throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
    await this.feesRepository.softDelete(adminDeleteFeesInput.feesId);
  }
}
