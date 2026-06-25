import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCourseDetailsEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetSemesterDetailsEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetsSubjectEntity {
  @Field(() => Int, { description: 'Id of subject' })
  id: number;

  @Field(() => String, { description: 'Name of subject' })
  subject_name: string;

  @Field(() => String, { description: 'Subject code' })
  subject_code: string;

  @Field(() => Int, { description: 'Credit of subject' })
  credits: number;

  @Field(() => GetSemesterDetailsEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semester: GetSemesterDetailsEntity;

  @Field(() => GetCourseDetailsEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetCourseDetailsEntity;
}
@ObjectType()
export class GetSubjectsEntity {
  @Field(() => GetsSubjectEntity, { description: 'Subject details' })
  subject: GetsSubjectEntity;
}
