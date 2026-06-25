import { Field, InputType } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/user/entities/pagination.entity';

@InputType()
export class AdminListStudentInput extends PaginationInput {
  @Field({ nullable: true, description: 'Search for better result.' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value ? value.trim() : value))
  @IsString({ message: 'Search must be string' })
  @IsNotEmpty()
  search: string;
}
