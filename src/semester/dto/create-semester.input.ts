import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSemesterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
