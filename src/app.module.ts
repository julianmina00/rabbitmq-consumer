import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    SharedModule,
    ConsumerModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
