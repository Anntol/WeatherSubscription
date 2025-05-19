import { WeatherDto } from '@dto/weather.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IWeatherApiResponse } from './weatherApiResponse.interface';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigService) {}

  async getCurrentWeather(city: string): Promise<WeatherDto> {
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
    const data = (await response.json()) as IWeatherApiResponse;

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
