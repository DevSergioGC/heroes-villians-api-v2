import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from 'src/config/database-config.service';
import { ConfigurationModule } from 'src/config/configuration.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.username,
        password: configService.password,
        database: configService.database,
        synchronize: configService.synchronize,
        entities: [__dirname + '../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
      inject: [DatabaseConfigService],
      imports: [ConfigurationModule],
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
