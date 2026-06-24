import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../database/course.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { AdminCreateCourseInput } from '../dto/admin/admin-create-course.input';
import { Status } from 'src/status/database/status.entity';
import { isEmpty, NotFoundError } from 'rxjs';
import { Semester } from 'src/semester/database/semester.entity';
import { AdminGetCourseInput } from '../dto/admin/admin-get-course.input';
import { AdminGetCourseEntity } from '../entities/admin/admin-get-course.entity';
import { AdminListCourseInput } from '../dto/admin/admin-list-course.input';
import { AdminDeleteCourseInput } from '../dto/admin/admin-delete-course.input';
import { AppDataSource } from 'app-data-source';
import { AdminUpdateCourseInput } from '../dto/admin/admin-update-course.input';

@Injectable()
export class AdminCourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Semester)
    private readonly semsesterRepository: Repository<Semester>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @description Admin Create Course
   * @param adminCreateCourseInput
   * @returns
   */
  async adminCreateCourse(
    adminCreateCourseInput: AdminCreateCourseInput,
  ): Promise<Course> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const status = await this.statusRepository.findOne({
        where: { id: adminCreateCourseInput.status },
      });

      if (!status) throw new NotFoundException('Status not found');

      const course = new Course();
      course.course_name = adminCreateCourseInput.course_name;
      course.course_type = adminCreateCourseInput.course_type;
      course.total_semesters = adminCreateCourseInput.total_semester;
      course.status = status;
      const newCourse = await queryRunner.manager.save(course);

      if (adminCreateCourseInput.total_semester > 0) {
        const semesters: Semester[] = [];
        for (let i = 1; i <= adminCreateCourseInput.total_semester; i++) {
          const semester = new Semester();
          semester.semester_number = i;
          semester.course = newCourse;
          semesters.push(semester);
        }
        await queryRunner.manager.save(semesters);
      }
      await queryRunner.commitTransaction();
      return course;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Something Went wrong');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description adminGetCourse
   * @param adminGetCourseInput
   * @returns
   */
  async adminGetCourse(
    adminGetCourseInput: AdminGetCourseInput,
  ): Promise<Course | null> {
    const query = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.course_name',
        'course.course_type',
        'course.total_semesters',
        'status.id',
        'status.name',
        'semesters.id',
        'semesters.semester_number',
      ])
      .leftJoin('course.status', 'status')
      .leftJoin('course.semesters', 'semesters')
      .where('course.id=:courseId', {
        courseId: adminGetCourseInput.courseId,
      });
    const result = await query.getOne();
    return result;
  }

  /**
   * @description adminListCourse
   * @param adminListCourseInput
   * @returns
   */
  async adminListCourse(
    adminListCourseInput: AdminListCourseInput,
  ): Promise<[Course[], number]> {
    const query = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.course_name',
        'course.course_type',
        'course.total_semesters',
        'status.id',
        'status.name',
        'semesters.id',
        'semesters.semester_number',
      ])
      .leftJoin('course.status', 'status')
      .leftJoin('course.semesters', 'semesters');

    if (adminListCourseInput?.search) {
      query.andWhere('LOWER(course.course_name) LIKE :search', {
        search: `%${adminListCourseInput.search.toLowerCase()}%`,
      });
    }
    if (adminListCourseInput.pagination) {
      query.take(adminListCourseInput.take).skip(adminListCourseInput.skip);
    }
    const list = await query.getManyAndCount();
    // console.log(list);
    return list;
  }

  /**
   * @description Admin Update Course
   * @param adminUpdateCourseInput
   * @returns
   */
  async adminUpdateCourse(
    adminUpdateCourseInput: AdminUpdateCourseInput,
  ): Promise<Course> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const course = await queryRunner.manager.findOne(Course, {
        where: { id: adminUpdateCourseInput.course_id },
        relations: {
          semesters: true,
          status: true,
        },
      });

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      const status = await queryRunner.manager.findOne(Status, {
        where: { id: adminUpdateCourseInput.status },
      });

      if (!status) {
        throw new NotFoundException('Status not found');
      }

      const oldSemesterCount = course.total_semesters;
      const newSemesterCount = adminUpdateCourseInput.total_semester;

      course.course_name = adminUpdateCourseInput.course_name;
      course.course_type = adminUpdateCourseInput.course_type;
      course.total_semesters = newSemesterCount;
      course.status = status;

      await queryRunner.manager.save(course);

      // Add new semesters
      if (newSemesterCount > oldSemesterCount) {
        const semesters: Semester[] = [];

        for (let i = oldSemesterCount + 1; i <= newSemesterCount; i++) {
          const semester = new Semester();
          semester.semester_number = i;
          semester.course = course;

          semesters.push(semester);
        }

        await queryRunner.manager.save(semesters);
      }

      // Remove extra semesters
      if (newSemesterCount < oldSemesterCount) {
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(Semester)
          .where('course_id = :courseId', {
            courseId: course.id,
          })
          .andWhere('semester_number > :semesterNumber', {
            semesterNumber: newSemesterCount,
          })
          .execute();
      }

      await queryRunner.commitTransaction();

      return course;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description AdminDeleteCourse
   * @param adminDeleteCourseInput
   */
  async adminDeleteCourse(
    adminDeleteCourseInput: AdminDeleteCourseInput,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const course = await this.courseRepository.findOne({
        where: { id: adminDeleteCourseInput.courseId },
        relations: { semesters: true },
      });
      if (!course) {
        throw new NotFoundException('Course not Found');
      }
      await queryRunner.manager.softDelete(Semester, {
        course: { id: adminDeleteCourseInput.courseId },
      });

      await queryRunner.manager.softDelete(Course, {
        id: adminDeleteCourseInput.courseId,
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Something Went wrong');
    }
  }
}
