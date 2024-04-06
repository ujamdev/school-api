import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './domain/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
})
export class AdminModule { }
