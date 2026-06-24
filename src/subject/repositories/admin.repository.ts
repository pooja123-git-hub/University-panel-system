import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../database/subject.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { AdminCreateSubjectInput } from '../dto/admin/admin-create-subject.input';
import { I18nService } from 'nestjs-i18n';
import { AdminGetSubjectInput } from '../dto/admin/admin-get-subject-input';
import { AdminListSubjectInput } from '../dto/admin/admin-list-subject.input';
import { AdminDeleteSubjectInput } from '../dto/admin/admin-delete-subject.input';
import { AdminUpdateSubjectInput } from '../dto/admin/admin-update-subject.input';

@Injectable()
export class AdminSubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Created subject with valid course and semester
   * @param adminCreateSubjectInput
   * @returns
   */

  async adminCreateSubject(
    adminCreateSubjectInput: AdminCreateSubjectInput,
  ): Promise<Subject> {
    const course = await this.courseRepository.findOne({
      where: { id: adminCreateSubjectInput.course_id },
    });
    if (!course)
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));

    const semester = await this.semesterRepository.findOne({
      where: { id: adminCreateSubjectInput.semester_id },
      relations: { course: true },
    });
    if (!semester)
      throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));

    if (semester.course.id !== course.id) {
      throw new BadRequestException(
        this.i18n.t('semester.SEMESTER_NOT_LINKED'),
      );
    }
    const subject = new Subject();
    ((subject.subject_name = adminCreateSubjectInput.subject_name),
      (subject.credits = adminCreateSubjectInput.credits));
    subject.subject_code = adminCreateSubjectInput.subject_code;
    subject.course = course;
    subject.semester = semester;

    await this.subjectRepository.save(subject);
    return subject;
  }

  /**
   * @description Admin can get subject detail with id
   * @param adminListSubjectInput
   * @returns
   */
  async adminGetSubject(
    adminGetSubjectInput: AdminGetSubjectInput,
  ): Promise<Subject | null> {
    const query = await this.subjectRepository
      .createQueryBuilder('subject')
      .select([
        'subject.id',
        'subject.subject_name',
        'subject.subject_code',
        'subject.credits',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('subject.course', 'course')
      .leftJoin('subject.semester', 'semester')
      .where('subject.id=:subjectId', {
        subjectId: adminGetSubjectInput.subjectId,
      });
    const result = await query.getOne();

    return result;
  }

  /**
   * @description Update subject with valid course and semester
   * @param adminUpdateSubjectInput
   * @returns
   */
  async adminUpdateSubject(
    adminUpdateCourseInput: AdminUpdateSubjectInput,
  ): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOne({
      where: { id: adminUpdateCourseInput.subject_id },
    });
    if (!existingSubject)
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));

    const course = await this.courseRepository.findOne({
      where: { id: adminUpdateCourseInput.course_id },
    });
    if (!course)
      throw new NotFoundException(this.i18n.t('course.COURSE_NAME_NOT_FOUND'));

    const semester = await this.semesterRepository.findOne({
      where: { id: adminUpdateCourseInput.semester_id },
      relations: { course: true },
    });
    if (!semester)
      throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));

    if (semester.course.id !== course.id) {
      throw new BadRequestException(
        this.i18n.t('semester.SEMESTER_NOT_LINKED'),
      );
    }
    existingSubject.subject_name = adminUpdateCourseInput.subject_name;
    existingSubject.subject_code = adminUpdateCourseInput.subject_code;
    existingSubject.course = course;
    existingSubject.semester = semester;
    existingSubject.credits = adminUpdateCourseInput.credits;

    await this.subjectRepository.save(existingSubject);
    return existingSubject;
  }

  /**
   * @description Admin can list subject detail
   * @param adminGetSubjectInput
   * @returns
   */
  async adminListSubject(
    adminListSubjectInput: AdminListSubjectInput,
  ): Promise<[Subject[], number]> {
    const query = await this.subjectRepository
      .createQueryBuilder('subject')
      .select([
        'subject.id',
        'subject.subject_name',
        'subject.subject_code',
        'subject.credits',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('subject.course', 'course')
      .leftJoin('subject.semester', 'semester');
    if (adminListSubjectInput?.search) {
      query.andWhere('LOWER(subject.subject_name) LIKE :search', {
        search: `%${adminListSubjectInput.search.toLowerCase()}%`,
      });
    }
    if (adminListSubjectInput.pagination) {
      query.take(adminListSubjectInput.take).skip(adminListSubjectInput.skip);
    }
    const list = await query.getManyAndCount();
    console.log(list);
    return list;
  }

  /**
   * @description Admin can delte subject detail with id
   * @param adminDeleteSubjectInput
   * @returns
   */
  async adminDeleteSubject(adminDeleteSubjectInput: AdminDeleteSubjectInput) {
    const subject = await this.subjectRepository.findOne({
      where: { id: adminDeleteSubjectInput.subjectId },
    });
    if (!subject)
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));

    await this.subjectRepository.softDelete(adminDeleteSubjectInput.subjectId);
  }
}
