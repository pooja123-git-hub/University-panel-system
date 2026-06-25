import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetsCourseFeesDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetsSemesterFeesDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class ListFeessEntity {
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

  @Field(() => GetsSemesterFeesDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semester: GetsSemesterFeesDetailEntity;

  @Field(() => GetsCourseFeesDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetsCourseFeesDetailEntity;
}
@ObjectType()
export class ListsFeeEntity {
  @Field(() => [ListFeessEntity], { description: 'fees details' })
  fees: ListFeessEntity[];
  @Field(() => Int, { description: 'Total Fees entries count' })
  count: number;
}
