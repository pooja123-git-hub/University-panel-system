import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Fee {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
