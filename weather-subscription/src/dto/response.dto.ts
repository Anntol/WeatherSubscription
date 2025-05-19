import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  statusCode: HttpStatus;
  message: string;

  constructor(statusCode: HttpStatus, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
