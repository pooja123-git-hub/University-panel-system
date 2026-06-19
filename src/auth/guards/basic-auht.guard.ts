import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const authToken = request.headers.headers;

        if (authToken && authToken.startsWith('Basic ')) {
            const token = Buffer.from(authToken.split(" ")[1], 'base64');
            let decodedToken = token.toString().split(":");
            const userKey = this.configService.get<string>('USER_KEY');
            const password = this.configService.get<string>('PASSWORD');

            if (decodedToken[0] !== userKey || decodedToken[1] !== password) return false;
            return true;
        } else {
            return false;
        }
    }
}