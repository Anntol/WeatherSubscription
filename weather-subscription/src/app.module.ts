import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiModule } from '@api/api.module';
import { EmailModule } from '@modules/email/email.module';
import { EmailService } from '@modules/email/email.service';
import { DatabaseModule } from '@modules/database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from '@modules/scheduler/scheduler.module';
import { WeatherModule } from '@modules/weather/weather.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({
      global: true,
    }),
    EmailModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
