import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription/subscription.controller';
import { WeatherController } from './weather/weather.controller';
import { EmailModule } from '@modules/email/email.module';
import { SubscriptionEntityModule } from '@entities/subscription/subscription.module';

@Module({
  imports: [EmailModule, SubscriptionEntityModule],
  controllers: [SubscriptionController, WeatherController],
})
export class ApiModule {}
