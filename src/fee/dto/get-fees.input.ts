import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class GetFeesInput {
  @Field(() => Int, { description: 'Id of fees ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  feesId: number;
}
