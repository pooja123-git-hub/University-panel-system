import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetsCourseFeeDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetsSemesterFeeDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class ListFeesEntity {
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

  @Field(() => GetsSemesterFeeDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semesters: GetsSemesterFeeDetailEntity;

  @Field(() => GetsCourseFeeDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetsCourseFeeDetailEntity;
}
@ObjectType()
export class AdminListFeeEntity {
  @Field(() => [ListFeesEntity], { description: 'fees details' })
  fees: ListFeesEntity[];
  @Field(() => Int, { description: 'Total Fees entries count' })
  count: number;
}
