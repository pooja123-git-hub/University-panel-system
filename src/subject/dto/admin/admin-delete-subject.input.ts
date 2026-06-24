import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminDeleteSubjectInput {
  @Field(() => Int, { description: 'Id of subject ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  subjectId: number;
}
