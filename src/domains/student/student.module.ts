import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTypeormModule } from 'src/commons/decorator/custom.typeorm.module';
import { StudentService } from './application/student.service';
import { StudentEntity } from './domain/student.entity';
import { StudentSchoolEntity } from './domain/student.school.entity';
import { StudentSchoolRepository } from './domain/student.school.repository';
import { StudentController } from './presentation/student.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, StudentSchoolEntity]),
    CustomTypeormModule.forCustomRepository([StudentSchoolRepository]),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule { }
