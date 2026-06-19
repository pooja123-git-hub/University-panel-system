import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '../enums/gender.enum';

@ObjectType()
export class LoginStatusEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class LoginRoleEntity {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class LoginEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field({ nullable: true })
  gender: Gender;

  @Field(() => LoginRoleEntity, { nullable: true })
  role: LoginRoleEntity;

  @Field(() => LoginStatusEntity, { nullable: true })
  status: LoginStatusEntity;

  @Field({ nullable: true })
  created_at: Date;

  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

@ObjectType()
export class AuthLoginEntity {
  @Field(() => LoginEntity, {
    description: 'Auth login user detail',
    nullable: true,
  })
  user: LoginEntity;
}
