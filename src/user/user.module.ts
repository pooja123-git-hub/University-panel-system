import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,Status])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
