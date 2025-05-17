export type Frequency = 'hourly' | 'daily';
export class SubcriptionDto {
  email: string;
  city: string;
  frequency: Frequency;
  confirmed: boolean;

  constructor(
    email: string,
    city: string,
    frequency: Frequency,
    confirmed: boolean = false,
  ) {
    this.email = email;
    this.city = city;
    this.frequency = frequency;
    this.confirmed = confirmed;
  }
}
