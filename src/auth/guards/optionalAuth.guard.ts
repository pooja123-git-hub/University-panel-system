import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorization = ctx.req.headers['authorization'];
    
    if (authorization) {
      // If the token is present, validate it
      try {
        // Validate token logic here
        const token = authorization.replace('Bearer','').trim(); // Extract token
        
        const jwtService = new JwtService()
        // Add token validation logic, for example:
        ctx.req.user = jwtService.verify(token, { secret: process.env.SECRET_ACCESS_JWT })
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    // If no token, just allow access without authentication
    return true;
  }
}
