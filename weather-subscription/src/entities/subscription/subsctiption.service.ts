import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Subscription from './subscription.entity';
import { ISubscription } from './subscription.interface';
import { FrequencyEnum } from '@enums/frequency';
import { WeatherService } from '@modules/weather/weather.service';
import { EmailService } from '@modules/email/email.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    private readonly emailService: EmailService,
    private readonly weatherService: WeatherService,
  ) {}

  async createSubscription(
    subscription: Partial<ISubscription>,
  ): Promise<ISubscription | null> {
    if (subscription.email === undefined) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    const dbSubscription = await this.findByEmail(subscription.email);
    if (dbSubscription) {
      throw new HttpException('Email already subscribed', HttpStatus.CONFLICT);
    }

    return this.subscriptionsRepository.save({
      email: subscription.email,
      city: subscription.city,
      frequency: subscription.frequency,
      confirmed: false,
    });
  }

  findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find();
  }

  async findByEmail(email: string): Promise<Subscription | null> {
    return await this.subscriptionsRepository.findOneBy({ email });
  }

  async confirmEmail(email: string): Promise<Subscription | null> {
    const subscription = await this.findByEmail(email);
    if (subscription) {
      subscription.confirmed = true;
      await this.subscriptionsRepository.save(subscription);
    } else {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  async removeByEmail(email: string): Promise<void> {
    const subscription = await this.findByEmail(email);
    if (subscription) {
      await this.subscriptionsRepository.delete(subscription.id);
    } else {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }
  }

  async sendHourlyEmails(): Promise<void> {
    const subscriptions = await this.subscriptionsRepository.find({
      where: {
        frequency: FrequencyEnum.HOURLY,
      },
    });
    for (const subscription of subscriptions) {
      const weather = await this.weatherService.getCurrentWeather(
        subscription.city,
      );
      this.emailService.sendPeriodicEmail(
        subscription.email,
        subscription.city,
        weather,
        'hourly',
      );
    }
  }

  async sendDailyEmails(): Promise<void> {
    const subscriptions = await this.subscriptionsRepository.find({
      where: {
        frequency: FrequencyEnum.DAILY,
      },
    });
    for (const subscription of subscriptions) {
      const weather = await this.weatherService.getCurrentWeather(
        subscription.city,
      );
      this.emailService.sendPeriodicEmail(
        subscription.email,
        subscription.city,
        weather,
        'daily',
      );
    }
  }
}
