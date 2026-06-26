import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AdminCreateSubjectInput } from './admin-create-subject.input';

@InputType()
export class AdminUpdateSubjectInput extends AdminCreateSubjectInput {
  @Field(() => Int, { description: 'Id of subject' })
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}
