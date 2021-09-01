import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger';
import { corsOptions } from './config/cors';
import { LoggerService } from './shared/services/logger.service';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  logger.setContext('Main');
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.enableCors(corsOptions());
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('rabbitConnectionUrl')],
      queue: configService.get<string>('rabbitQueueName'),
      queueOptions: {
        durable: true
      }
    }
  } as RmqOptions);
  app.startAllMicroservicesAsync().catch((ex) => {
    logger.error(`Error starting all microservices ${ex}`);
  });
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
