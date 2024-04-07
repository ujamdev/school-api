import { Injectable } from '@nestjs/common';
import { StudentSchoolEntity } from '../domain/student.school.entity';
import { StudentSchoolRepository } from '../domain/student.school.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentSchoolRepository: StudentSchoolRepository) { }

  async getStudentSchool(studentId: number, schoolId: number): Promise<StudentSchoolEntity> {
    return await this.studentSchoolRepository.getStudentSchool(studentId, schoolId);
  }
}
