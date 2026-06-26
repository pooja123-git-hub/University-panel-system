import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

@ObjectType()
export class GetUserDetailEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class GetCourseInfoEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetFeeStructureEntity {
  @Field(() => Int, { description: 'Id of fees' })
  id: number;

  @Field(() => Int, { description: 'total fees' })
  total_fee: number;
}

@ObjectType()
export class GetsStudentDeatilEntity {
  @Field(() => Int, { description: 'Student Id' })
  id: number;

  @Field(() => String, { description: 'Roll no of user', nullable: true })
  roll_number: string;

  @Field(() => GetUserDetailEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetUserDetailEntity;

  @Field(() => GetCourseInfoEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetCourseInfoEntity;
}

@ObjectType()
export class GetStudentFeeEntity {
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

  @Field(() => GetFeeStructureEntity, {
    nullable: true,
    description: 'Other fees details',
  })
  feeStructure: GetFeeStructureEntity;

  @Field(() => GetsStudentDeatilEntity, {
    nullable: true,
    description: 'Student info with course detail',
  })
  student: GetsStudentDeatilEntity;
}

@ObjectType()
export class AdminGetStudentFeeEntity {
  @Field(() => GetStudentFeeEntity, {
    nullable: true,
    description: 'Student fees details',
  })
  studentFees: GetStudentFeeEntity;
}
