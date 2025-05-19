import { FrequencyEnum } from '@enums/frequency';

export class SubcriptionDto {
  email: string;
  city: string;
  frequency: FrequencyEnum;
  confirmed: boolean;

  constructor(
    email: string,
    city: string,
    frequency: FrequencyEnum,
    confirmed: boolean = false,
  ) {
    this.email = email;
    this.city = city;
    this.frequency = frequency;
    this.confirmed = confirmed;
  }
}
