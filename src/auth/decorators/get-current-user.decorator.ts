import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../types/jwtPayloadWithRt.type';
import { getRequest } from 'src/common/graphql/context';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = getRequest(context);
    if (!data) return request.user;
    return request.user[data];
  },
);
