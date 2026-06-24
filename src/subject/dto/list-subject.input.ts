import { Field, InputType } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/user/entities/pagination.entity';

@InputType()
export class ListSubjectInput extends PaginationInput {
  @Field({ nullable: true, description: 'Search the custom notification.' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value ? value.trim() : value))
  @IsString({ message: 'Search must be string' })
  @IsNotEmpty()
  search: string;
}
