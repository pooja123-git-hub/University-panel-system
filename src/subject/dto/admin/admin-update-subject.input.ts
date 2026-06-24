import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { AdminCreateSubjectInput } from './admin-create-subject.input';

@InputType()
export class AdminUpdateSubjectInput extends AdminCreateSubjectInput {
  @Field(() => Int, { description: 'Id of subject' })
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}
