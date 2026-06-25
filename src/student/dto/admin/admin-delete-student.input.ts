import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminDeleteStudentInput {
  @Field(() => Int, { description: 'Id of student ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentId: number;
}
