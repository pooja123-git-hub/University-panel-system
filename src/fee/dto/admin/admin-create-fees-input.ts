import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AdminCreateFeesInput {
  @Field(() => Int, { description: 'Tution fees' })
  @IsNumber()
  @IsNotEmpty()
  tuition_fees: number;

  @Field(() => Int, { description: 'Exam fees' })
  @IsNumber()
  @IsNotEmpty()
  exam_fees: number;

  @Field(() => Int, { description: 'library fees' })
  @IsNumber()
  @IsNotEmpty()
  library_fees: number;

  @Field(() => Int, { description: 'other fees' })
  @IsNumber()
  @IsNotEmpty()
  other_fees: number;

  @Field(() => Int, { description: 'Id of course' })
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @Field(() => Int, { description: 'Id of Semester' })
  @IsNotEmpty()
  @IsNumber()
  semester_id: number;
}
