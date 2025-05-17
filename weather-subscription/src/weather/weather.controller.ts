import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Query,
} from '@nestjs/common';
import { WeatherDto } from './weather.dto';
import { ConfigService } from '@nestjs/config';

interface WeatherApiResponse {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
    };
  };
  error?: {
    code: number;
    message: string;
  };
}

@Controller('weather')
@Injectable()
export class WeatherController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getCurrentWeather(@Query('city') city: string) {
    const apiNotFoundCode = 1006;
    const apiUrl =
      this.configService.get<string>('WEATHER_API_URL') ||
      'http://api.weatherapi.com/v1/current.json';
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    if (!apiKey) {
      throw new Error('WEATHER_API_KEY is not set');
    }

    const url = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = (await response.json()) as WeatherApiResponse;

    if (!response.ok) {
      if (data.error?.code === apiNotFoundCode) {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    return new WeatherDto(
      data.current.temp_c,
      data.current.humidity,
      data.current.condition.text,
    );
  }
}
