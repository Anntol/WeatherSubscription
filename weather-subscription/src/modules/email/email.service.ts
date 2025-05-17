import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {}

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
}
