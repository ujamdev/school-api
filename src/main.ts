import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessHandler } from './commons/handler/success.handler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new SuccessHandler());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(8080);
}

bootstrap();
