import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import globalConfig from './commons/config/global.config';
import { DatabaseModule } from './commons/typeorm/database.module';
import { SchoolModule } from './domains/school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [globalConfig], isGlobal: true }),
    DatabaseModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
