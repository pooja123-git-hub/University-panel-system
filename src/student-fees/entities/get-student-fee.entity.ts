import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

@ObjectType()
export class GetsUserDetailEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class GetsCourseInfoEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetsFeeStructureEntity {
  @Field(() => Int, { description: 'Id of fees' })
  id: number;

  @Field(() => Int, { description: 'total fees' })
  total_fee: number;
}

@ObjectType()
export class GetsStudentsDeatilEntity {
  @Field(() => Int, { description: 'Student Id' })
  id: number;

  @Field(() => String, { description: 'Roll no of user', nullable: true })
  roll_number: string;

  @Field(() => GetsUserDetailEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetsUserDetailEntity;

  @Field(() => GetsCourseInfoEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetsCourseInfoEntity;
}

@ObjectType()
export class GetStudentsFeeEntity {
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

  @Field(() => GetsFeeStructureEntity, {
    nullable: true,
    description: 'Other fees details',
  })
  feeStructure: GetsFeeStructureEntity;

  @Field(() => GetsStudentsDeatilEntity, {
    nullable: true,
    description: 'Student info with course detail',
  })
  student: GetsStudentsDeatilEntity;
}

@ObjectType()
export class GetsStudentFeeEntity {
  @Field(() => GetStudentsFeeEntity, {
    nullable: true,
    description: 'Student fees details',
  })
  studentFees: GetStudentsFeeEntity;
}
