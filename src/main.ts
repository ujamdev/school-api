import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

class Server {
  private readonly configService: ConfigService;
  private readonly port;

  constructor(private readonly application: NestExpressApplication) {
    this.configService = application.get(ConfigService);
    this.port = this.configService.get('server.port') || 3000;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}


bootstrap();
