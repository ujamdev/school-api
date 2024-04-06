import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { notificationEntity } from './domain/notification.entity';
import { schoolEntity } from './domain/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([schoolEntity, notificationEntity])],
})
export class SchoolModule { }
