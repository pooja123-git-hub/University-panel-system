import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCourseFeesDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetSemesterFeesDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetsFeesEntity {
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

  @Field(() => GetSemesterFeesDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semester: GetSemesterFeesDetailEntity;

  @Field(() => GetCourseFeesDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetCourseFeesDetailEntity;
}
@ObjectType()
export class GetFeeEntity {
  @Field(() => GetsFeesEntity, { description: 'fees details' })
  fees: GetsFeesEntity;
}
