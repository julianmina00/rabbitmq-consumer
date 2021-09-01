import { Injectable } from '@nestjs/common';
import { LoggerService } from '@src/shared/services/logger.service';

@Injectable()
export class ConsumerService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(ConsumerService.name);
  }

  consume(type: string, message: any): void {
    this.logger.info(`Receiving [${type}: ${JSON.stringify(message)}]`);
  }
}
