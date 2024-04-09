import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachingModule } from './commons/caching/caching.module';
import globalConfig from './commons/config/global.config';
import { DatabaseModule } from './commons/typeorm/database.module';
import { SchoolModule } from './domains/school/school.module';
import { StudentModule } from './domains/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [globalConfig], isGlobal: true }),
    DatabaseModule,
    SchoolModule,
    StudentModule,
    CachingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
