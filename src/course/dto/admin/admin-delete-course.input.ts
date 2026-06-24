import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminDeleteCourseInput {
  @Field(() => Int, { description: 'Id of course ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  courseId: number;
}
