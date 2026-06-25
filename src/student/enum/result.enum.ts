import { registerEnumType } from '@nestjs/graphql';

export enum ResultEnum {
  PASS = 'PASS',
  FAIL = 'FAIL',
}

registerEnumType(ResultEnum, { name: 'ResultEnum' });
