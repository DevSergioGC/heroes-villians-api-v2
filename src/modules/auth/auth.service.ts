import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { GeneralResponseDto } from '../base/generalReturn.dto';
import { UserEntity } from '../user/entities/index.entity';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly utilService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<GeneralResponseDto<string>> {
    try {
      const checkUser: GeneralResponseDto<UserEntity> =
        await this.userService.checkUser(loginDto.username);

      if (checkUser.success) {
        if (
          this.utilService.comparePassword(
            loginDto.password,
            checkUser.data?.password,
          )
        ) {
          //? Generate token
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, createdAt, updatedAt, ...user } = checkUser.data;
          return new GeneralResponseDto<string>(
            true,
            HttpStatus.OK,
            this.jwtService.sign(user),
          );
        } else {
          return new GeneralResponseDto<string>(
            false,
            HttpStatus.UNAUTHORIZED,
            null,
            {
              error: `User not found. loginDto: ${loginDto}`,
              message: `Invalid Credentials. Please try again.`,
            },
          );
        }
      } else {
        return new GeneralResponseDto<string>(
          false,
          HttpStatus.UNAUTHORIZED,
          null,
          {
            error: `User not found. loginDto: ${loginDto}`,
            message: `Invalid Credentials. Please try again.`,
          },
        );
      }
    } catch (error) {
      this.logger.error(`AuthService.validateUser -> ${error?.message}`);
      return new GeneralResponseDto<string>(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        {
          error,
          message: `Something went wrong. Please try again later.`,
        },
      );
    }
  }
}
