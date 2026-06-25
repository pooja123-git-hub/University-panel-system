import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCourseFeeDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetSemesterFeeDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetFeesEntity {
  @Field(() => Int, { description: 'Id of fees' })
  id: number;

  @Field(() => Int, { description: 'Tuition fees ' })
  tuition_fee: number;

  @Field(() => Int, { description: 'Exam fees' })
  exam_fee: number;

  @Field(() => Int, { description: 'library fees' })
  library_fee: number;

  @Field(() => Int, { description: 'other fees' })
  other_fee: number;

  @Field(() => Int, { description: 'total fees' })
  total_fee: number;

  @Field(() => GetSemesterFeeDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semesters: GetSemesterFeeDetailEntity;

  @Field(() => GetCourseFeeDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetCourseFeeDetailEntity;
}
@ObjectType()
export class AdminGetFeeEntity {
  @Field(() => GetFeesEntity, { description: 'fees details' })
  fees: GetFeesEntity;
}
