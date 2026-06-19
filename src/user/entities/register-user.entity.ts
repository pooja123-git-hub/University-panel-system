import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '../enums/gender.enum';
import { Type } from 'class-transformer';

@ObjectType()
export class UserRegisterStatusEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class UserRegisterRoleEntity {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class UserRegister {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field({ nullable: true })
  gender: Gender;

  @Field(() => UserRegisterRoleEntity, { nullable: true })
  role: UserRegisterRoleEntity;

  @Field(() => UserRegisterStatusEntity, { nullable: true })
  status: UserRegisterStatusEntity;

  @Field({ nullable: true })
  created_at: Date;
}
@ObjectType()
export class AuthRegisterEntity {
  @Field(() => UserRegister, {
    description: 'Auth user detail',
  })
  user: UserRegister;
}
