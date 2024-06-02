import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/index.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from 'src/config/configuration.module';
import { JwtConfigService } from 'src/config/jwt-config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from '../utils/utils.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    UtilsModule,
    PassportModule,
    ConfigurationModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: (jwtConfigService: JwtConfigService) => ({
        global: true,
        secret: jwtConfigService.jwtSecret,
        signOptions: {
          expiresIn: '3h',
        },
      }),
      inject: [JwtConfigService],
      imports: [ConfigurationModule],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
