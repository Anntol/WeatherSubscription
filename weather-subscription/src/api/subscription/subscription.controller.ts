import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Frequency } from '@dto/subscription.dto';

@Controller('api')
export class SubscriptionController {
  @Post('subscribe')
  async subscribe(
    @Body() body: { email: string; city: string; frequency: Frequency },
  ) {
    //TODO data validation
    //TODO generate confirmation token
    //TODO send confirmation email
    //TODO save subscription to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Subscription data:', body);
    return {
      message: 'Subscription successful. Confirmation email sent.',
    };
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
