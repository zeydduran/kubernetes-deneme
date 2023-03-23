import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_PORT;

    this.envConfig.exampleService = {
      name: 'MATH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@rabbitmq:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false
        },
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
