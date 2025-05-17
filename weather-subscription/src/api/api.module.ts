import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription/subscription.controller';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [],
  controllers: [SubscriptionController, WeatherController],
})
export class ApiModule {}
