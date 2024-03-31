import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './index.service';
import { CryptoConfigService } from './crypto-config.service';

@Module({
  imports: [],
  providers: [DatabaseConfigService, CryptoConfigService],
  exports: [DatabaseConfigService, CryptoConfigService],
})
export class ConfigurationModule {}
