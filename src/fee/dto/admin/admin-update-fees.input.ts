import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AdminCreateFeesInput } from './admin-create-fees-input';

@InputType()
export class AdminUpdateFeesInput extends AdminCreateFeesInput {
  @Field(() => Int, { description: 'Id of fees' })
  @IsNotEmpty()
  @IsNumber()
  feesId: number;
}
