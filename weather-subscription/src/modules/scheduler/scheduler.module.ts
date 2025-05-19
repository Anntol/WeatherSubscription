import { Module } from '@nestjs/common';

import { SchedulerService } from './scheduler.service';
import { SubscriptionEntityModule } from '@entities/subscription/subscription.module';

@Module({
  imports: [SubscriptionEntityModule],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
