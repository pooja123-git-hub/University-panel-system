import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RegisterUserInput } from '../dto/register-user.input';
import { Status } from 'src/status/database/status.entity';
import { Role } from 'src/role/database/role.entity';
import { User } from 'src/user/database/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from '../dto/login-user.input';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthRepository {
  private readonly ACTIVE_STATUS: number = 1;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Register api for user
   * @param registerUserInput
   * @returns
   */
  async register(registerUserInput: RegisterUserInput): Promise<User> {
    // Check status existence
    const status = await this.statusRepository.findOne({
      where: { id: registerUserInput.status },
    });
    if (!status) {
      throw new NotFoundException(this.i18n.t('status.STATUS_NOT_FOUND'));
    }
    // check role existence

    const role = await this.roleRepository.findOne({
      where: { id: registerUserInput.role },
    });
    if (!role) throw new NotFoundException(this.i18n.t('role.ROLE_NOT_FOUND'));
    // Check existing Email
    const email = await this.userRepository.findOne({
      where: {
        email: registerUserInput.email,
      },
    });
    if (email)
      throw new BadRequestException(this.i18n.t('user.EMAIL_ALREADY_EXIST'));

    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const passwordHash = await bcrypt.hash(registerUserInput.password, salt);
    const user = new User();
    user.name = registerUserInput.name;
    user.email = registerUserInput.email;
    user.gender = registerUserInput.gender;
    user.role = role;
    user.status = status;
    user.password = passwordHash;

    await this.userRepository.save(user);

    return user;
  }

  /**
   * @description Login Api
   * @param loginUserInput
   * @returns
   */
  async login(loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserInput.email },
      relations: { role: true, status: true },
    });
    if (!user) throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));

    if (user.status.id !== this.ACTIVE_STATUS)
      throw new BadRequestException(this.i18n.t('user.INVALID_STATUS'));

    if (!user.password)
      throw new BadRequestException(this.i18n.t('user.PASSWORD_NOT_FOUND'));

    const isMatch = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    return user;
  }
}
