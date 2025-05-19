import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { EmailService } from '@modules/email/email.service';
import { SubscriptionsService } from '@entities/subscription/subsctiption.service';
import { CreateSubcriptionDto } from '@dto/createSubscription.dto';
import { ResponseDto } from '@dto/response.dto';

@Controller('api')
export class SubscriptionController {
  constructor(
    private readonly emailService: EmailService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  @Post('subscribe')
  async subscribe(
    @Body() data: CreateSubcriptionDto,
    @Req() req: Request,
  ): Promise<ResponseDto> {
    const subscription =
      await this.subscriptionsService.createSubscription(data);
    if (!subscription) {
      return new ResponseDto(HttpStatus.BAD_REQUEST, 'Invalid input');
    }

    await this.emailService.sendConfirmationEmail(
      subscription.email,
      req['protocol'],
      req.headers['host'],
    );
    return new ResponseDto(
      HttpStatus.OK,
      'Subscription successful. Confirmation email sent.',
    );
  }

  @Get('confirm/:token')
  async confirmSubscription(
    @Param('token') token: string,
  ): Promise<ResponseDto> {
    const email = this.emailService.decodeToken(token);
    await this.subscriptionsService.confirmEmail(email);

    return new ResponseDto(
      HttpStatus.OK,
      'Subscription confirmed successfully',
    );
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string): Promise<ResponseDto> {
    const email = this.emailService.decodeToken(token);
    await this.subscriptionsService.removeByEmail(email);

    return new ResponseDto(HttpStatus.OK, 'Unsubscribed successfully');
  }
}
