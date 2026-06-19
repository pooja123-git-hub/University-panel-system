import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthRegisterEntity } from 'src/user/entities/register-user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthLoginEntity } from 'src/user/entities/login-user.entity';
import { UseGuards } from '@nestjs/common';
import { RtGuard } from './guards/rt.guard';
import { RefreshToken } from './entities/refresh-token.entity';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { CurrentUser } from 'src/user/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthRegisterEntity, {
    name: 'register',
    description: 'Register user with email and password',
  })
  register(@Args('register_input') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => AuthLoginEntity, {
    name: 'login',
    description: 'Login user with email and password',
  })
  login(@Args('login_input') loginInput: LoginUserInput) {
    return this.authService.login(loginInput);
  }
  @UseGuards(RtGuard)
  @Mutation(() => RefreshToken, {
    name: 'refreshTokens',
    description: 'Refresh Tokens',
  })
  refreshTokens(
    @CurrentUser() user,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(user, refreshToken);
  }
}
