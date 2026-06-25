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
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminGetStudentInput } from '../dto/admin/admin-get-student.input';
import { AdminListStudentInput } from '../dto/admin/admin-list-student.input';

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
    // 1.Course assigned to student
    const course = await this.courseRepository.findOne({
      where: { id: adminCreateStudentInput.course_id },
    });

    if (!course) {
      throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
    }
    // 2.Semester assigned to student
    const semester = await this.semesterRepository.findOne({
      where: { id: adminCreateStudentInput.semester_id },
    });

    if (!semester) {
      throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));
    }
    //   Semester must be linked with Course
    if (semester.id !== course.id) {
      throw new BadRequestException(
        this.i18n.t('semester.SEMESTER_NOT_LINKED'),
      );
    }

    // Existing User Flow with new Student
    if (adminCreateStudentInput.user_id) {
      const user = await this.userRepository.findOne({
        where: { id: adminCreateStudentInput.user_id },
        relations: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException('user.USER_NOT_FOUND');
      }

      if (user.role?.is_admin) {
        throw new BadRequestException(
          this.i18n.t('student.CHECK_STUDENT_ROLE'),
        );
      }

      const existingStudent = await this.studentRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (existingStudent) {
        throw new BadRequestException(
          this.i18n.t('student,STUDENT_RECORD_EXIST'),
        );
      }
      if (!adminCreateStudentInput.user_id) {
        throw new BadRequestException('Input User id must be provide');
      }

      const student = new Student();
      student.roll_number = adminCreateStudentInput.roll_number;
      student.marks = adminCreateStudentInput.marks;
      student.grade_points = adminCreateStudentInput.grade_points;
      student.course = course;
      student.semester = semester;
      student.user = user;
      student.result = adminCreateStudentInput.result;

      await this.studentRepository.save(student);

      return;
    }

    // Create New User + Student Flow

    const status = await this.statusRepository.findOne({
      where: { id: adminCreateStudentInput.status },
    });

    if (!status) {
      throw new NotFoundException(this.i18n.t('status.STATUS_NOT_FOUND'));
    }

    const role = await this.roleRepository.findOne({
      where: {
        is_admin: false,
      },
    });

    if (!role) {
      throw new NotFoundException(
        this.i18n.t('student.STUDENT_ROLE_NOT_FOUND'),
      );
    }

    const existingEmail = await this.userRepository.findOne({
      where: {
        email: adminCreateStudentInput.email,
      },
    });

    if (existingEmail) {
      throw new BadRequestException('user.EMAIL_ALREADY_EXIST');
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

    await this.userRepository.save(user);

    const student = new Student();
    student.roll_number = adminCreateStudentInput.roll_number;
    student.marks = adminCreateStudentInput.marks;
    student.grade_points = adminCreateStudentInput.grade_points;
    student.course = course;
    student.semester = semester;
    student.user = user;
    student.result = adminCreateStudentInput.result;

    await this.studentRepository.save(student);

    const tokens = await this.authService.getTokens(
      user.id,
      user.email,
      user.role.id,
    );

    await this.authService.updateRtHash(user.id, tokens.refresh_token);
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
}
