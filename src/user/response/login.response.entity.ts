import { plainToClass, plainToInstance, Type } from 'class-transformer';

import { Gender } from '../enums/gender.enum';
import { Tokens } from 'src/auth/types/tokens.type';

export class GetRoleResponse {
  id: number;
  name: string;
}
export class GetStatusResponse {
  id: number;
  name: string;
}
export class LoginResponse {
  id: number;
  name: string;
  email: string;
  @Type(() => GetRoleResponse)
  role: GetRoleResponse;
  @Type(() => GetStatusResponse)
  status: GetStatusResponse;
  gender: Gender;
  created_at: Date;
  access_token: string;
  refresh_token: string;
}
export class AuthLoginResponse {
  @Type(() => LoginResponse)
  user: LoginResponse;

  static decode(input: any, tokens: Tokens): AuthLoginResponse {
  const obj = plainToInstance(AuthLoginResponse, input);

  if (obj.user) {
    obj.user.access_token = tokens.access_token;
    obj.user.refresh_token = tokens.refresh_token;
  }

  return obj;
}
}
