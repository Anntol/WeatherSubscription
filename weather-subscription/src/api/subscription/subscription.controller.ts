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
    //TODO save subscription to database
    try {
      const token = this.emailService.generateToken(body.email);
      const url = `http://localhost:3002/api/confirm/${token}`; //TODO server url
      const confirmationLink = `<a href="${url}">Confirm Subscription</a>`;

      await this.emailService.sendEmail(
        body.email,
        'Subscription Confirmation',
        'Please confirm your subscription by clicking the link below: ' +
          confirmationLink,
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
    //TODO update subscription confirmation in database
    const email = await this.emailService.decodeToken(token);
    console.log('confirm Subscription', email);
    return {
      message: 'Subscription confirmed successfully',
    };
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    //TODO delete subscription from database
    const email = await this.emailService.decodeToken(token);
    console.log('unsubscribe', email);
    return {
      message: 'Unsubscribed successfully',
    };
  }
}
