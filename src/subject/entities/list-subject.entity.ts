import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListCourseDetailsEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;
}

@ObjectType()
export class ListSemesterDetailsEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class ListsSubjectEntity {
  @Field(() => Int, { description: 'Id of subject' })
  id: number;

  @Field(() => String, { description: 'Name of subject' })
  subject_name: string;

  @Field(() => String, { description: 'Subject code' })
  subject_code: string;

  @Field(() => Int, { description: 'Credit of subject' })
  credits: number;

  @Field(() => ListSemesterDetailsEntity, {
    description: 'Semester details',
    nullable: true,
  })
  semesters: ListSemesterDetailsEntity;

  @Field(() => ListCourseDetailsEntity, {
    description: 'Course details',
    nullable: true,
  })
  course: ListCourseDetailsEntity;
}
@ObjectType()
export class ListSubjectsEntity {
  @Field(() => [ListsSubjectEntity], { description: 'Subject details' })
  subject: ListsSubjectEntity[];
  @Field(() => Number, { description: 'Count of subject' })
  count: number;
}
