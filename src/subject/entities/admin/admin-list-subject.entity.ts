import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListCourseDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class ListSemesterDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class ListSubjectEntity {
  @Field(() => Int, { description: 'Id of subject' })
  id: number;

  @Field(() => String, { description: 'Name of subject' })
  subject_name: string;

  @Field(() => String, { description: 'Subject code' })
  subject_code: string;

  @Field(() => Int, { description: 'Credit of subject' })
  credits: number;

  @Field(() => ListSemesterDetailEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semesters: ListSemesterDetailEntity;

  @Field(() => ListCourseDetailEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: ListCourseDetailEntity;
}
@ObjectType()
export class AdminListSubjectEntity {
  @Field(() => [ListSubjectEntity], { description: 'Subject details' })
  subject: ListSubjectEntity[];
  @Field(() => Number, { description: 'Count of subject' })
  count: number;
}
