import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminDeleteStudentFeeInput {
  @Field(() => Int, { description: 'Id of student-fees ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studnetFeesId: number;
}
