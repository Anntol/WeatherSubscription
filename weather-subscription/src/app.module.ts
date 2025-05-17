import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather/weather.controller';
import { SubscriptionController } from './subscription/subscription.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, WeatherController, SubscriptionController],
  providers: [AppService],
})
export class AppModule {}
