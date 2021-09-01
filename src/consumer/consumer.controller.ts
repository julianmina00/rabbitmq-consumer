import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('message')
  getMessage(@Ctx() context: RmqContext, @Payload() data: any) {
    return this.consumerService.consume(context.getPattern(), data);
  }
}
