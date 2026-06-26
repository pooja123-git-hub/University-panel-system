import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

@ObjectType()
export class GetUsersDetailEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class GetCoursesInfoEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetFeesStructureEntity {
  @Field(() => Int, { description: 'Id of fees' })
  id: number;

  @Field(() => Int, { description: 'total fees' })
  total_fee: number;
}

@ObjectType()
export class GetsStudentDeatilsEntity {
  @Field(() => Int, { description: 'Student Id' })
  id: number;

  @Field(() => String, { description: 'Roll no of user', nullable: true })
  roll_number: string;

  @Field(() => GetUsersDetailEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetUsersDetailEntity;

  @Field(() => GetCoursesInfoEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetCoursesInfoEntity;
}

@ObjectType()
export class GetStudentFeesEntity {
  @Field(() => Int, { description: 'Id of student fees' })
  id: number;

  @Field(() => Int, { description: 'Amount paid by student' })
  amount_paid: number;

  @Field(() => Int, { description: 'Due Amount of student' })
  due_amount: number;

  @Field(() => PaymentStatus, { description: 'Payment status type' })
  payment_status: PaymentStatus;

  @Field(() => Date, { description: 'Payment date' })
  payment_date: Date;

  @Field(() => GetFeesStructureEntity, {
    nullable: true,
    description: 'Other fees details',
  })
  feeStructure: GetFeesStructureEntity;

  @Field(() => GetsStudentDeatilsEntity, {
    nullable: true,
    description: 'Student info with course detail',
  })
  student: GetsStudentDeatilsEntity;
}

@ObjectType()
export class AdminListStudentFeeEntity {
  @Field(() => [GetStudentFeesEntity], {
    nullable: true,
    description: 'Student fees details',
  })
  studentFees: GetStudentFeesEntity[];
  @Field(() => Int, { nullable: true, description: 'count of total entry' })
  count: number;
}
