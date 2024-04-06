import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { studentEntity } from './domain/student.entity';
import { studentSchoolEntity } from './domain/student.school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([studentEntity, studentSchoolEntity])],
})
export class StudentModule { }
