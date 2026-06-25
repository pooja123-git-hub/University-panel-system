import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AdminCreateStudentInput } from './admin-create-student.input';

@InputType()
export class AdminUpdateStudentInput extends AdminCreateStudentInput {
  @Field(() => Int, { description: 'Student Id' })
  @IsNumber()
  @IsNotEmpty()
  student_id: number;
}
