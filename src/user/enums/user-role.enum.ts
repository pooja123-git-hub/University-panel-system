import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 1,
  STUDENT = 2,
}

registerEnumType(UserRole, { name: 'UserRole' });
