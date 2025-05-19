import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const defaultPort = 3000;
  try {
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(configService.get('PORT') || defaultPort);
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}
bootstrap();
