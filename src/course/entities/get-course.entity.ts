import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { StatusEntity } from 'src/user/entities/register-user.entity';

@ObjectType()
export class GetsSemesterEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;

  @Field(() => Int, { description: 'Total number of semester' })
  semester_number: number;
}

@ObjectType()
export class GetsCourseEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Define of course type (UG,PG)' })
  course_type: CourseType;

  @Field(() => Int, { description: 'Total semetser of course' })
  total_semesters: number;

  @Field(() => [GetsSemesterEntity], { description: 'Semester details' })
  semesters: GetsSemesterEntity[];

  @Field(() => StatusEntity, { description: 'Status of course' })
  status: StatusEntity;
}

@ObjectType()
export class GetsCoursesEntity {
  @Field(() => GetsCourseEntity, {
    description: 'Courses Detail with semester',
    nullable: true,
  })
  result: GetsCourseEntity;
}
