import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessHandler } from './commons/handler/success.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new SuccessHandler());

  await app.listen(8080);
}

bootstrap();
