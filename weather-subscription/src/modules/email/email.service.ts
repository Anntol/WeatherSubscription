import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    try {
      const options: SMTPPool.Options = {
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_HOST'),
        secure: false,
        pool: true,
        auth: {
          user: this.configService.get<string>('SMTP_USERNAME'),
          pass: this.configService.get<string>('SMTP_PASSWORD'),
        },
      };
      this.transporter = nodemailer.createTransport(options);
    } catch (error) {
      console.error(error);
    }
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        to,
        subject,
        text,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  generateToken(email: string): string {
    try {
      const payload = { email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION')}`,
      });
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      throw new HttpException(
        'Token generation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  decodeToken(token: string): string {
    try {
      const payload: object = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      if (payload && 'email' in payload) {
        return <string>payload.email;
      }
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
  }
}
