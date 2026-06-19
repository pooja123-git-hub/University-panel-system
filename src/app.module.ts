import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { RoleModule } from './role/role.module';
import { CourseModule } from './course/course.module';
import { SubjectModule } from './subject/subject.module';
import { FeeModule } from './fee/fee.module';
import { StudentModule } from './student/student.module';
import { SemesterModule } from './semester/semester.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    UserModule,
    AuthModule,
    StatusModule,
    RoleModule,
    CourseModule,
    SubjectModule,
    FeeModule,
    StudentModule,
    SemesterModule,
  ],
})
export class AppModule {}
