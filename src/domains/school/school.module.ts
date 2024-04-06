import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTypeormModule } from 'src/commons/decorator/custom.typeorm.module';
import { SchoolService } from './application/school.service';
import { notificationEntity } from './domain/notification.entity';
import { schoolEntity } from './domain/school.entity';
import { schoolRepository } from './domain/school.repository';
import { SchoolController } from './presentation/school.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([schoolEntity, notificationEntity]),
    CustomTypeormModule.forCustomRepository([schoolRepository]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule { }
