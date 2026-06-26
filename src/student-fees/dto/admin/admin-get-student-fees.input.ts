import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminGetStudentFeeInput {
  @Field(() => Int, { description: 'Id of student ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentId: number;

  @Field(() => Int, { description: 'Id of studentFee ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentFeesId: number;
}
