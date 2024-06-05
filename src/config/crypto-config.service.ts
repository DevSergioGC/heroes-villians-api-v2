import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoConfigService {
  constructor(private configService: ConfigService) {}

  get saltRounds(): number {
    return +this.configService.get<number>('SALT_ROUNDS');
  }
}
