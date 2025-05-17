import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Frequency } from '@dto/subscription.dto';
import { EmailService } from '@modules/email/email.service';

@Controller('api')
export class SubscriptionController {
  constructor(private readonly emailService: EmailService) {}

  @Post('subscribe')
  async subscribe(
    @Body() body: { email: string; city: string; frequency: Frequency },
  ) {
    //TODO data validation
    //TODO generate confirmation token
    //TODO send confirmation email
    //TODO save subscription to database
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.emailService.sendEmail(
        body.email,
        'Subscription Confirmation',
        'Please confirm your subscription by clicking the link below:',
      );
      console.log('Subscription data:', body);
      return {
        message: 'Subscription successful. Confirmation email sent.',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('confirm/:token')
  async confirmSubscription(@Param('token') token: string) {
    //TODO check token validity
    //TODO update subscription confirmation in database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('confirm Subscription', token);
    return {
      message: 'Subscription confirmed successfully',
    };
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    //TODO check token validity
    //TODO delete subscription from database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('unsubscribe', token);
    return {
      message: 'Unsubscribed successfully',
    };
  }
}
