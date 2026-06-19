import { CreateFeeInput } from './create-fee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFeeInput extends PartialType(CreateFeeInput) {
  @Field(() => Int)
  id: number;
}
