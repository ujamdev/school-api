import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import globalConfig from './commons/config/global.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [globalConfig], isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
