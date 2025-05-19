export interface IWeatherApiResponse {
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
