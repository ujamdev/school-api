import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { StudentSchoolRepository } from '../domain/student.school.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentSchoolRepository: StudentSchoolRepository) { }

  async createStudentSchool(request: CreateStudentSchoolRequest): Promise<MessageResponse> {
    try {
      const result = await this.studentSchoolRepository.createStudentSchool(request);

      if (result.raw.affectedRows === 0) {
        throw new BadRequestException(`School subscribe was not successfully created`);
      }

      return MessageResponse.of('학생이 학교 구독에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to create school subscribe: ${error}`);
    }
  }
}
