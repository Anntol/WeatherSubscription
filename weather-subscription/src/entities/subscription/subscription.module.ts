import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Subscription from './subscription.entity';
import { SubscriptionsService } from './subsctiption.service';
import { EmailModule } from '@modules/email/email.module';
import { WeatherModule } from '@modules/weather/weather.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    EmailModule,
    WeatherModule,
  ],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionEntityModule {}
