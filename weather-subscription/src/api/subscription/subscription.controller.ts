import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Frequency } from '@dto/subscription.dto';
import { EmailService } from '@modules/email/email.service';
import { SubscriptionsService } from '@entities/subscription/subsctiption.service';

@Controller('api')
export class SubscriptionController {
  constructor(
    private readonly emailService: EmailService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  @Post('subscribe')
  async subscribe(
    @Body() body: { email: string; city: string; frequency: Frequency },
    @Req() req: Request,
  ) {
    //TODO data validation
    try {
      const { email, city, frequency } = body;
      const subscription = await this.subscriptionsService.create(
        email,
        city,
        frequency,
      );
      if (!subscription) {
        throw new HttpException(
          'Email already subscribed',
          HttpStatus.CONFLICT,
        );
      }

      const token = this.emailService.generateToken(email);
      const url = `${req['protocol']}://${req.headers['host']}/api/confirm/${token}`;
      const confirmationLink = `<a href="${url}">Confirm Subscription</a>`;

      await this.emailService.sendEmail(
        email,
        'Subscription Confirmation',
        'Please confirm your subscription by clicking the link below: ' +
          confirmationLink,
      );

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
    const email = this.emailService.decodeToken(token);
    await this.subscriptionsService.confirmEmail(email);

    return {
      message: 'Subscription confirmed successfully',
    };
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    const email = this.emailService.decodeToken(token);
    await this.subscriptionsService.removeByEmail(email);

    return {
      message: 'Unsubscribed successfully',
    };
  }
}
