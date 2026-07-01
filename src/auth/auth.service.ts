import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './types/jwtPayload.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens.type';
import { RegisterUserInput } from './dto/register-user.input';
import { AuthRepository } from './repositories/auth.repository';
import {
  AuthRegisterEntity,
} from 'src/user/entities/register-user.entity';
import {
  AuthRegisterResponse,
} from 'src/user/response/register.response';
import { LoginUserInput } from './dto/login-user.input';
import {
  AuthLoginEntity,
} from 'src/user/entities/login-user.entity';
import { AuthLoginResponse } from 'src/user/response/login.response';
import { RefreshToken } from './entities/refresh-token.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly user_reposistory: AuthRepository,
    private jwtService: JwtService,
    private config: ConfigService,
    private i18n: I18nService,
  ) {}

  /**
   * @description Register api for user
   * @param registerUserInput
   * @returns
   */
  async register(
    registerUserInput: RegisterUserInput,
  ): Promise<AuthRegisterEntity> {
    const user = await this.user_reposistory.register(registerUserInput);

    if (!user)
      throw new NotFoundException(this.i18n.t('common.SOMETHING_WENT_WRONG'));

    const token = await this.getTokens(user.id, user.email, user.role.id);

    await this.updateRtHash(user.id, token.refresh_token);

    return AuthRegisterResponse.decode({ user: user });
  }

  async login(loginUserInput: LoginUserInput): Promise<AuthLoginEntity> {
    const user = await this.user_reposistory.login(loginUserInput);

    const token = await this.getTokens(user.id, user.email, user.role.id);
    await this.updateRtHash(user.id, token.refresh_token);

    return AuthLoginResponse.decode({ user }, token);
  }

  /**
   *
   * @param user
   * @param rt
   * @returns
   */
  async refreshToken(user: User, rt: string): Promise<RefreshToken> {
    const getUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: { role: true, status: true },
    });
    if (!getUser || !getUser.refresh_token)
      throw new ForbiddenException(this.i18n.t('common.FORBIDDEN_ERROR'));
    if (rt != getUser.refresh_token)
      throw new ForbiddenException(
        this.i18n.t('common.FORBIDDEN_UNAUTHORIZATION_ERROR'),
      );

    const rolesIds = getUser.role.id;
    const tokens = await this.getTokens(user.id, getUser.email, rolesIds);
    await this.updateRtHash(getUser.id, tokens.refresh_token);
    const res = new RefreshToken();
    res.access_token = tokens.access_token;
    res.refresh_token = tokens.refresh_token;
    return res;
  }
  /**
   *
   * @param userId
   * @param email
   * @param useRoles
   * @returns
   */
  async getTokens(
    userId: number,
    email: string,
    userRoleId: number,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      userId: userId,
      email: email,
      role: { id: userRoleId },
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_ACCESS_JWT'),
        expiresIn: '10m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_REFRESH_JWT'),
        expiresIn: '15m',
      }),
    ]);

    return { access_token: at, refresh_token: rt };
  }
  /**
   * update refresh token
   * @param userId
   * @param rt
   */
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
    });
    if (user) {
      user.refresh_token = rt;
      await this.userRepository.save(user);
    }
  }
}
