import { YesNo } from 'src/commons/enum/yes.no';
import { Repository, UpdateResult } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { StudentSchoolEntity } from './student.school.entity';

@CustomRepository(StudentSchoolEntity)
export class StudentSchoolRepository extends Repository<StudentSchoolEntity> {
  async getStudentSchool(studentId: number, schoolId: number): Promise<StudentSchoolEntity> {
    return await this.createQueryBuilder('studentSchool')
      .where('student_id = :studentId', {
        studentId,
      })
      .andWhere('school_id = :schoolId', { schoolId })
      .getOne();
  }

  async updateSubscribeToSchool(studentId: number, schoolId: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('studentSchool')
      .update(StudentSchoolEntity)
      .set({
        isActive: YesNo.YES,
      })
      .where('student_id = :studentId', {
        studentId,
      })
      .andWhere('school_id = :schoolId', { schoolId })
      .execute();
  }
}
