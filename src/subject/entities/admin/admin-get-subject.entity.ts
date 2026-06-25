import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCourseDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class GetSemesterDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetSubjectEntity {
  @Field(() => Int, { description: 'Id of subject' })
  id: number;

  @Field(() => String, { description: 'Name of subject' })
  subject_name: string;

  @Field(() => String, { description: 'Subject code' })
  subject_code: string;

  @Field(() => Int, { description: 'Credit of subject' })
  credits: number;

  @Field(() => GetSemesterDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semester: GetSemesterDetailEntity;

  @Field(() => GetCourseDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: GetCourseDetailEntity;
}
@ObjectType()
export class AdminGetSubjectEntity {
  @Field(() => GetSubjectEntity, { description: 'Subject details' })
  subject: GetSubjectEntity;
}
