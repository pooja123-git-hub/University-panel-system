import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import {
  StatusEntity,
  UserRegisterRoleEntity,
} from 'src/user/entities/register-user.entity';
import { Gender } from 'src/user/enums/gender.enum';

@ObjectType()
export class GetStudentCourseDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetStudentSemesterDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetUserInfoEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field({ nullable: true })
  gender: Gender;

  @Field(() => UserRegisterRoleEntity, { nullable: true })
  role: UserRegisterRoleEntity;

  @Field(() => StatusEntity, { nullable: true })
  status: StatusEntity;

  @Field({ nullable: true })
  created_at: Date;
}
@ObjectType()
export class GetStudentsEntity {
  @Field(() => Int, { description: 'Student Id' })
  id: number;

  @Field(() => String, { description: 'Roll no of user', nullable: true })
  roll_number: string;

  @Field(() => Int, { description: 'Grade point of student' })
  grade_points: number;

  @Field(() => Int, { description: 'marks of student' })
  marks: number;

  @Field(() => ResultEnum, { description: 'Result status' })
  result: ResultEnum;

  @Field(() => GetUserInfoEntity, { description: 'User info', nullable: true })
  user: GetUserInfoEntity;

  @Field(() => GetStudentCourseDetailEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetStudentCourseDetailEntity;

  @Field(() => GetStudentSemesterDetailEntity, {
    description: 'Semester of course',
    nullable: true,
  })
  semester: GetStudentSemesterDetailEntity;
}
@ObjectType()
export class AdminGetStudentEntity {
  @Field(() => GetStudentsEntity, {
    description: 'Admin get the student detail',
    nullable: true,
  })
  student: GetStudentsEntity;
}
