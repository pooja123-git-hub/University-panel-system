import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class AdminCreateSubjectInput {
  @Field(() => String, { description: 'Name of subject' })
  @IsString()
  @IsNotEmpty()
  subject_name: string;

  @Field(() => String, { description: 'Code of subject' })
  @IsString()
  @IsNotEmpty()
  subject_code: string;

  @Field(() => Int, { description: 'Credit of subject(CGPA)' })
  @IsDecimal()
  @IsNumber()
  @IsPositive()
  credits: number;

  @Field(() => Int, { description: 'Id of course' })
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @Field(() => Int, { description: 'Id of Semester' })
  @IsNotEmpty()
  @IsNumber()
  semester_id: number;
}
