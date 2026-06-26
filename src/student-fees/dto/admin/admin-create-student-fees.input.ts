import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

@InputType()
export class AdminCreateStudentFeeInput {
  @Field(() => Int, { description: 'Id of student' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  student_id: number;

  @Field(() => Int, { description: 'Id of fee_struture' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  fee_id: number;

  @Field(() => Int, { description: 'Amount paid by student' })
  @IsNotEmpty()
  @IsNumber()
  amount_paid: number;


  @Field(() => PaymentStatus, { description: 'Payment status type' })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  payment_status: PaymentStatus;

}
