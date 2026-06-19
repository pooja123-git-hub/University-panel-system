import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, isEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'Email of user' })
  @IsEmail()
  @IsString()
  email: string;

  @Field(() => String, { description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
