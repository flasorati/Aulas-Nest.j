/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true //com o true eu consigo fazer as serializações e desserializações
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); //essa função vem da class-validator
  await app.listen(3000);
}
bootstrap();
