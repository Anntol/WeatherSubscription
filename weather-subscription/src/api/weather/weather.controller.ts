import { Controller, Get, Injectable, Query } from '@nestjs/common';
import { WeatherDto } from '@dto/weather.dto';
import { WeatherService } from '@modules/weather/weather.service';

@Controller('api')
@Injectable()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('weather')
  async getCurrentWeather(@Query('city') city: string): Promise<WeatherDto> {
    return await this.weatherService.getCurrentWeather(city);
  }
}
