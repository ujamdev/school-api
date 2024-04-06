import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import globalConfig from './commons/config/global.config';
import { DatabaseModule } from './commons/typeorm/database.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [globalConfig], isGlobal: true }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
