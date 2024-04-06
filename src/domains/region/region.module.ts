import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './domain/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
})
export class RegionModule { }
