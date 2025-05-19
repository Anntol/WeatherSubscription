import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from '@entities/subscription/subsctiption.service';

@Injectable()
export class SchedulerService {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySubscriptions() {
    await this.subscriptionsService.sendHourlyEmails();
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleDailySubscriptions() {
    await this.subscriptionsService.sendDailyEmails();
  }
}
