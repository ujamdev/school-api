import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { schoolEntity } from './domain/school.entity';
import { notificationEntity } from './domain/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([schoolEntity, notificationEntity])]
})
export class SchoolModule { }
