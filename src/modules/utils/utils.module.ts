import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ConfigurationModule } from 'src/config/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
