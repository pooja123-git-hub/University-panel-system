import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        };

        // console.log(dbConfig);

        return dbConfig;
      },
    }),

    UserModule,
    AuthModule,
    StatusModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
