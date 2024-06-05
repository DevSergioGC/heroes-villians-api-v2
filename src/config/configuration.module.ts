import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './index.service';
import { CryptoConfigService } from './crypto-config.service';
import { JwtConfigService } from './jwt-config.service';

@Module({
  imports: [],
  providers: [DatabaseConfigService, CryptoConfigService, JwtConfigService],
  exports: [DatabaseConfigService, CryptoConfigService, JwtConfigService],
})
export class ConfigurationModule {}
