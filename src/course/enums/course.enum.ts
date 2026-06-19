import { registerEnumType } from '@nestjs/graphql';

export enum CourseType {
  UG = 'UG',
  PG = 'PG',
}

registerEnumType(CourseType, { name: 'CourseType' });
