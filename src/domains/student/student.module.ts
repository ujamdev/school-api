import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './domain/student.entity';
import { StudentSchoolEntity } from './domain/student.school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, StudentSchoolEntity])],
})
export class StudentModule { }
