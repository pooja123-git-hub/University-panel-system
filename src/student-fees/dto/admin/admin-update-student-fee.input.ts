import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { AdminCreateStudentFeeInput } from './admin-create-student-fees.input';

@InputType()
export class AdminUpdateStudentFeesInput extends AdminCreateStudentFeeInput {
  @Field(() => Int, { description: 'Id of studentFee ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentFeesId: number;
}
