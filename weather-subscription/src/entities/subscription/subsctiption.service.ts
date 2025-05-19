import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Subscription, { FrequencyEnum } from './subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(
    email: string,
    city: string,
    frequency: string,
  ): Promise<Subscription | null> {
    const subscription = await this.findByEmail(email);
    if (subscription) return null;

    const freq =
      frequency === 'hourly' ? FrequencyEnum.HOURLY : FrequencyEnum.DAILY;
    return this.subscriptionsRepository.save({
      email,
      city,
      frequency: freq,
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
    }
    return subscription;
  }

  async removeByEmail(email: string): Promise<void> {
    const subscription = await this.findByEmail(email);
    if (subscription) {
      await this.subscriptionsRepository.delete(subscription.id);
    }
  }
}
