export class WeatherDto {
  temperature: number;
  humidity: number;
  description: string;

  constructor(temperature: number, humidity: number, description: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
  }
}
