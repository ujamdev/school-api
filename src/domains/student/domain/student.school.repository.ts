import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { YesNo } from '../../../commons/enum/yes.no';
import { CreateStudentSchoolRequest } from './dto/create.student.school.request';
import { GetStudentSchoolResponse } from './dto/get.student.school.response';
import { StudentSchoolEntity } from './student.school.entity';

@CustomRepository(StudentSchoolEntity)
export class StudentSchoolRepository extends Repository<StudentSchoolEntity> {
  async getStudentSchool(studentId: number, schoolId: number): Promise<GetStudentSchoolResponse> {
    return await this.createQueryBuilder('studentSchool')
      .where('student_id = :studentId', {
        studentId,
      })
      .andWhere('school_id = :schoolId', { schoolId })
      .getOne();
  }

  async createStudentSchool(request: CreateStudentSchoolRequest): Promise<InsertResult> {
    return await this.createQueryBuilder('studentSchool')
      .insert()
      .into(StudentSchoolEntity)
      .values({ studentId: request.studentId, schoolId: request.schoolId })
      .execute();
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

  async deleteStudentSchool(studentId: number, schoolId: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('studentSchool')
      .update(StudentSchoolEntity)
      .set({
        isActive: YesNo.NO,
      })
      .where('student_id = :studentId', {
        studentId,
      })
      .andWhere('school_id = :schoolId', { schoolId })
      .execute();
  }
}
