import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Semester {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
