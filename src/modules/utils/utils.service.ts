import { Injectable } from '@nestjs/common';
import { CryptoConfigService } from 'src/config/crypto-config.service';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UtilsService {
  constructor(private readonly cryptoConfigService: CryptoConfigService) {}

  private readonly saltRounds = genSaltSync(
    this.cryptoConfigService.saltRounds,
  );

  hashPassword(password: string): string {
    return hashSync(password, this.saltRounds);
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
