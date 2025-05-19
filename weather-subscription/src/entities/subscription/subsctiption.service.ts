import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Subscription from './subscription.entity';
import { ISubscription } from './subscription.interface';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
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
}
