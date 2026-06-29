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
import { SemesterModule } from './semester/semester.module';
import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { StudentModule } from './student/student.module';
import { StudentFeesModule } from './student-fees/student-fees.module';

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
    host: configService.get<string>('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    autoLoadEntities: true,
    ssl: {
      rejectUnauthorized: false,
    },
    extra: {
      sslmode: 'require',
    },
  }),
}),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '../i18n'),
        watch: true,
      },
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        { use: HeaderResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
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
    StudentFeesModule,
  ],
})
export class AppModule {}
