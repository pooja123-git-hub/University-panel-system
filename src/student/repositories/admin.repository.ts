import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Student } from '../database/student.entity';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { AdminCreateStudentInput } from '../dto/admin/admin-create-student.input';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminGetStudentInput } from '../dto/admin/admin-get-student.input';
import { AdminListStudentInput } from '../dto/admin/admin-list-student.input';
import { AdminDeleteStudentInput } from '../dto/admin/admin-delete-student.input';
import { AppDataSource } from 'app-data-source';
import { AdminUpdateStudentInput } from '../dto/admin/admin-update-student.input';

@Injectable()
export class AdminStudentRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    private readonly i18n: I18nService,
    private readonly authService: AuthService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @description Admin will create new Student
   * @param adminCreateStudentInput
   */

  async adminCreateStudent(
    adminCreateStudentInput: AdminCreateStudentInput,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const course = await queryRunner.manager.findOne(Course, {
        where: { id: adminCreateStudentInput.course_id },
      });

      if (!course) {
        throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
      }

      const semester = await queryRunner.manager.findOne(Semester, {
        where: { id: adminCreateStudentInput.semester_id },
        relations: {
          course: true,
        },
      });

      if (!semester) {
        throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));
      }

      // Validate semester belongs to selected course
      if (semester.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('semester.SEMESTER_NOT_LINKED'),
        );
      }

      /**
       * Existing User + Student Flow
       */
      if (adminCreateStudentInput.user_id) {
        const user = await queryRunner.manager.findOne(User, {
          where: {
            id: adminCreateStudentInput.user_id,
          },
          relations: {
            role: true,
          },
        });

        if (!user) {
          throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));
        }

        if (user.role?.is_admin) {
          throw new BadRequestException(
            this.i18n.t('student.CHECK_STUDENT_ROLE'),
          );
        }

        const existingStudent = await queryRunner.manager.findOne(Student, {
          where: {
            user: {
              id: user.id,
            },
          },
        });

        if (existingStudent) {
          throw new BadRequestException(
            this.i18n.t('student.STUDENT_RECORD_EXIST'),
          );
        }

        const student = new Student();
        student.roll_number = adminCreateStudentInput.roll_number;
        student.marks = adminCreateStudentInput.marks;
        student.grade_points = adminCreateStudentInput.grade_points;
        student.course = course;
        student.semester = semester;
        student.user = user;
        student.result = adminCreateStudentInput.result;

        await queryRunner.manager.save(Student, student);

        await queryRunner.commitTransaction();
        return;
      }

      /**
       * New User + Student Flow
       */
      const status = await queryRunner.manager.findOne(Status, {
        where: {
          id: adminCreateStudentInput.status,
        },
      });

      if (!status) {
        throw new NotFoundException(this.i18n.t('status.STATUS_NOT_FOUND'));
      }

      const role = await queryRunner.manager.findOne(Role, {
        where: {
          is_admin: false,
        },
      });

      if (!role) {
        throw new NotFoundException(
          this.i18n.t('student.STUDENT_ROLE_NOT_FOUND'),
        );
      }

      const existingEmail = await queryRunner.manager.findOne(User, {
        where: {
          email: adminCreateStudentInput.email,
        },
      });

      if (existingEmail) {
        throw new BadRequestException(this.i18n.t('user.EMAIL_ALREADY_EXIST'));
      }

      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(
        adminCreateStudentInput.password,
        salt,
      );

      const user = new User();
      user.email = adminCreateStudentInput.email ?? user.email;
      user.name = adminCreateStudentInput.name ?? user.name;
      user.gender = adminCreateStudentInput.gender ?? user.gender;
      user.role = role;
      user.status = status;
      user.password = passwordHash;

      await queryRunner.manager.save(User, user);

      const student = new Student();
      student.roll_number = adminCreateStudentInput.roll_number;
      student.marks = adminCreateStudentInput.marks;
      student.grade_points = adminCreateStudentInput.grade_points;
      student.course = course;
      student.semester = semester;
      student.user = user;
      student.result = adminCreateStudentInput.result;

      await queryRunner.manager.save(Student, student);

      await queryRunner.commitTransaction();

      // const tokens = await this.authService.getTokens(
      //   user.id,
      //   user.email,
      //   user.role.id,
      // );

      // await this.authService.updateRtHash(user.id, tokens.refresh_token);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description Admin will get student by id
   * @param adminGetStudentInput
   * @returns Student
   */

  async adminGetStudent(
    adminGetStudentInput: AdminGetStudentInput,
  ): Promise<Student | null> {
    const query = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student.semester', 'semester')
      .where('student.id=:studentId', {
        studentId: adminGetStudentInput.studentId,
      });

    const result = await query.getOne();
    console.log(result);

    return result;
  }

  /**
   * @description Admin will list the all student by pagination or search
   * @param adminListStudentInput
   * @returns Student
   */

  async adminListStudent(
    adminListStudentInput: AdminListStudentInput,
  ): Promise<[Student[], number]> {
    const query = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student.semester', 'semester');

    if (adminListStudentInput?.search) {
      query.andWhere('LOWER(user.name) LIKE :search', {
        search: `%${adminListStudentInput.search.toLowerCase()}%`,
      });
    }
    if (adminListStudentInput.pagination) {
      query.take(adminListStudentInput.take).skip(adminListStudentInput.skip);
    }

    const result = await query.getManyAndCount();

    return result;
  }

  /**
   * @description Admin will update new Student
   * @param adminUpdateStudentInput
   */
  async adminUpdateStudent(
    adminUpdateStudentInput: AdminUpdateStudentInput,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingStudent = await queryRunner.manager.findOne(Student, {
        where: {
          id: adminUpdateStudentInput.student_id,
        },
        relations: {
          user: true,
        },
      });

      if (!existingStudent) {
        throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));
      }

      const course = await queryRunner.manager.findOne(Course, {
        where: {
          id: adminUpdateStudentInput.course_id,
        },
      });

      if (!course) {
        throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
      }

      const semester = await queryRunner.manager.findOne(Semester, {
        where: {
          id: adminUpdateStudentInput.semester_id,
        },
        relations: {
          course: true,
        },
      });

      if (!semester) {
        throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));
      }

      if (semester.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('semester.SEMESTER_NOT_LINKED'),
        );
      }

      /**
       * Existing User + Student Flow
       */
      if (adminUpdateStudentInput.user_id) {
        const user = await queryRunner.manager.findOne(User, {
          where: {
            id: adminUpdateStudentInput.user_id,
          },
          relations: {
            role: true,
          },
        });

        if (!user) {
          throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));
        }

        if (user.role?.is_admin) {
          throw new BadRequestException(
            this.i18n.t('student.CHECK_STUDENT_ROLE'),
          );
        }

        const checkStudent = await queryRunner.manager.findOne(Student, {
          where: {
            user: {
              id: user.id,
            },
          },
        });

        if (checkStudent && checkStudent.id !== existingStudent.id) {
          throw new BadRequestException(
            this.i18n.t('student.STUDENT_RECORD_EXIST'),
          );
        }

        existingStudent.roll_number = adminUpdateStudentInput.roll_number;
        existingStudent.marks = adminUpdateStudentInput.marks;
        existingStudent.grade_points = adminUpdateStudentInput.grade_points;
        existingStudent.course = course;
        existingStudent.semester = semester;
        existingStudent.user = user;
        existingStudent.result = adminUpdateStudentInput.result;

        await queryRunner.manager.save(Student, existingStudent);

        await queryRunner.commitTransaction();
        return;
      }

      /**
       * Update Existing User + Student
       */
      const status = await queryRunner.manager.findOne(Status, {
        where: {
          id: adminUpdateStudentInput.status,
        },
      });

      if (!status) {
        throw new NotFoundException(this.i18n.t('status.STATUS_NOT_FOUND'));
      }

      const existingEmail = await queryRunner.manager.findOne(User, {
        where: {
          email: adminUpdateStudentInput.email,
        },
      });

      if (existingEmail && existingEmail.id !== existingStudent.user.id) {
        throw new BadRequestException(this.i18n.t('user.EMAIL_ALREADY_EXIST'));
      }

      const user = existingStudent.user;

      user.name = adminUpdateStudentInput.name ?? user.name;
      user.email = adminUpdateStudentInput.email ?? user.email;
      user.gender = adminUpdateStudentInput.gender ?? user.gender;
      user.status = status;

      if (adminUpdateStudentInput.password) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
          adminUpdateStudentInput.password,
          salt,
        );
      }

      await queryRunner.manager.save(User, user);

      existingStudent.roll_number = adminUpdateStudentInput.roll_number;
      existingStudent.marks = adminUpdateStudentInput.marks;
      existingStudent.grade_points = adminUpdateStudentInput.grade_points;
      existingStudent.course = course;
      existingStudent.semester = semester;
      existingStudent.result = adminUpdateStudentInput.result;

      await queryRunner.manager.save(Student, existingStudent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new NotFoundException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description Admin can delete the student linked with user
   * @param adminDeleteStudentInput
   */
  async adminDeleteStudent(adminDeleteStudentInput: AdminDeleteStudentInput) {
    const student = await this.studentRepository.findOne({
      where: { id: adminDeleteStudentInput.studentId },
      relations: { user: true },
    });
    if (!student)
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));

    await this.studentRepository.softDelete(adminDeleteStudentInput.studentId);
    await this.userRepository.softDelete(student.user.id);
  }
}
