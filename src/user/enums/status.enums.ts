import { registerEnumType } from '@nestjs/graphql';

export enum StatusEnum {
  ACTIVE = 1,
  INACTIVE = 2,
}

registerEnumType(StatusEnum, { name: 'UserRole' });
