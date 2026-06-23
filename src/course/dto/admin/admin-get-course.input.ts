import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminGetCourseInput {
  @Field(() => Int, { description: 'Id of course ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  course_id: number;
}
