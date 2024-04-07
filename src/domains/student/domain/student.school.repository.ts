import { InsertResult, Repository } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { CreateStudentSchoolRequest } from './dto/create.student.school.request';
import { StudentSchoolEntity } from './student.school.entity';

@CustomRepository(StudentSchoolEntity)
export class StudentSchoolRepository extends Repository<StudentSchoolEntity> {
  async createStudentSchool(request: CreateStudentSchoolRequest): Promise<InsertResult> {
    return await this.createQueryBuilder('studentSchool')
      .insert()
      .into(StudentSchoolEntity)
      .values({ studentId: request.studentId, schoolId: request.schoolId })
      .execute();
  }
}
