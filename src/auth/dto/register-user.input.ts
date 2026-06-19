import { Field, InputType } from '@nestjs/graphql';
import { Gender } from 'src/user/enums/gender.enum';
import { IsEmail, isEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from 'src/user/enums/user-role.enum';
import { StatusEnum } from 'src/user/enums/status.enums';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'Name of user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'Email of user' })
  @IsEmail()
  @IsString()
  email: string;

  @Field(() => String, { description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => Gender, { description: 'Gender of user' })
  gender: Gender;

  @Field(() => UserRoles, { description: 'Role of an user' })
  role: UserRoles;

  @Field(() => StatusEnum, { description: 'Status of an user' })
  status: StatusEnum;
}
