import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GeneralResponseDto } from 'src/modules/base/generalReturn.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user: GeneralResponseDto<string> =
      await this.authService.validateUser({ username, password });

    if (user.success) {
      return user.data;
    } else {
      throw new UnauthorizedException();
    }
  }
}
