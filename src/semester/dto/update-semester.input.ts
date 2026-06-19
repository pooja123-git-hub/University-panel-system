import { CreateSemesterInput } from './create-semester.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSemesterInput extends PartialType(CreateSemesterInput) {
  @Field(() => Int)
  id: number;
}
