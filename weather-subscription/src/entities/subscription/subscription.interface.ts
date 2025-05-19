import { FrequencyEnum } from '@enums/frequency';

export interface ISubscription {
  id?: number;
  email: string;
  city: string;
  frequency: FrequencyEnum;
  confirmed: boolean;
}
