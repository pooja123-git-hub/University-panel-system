import { BadRequestException, createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { getRequest } from '../common/graphql/context';
import { User } from './database/user.entity';
import { AppDataSource } from 'app-data-source';

const userRepository = AppDataSource.getRepository(User);

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    if(request.user){
    const user = await userRepository.findOne({ where: { id: request.user.userId }, relations: { role: true} })

    if (!user) {
      throw new UnauthorizedException('No user found');
    }
    // return request.user;
    return user;
  }else{
    return null;
  }
  },
);


export const GetHeaders = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    return request.headers;
  },
);