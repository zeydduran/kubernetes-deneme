import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { ExampleModule } from './example.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ExampleModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.useLogger(Logger);
  await app.listen();
}
bootstrap();
