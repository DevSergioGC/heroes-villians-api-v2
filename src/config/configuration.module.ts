import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './index.service';

@Module({
  imports: [],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class ConfigurationModule {}
