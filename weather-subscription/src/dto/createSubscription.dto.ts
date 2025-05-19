import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FrequencyEnum } from 'src/enums/frequency';
export class CreateSubcriptionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(FrequencyEnum)
  frequency: FrequencyEnum;
}
