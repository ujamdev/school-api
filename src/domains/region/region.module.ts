import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { regionEntity } from './domain/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([regionEntity])]
})
export class RegionModule { }
