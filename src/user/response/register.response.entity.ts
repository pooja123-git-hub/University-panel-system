import { plainToClass, Type } from 'class-transformer';

import { Gender } from '../enums/gender.enum';

export class GetRoleResponse {
  id: number;
  name: string;
}
export class GetStatusResponse {
  id: number;
  name: string;
}
export class RegisterResponse {
  id: number;
  name: string;
  email: string;
  role: GetRoleResponse;
  @Type(() => GetStatusResponse)
  status: GetStatusResponse;
  gender: Gender;
  created_at: Date;

}
export class AuthRegisterResponse {
  @Type(() => RegisterResponse)
  user: RegisterResponse;

  static decode(input: any): AuthRegisterResponse {
    return plainToClass(this, input);
  }
}
