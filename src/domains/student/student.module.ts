import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CachingModule } from 'src/commons/caching/caching.module';
import { CustomTypeormModule } from '../../commons/decorator/custom.typeorm.module';
import { SchoolModule } from '../school/school.module';
import { StudentService } from './application/student.service';
import { StudentEntity } from './domain/student.entity';
import { StudentSchoolEntity } from './domain/student.school.entity';
import { StudentSchoolRepository } from './domain/student.school.repository';
import { StudentController } from './presentation/student.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, StudentSchoolEntity]),
    CustomTypeormModule.forCustomRepository([StudentSchoolRepository]),
    CachingModule,
    SchoolModule,
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule { }
