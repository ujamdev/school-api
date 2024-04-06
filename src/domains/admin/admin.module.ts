import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from './domain/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([adminEntity])],
})
export class AdminModule { }
