import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { CourseType } from 'src/course/enums/course.enum';

@InputType()
export class AdminCreateCourseInput {
  @Field(() => String, { description: 'Course Name' })
  @IsString()
  course_name: string;

  @Field(() => Int, { description: 'Status id of course.' })
  @IsPositive({ message: 'Status id must be a positive number' })
  status: number;

  @Field(() => CourseType, { description: 'Type of courses' })
  @IsEnum(CourseType)
  course_type: CourseType;

  @Field(() => Int, { description: 'Total Semester contain in one course' })
  @IsNumber()
  @IsPositive()
  total_semester: number;
}
