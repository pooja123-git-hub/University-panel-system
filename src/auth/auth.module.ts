import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './repositories/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Status } from 'src/status/database/status.entity';
import { Role } from 'src/role/database/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Course } from 'src/course/database/course.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Student } from 'src/student/database/student.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { JwtStrategy } from './jwt.strategy';
import { RtStrategy } from './strategies/rt.strtegy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User,
      Status,
      Role,
      Course,
      Subject,
      Semester,
      Student,
      FeesStructure,
    ]),
  ],
  providers: [
    JwtStrategy,
    AuthResolver,
    AuthService,
    AuthRepository,
    RtStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
