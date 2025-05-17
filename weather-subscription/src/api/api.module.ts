import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription/subscription.controller';
import { WeatherController } from './weather/weather.controller';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [SubscriptionController, WeatherController],
})
export class ApiModule {}
