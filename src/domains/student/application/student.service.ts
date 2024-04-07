import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { StudentSchoolEntity } from '../domain/student.school.entity';
import { StudentSchoolRepository } from '../domain/student.school.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentSchoolRepository: StudentSchoolRepository) { }

  async getStudentSchool(studentId: number, schoolId: number): Promise<StudentSchoolEntity> {
    return await this.studentSchoolRepository.getStudentSchool(studentId, schoolId);
  }

  async updateSubscribeToSchool(studentId: number, schoolId: number): Promise<MessageResponse> {
    try {
      const result = await this.studentSchoolRepository.updateSubscribeToSchool(
        studentId,
        schoolId,
      );

      if (result.affected === 0) {
        throw new BadRequestException(`Subscribe to school was not successfully updated`);
      }

      return MessageResponse.of('학생이 학교 구독에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to update Subscribe to school: ${error}`);
    }
  }
}
