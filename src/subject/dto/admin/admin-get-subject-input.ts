import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminGetSubjectInput {
  @Field(() => Int, { description: 'Id of subject ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  subjectId: number;
}
