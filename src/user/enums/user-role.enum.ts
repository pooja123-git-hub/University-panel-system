import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 1,
  STUDENT = 2,
}

registerEnumType(UserRoles, { name: 'UserRoles' });
