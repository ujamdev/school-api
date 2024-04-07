import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTypeormModule } from '../../commons/decorator/custom.typeorm.module';
import { SchoolService } from './application/school.service';
import { NotificationEntity } from './domain/notification.entity';
import { NotificationRepository } from './domain/notification.repository';
import { SchoolEntity } from './domain/school.entity';
import { SchoolRepository } from './domain/school.repository';
import { SchoolController } from './presentation/school.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolEntity, NotificationEntity]),
    CustomTypeormModule.forCustomRepository([SchoolRepository, NotificationRepository]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule { }
